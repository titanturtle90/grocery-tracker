/*
 * Recipe engine: normalizes the recipe database, maps free-text names onto
 * ingredient keys, and scores recipes against what you picked and what's
 * in your kitchen. Pure logic — no DOM.
 */
(function (global) {
  "use strict";
  const Ing = global.Ingredients;

  const TILES = ["tile-g1", "tile-g2", "tile-g3", "tile-g4", "tile-g5", "tile-g6", "tile-g7", "tile-g8"];
  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

  const RECIPES = (global.RECIPE_DATA || []).map(r => {
    const ing = r.ing.map(t => ({ keys: Array.isArray(t[0]) ? t[0] : [t[0]], qty: t[1] || "", text: t[2] || "", optional: !!t[3] }));
    const keys = new Set(); ing.forEach(i => i.keys.forEach(k => keys.add(k)));
    return { ...r, ing, keys, tile: TILES[hash(r.id) % TILES.length], searchText: `${r.name} ${r.desc} ${r.cuisine} ${(r.tags || []).join(" ")} ${ing.map(i => i.text).join(" ")}`.toLowerCase() };
  });
  const BY_ID = new Map(RECIPES.map(r => [r.id, r]));

  const DEFAULT_EXTRA_STAPLES = ["butter", "garlic", "onion"];
  const STAPLE_CANDIDATES = ["butter", "garlic", "onion", "eggs", "milk", "rice", "pasta", "bread", "lemon", "honey", "mayo", "cheese", "parmesan", "broth", "breadcrumbs", "peanut-butter", "hot-sauce", "sesame-oil", "green-onion", "tortilla"];

  function stapleSet(extra) {
    const s = new Set(Ing.CATALOG.filter(e => e.staple).map(e => e.key));
    (extra || []).forEach(k => s.add(k));
    return s;
  }

  /** Map grocery/BOGO item names → Map(key → [item names]). */
  function keysForNames(names) {
    const map = new Map();
    (names || []).forEach(n => {
      Ing.keysFor(n).forEach(k => { if (!map.has(k)) map.set(k, []); map.get(k).push(n); });
    });
    return map;
  }

  function intersects(keys, set) { return keys.some(k => set.has(k)); }

  /**
   * Score one recipe.
   * selected: array of chip keys (un-expanded). pantry: Set of expanded keys you have. staples: Set.
   */
  function match(recipe, selected, pantry, staples) {
    const selExp = Ing.expand(selected);
    const used = []; // chip keys this recipe uses
    selected.forEach(c => { const ce = Ing.expand([c]); if (recipe.ing.some(i => intersects(i.keys, ce))) used.push(c); });
    const core = recipe.ing.filter(i => !i.optional);
    const have = [], missing = [], stapleList = [];
    core.forEach(i => {
      if (intersects(i.keys, selExp) || intersects(i.keys, pantry)) have.push(i);
      else if (intersects(i.keys, staples)) stapleList.push(i);
      else missing.push(i);
    });
    const total = core.length;
    const coverage = total ? (have.length + stapleList.length) / total : 1;
    return { used, usesCount: used.length, have, missing, staples: stapleList, total, coverage, canMake: missing.length === 0 };
  }

  function passesFilters(recipe, f) {
    if (!f) return true;
    if (f.meal && !(recipe.meal || []).includes(f.meal)) return false;
    if (f.maxTime && recipe.time > f.maxTime) return false;
    if (f.cuisine && recipe.cuisine !== f.cuisine) return false;
    if (f.diet) { const d = recipe.diet || []; if (!d.includes(f.diet) && !d.includes(f.diet + "-option")) return false; }
    if (f.query) { const q = f.query.toLowerCase().trim(); if (q && !recipe.searchText.includes(q)) return false; }
    return true;
  }

  /**
   * search({ selected, pantry, staples, filters, favorites })
   * Returns [{ recipe, m }] sorted best-first.
   */
  function search(opts) {
    const selected = opts.selected || [];
    const pantry = opts.pantry || new Set();
    const staples = opts.staples || stapleSet(DEFAULT_EXTRA_STAPLES);
    const f = opts.filters || {};
    const favs = opts.favorites || new Set();
    const out = [];
    for (const r of RECIPES) {
      if (!passesFilters(r, f)) continue;
      if (f.savedOnly && !favs.has(r.id)) continue;
      const m = match(r, selected, pantry, staples);
      if (selected.length && m.usesCount === 0) continue;
      if (f.requireAll && m.usesCount < selected.length) continue;
      if (f.canMakeOnly && !m.canMake) continue;
      out.push({ recipe: r, m });
    }
    out.sort((a, b) => {
      if (selected.length) {
        if (b.m.usesCount !== a.m.usesCount) return b.m.usesCount - a.m.usesCount;
      }
      if (a.m.missing.length !== b.m.missing.length) return a.m.missing.length - b.m.missing.length;
      if (b.m.coverage !== a.m.coverage) return b.m.coverage - a.m.coverage;
      const fa = favs.has(a.recipe.id) ? 0 : 1, fb = favs.has(b.recipe.id) ? 0 : 1;
      if (fa !== fb) return fa - fb;
      return a.recipe.time - b.recipe.time || a.recipe.name.localeCompare(b.recipe.name);
    });
    return out;
  }

  /** Recipes that make good use of the kitchen with no selection: prioritize using urgent items. */
  function picks({ urgentKeys, pantry, staples, limit = 8 }) {
    const res = search({ selected: urgentKeys || [], pantry, staples });
    const scored = res.filter(x => x.m.have.length >= 2 || x.m.usesCount > 0);
    return scored.slice(0, limit);
  }

  // ---------- quantity scaling ----------
  const FRACTIONS = { "½": 0.5, "⅓": 1 / 3, "⅔": 2 / 3, "¼": 0.25, "¾": 0.75, "⅛": 0.125 };
  function parseNumber(str) {
    str = str.trim();
    let total = 0, any = false;
    const parts = str.split(/\s+/);
    for (const p of parts) {
      if (/^\d+(\.\d+)?$/.test(p)) { total += parseFloat(p); any = true; }
      else if (/^\d+\/\d+$/.test(p)) { const [a, b] = p.split("/").map(Number); total += a / b; any = true; }
      else if (FRACTIONS[p] != null) { total += FRACTIONS[p]; any = true; }
      else if (/^\d+[½⅓⅔¼¾⅛]$/.test(p)) { total += parseInt(p, 10) + FRACTIONS[p.slice(-1)]; any = true; }
      else return any ? total : null;
    }
    return any ? total : null;
  }
  function fmtNumber(n) {
    const whole = Math.floor(n + 1e-9);
    const frac = n - whole;
    const table = [[0, ""], [0.125, "⅛"], [0.25, "¼"], [1 / 3, "⅓"], [0.5, "½"], [2 / 3, "⅔"], [0.75, "¾"], [1, ""]];
    let best = table[0];
    for (const t of table) if (Math.abs(t[0] - frac) < Math.abs(best[0] - frac)) best = t;
    let w = whole; let f = best[1];
    if (best[0] === 1) { w += 1; f = ""; }
    if (w === 0 && !f) return n < 0.1 ? "a pinch of" : (Math.round(n * 100) / 100).toString();
    return `${w || ""}${w && f ? " " : ""}${f}`.trim();
  }
  /** Scale "1½ lb", "2 (14 oz) cans", "⅓ cup + ½ cup", "4–5 lb". Leaves non-numeric text alone. */
  function scaleQty(qty, factor) {
    if (!qty || factor === 1) return qty;
    return qty.split(/\s*\+\s*/).map(part => part.replace(/^([\d½⅓⅔¼¾⅛][\d\s\/½⅓⅔¼¾⅛.]*?)(?=\s*(?:[–-]\s*[\d½⅓⅔¼¾⅛]|\(|[a-zA-Z]|$))/u, (m0) => {
      const n = parseNumber(m0); if (n == null) return m0; return fmtNumber(n * factor) + (m0.endsWith(" ") ? " " : "");
    }).replace(/[–-]\s*([\d½⅓⅔¼¾⅛][\d\/½⅓⅔¼¾⅛.]*(?:\s[\d\/½⅓⅔¼¾⅛]+)?)(\s*)/u, (m0, g1, ws) => { const n = parseNumber(g1); return n == null ? m0 : "–" + fmtNumber(n * factor) + (ws || (/[a-zA-Z(]/.test(m0.slice(-1)) ? "" : " ")); })).join(" + ");
  }

  function cuisines() { return Array.from(new Set(RECIPES.map(r => r.cuisine))).sort(); }

  global.RecipeEngine = { all: () => RECIPES, byId: id => BY_ID.get(id), keysForNames, match, search, picks, stapleSet, DEFAULT_EXTRA_STAPLES, STAPLE_CANDIDATES, scaleQty, cuisines };
})(window);
