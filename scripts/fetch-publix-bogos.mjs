#!/usr/bin/env node
/**
 * Pull this week's Publix BOGO deals and sync them into Firestore.
 *
 * Runs from GitHub Actions every Thursday morning (see .github/workflows/publix-bogos.yml)
 * and can be run locally:  node scripts/fetch-publix-bogos.mjs --dry-run
 *
 * Source: Flipp's public flyer API, which carries Publix's weekly ad for a zip code.
 *   https://backflipp.wishabi.com/flipp/items/search?locale=en-us&postal_code=ZIP&q=QUERY
 *   (Publix is merchant_id 2361; items carry name, description, sale_story, price, images, valid dates.)
 * Fallback: Publix's own weekly-ad accessibility page, if a PUBLIX_AD_URL is configured.
 *
 * Firestore writes use the REST API. Auth is either:
 *   - FIREBASE_SERVICE_ACCOUNT (JSON) → OAuth2 access token via a signed JWT (no dependencies), or
 *   - the web API key alone, when your Firestore rules allow unauthenticated writes to bogoItems/meta.
 *
 * Env / flags:
 *   PUBLIX_ZIP            zip code for the store area (default 33602 — Tampa; set a repo variable!)
 *   FIREBASE_PROJECT_ID   default grocery-tracker-b45f1
 *   FIREBASE_API_KEY      web API key (optional when a service account is provided)
 *   FIREBASE_SERVICE_ACCOUNT  service-account JSON (recommended)
 *   PUBLIX_AD_URL         optional Publix accessibility weekly-ad URL used as a fallback source
 *   --dry-run             fetch and print, don't write
 *   --keep-missing        don't delete deals that are no longer in the ad (default: replace the week)
 */
import { createSign } from "node:crypto";

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const KEEP_MISSING = args.has("--keep-missing");
const ZIP = process.env.PUBLIX_ZIP || "33602";
const PROJECT = process.env.FIREBASE_PROJECT_ID || "grocery-tracker-b45f1";
const API_KEY = process.env.FIREBASE_API_KEY || "";
const SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT || "";
const AD_URL = process.env.PUBLIX_AD_URL || "";
const PUBLIX_MERCHANT_ID = 2361;
const FLIPP_SEARCH = "https://backflipp.wishabi.com/flipp/items/search";
const UA = "Mozilla/5.0 (compatible; GroceryGlance/1.0; +https://github.com/titanturtle90/grocery-tracker)";

const BOGO_RE = /\b(bogo|b1g1|buy\s*(?:1|one)\s*,?\s*get\s*(?:1|one)\s*(?:free|f)?|2\s*for\s*(?:the\s*price\s*of\s*)?1)\b/i;
const B2G1_RE = /\bbuy\s*(?:2|two)\s*,?\s*get\s*(?:1|one)\s*free\b/i;

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { "User-Agent": UA, Accept: "application/json", ...(opts.headers || {}) } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// ---------------------------------------------------------------- Flipp
function dealTextOf(item) {
  const parts = [item.sale_story, item.pre_price_text, item.price_text, item.description, item.name].filter(Boolean).join(" · ");
  return parts;
}
function classify(item) {
  const text = dealTextOf(item);
  if (B2G1_RE.test(text)) return "Buy 2 get 1 free";
  if (BOGO_RE.test(text)) return "Buy 1 get 1 free";
  return null;
}
function normalizeName(name) {
  return String(name || "").replace(/\s+/g, " ").replace(/\s*(bogo|buy one get one free|buy 1 get 1 free)\s*/gi, " ").trim();
}

async function fetchFlippDeals(zip) {
  const queries = ["bogo", "buy 1 get 1", "buy one get one", "free", "publix"];
  const seen = new Map();
  for (const q of queries) {
    const url = `${FLIPP_SEARCH}?locale=en-us&postal_code=${encodeURIComponent(zip)}&q=${encodeURIComponent(q)}`;
    try {
      const data = await fetchJson(url);
      const items = (data.items || []).filter(i => Number(i.merchant_id) === PUBLIX_MERCHANT_ID || /publix/i.test(i.merchant_name || ""));
      log(`flipp q="${q}": ${items.length} Publix items`);
      for (const it of items) {
        const note = classify(it);
        if (!note) continue;
        const key = normalizeName(it.name).toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.set(key, {
          name: normalizeName(it.name),
          note,
          description: (it.description || "").trim() || null,
          price: it.price ? String(it.price).replace(/^(?!\$)/, "$") : (it.price_text || null),
          imageUrl: it.clean_image_url || it.clipping_image_url || it.image_url || null,
          validFrom: it.valid_from || null,
          validTo: it.valid_to || null,
          flippId: it.flyer_item_id || it.id || null,
          source: "flipp"
        });
      }
    } catch (e) {
      log(`flipp q="${q}" failed: ${e.message}`);
    }
  }
  return Array.from(seen.values());
}

// ------------------------------------------------ Publix accessibility ad (fallback)
async function fetchPublixAccessibilityAd(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} fetching Publix ad page`);
  const html = await res.text();
  const tiles = html.split(/class="theTileContainer"/i).slice(1);
  const out = [];
  for (const t of tiles) {
    const title = (t.match(/class="title"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1];
    const deal = (t.match(/class="deal"[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i) || [])[1];
    const dates = (t.match(/class="validDates"[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i) || [])[1];
    const clean = s => String(s || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    const name = clean(title), dealText = clean(deal);
    if (!name) continue;
    const note = B2G1_RE.test(dealText) ? "Buy 2 get 1 free" : BOGO_RE.test(dealText) ? "Buy 1 get 1 free" : null;
    if (!note) continue;
    out.push({ name, note, description: clean(dates) || null, price: null, imageUrl: null, validFrom: null, validTo: null, flippId: null, source: "publix.com" });
  }
  return out;
}

// ---------------------------------------------------------------- Firestore REST
const FS_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

function b64url(buf) { return Buffer.from(buf).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"); }
async function accessTokenFromServiceAccount(json) {
  const sa = JSON.parse(json);
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const sig = b64url(signer.sign(sa.private_key));
  const body = new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${header}.${claim}.${sig}` });
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

let authHeaders = {};
let keyParam = "";
async function initAuth() {
  if (SERVICE_ACCOUNT) { authHeaders = { Authorization: `Bearer ${await accessTokenFromServiceAccount(SERVICE_ACCOUNT)}` }; log("auth: service account"); }
  else if (API_KEY) { keyParam = `key=${encodeURIComponent(API_KEY)}`; log("auth: web API key (rules must allow writes)"); }
  else throw new Error("Provide FIREBASE_SERVICE_ACCOUNT or FIREBASE_API_KEY");
}
function fsUrl(path, extra = "") { const q = [keyParam, extra].filter(Boolean).join("&"); return `${FS_BASE}/${path}${q ? "?" + q : ""}`; }
function toFields(obj) {
  const f = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) f[k] = { nullValue: null };
    else if (typeof v === "number") f[k] = Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    else if (typeof v === "boolean") f[k] = { booleanValue: v };
    else f[k] = { stringValue: String(v) };
  }
  return f;
}
async function listCollection(name) {
  const out = [];
  let pageToken = "";
  do {
    const data = await fetchJson(fsUrl(name, `pageSize=300${pageToken ? `&pageToken=${pageToken}` : ""}`), { headers: authHeaders });
    (data.documents || []).forEach(d => {
      const id = d.name.split("/").pop();
      const fields = {};
      for (const [k, v] of Object.entries(d.fields || {})) fields[k] = v.stringValue ?? v.integerValue ?? v.doubleValue ?? v.booleanValue ?? null;
      out.push({ id, ...fields });
    });
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return out;
}
async function commit(writes) {
  // Firestore allows up to 500 writes per commit.
  for (let i = 0; i < writes.length; i += 400) {
    const chunk = writes.slice(i, i + 400);
    const res = await fetch(`${FS_BASE}:commit${keyParam ? "?" + keyParam : ""}`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders }, body: JSON.stringify({ writes: chunk }) });
    if (!res.ok) throw new Error(`commit failed: ${res.status} ${await res.text()}`);
    log(`committed ${chunk.length} writes`);
  }
}
const docPath = (col, id) => `projects/${PROJECT}/databases/(default)/documents/${col}/${id}`;
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "deal";

// ---------------------------------------------------------------- main
(async () => {
  log(`Publix BOGO refresh · zip ${ZIP} · project ${PROJECT}${DRY ? " · DRY RUN" : ""}`);
  let deals = await fetchFlippDeals(ZIP);
  if (deals.length < 5 && AD_URL) {
    log(`only ${deals.length} deals from Flipp — trying Publix accessibility ad`);
    try { const alt = await fetchPublixAccessibilityAd(AD_URL); if (alt.length > deals.length) deals = alt; } catch (e) { log(`publix.com fallback failed: ${e.message}`); }
  }
  deals.sort((a, b) => a.name.localeCompare(b.name));
  log(`${deals.length} BOGO deals found`);
  if (!deals.length) { console.error("No deals found — leaving Firestore untouched."); process.exit(2); }

  const validFrom = deals.map(d => d.validFrom).filter(Boolean).sort()[0] || null;
  const validTo = deals.map(d => d.validTo).filter(Boolean).sort().pop() || null;
  const nowIso = new Date().toISOString();
  const weekKey = nowIso.slice(0, 10);

  if (DRY) {
    deals.slice(0, 40).forEach(d => console.log(` • ${d.name}  [${d.note}]${d.price ? " " + d.price : ""}${d.description ? " — " + d.description : ""}`));
    if (deals.length > 40) console.log(` … and ${deals.length - 40} more`);
    console.log(`valid ${validFrom} → ${validTo}`);
    return;
  }

  await initAuth();
  const existing = await listCollection("bogoItems");
  log(`${existing.length} deals currently in Firestore`);
  const byId = new Map(existing.map(e => [e.id, e]));
  const writes = [];
  const newIds = new Set();
  for (const d of deals) {
    const id = "pb-" + slug(d.name);
    newIds.add(id);
    const prev = byId.get(id);
    const doc = { id, name: d.name, note: d.note, description: d.description, price: d.price, imageUrl: d.imageUrl, validFrom: d.validFrom, validTo: d.validTo, flippId: d.flippId, source: d.source, weekKey, category: null, addedAt: prev && prev.addedAt && prev.weekKey === weekKey ? prev.addedAt : nowIso };
    writes.push({ update: { name: docPath("bogoItems", id), fields: toFields(doc) } });
  }
  if (!KEEP_MISSING) {
    for (const e of existing) if (!newIds.has(e.id)) writes.push({ delete: docPath("bogoItems", e.id) });
  }
  writes.push({ update: { name: docPath("meta", "bogo"), fields: toFields({ updatedAt: nowIso, count: deals.length, validFrom, validTo, zip: ZIP, source: deals[0].source, weekKey }) } });
  await commit(writes);
  log(`done: ${deals.length} deals written, ${KEEP_MISSING ? 0 : existing.filter(e => !newIds.has(e.id)).length} removed`);
})().catch(err => { console.error(err); process.exit(1); });
