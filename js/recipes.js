/*
 * Recipes tab: pick ingredients (from your kitchen, this week's BOGOs, or the
 * full catalog) and get ranked recipes with a have/missing breakdown, a
 * scalable detail view, favorites, shopping-list handoff, and a "cooked it"
 * flow that clears used-up groceries.
 */
(function (global) {
  "use strict";
  const App = global.App;
  const Ing = global.Ingredients;
  const Engine = global.RecipeEngine;
  const { escapeHtml: esc, icon } = App;

  const root = document.getElementById("recipesRoot");
  const STAPLES_KEY = "gg-staples-extra";
  const FAV_LS_KEY = "gg-recipe-favorites";
  const FILTERS_KEY = "gg-recipe-filters";

  const state = {
    view: "home",
    selected: [],
    filters: Object.assign({ meal: "", maxTime: 0, diet: "", cuisine: "", requireAll: false, canMakeOnly: false, savedOnly: false, query: "" }, App.lsGet(FILTERS_KEY, {})),
    browseGroup: "protein",
    browseQuery: "",
    showAllKitchen: false,
    showAllBogo: false,
    source: ""
  };
  let favorites = new Set(App.lsGet(FAV_LS_KEY, []));
  let favCol = null;
  let extraStaples = App.lsGet(STAPLES_KEY, Engine.DEFAULT_EXTRA_STAPLES);
  let webResults = null;
  let rendered = false;

  // ---------- derived data ----------
  function kitchenItems() { return global.Groceries ? Groceries.items() : []; }
  function pantryKeys() {
    const names = kitchenItems().filter(i => Groceries.urgency(i) !== "expired").map(i => i.name);
    return Ing.expand(Array.from(Engine.keysForNames(names).keys()));
  }
  function staples() { return Engine.stapleSet(extraStaples); }
  /** key -> { names, urgency } from the kitchen, sorted urgent-first. */
  function kitchenChips() {
    const rank = { expired: 0, today: 1, soon: 2, fresh: 3 };
    const map = new Map();
    kitchenItems().forEach(i => {
      const u = Groceries.urgency(i);
      Ing.keysFor(i.name).forEach(k => {
        if (Ing.isStaple(k)) return;
        const cur = map.get(k) || { key: k, names: [], urgency: "fresh" };
        cur.names.push(i.name);
        if (rank[u] < rank[cur.urgency]) cur.urgency = u;
        map.set(k, cur);
      });
    });
    return Array.from(map.values()).sort((a, b) => rank[a.urgency] - rank[b.urgency] || Ing.label(a.key).localeCompare(Ing.label(b.key)));
  }
  function bogoKeys() { return global.Bogo ? Bogo.dealKeys() : []; }
  function urgentKeys() {
    return Array.from(new Set(kitchenItems().filter(i => ["expired", "today", "soon"].includes(Groceries.urgency(i))).flatMap(i => Ing.keysFor(i.name).filter(k => !Ing.isStaple(k)))));
  }
  function activeFilterCount() { const f = state.filters; return ["meal", "diet", "cuisine"].filter(k => f[k]).length + (f.maxTime ? 1 : 0) + (f.requireAll ? 1 : 0) + (f.canMakeOnly ? 1 : 0) + (f.savedOnly ? 1 : 0); }
  function saveFilters() { App.lsSet(FILTERS_KEY, state.filters); }

  // ---------- favorites ----------
  function initFavorites() {
    favCol = App.col("recipeFavorites");
    if (!favCol) return;
    favCol.onSnapshot(snap => { favorites = new Set(snap.docs.map(d => d.id)); App.lsSet(FAV_LS_KEY, Array.from(favorites)); if (rendered && App.tab === "recipes") render(); }, () => { favCol = null; });
  }
  function toggleFav(id) {
    const on = !favorites.has(id);
    if (on) favorites.add(id); else favorites.delete(id);
    App.lsSet(FAV_LS_KEY, Array.from(favorites));
    if (favCol) { (on ? favCol.doc(id).set({ id, addedAt: new Date().toISOString() }) : favCol.doc(id).delete()).catch(() => {}); }
    App.haptic();
    return on;
  }

  // ---------- selection ----------
  function select(key, on) {
    const i = state.selected.indexOf(key);
    if (on == null) on = i === -1;
    if (on && i === -1) state.selected.push(key);
    if (!on && i !== -1) state.selected.splice(i, 1);
    App.haptic(6);
    webResults = null;
    render();
  }
  function setSelected(keys) { state.selected = Array.from(new Set(keys)); webResults = null; }

  // ---------- public entry points ----------
  function openWithItems(items) {
    const keys = Array.from(new Set(items.flatMap(i => Ing.keysFor(i.name).filter(k => !Ing.isStaple(k)))));
    if (!keys.length) { App.toast("I don't recognize those as recipe ingredients yet."); App.go("recipes"); return; }
    openWithKeys(keys, { source: "kitchen" });
  }
  function openWithKeys(keys, opts) {
    setSelected(keys);
    state.view = "results";
    state.source = (opts && opts.source) || "";
    App.go("recipes");
    render();
  }

  // ---------- rendering ----------
  function render() {
    rendered = true;
    root.innerHTML = "";
    root.appendChild(state.view === "results" ? renderResults() : renderHome());
  }

  function chipHtml(key, extra) {
    const on = state.selected.includes(key);
    return `<button class="chip pick ${on ? "on" : ""}" type="button" data-key="${key}" ${extra && extra.title ? `title="${esc(extra.title)}"` : ""}><span class="em">${Ing.emoji(key)}</span>${esc(Ing.label(key))}${extra && extra.urgency ? `<span class="urg ${extra.urgency}"></span>` : ""}</button>`;
  }

  function pickerBar(compact) {
    const n = state.selected.length;
    const el = App.el(`<div class="picker-bar"><div class="card">
      <div class="sel">${n ? state.selected.map(k => `<button class="chip accent on" type="button" data-rm="${k}">${Ing.emoji(k)} ${esc(Ing.label(k))}<span class="x">✕</span></button>`).join("") : `<span class="placeholder">Tap ingredients below to pick them</span>`}</div>
      ${compact ? `<button class="btn sm" type="button" data-edit>${icon("plus", "sm")} Add</button>` : `<button class="btn sm primary" type="button" data-find ${n ? "" : "disabled"}>${icon("search", "sm")} Find${n ? ` (${n})` : ""}</button>`}
    </div></div>`);
    el.addEventListener("click", e => {
      const rm = e.target.closest("[data-rm]"); if (rm) { select(rm.dataset.rm, false); return; }
      if (e.target.closest("[data-find]")) { state.view = "results"; state.source = ""; render(); window.scrollTo(0, 0); }
      if (e.target.closest("[data-edit]")) { state.view = "home"; render(); }
    });
    return el;
  }

  function renderHome() {
    const wrap = App.el(`<div class="panel"></div>`);
    const urgent = urgentKeys();
    const savedCount = favorites.size;
    wrap.appendChild(App.el(`<div class="page-head"><div><h1>Recipes</h1><p class="lede">${Engine.all().length} real recipes, matched to what you have.</p></div>
      <div class="head-actions"><button class="btn sm ghost" type="button" data-saved>${icon("heart", "sm")} ${savedCount || ""}</button></div></div>`));
    wrap.querySelector("[data-saved]").addEventListener("click", () => { state.filters.savedOnly = true; saveFilters(); state.view = "results"; render(); });

    const hero = App.el(`<div class="hero purple">
      <div class="eyebrow">${icon("sparkle", "sm")} What's for dinner?</div>
      <h2>${urgent.length ? `${urgent.length} ingredient${urgent.length === 1 ? "" : "s"} need using up` : "Cook with what you have"}</h2>
      <p>${urgent.length ? "I'll find recipes built around what's expiring first." : "Pick a few ingredients and I'll rank recipes by how much you already have."}</p>
      <div class="row wrap" style="margin-top:4px">
        ${urgent.length ? `<button class="btn" type="button" data-useup>${icon("flame", "sm")} Use what's expiring</button>` : ""}
        <button class="btn ghost" type="button" data-surprise>${icon("shuffle", "sm")} Surprise me</button>
      </div></div>`);
    const useup = hero.querySelector("[data-useup]");
    if (useup) useup.addEventListener("click", () => { setSelected(urgent.slice(0, 8)); state.view = "results"; state.source = "kitchen"; render(); });
    hero.querySelector("[data-surprise]").addEventListener("click", surprise);
    wrap.appendChild(hero);

    wrap.appendChild(pickerBar(false));

    // In your kitchen
    const kc = kitchenChips();
    const sec1 = App.el(`<div class="section"><div class="section-head"><h2>${icon("kitchen")} In your kitchen <span class="count">${kc.length}</span></h2>${kc.length > 12 ? `<button class="link" type="button" data-more="kitchen">${state.showAllKitchen ? "Show less" : "Show all"}</button>` : ""}</div>
      <div class="chips">${kc.length ? (state.showAllKitchen ? kc : kc.slice(0, 12)).map(c => chipHtml(c.key, { urgency: c.urgency, title: c.names.join(", ") })).join("") : `<p class="hint">Add groceries in the Kitchen tab and they'll show up here, expiring-first.</p>`}</div></div>`);
    wrap.appendChild(sec1);

    // On BOGO
    const bk = bogoKeys();
    if (bk.length) {
      wrap.appendChild(App.el(`<div class="section"><div class="section-head"><h2>${icon("tag")} On BOGO this week <span class="count">${bk.length}</span></h2>${bk.length > 10 ? `<button class="link" type="button" data-more="bogo">${state.showAllBogo ? "Show less" : "Show all"}</button>` : ""}</div>
        <div class="chips">${(state.showAllBogo ? bk : bk.slice(0, 10)).map(k => chipHtml(k)).join("")}</div></div>`));
    }

    // Browse all
    const groups = Ing.GROUPS;
    const q = state.browseQuery.trim().toLowerCase();
    const browseList = q
      ? Ing.CATALOG.filter(e => !e.staple && (e.label.toLowerCase().includes(q) || e.match.some(m => m.includes(q))))
      : Ing.CATALOG.filter(e => e.group === state.browseGroup && !e.staple);
    const sec3 = App.el(`<div class="section"><div class="section-head"><h2>${icon("search")} All ingredients</h2></div>
      <div class="search"><svg class="ic"><use href="#i-search"/></svg><input type="search" id="browseQ" placeholder="Search ingredients" value="${esc(state.browseQuery)}" autocomplete="off"></div>
      <div class="chips scroll mt-8" data-groups>${groups.map(g => `<button class="chip ${!q && g.id === state.browseGroup ? "on" : ""}" type="button" data-g="${g.id}"><span class="em">${g.emoji}</span>${g.label}</button>`).join("")}</div>
      <div class="chips mt-8">${browseList.map(e => chipHtml(e.key)).join("") || `<p class="hint">No ingredients match.</p>`}</div></div>`);
    const bq = sec3.querySelector("#browseQ");
    bq.addEventListener("input", App.debounce(() => { state.browseQuery = bq.value; const pos = window.scrollY; render(); window.scrollTo(0, pos); const nb = root.querySelector("#browseQ"); if (nb) { nb.focus(); nb.setSelectionRange(nb.value.length, nb.value.length); } }, 150));
    sec3.querySelector("[data-groups]").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (!b) return; state.browseGroup = b.dataset.g; state.browseQuery = ""; const pos = window.scrollY; render(); window.scrollTo(0, pos); });
    wrap.appendChild(sec3);

    // Tonight's picks
    const picks = Engine.picks({ urgentKeys: urgent, pantry: pantryKeys(), staples: staples(), limit: 8 });
    if (picks.length && kitchenItems().length) {
      const sec4 = App.el(`<div class="section"><div class="section-head"><h2>${icon("flame")} Tonight's picks</h2><span class="hint">Based on your kitchen</span></div><div class="carousel"></div></div>`);
      const car = sec4.querySelector(".carousel");
      picks.forEach(x => car.appendChild(card(x, {})));
      wrap.appendChild(sec4);
    }

    wrap.appendChild(App.el(`<div class="section"><button class="btn block ghost" type="button" data-staples>${icon("filter", "sm")} Pantry staples I always have (${extraStaples.length})</button></div>`));
    wrap.querySelector("[data-staples]").addEventListener("click", openStaples);

    wrap.addEventListener("click", e => {
      const chip = e.target.closest("[data-key]"); if (chip) { select(chip.dataset.key); return; }
      const more = e.target.closest("[data-more]"); if (more) { if (more.dataset.more === "kitchen") state.showAllKitchen = !state.showAllKitchen; else state.showAllBogo = !state.showAllBogo; const pos = window.scrollY; render(); window.scrollTo(0, pos); }
    });
    return wrap;
  }

  function currentResults() {
    return Engine.search({ selected: state.selected, pantry: pantryKeys(), staples: staples(), filters: state.filters, favorites });
  }

  function renderResults() {
    const wrap = App.el(`<div class="panel"></div>`);
    const results = currentResults();
    const f = state.filters;
    const n = results.length;
    const fc = activeFilterCount();
    const title = f.savedOnly ? "Saved recipes" : state.selected.length ? `${n} recipe${n === 1 ? "" : "s"}` : `All ${n} recipes`;
    const sub = state.selected.length ? `using ${state.selected.map(k => Ing.label(k).toLowerCase()).join(", ")}` : (f.savedOnly ? `${n} saved` : "ranked by what you already have");
    wrap.appendChild(App.el(`<div class="results-head">
      <button class="icon-btn" type="button" data-back aria-label="Back">${icon("back")}</button>
      <div class="grow"><h2>${esc(title)}</h2><p class="hint">${esc(sub)}</p></div>
      <button class="icon-btn ${fc ? "on" : ""}" type="button" data-filters aria-label="Filters">${icon("filter")}</button>
    </div>`));
    wrap.querySelector("[data-back]").addEventListener("click", () => { state.view = "home"; if (f.savedOnly) { f.savedOnly = false; saveFilters(); } render(); });
    wrap.querySelector("[data-filters]").addEventListener("click", openFilters);

    if (!f.savedOnly) wrap.appendChild(pickerBar(true));

    const quick = App.el(`<div class="chips scroll mt-8">
      ${state.selected.length > 1 ? `<button class="chip ${f.requireAll ? "on" : ""}" type="button" data-q="requireAll">Use all ${state.selected.length}</button>` : ""}
      <button class="chip ${f.canMakeOnly ? "on" : ""}" type="button" data-q="canMakeOnly">✓ Can make now</button>
      <button class="chip ${f.savedOnly ? "on" : ""}" type="button" data-q="savedOnly">${icon("heart", "sm")} Saved</button>
      ${["breakfast", "lunch", "dinner", "snack", "dessert"].map(m => `<button class="chip ${f.meal === m ? "on" : ""}" type="button" data-meal="${m}">${m[0].toUpperCase() + m.slice(1)}</button>`).join("")}
      <button class="chip ${f.maxTime === 30 ? "on" : ""}" type="button" data-time="30">${icon("clock", "sm")} ≤30 min</button>
    </div>`);
    quick.addEventListener("click", e => {
      const q = e.target.closest("[data-q]"); if (q) { f[q.dataset.q] = !f[q.dataset.q]; }
      const m = e.target.closest("[data-meal]"); if (m) f.meal = f.meal === m.dataset.meal ? "" : m.dataset.meal;
      const t = e.target.closest("[data-time]"); if (t) f.maxTime = f.maxTime === 30 ? 0 : 30;
      if (q || m || t) { saveFilters(); const pos = window.scrollY; render(); window.scrollTo(0, pos); }
    });
    wrap.appendChild(quick);

    if (!results.length) {
      wrap.appendChild(App.el(`<div class="empty fade-in"><div class="em">🥲</div><h3>No recipes match</h3><p>${f.requireAll ? "Try turning off “Use all” — most recipes use two or three of your picks." : fc ? "Try clearing a filter or two." : "Try removing an ingredient, or search the web below."}</p>${fc ? `<button class="btn" type="button" data-reset>Clear filters</button>` : ""}</div>`));
      const r = wrap.querySelector("[data-reset]"); if (r) r.addEventListener("click", () => { resetFilters(); render(); });
    } else {
      const grid = App.el(`<div class="rgrid mt-12"></div>`);
      results.forEach(x => grid.appendChild(card(x, {})));
      wrap.appendChild(grid);
    }

    if (state.selected.length && !f.savedOnly) wrap.appendChild(renderWebSection());
    return wrap;
  }

  /** Shared recipe card (also used by the BOGO tab). */
  function card(x, opts) {
    const r = x.recipe, m = x.m;
    const usesLabels = m.used.map(k => Ing.label(k).toLowerCase());
    const missLabels = m.missing.map(i => Ing.label(i.keys[0]).toLowerCase());
    const veg = (r.diet || []).includes("vegetarian") || (r.diet || []).includes("vegan");
    const el = App.el(`<button class="rcard fade-in" type="button">
      <div class="tile ${r.tile}">${r.emoji}${favorites.has(r.id) ? `<span class="fav">♥</span>` : ""}</div>
      <div class="body">
        <div class="name">${esc(r.name)}</div>
        <div class="desc">${esc(r.desc)}</div>
        <div class="meta"><span class="pill">${icon("clock", "sm")} ${r.time >= 60 ? `${Math.round(r.time / 60 * 10) / 10} hr` : r.time + " min"}</span><span class="pill">${esc(r.cuisine)}</span>${veg ? `<span class="pill accent">${icon("leaf", "sm")} Veg</span>` : ""}</div>
        <div class="match">${usesLabels.length ? `<span class="have">Uses ${esc(usesLabels.slice(0, 4).join(", "))}${usesLabels.length > 4 ? ` +${usesLabels.length - 4}` : ""}</span>` : ""}${m.canMake ? `<span class="have">✓ You have everything</span>` : `<span class="miss">Missing ${m.missing.length}: ${esc(missLabels.slice(0, 3).join(", "))}${missLabels.length > 3 ? "…" : ""}</span>`}</div>
      </div></button>`);
    el.addEventListener("click", () => openDetail(r));
    return el;
  }

  // ---------- detail ----------
  function openDetail(r) {
    let servings = r.servings;
    const pantry = pantryKeys(), st = staples();
    const m = Engine.match(r, state.selected, pantry, st);
    const doneSteps = new Set();
    const checked = new Set();

    const body = App.el(`<div>
      <div class="rhero ${r.tile}">${r.emoji}</div>
      <p class="mt-12" style="font-size:0.95rem;color:var(--text-2)">${esc(r.desc)}</p>
      <div class="rmeta">
        <span class="pill">${icon("clock", "sm")} ${r.time >= 60 ? `${Math.round(r.time / 60 * 10) / 10} hr` : r.time + " min"}</span>
        <span class="pill">${esc(r.cuisine)}</span>
        <span class="pill">${r.difficulty === "easy" ? "Easy" : "Medium"}</span>
        ${(r.diet || []).filter(d => !d.endsWith("-option")).map(d => `<span class="pill accent">${esc(d.replace("-", " "))}</span>`).join("")}
        ${(r.tags || []).filter(t => !(r.diet || []).includes(t)).slice(0, 3).map(t => `<span class="pill">${esc(t.replace(/-/g, " "))}</span>`).join("")}
      </div>
      <div class="sheet-section">
        <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:8px"><h3 style="margin:0">Ingredients</h3><div class="stepper"><button type="button" data-sv="-1">−</button><span id="svLabel"></span><button type="button" data-sv="1">+</button></div></div>
        <p class="hint" id="haveLine"></p>
        <div class="ing-list mt-8" id="ingList"></div>
        <div id="missWrap" class="mt-12"></div>
      </div>
      <div class="sheet-section"><h3>Steps</h3><div class="steps" id="steps">${r.steps.map(s => `<div class="step" tabindex="0"><span>${esc(s)}</span></div>`).join("")}</div></div>
      ${r.tip ? `<div class="sheet-section"><div class="tip"><span class="em">💡</span><span>${esc(r.tip)}</span></div></div>` : ""}
    </div>`);

    const ingList = body.querySelector("#ingList"), svLabel = body.querySelector("#svLabel"), haveLine = body.querySelector("#haveLine"), missWrap = body.querySelector("#missWrap");
    function renderIngs() {
      const factor = servings / r.servings;
      svLabel.textContent = `${servings} serving${servings === 1 ? "" : "s"}`;
      ingList.innerHTML = r.ing.map((i, idx) => {
        const status = i.optional ? "opt" : m.have.includes(i) ? "have" : m.staples.includes(i) ? "staple" : "miss";
        const mark = status === "have" ? `<span class="mark have">✓</span>` : status === "staple" ? `<span class="mark staple">•</span>` : status === "opt" ? `<span class="mark staple">+</span>` : `<span class="mark miss">${icon("cart", "sm")}</span>`;
        return `<div class="ing ${status} ${checked.has(idx) ? "checked" : ""}" data-i="${idx}">${mark}<span class="t" style="${checked.has(idx) ? "text-decoration:line-through;opacity:0.5" : ""}"><span class="q">${esc(Engine.scaleQty(i.qty, factor))}</span>${esc(i.text)}${i.optional ? ` <span class="opt">optional</span>` : ""}</span></div>`;
      }).join("");
      haveLine.innerHTML = m.canMake
        ? `<span class="hint ok">✓ You have everything${m.staples.length ? ` (assuming ${m.staples.length} pantry staple${m.staples.length === 1 ? "" : "s"})` : ""}.</span>`
        : `You have ${m.have.length} of ${m.total} · <b>${m.missing.length} to buy</b>${m.staples.length ? ` · ${m.staples.length} staples assumed` : ""}`;
      missWrap.innerHTML = m.missing.length ? `<button class="btn block" type="button" data-addmiss>${icon("list-plus", "sm")} Add ${m.missing.length} missing to shopping list</button>` : "";
    }
    renderIngs();
    body.addEventListener("click", e => {
      const sv = e.target.closest("[data-sv]"); if (sv) { servings = Math.max(1, servings + Number(sv.dataset.sv)); renderIngs(); return; }
      const ing = e.target.closest(".ing"); if (ing) { const i = Number(ing.dataset.i); if (checked.has(i)) checked.delete(i); else checked.add(i); renderIngs(); return; }
      const step = e.target.closest(".step"); if (step) { step.classList.toggle("done"); return; }
      if (e.target.closest("[data-addmiss]")) {
        const factor = servings / r.servings;
        let n = 0;
        m.missing.forEach(i => { if (global.Shopping && Shopping.add(Ing.label(i.keys[0]), Engine.scaleQty(i.qty, factor), { note: r.name })) n++; });
        App.toast(n ? `Added ${App.plural(n, "ingredient")} to your shopping list.` : "Those are already on your list.", n ? { label: "View", onClick: () => { App.sheet.close(); App.go("shopping"); } } : undefined);
      }
    });

    const foot = App.el(`<div style="display:flex;gap:8px;width:100%">
      <button class="btn ${favorites.has(r.id) ? "danger" : ""}" type="button" data-fav style="flex:0 0 auto">${icon("heart", "sm")} ${favorites.has(r.id) ? "Saved" : "Save"}</button>
      <button class="btn" type="button" data-share style="flex:0 0 auto">${icon("share", "sm")}</button>
      <button class="btn primary" type="button" data-cooked>${icon("check", "sm")} Cooked it</button>
    </div>`);
    foot.querySelector("[data-fav]").addEventListener("click", e => { const on = toggleFav(r.id); e.currentTarget.className = `btn ${on ? "danger" : ""}`; e.currentTarget.innerHTML = `${icon("heart", "sm")} ${on ? "Saved" : "Save"}`; });
    foot.querySelector("[data-share]").addEventListener("click", () => shareRecipe(r));
    foot.querySelector("[data-cooked]").addEventListener("click", () => cookedIt(r));

    App.sheet.open({ title: r.name, body, foot, tall: true, onClose: () => { if (rendered && App.tab === "recipes") render(); } });
  }

  function shareRecipe(r) {
    const text = `${r.name}\n${r.desc}\n\nIngredients:\n${r.ing.map(i => `• ${i.qty ? i.qty + " " : ""}${i.text}${i.optional ? " (optional)" : ""}`).join("\n")}\n\nSteps:\n${r.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}${r.tip ? `\n\nTip: ${r.tip}` : ""}\n\n— Grocery Glance`;
    if (navigator.share) navigator.share({ title: r.name, text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => App.toast("Recipe copied to clipboard.")).catch(() => App.toast("Couldn't copy."));
  }

  function cookedIt(r) {
    const used = kitchenItems().filter(i => { const ks = Ing.expand(Ing.keysFor(i.name)); return r.ing.some(ing => !ing.optional && ing.keys.some(k => ks.has(k))); });
    if (!used.length) { App.toast("Enjoy! Nothing in your kitchen matched this recipe's ingredients."); App.sheet.close(); return; }
    const picked = new Set(used.map(i => i.id));
    const body = App.el(`<div><p class="hint">Which of these did you finish? I'll mark them eaten.</p><div class="list tight mt-12">${used.map(i => `<button class="item selected" type="button" data-id="${i.id}"><span class="checkbox">${icon("check")}</span><span class="body"><span class="title">${esc(i.name)}</span><span class="meta">${esc(App.expiryNote(App.effectiveExpiry(i)))}</span></span></button>`).join("")}</div></div>`);
    body.addEventListener("click", e => { const b = e.target.closest("[data-id]"); if (!b) return; const id = b.dataset.id; if (picked.has(id)) picked.delete(id); else picked.add(id); b.classList.toggle("selected", picked.has(id)); foot.querySelector("button").textContent = `Mark ${picked.size} eaten`; });
    const foot = App.el(`<div style="display:flex;gap:8px;width:100%"><button class="btn primary" type="button">Mark ${picked.size} eaten</button></div>`);
    foot.querySelector("button").addEventListener("click", () => {
      const items = used.filter(i => picked.has(i.id));
      items.forEach(i => Groceries.remove(i.id).catch(() => {}));
      App.sheet.close();
      App.haptic(15);
      App.toast(items.length ? `${r.name} — done! Cleared ${App.plural(items.length, "item")}.` : `${r.name} — done!`, items.length ? { label: "Undo", onClick: () => items.forEach(i => Groceries.upsert(i)) } : undefined);
    });
    App.sheet.open({ title: "Cooked it 🎉", body, foot });
  }

  function surprise() {
    const res = Engine.search({ selected: [], pantry: pantryKeys(), staples: staples(), filters: { meal: state.filters.meal, diet: state.filters.diet } });
    const pool = res.filter(x => x.m.canMake).length >= 3 ? res.filter(x => x.m.canMake) : res.slice(0, 25);
    if (!pool.length) return;
    openDetail(pool[Math.floor(Math.random() * pool.length)].recipe);
  }

  // ---------- filters & staples sheets ----------
  function resetFilters() { state.filters = { meal: "", maxTime: 0, diet: "", cuisine: "", requireAll: false, canMakeOnly: false, savedOnly: false, query: "" }; saveFilters(); }
  function openFilters() {
    const f = state.filters;
    const group = (name, label, opts) => `<div class="sheet-section"><h3>${label}</h3><div class="chips">${opts.map(o => `<button class="chip ${String(f[name]) === String(o.v) ? "on" : ""}" type="button" data-f="${name}" data-v="${esc(String(o.v))}">${o.l}</button>`).join("")}</div></div>`;
    const body = App.el(`<div>
      ${group("meal", "Meal", [{ v: "", l: "Any" }, { v: "breakfast", l: "Breakfast" }, { v: "lunch", l: "Lunch" }, { v: "dinner", l: "Dinner" }, { v: "snack", l: "Snack" }, { v: "dessert", l: "Dessert" }])}
      ${group("maxTime", "Total time", [{ v: 0, l: "Any" }, { v: 20, l: "≤ 20 min" }, { v: 30, l: "≤ 30 min" }, { v: 45, l: "≤ 45 min" }, { v: 60, l: "≤ 1 hour" }])}
      ${group("diet", "Diet", [{ v: "", l: "Any" }, { v: "vegetarian", l: "🌱 Vegetarian" }, { v: "vegan", l: "Vegan" }, { v: "gluten-free", l: "Gluten-free" }, { v: "dairy-free", l: "Dairy-free" }, { v: "low-carb", l: "Low-carb" }])}
      <div class="sheet-section"><h3>Cuisine</h3><select class="select" id="fCuisine"><option value="">Any cuisine</option>${Engine.cuisines().map(c => `<option value="${esc(c)}" ${f.cuisine === c ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
      <div class="sheet-section"><h3>Matching</h3>
        <label class="switch" style="display:flex;justify-content:space-between;padding:8px 0"><span>Only recipes I can make right now</span><input type="checkbox" id="fCan" ${f.canMakeOnly ? "checked" : ""}><span class="track"></span></label>
        <label class="switch" style="display:flex;justify-content:space-between;padding:8px 0"><span>Must use every selected ingredient</span><input type="checkbox" id="fAll" ${f.requireAll ? "checked" : ""}><span class="track"></span></label>
      </div>
      <div class="sheet-section"><button class="btn block ghost" type="button" data-staples>${icon("filter", "sm")} Pantry staples I always have</button></div>
    </div>`);
    const rerender = () => { saveFilters(); if (state.view === "results") { const pos = window.scrollY; render(); window.scrollTo(0, pos); } };
    body.addEventListener("click", e => {
      const b = e.target.closest("[data-f]"); if (b) { const name = b.dataset.f; f[name] = name === "maxTime" ? Number(b.dataset.v) : b.dataset.v; body.querySelectorAll(`[data-f="${name}"]`).forEach(c => c.classList.toggle("on", c.dataset.v === b.dataset.v)); rerender(); }
      if (e.target.closest("[data-staples]")) openStaples();
    });
    body.querySelector("#fCuisine").addEventListener("change", e => { f.cuisine = e.target.value; rerender(); });
    body.querySelector("#fCan").addEventListener("change", e => { f.canMakeOnly = e.target.checked; rerender(); });
    body.querySelector("#fAll").addEventListener("change", e => { f.requireAll = e.target.checked; rerender(); });
    const foot = App.el(`<div style="display:flex;gap:8px;width:100%"><button class="btn" type="button" data-reset>Reset</button><button class="btn primary" type="button" data-done>Show results</button></div>`);
    foot.querySelector("[data-reset]").addEventListener("click", () => { resetFilters(); App.sheet.close(); render(); });
    foot.querySelector("[data-done]").addEventListener("click", () => App.sheet.close());
    App.sheet.open({ title: "Filters", body, foot });
  }

  function openStaples() {
    const always = Ing.CATALOG.filter(e => e.staple);
    const body = App.el(`<div>
      <p class="hint">Staples are never counted as “missing”. Salt, oil, and dried spices are always assumed; toggle the rest to match your kitchen.</p>
      <div class="chips mt-12" data-extra>${Engine.STAPLE_CANDIDATES.map(k => `<button class="chip pick ${extraStaples.includes(k) ? "on" : ""}" type="button" data-k="${k}"><span class="em">${Ing.emoji(k)}</span>${esc(Ing.label(k))}</button>`).join("")}</div>
      <div class="sheet-section"><h3>Always assumed</h3><div class="chips">${always.map(e => `<span class="chip" style="opacity:0.7">${e.emoji} ${esc(e.label)}</span>`).join("")}</div></div>
    </div>`);
    body.querySelector("[data-extra]").addEventListener("click", e => {
      const b = e.target.closest("[data-k]"); if (!b) return;
      const k = b.dataset.k;
      extraStaples = extraStaples.includes(k) ? extraStaples.filter(x => x !== k) : [...extraStaples, k];
      App.lsSet(STAPLES_KEY, extraStaples);
      b.classList.toggle("on");
    });
    App.sheet.open({ title: "Pantry staples", body, onClose: () => { if (App.tab === "recipes") render(); } });
  }

  // ---------- web supplement (TheMealDB) ----------
  const MEALDB = "https://www.themealdb.com/api/json/v1/1/";
  const MEALDB_TERMS = { chicken: "Chicken", "ground-beef": "Minced Beef", beef: "Beef", pork: "Pork", bacon: "Bacon", sausage: "Sausages", shrimp: "Prawns", salmon: "Salmon", "white-fish": "Cod", tuna: "Tuna", eggs: "Eggs", tofu: "Tofu", potato: "Potatoes", tomato: "Tomatoes", onion: "Onion", garlic: "Garlic", rice: "Rice", pasta: "Spaghetti", broccoli: "Broccoli", spinach: "Spinach", mushroom: "Mushrooms", cheese: "Cheese", cheddar: "Cheddar Cheese", mozzarella: "Mozzarella", milk: "Milk", butter: "Butter", lemon: "Lemon", lime: "Lime", chickpeas: "Chickpeas", lentils: "Lentils", carrot: "Carrots", "bell-pepper": "Red Pepper", zucchini: "Zucchini", eggplant: "Egg Plants", avocado: "Avocado", "coconut-milk": "Coconut Milk", banana: "Banana", apple: "Apples", yogurt: "Greek Yogurt", beans: "Kidney Beans", "black-beans": "Black Beans", corn: "Corn", peas: "Peas", cabbage: "Cabbage", kale: "Kale", cauliflower: "Cauliflower", "sweet-potato": "Sweet Potatoes", ham: "Ham", turkey: "Turkey", lamb: "Lamb", "canned-tomatoes": "Chopped Tomatoes", "tomato-sauce": "Passata", tortilla: "Tortillas", bread: "Bread", oats: "Oats", chocolate: "Dark Chocolate", "peanut-butter": "Peanut Butter", honey: "Honey", "green-onion": "Spring Onions", ginger: "Ginger", "heavy-cream": "Double Cream", feta: "Feta", parmesan: "Parmesan", pesto: "Pesto", "curry-paste": "Curry Powder", asparagus: "Asparagus", "green-beans": "Green Beans", cucumber: "Cucumber", lettuce: "Lettuce", "hot-dog": "Hotdogs", "cream-cheese": "Cream Cheese", ricotta: "Ricotta", quinoa: "Quinoa", "sour-cream": "Sour Cream" };

  function renderWebSection() {
    const sec = App.el(`<div class="section"><div class="section-head"><h2>${icon("external")} More from the web</h2><span class="hint">TheMealDB</span></div><div id="webBody"></div></div>`);
    const bodyEl = sec.querySelector("#webBody");
    if (webResults === null) {
      bodyEl.innerHTML = `<button class="btn block ghost" type="button">${icon("search", "sm")} Search the web for these ingredients</button>`;
      bodyEl.querySelector("button").addEventListener("click", async () => {
        bodyEl.innerHTML = `<div class="stack"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`;
        try { webResults = await webSearch(); } catch (e) { webResults = []; }
        const pos = window.scrollY; render(); window.scrollTo(0, pos);
      });
    } else if (!webResults.length) {
      bodyEl.innerHTML = `<p class="hint">Nothing found online for that combination (or you're offline).</p>`;
    } else {
      const grid = App.el(`<div class="rgrid"></div>`);
      webResults.forEach(w => {
        const el = App.el(`<button class="rcard web-card" type="button"><div class="tile"><img src="${esc(w.thumb)}/preview" alt="" loading="lazy"></div><div class="body"><div class="name">${esc(w.name)}</div><div class="match"><span class="have">Uses ${esc(w.matched.join(", "))}</span></div><div class="meta"><span class="pill">TheMealDB</span></div></div></button>`);
        el.addEventListener("click", () => openWebDetail(w));
        grid.appendChild(el);
      });
      bodyEl.appendChild(grid);
    }
    return sec;
  }

  async function webSearch() {
    const terms = state.selected.slice(0, 5).map(k => ({ key: k, term: MEALDB_TERMS[k] || Ing.label(k).split(" / ")[0] }));
    const results = await Promise.all(terms.map(async t => {
      try { const res = await fetch(MEALDB + "filter.php?i=" + encodeURIComponent(t.term.replace(/\s+/g, "_"))); const data = await res.json(); return (data.meals || []).slice(0, 40); } catch (e) { return []; }
    }));
    const map = new Map();
    results.forEach((meals, i) => meals.forEach(m => {
      if (!map.has(m.idMeal)) map.set(m.idMeal, { id: m.idMeal, name: m.strMeal, thumb: m.strMealThumb, matched: [] });
      map.get(m.idMeal).matched.push(Ing.label(terms[i].key).toLowerCase());
    }));
    return Array.from(map.values()).sort((a, b) => b.matched.length - a.matched.length || a.name.localeCompare(b.name)).slice(0, 12);
  }

  async function openWebDetail(w) {
    const body = App.el(`<div><div class="rhero"><img src="${esc(w.thumb)}" alt=""></div><div class="stack mt-12"><div class="skeleton"></div><div class="skeleton"></div></div></div>`);
    App.sheet.open({ title: w.name, body, tall: true });
    try {
      const res = await fetch(MEALDB + "lookup.php?i=" + encodeURIComponent(w.id));
      const meal = ((await res.json()).meals || [])[0];
      if (!meal) throw new Error("no meal");
      const ings = [];
      for (let i = 1; i <= 20; i++) { const n = meal["strIngredient" + i], q = meal["strMeasure" + i]; if (n && n.trim()) ings.push(`${q && q.trim() ? q.trim() + " " : ""}${n.trim()}`); }
      const steps = (meal.strInstructions || "").split(/\r?\n+/).map(s => s.trim()).filter(s => s.length > 3);
      body.innerHTML = `<div class="rhero"><img src="${esc(w.thumb)}" alt=""></div>
        <div class="rmeta">${meal.strArea ? `<span class="pill">${esc(meal.strArea)}</span>` : ""}${meal.strCategory ? `<span class="pill">${esc(meal.strCategory)}</span>` : ""}${meal.strYoutube ? `<a class="pill blue" href="${esc(meal.strYoutube)}" target="_blank" rel="noopener">▶ Video</a>` : ""}${meal.strSource ? `<a class="pill" href="${esc(meal.strSource)}" target="_blank" rel="noopener">Source ↗</a>` : ""}</div>
        <div class="sheet-section"><h3>Ingredients</h3><div class="ing-list">${ings.map(i => `<div class="ing"><span class="mark staple">•</span><span class="t">${esc(i)}</span></div>`).join("")}</div></div>
        <div class="sheet-section"><h3>Steps</h3><div class="steps">${steps.map(s => `<div class="step"><span>${esc(s)}</span></div>`).join("")}</div></div>`;
    } catch (e) { body.innerHTML = `<p class="hint">Couldn't load this recipe.</p>`; }
  }

  // ---------- init ----------
  function init() {
    initFavorites();
    App.on("tab", ({ tab }) => { if (tab === "recipes") render(); });
    App.on("groceries", () => { if (App.tab === "recipes" && !App.sheet.isOpen()) { const pos = window.scrollY; render(); window.scrollTo(0, pos); } });
    App.on("bogo", () => { if (App.tab === "recipes" && !App.sheet.isOpen()) { const pos = window.scrollY; render(); window.scrollTo(0, pos); } });
  }

  global.Recipes = { init, render, openWithItems, openWithKeys, openDetail, card, pantryKeys, staples, favorites: () => favorites };
})(window);
