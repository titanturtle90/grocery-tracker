/*
 * BOGO tab. Firestore collection "bogoItems" is written every Thursday by the
 * GitHub Actions workflow (scripts/fetch-publix-bogos.mjs). Each doc:
 *   { id, name, note, addedAt, description?, price?, imageUrl?, validFrom?, validTo?, category?, weekKey?, source? }
 * The workflow also writes meta/bogo: { updatedAt, count, validFrom, validTo, zip, source }.
 */
(function (global) {
  "use strict";
  const App = global.App;
  const { escapeHtml: esc, icon } = App;

  const REPO_ACTIONS_URL = "https://github.com/titanturtle90/grocery-tracker/actions/workflows/publix-bogos.yml";

  let deals = [];
  let meta = null;
  let col = null;
  const state = { search: "", cat: "" };
  const SEEN_KEY = "gg-bogo-seen-week";

  const heroEl = document.getElementById("bogoHero");
  const listEl = document.getElementById("bogoList");
  const catsEl = document.getElementById("bogoCats");
  const recipesEl = document.getElementById("bogoRecipes");
  const searchEl = document.getElementById("bogoSearch");
  const moreBtn = document.getElementById("bogoMoreBtn");
  const ledeEl = document.getElementById("bogoLede");

  const CAT_EMOJI = { "Produce": "🥬", "Deli": "🥪", "Bakery": "🥐", "Meat": "🥩", "Seafood": "🦐", "Dairy": "🥛", "Frozen Food": "🧊", "Beverages": "🧃", "Beer & Wine": "🍷", "Liquor": "🥃", "Health & Nutrition": "💊", "Baby": "🍼", "Beauty & Personal Care": "🧴", "Pet": "🐾", "Housewares": "🏠", "Non-Foods": "🧽", "Grocery": "🛒" };

  function catOf(d) { return d.category || (global.BogoCategories ? BogoCategories.lookup(d.name) : "Grocery"); }
  function weekKey() { return meta && meta.updatedAt ? meta.updatedAt.slice(0, 10) : (deals[0] && deals[0].addedAt ? deals[0].addedAt.slice(0, 10) : ""); }

  function init() {
    col = App.col("bogoItems");
    if (!col) { heroEl.innerHTML = ""; listEl.innerHTML = `<div class="empty"><div class="em">🔌</div><h3>Not connected</h3></div>`; return; }
    col.onSnapshot(snap => { deals = snap.docs.map(d => d.data()); render(); App.emit("bogo", deals); }, err => {
      console.error("bogoItems sync error", err);
      listEl.innerHTML = `<div class="empty"><div class="em">⚠️</div><h3>Can't sync</h3><p>${err.code === "permission-denied" ? 'Add a "bogoItems" rule to your Firestore rules.' : "Check your connection."}</p></div>`;
    });
    App.db.collection("meta").doc("bogo").onSnapshot(doc => { meta = doc.exists ? doc.data() : null; renderHero(); render(); }, () => {});
    App.on("groceries", () => { if (App.tab === "bogo") renderRecipes(); });
    App.on("shopping", () => { if (App.tab === "bogo") renderList(); });
    App.on("tab", ({ tab }) => { if (tab === "bogo") { App.lsSet(SEEN_KEY, weekKey()); App.setBadge("bogo", 0); renderRecipes(); } });
  }

  function render() {
    renderHero();
    renderCats();
    renderList();
    if (App.tab === "bogo") renderRecipes();
    const seen = App.lsGet(SEEN_KEY, "");
    App.setBadge("bogo", deals.length && seen !== weekKey() && App.tab !== "bogo" ? deals.length : 0, true);
    ledeEl.textContent = deals.length ? `${deals.length} buy-one-get-one deals this week` : "Buy one, get one free — refreshed every Thursday.";
  }

  function nextThursday() {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    const add = (4 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + add);
    return d;
  }

  function renderHero() {
    const isThu = new Date().getDay() === 4;
    const updated = meta?.updatedAt || (deals.length ? deals.map(d => d.addedAt).filter(Boolean).sort().pop() : null);
    const stale = updated ? (Date.now() - new Date(updated).getTime()) > 8 * 86400000 : false;
    let valid = "";
    if (meta?.validFrom && meta?.validTo) valid = `Valid ${App.formatDate(meta.validFrom.slice(0, 10))} – ${App.formatDate(meta.validTo.slice(0, 10))}`;
    const cookable = cookableCount();
    heroEl.innerHTML = `<div class="hero ${stale ? "orange" : ""} fade-in">
      <div class="eyebrow">${icon("tag", "sm")} Publix weekly ad</div>
      <h2>${deals.length ? `${deals.length} BOGO deals` : "No deals loaded yet"}</h2>
      <p>${updated ? `Updated ${App.relative(updated)}${valid ? " · " + valid : ""}` : "The Thursday auto-refresh hasn't run yet."}${stale ? " · These look stale — the weekly refresh may have failed." : ""}</p>
      <div class="stats-inline">
        <div><b>${cookable}</b><span>match recipes</span></div>
        <div><b>${isThu ? "Today" : App.formatDate(App.toDateStr(nextThursday()))}</b><span>next refresh</span></div>
        <div><b>${meta?.zip || "—"}</b><span>zip code</span></div>
      </div>
      <div class="row wrap" style="margin-top:4px">
        ${deals.length ? `<button class="btn" type="button" data-h="cook">${icon("chef", "sm")} Cook with these</button>` : ""}
        <a class="btn ghost" href="${REPO_ACTIONS_URL}" target="_blank" rel="noopener">${icon("refresh", "sm")} Refresh now</a>
      </div>
    </div>`;
    const cook = heroEl.querySelector("[data-h=cook]");
    if (cook) cook.addEventListener("click", () => openRecipesWithDeals());
  }

  function dealKeys() {
    if (!global.RecipeEngine) return [];
    const map = RecipeEngine.keysForNames(deals.map(d => d.name));
    return Array.from(map.keys()).filter(k => !global.Ingredients.isStaple(k));
  }
  function cookableCount() { return dealKeys().length; }
  function openRecipesWithDeals() { if (global.Recipes) Recipes.openWithKeys(dealKeys().slice(0, 12), { source: "bogo" }); }

  function renderCats() {
    if (!deals.length) { catsEl.innerHTML = ""; return; }
    const order = global.BogoCategories ? BogoCategories.CATEGORY_ORDER : [];
    const counts = new Map();
    deals.forEach(d => { const c = catOf(d); counts.set(c, (counts.get(c) || 0) + 1); });
    const cats = Array.from(counts.keys()).sort((a, b) => (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b)));
    catsEl.innerHTML = `<button class="chip ${state.cat === "" ? "on" : ""}" data-c="" type="button">All <span class="count">${deals.length}</span></button>` +
      `<button class="chip ${state.cat === "__cook" ? "on" : ""}" data-c="__cook" type="button"><span class="em">🍳</span>Cookable</button>` +
      cats.map(c => `<button class="chip ${state.cat === c ? "on" : ""}" data-c="${esc(c)}" type="button"><span class="em">${CAT_EMOJI[c] || "🛒"}</span>${esc(c)} <span class="count">${counts.get(c)}</span></button>`).join("");
  }

  function filtered() {
    const q = state.search.trim().toLowerCase();
    return deals.filter(d => {
      if (state.cat === "__cook") { if (!global.Ingredients || !Ingredients.keysFor(d.name).some(k => !Ingredients.isStaple(k))) return false; }
      else if (state.cat && catOf(d) !== state.cat) return false;
      if (q && !(d.name + " " + (d.description || "")).toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function renderList() {
    if (!deals.length) {
      listEl.innerHTML = `<div class="empty fade-in"><div class="em">🏷️</div><h3>No BOGOs yet</h3><p>Deals are pulled automatically every Thursday morning. You can also trigger a refresh from the workflow page.</p><a class="btn" href="${REPO_ACTIONS_URL}" target="_blank" rel="noopener">${icon("external", "sm")} Open workflow</a></div>`;
      return;
    }
    const list = filtered();
    if (!list.length) { listEl.innerHTML = `<div class="empty"><div class="em">🔍</div><h3>No matching deals</h3></div>`; return; }
    const order = global.BogoCategories ? BogoCategories.CATEGORY_ORDER : [];
    const groups = new Map();
    list.forEach(d => { const c = catOf(d); if (!groups.has(c)) groups.set(c, []); groups.get(c).push(d); });
    const keys = Array.from(groups.keys()).sort((a, b) => (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b)));
    const frag = document.createDocumentFragment();
    keys.forEach(k => {
      frag.appendChild(App.el(`<h2 class="group-title">${CAT_EMOJI[k] || "🛒"} ${esc(k)}<span class="n">${groups.get(k).length}</span></h2>`));
      const wrap = App.el(`<div class="list tight"></div>`);
      groups.get(k).sort((a, b) => a.name.localeCompare(b.name)).forEach(d => wrap.appendChild(row(d)));
      frag.appendChild(wrap);
    });
    listEl.innerHTML = ""; listEl.appendChild(frag);
  }

  function row(d) {
    const onList = global.Shopping && Shopping.has(d.name);
    const meta = [];
    if (d.note) meta.push(`<span class="pill accent">${esc(d.note)}</span>`);
    if (d.price) meta.push(`<span class="price">${esc(d.price)}</span>`);
    if (d.description) meta.push(`<span>${esc(d.description)}</span>`);
    const el = App.el(`<div class="item" data-id="${d.id}">
      <span class="lead">${d.imageUrl ? `<img class="deal-img" src="${esc(d.imageUrl)}" alt="" loading="lazy" onerror="this.remove()">` : (CAT_EMOJI[catOf(d)] || "🏷️")}</span>
      <span class="body"><span class="title">${esc(d.name)}</span><span class="meta">${meta.join("")}</span></span>
      <button class="icon-btn ${onList ? "on" : "accent"}" type="button" data-add aria-label="Add to shopping list">${icon(onList ? "check" : "plus")}</button>
    </div>`);
    el.querySelector("[data-add]").addEventListener("click", e => { e.stopPropagation(); addToList(d, el.querySelector("[data-add]")); });
    el.addEventListener("click", () => openDetail(d));
    return el;
  }

  function addToList(d, btn) {
    if (!global.Shopping) return;
    const added = Shopping.add(d.name, "", { note: "BOGO" });
    App.haptic();
    if (added) { App.toast(`${d.name} added to shopping.`); if (btn) { btn.classList.remove("accent"); btn.classList.add("on"); btn.innerHTML = icon("check"); } }
    else App.toast(`${d.name} is already on your list.`);
  }

  function openDetail(d) {
    const keys = global.Ingredients ? Ingredients.keysFor(d.name).filter(k => !Ingredients.isStaple(k)) : [];
    const body = App.el(`<div>
      ${d.imageUrl ? `<div class="rhero" style="background:#fff;height:160px"><img src="${esc(d.imageUrl)}" alt="" style="object-fit:contain"></div>` : ""}
      <div class="rmeta">
        <span class="pill accent">${esc(d.note || "Buy 1 get 1 free")}</span>
        ${d.price ? `<span class="pill">${esc(d.price)}</span>` : ""}
        <span class="pill">${CAT_EMOJI[catOf(d)] || ""} ${esc(catOf(d))}</span>
        ${d.validTo ? `<span class="pill">${icon("clock", "sm")} through ${App.formatDate(d.validTo.slice(0, 10))}</span>` : ""}
      </div>
      ${d.description ? `<p class="mt-12" style="font-size:0.92rem;color:var(--text-2)">${esc(d.description)}</p>` : ""}
      <div class="action-grid mt-16">
        <button class="act accent" data-a="add" type="button">${icon("cart")}Add to list</button>
        <button class="act ${keys.length ? "" : ""}" data-a="cook" type="button" ${keys.length ? "" : "disabled"}>${icon("chef")}Recipes</button>
        <button class="act" data-a="kitchen" type="button">${icon("kitchen")}Bought it</button>
        <button class="act danger" data-a="del" type="button">${icon("trash")}Hide</button>
      </div>
      ${keys.length ? `<p class="hint mt-12">Cooks as: ${keys.map(k => `${Ingredients.emoji(k)} ${esc(Ingredients.label(k))}`).join(", ")}</p>` : ""}
    </div>`);
    body.addEventListener("click", e => {
      const b = e.target.closest("[data-a]"); if (!b) return;
      if (b.dataset.a === "add") { addToList(d); App.sheet.close(); }
      if (b.dataset.a === "cook") { App.sheet.close(); if (global.Recipes) Recipes.openWithKeys(keys, { source: "bogo" }); }
      if (b.dataset.a === "kitchen") { App.sheet.close(); if (global.Groceries) Groceries.openForm(null, { name: d.name, qty: "2" }); }
      if (b.dataset.a === "del") { App.sheet.close(); col.doc(d.id).delete().catch(() => {}); App.toast(`Hid ${d.name}.`, { label: "Undo", onClick: () => col.doc(d.id).set(d) }); }
    });
    App.sheet.open({ title: d.name, body });
  }

  // Recipes that use this week's deals, shown as a carousel above the list.
  function renderRecipes() {
    if (!global.RecipeEngine || !global.Recipes || !deals.length) { recipesEl.innerHTML = ""; return; }
    const keys = dealKeys();
    if (!keys.length) { recipesEl.innerHTML = ""; return; }
    const results = RecipeEngine.search({ selected: keys, pantry: Recipes.pantryKeys(), staples: Recipes.staples(), favorites: Recipes.favorites() })
      .filter(x => x.m.usesCount >= 2).slice(0, 8);
    if (!results.length) { recipesEl.innerHTML = ""; return; }
    recipesEl.innerHTML = `<div class="section"><div class="section-head"><h2>${icon("sparkle")} Cook with this week's deals</h2><button class="link" type="button" data-all>See all</button></div><div class="carousel" id="bogoCarousel"></div></div>`;
    const car = recipesEl.querySelector("#bogoCarousel");
    results.forEach(x => car.appendChild(Recipes.card(x, { highlightKeys: keys })));
    recipesEl.querySelector("[data-all]").addEventListener("click", openRecipesWithDeals);
  }

  // ---------- events ----------
  searchEl.addEventListener("input", () => { state.search = searchEl.value; renderList(); });
  catsEl.addEventListener("click", e => { const c = e.target.closest("[data-c]"); if (!c) return; state.cat = c.dataset.c; renderCats(); renderList(); });
  moreBtn.addEventListener("click", () => {
    const body = App.el(`<div class="list tight">
      <a class="item" href="${REPO_ACTIONS_URL}" target="_blank" rel="noopener"><span class="lead">🔄</span><span class="body"><span class="title">Run the refresh now</span><span class="meta">Opens the GitHub Actions workflow — press “Run workflow”</span></span></a>
      <button class="item" type="button" data-a="addall"><span class="lead">🛒</span><span class="body"><span class="title">Add all cookable deals to shopping</span><span class="meta">Only deals that match a recipe ingredient</span></span></button>
      <button class="item" type="button" data-a="clear"><span class="lead">🗑️</span><span class="body"><span class="title">Clear this week's deals</span></span></button>
    </div>
    <p class="hint mt-16">Deals come from Publix's weekly ad (via Flipp) for the zip code set in the workflow, every Thursday at 6:30 AM Eastern. ${meta?.source ? `Source: ${esc(meta.source)}.` : ""}</p>`);
    body.addEventListener("click", async e => {
      const b = e.target.closest("[data-a]"); if (!b) return;
      App.sheet.close();
      if (b.dataset.a === "clear" && deals.length && await App.confirm({ title: "Clear all BOGO deals?", text: "They'll come back on the next Thursday refresh.", okLabel: "Clear", danger: true })) {
        const batch = App.batch(); deals.forEach(d => batch.delete(col.doc(d.id))); batch.commit();
      }
      if (b.dataset.a === "addall") {
        let n = 0; deals.forEach(d => { if (Ingredients.keysFor(d.name).some(k => !Ingredients.isStaple(k)) && Shopping.add(d.name, "", { note: "BOGO" })) n++; });
        App.toast(`Added ${App.plural(n, "deal")} to your shopping list.`);
      }
    });
    App.sheet.open({ title: "BOGO deals", body });
  });

  global.Bogo = { init, deals: () => deals, dealKeys };
})(window);
