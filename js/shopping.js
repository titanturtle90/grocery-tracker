/*
 * Shopping tab. Firestore collection "shoppingList" (id, name, qty, location, addedAt, note?).
 * Checking an item off moves it into the kitchen with an estimated shelf life.
 */
(function (global) {
  "use strict";
  const App = global.App;
  const { escapeHtml: esc, icon } = App;

  let list = [];
  let col = null;
  let selectMode = false;
  const selected = new Set();
  let actionbar = null;

  const listEl = document.getElementById("shopList");
  const form = document.getElementById("shopForm");
  const nameEl = document.getElementById("shopName");
  const qtyEl = document.getElementById("shopQty");
  const selectBtn = document.getElementById("shopSelectBtn");
  const moreBtn = document.getElementById("shopMoreBtn");
  const ledeEl = document.getElementById("shopLede");

  const MEMORY_KEY = "grocery-tracker-item-locations-v1";
  const SECTION_ORDER = global.StoreSections ? StoreSections.SECTION_ORDER : [];
  const norm = s => String(s || "").trim().toLowerCase();

  function memory() { return App.lsGet(MEMORY_KEY, {}); }
  function remember(name, loc) { const m = memory(); if (loc) m[norm(name)] = loc; else delete m[norm(name)]; App.lsSet(MEMORY_KEY, m); }
  function guessLocation(name) { return memory()[norm(name)] || (global.StoreSections && StoreSections.lookup(name)) || ""; }

  function sectionKey(loc) {
    if (!loc) return [3, 0, ""];
    const idx = SECTION_ORDER.findIndex(s => s.toLowerCase() === loc.trim().toLowerCase());
    if (idx !== -1) return [0, idx, ""];
    const n = loc.match(/\d+/);
    if (n) return [1, parseInt(n[0], 10), loc.toLowerCase()];
    return [2, 0, loc.toLowerCase()];
  }

  function init() {
    col = App.col("shoppingList");
    if (!col) { listEl.innerHTML = `<div class="empty"><div class="em">🔌</div><h3>Not connected</h3></div>`; return; }
    col.onSnapshot(snap => { list = snap.docs.map(d => d.data()); render(); App.emit("shopping", list); }, err => {
      console.error("shoppingList sync error", err);
      listEl.innerHTML = `<div class="empty"><div class="em">⚠️</div><h3>Can't sync</h3><p>${err.code === "permission-denied" ? 'Add a "shoppingList" rule to your Firestore rules.' : "Check your connection."}</p></div>`;
    });
  }

  function add(name, qty, extra) {
    name = String(name || "").trim();
    if (!name || !col) return false;
    const existing = list.find(i => norm(i.name) === norm(name));
    if (existing) return false;
    const item = { id: App.genId(), name, qty: qty || "", location: guessLocation(name), addedAt: new Date().toISOString(), ...(extra || {}) };
    col.doc(item.id).set(item).catch(() => {});
    return true;
  }
  function has(name) { return list.some(i => norm(i.name) === norm(name)); }

  function render() {
    App.setBadge("shopping", list.length, true);
    ledeEl.textContent = list.length ? `${App.plural(list.length, "item")} to pick up` : "Grouped by where it is in the store.";
    if (list.length === 0) {
      listEl.innerHTML = `<div class="empty fade-in"><div class="em">🛍️</div><h3>Nothing to buy</h3><p>Add items above, or tap a BOGO deal to drop it here.</p></div>`;
      return;
    }
    const groups = new Map();
    list.forEach(i => { const k = i.location || ""; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(i); });
    const keys = Array.from(groups.keys()).sort((a, b) => { const ka = sectionKey(a), kb = sectionKey(b); return ka[0] - kb[0] || ka[1] - kb[1] || ka[2].localeCompare(kb[2]); });
    const frag = document.createDocumentFragment();
    keys.forEach(k => {
      frag.appendChild(App.el(`<h2 class="group-title">${icon("store", "sm")} ${esc(k || "Unsorted")}<span class="n">${groups.get(k).length}</span></h2>`));
      const wrap = App.el(`<div class="list tight"></div>`);
      groups.get(k).sort((a, b) => a.name.localeCompare(b.name)).forEach(i => wrap.appendChild(row(i)));
      frag.appendChild(wrap);
    });
    listEl.innerHTML = "";
    listEl.appendChild(frag);
  }

  function row(item) {
    const el = App.el(`<div class="item ${selectMode && selected.has(item.id) ? "selected" : ""}" data-id="${item.id}">
      <button class="checkbox" type="button" aria-label="${selectMode ? "Select" : "Picked it up"}">${icon("check")}</button>
      <span class="body"><span class="title">${esc(item.name)}</span><span class="meta">${item.qty ? `<span>${esc(item.qty)}</span>` : ""}${item.note ? `<span class="pill accent">${esc(item.note)}</span>` : ""}</span></span>
      <button class="pill ${item.location ? "" : ""}" type="button" data-loc style="${item.location ? "" : "opacity:0.6"}">${icon("store", "sm")} ${esc(item.location || "Set aisle")}</button>
    </div>`);
    el.querySelector(".checkbox").addEventListener("click", e => { e.stopPropagation(); if (selectMode) toggleSelect(item.id, el); else pickUp(item, el); });
    el.querySelector("[data-loc]").addEventListener("click", e => { e.stopPropagation(); if (selectMode) { toggleSelect(item.id, el); return; } pickLocation(item); });
    el.addEventListener("click", () => { if (selectMode) toggleSelect(item.id, el); else openDetail(item); });
    return el;
  }

  function pickUp(item, el) {
    if (!col) return;
    App.haptic(12);
    if (el) el.classList.add("checked");
    col.doc(item.id).delete().catch(() => {});
    const match = global.ShelfLifeDB ? ShelfLifeDB.lookup(item.name) : null;
    const storage = match ? match.defaultStorage : "fridge";
    const days = match ? ShelfLifeDB.daysFor(match, storage) : 7;
    const grocery = { id: App.genId(), name: item.name, qty: item.qty || "", category: (global.GroceryCategories && GroceryCategories.lookup(item.name)) || "Other", storage, expiry: App.addDays(days), noExpiration: false, openedAt: null, addedAt: new Date().toISOString() };
    if (global.Groceries) Groceries.upsert(grocery).catch(() => {});
    App.toast(`${item.name} → kitchen${match ? ` (${days}-day shelf life)` : ""}`, { label: "Undo", onClick: () => { col.doc(item.id).set(item).catch(() => {}); if (global.Groceries) Groceries.remove(grocery.id).catch(() => {}); } });
  }

  function setLocation(item, loc) {
    if (!col) return;
    col.doc(item.id).set({ location: loc }, { merge: true }).catch(() => {});
    remember(item.name, loc);
  }

  function pickLocation(item, onDone) {
    const options = (global.StoreSections && StoreSections.LOCATION_OPTIONS) || [];
    const body = App.el(`<div>
      <div class="chips" id="locChips">${options.map(o => `<button class="chip ${o === item.location ? "on" : ""}" type="button" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>
      <div class="row mt-16"><input class="input grow" id="locCustom" placeholder="Custom (e.g. Aisle 14, Pharmacy)"><button class="btn" id="locSave" type="button">Save</button></div>
      <p class="hint mt-8">I'll remember where you found “${esc(item.name)}” next time.</p>
    </div>`);
    const done = v => { App.sheet.close(); setLocation(item, v); if (onDone) onDone(v); };
    body.querySelector("#locChips").addEventListener("click", e => { const b = e.target.closest("[data-v]"); if (b) done(b.dataset.v); });
    body.querySelector("#locSave").addEventListener("click", () => done(body.querySelector("#locCustom").value.trim()));
    App.sheet.open({ title: "Where in the store?", body });
  }

  function openDetail(item) {
    const body = App.el(`<div>
      <div class="hint">${item.qty ? esc(item.qty) + " · " : ""}${esc(item.location || "No location set")}${item.note ? " · " + esc(item.note) : ""}</div>
      <div class="action-grid mt-16">
        <button class="act accent" data-act="got" type="button">${icon("check")}Got it</button>
        <button class="act" data-act="loc" type="button">${icon("store")}Aisle</button>
        <button class="act" data-act="qty" type="button">${icon("edit")}Qty</button>
        <button class="act danger" data-act="del" type="button">${icon("trash")}Remove</button>
      </div>
    </div>`);
    body.addEventListener("click", e => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      if (b.dataset.act === "got") { App.sheet.close(); pickUp(item); }
      if (b.dataset.act === "loc") pickLocation(item);
      if (b.dataset.act === "del") { App.sheet.close(); col.doc(item.id).delete().catch(() => {}); App.toast(`Removed ${item.name}.`, { label: "Undo", onClick: () => col.doc(item.id).set(item) }); }
      if (b.dataset.act === "qty") {
        const f = App.el(`<form class="stack"><input class="input" id="q" value="${esc(item.qty || "")}" placeholder="e.g. 2 lbs"><button class="btn primary lg" type="submit">Save</button></form>`);
        f.addEventListener("submit", ev => { ev.preventDefault(); col.doc(item.id).set({ qty: f.querySelector("#q").value.trim() }, { merge: true }); App.sheet.close(); });
        App.sheet.open({ title: "Quantity", body: f });
        setTimeout(() => f.querySelector("#q").focus(), 300);
      }
    });
    App.sheet.open({ title: item.name, body });
  }

  // ---------- select mode ----------
  function setSelectMode(on) {
    selectMode = on; selected.clear();
    selectBtn.textContent = on ? "Cancel" : "Select";
    selectBtn.classList.toggle("primary", on);
    updateActionbar(); render();
  }
  function toggleSelect(id, el) { if (selected.has(id)) selected.delete(id); else selected.add(id); el.classList.toggle("selected", selected.has(id)); updateActionbar(); }
  function updateActionbar() {
    if (actionbar) { actionbar.remove(); actionbar = null; }
    if (!selectMode) return;
    actionbar = App.el(`<div class="actionbar"><span class="n">${selected.size} selected</span>
      <button class="btn" data-b="loc" type="button">Aisle</button>
      <button class="btn" data-b="got" type="button">${icon("check", "sm")} Got them</button>
      <button class="btn danger" data-b="del" type="button">${icon("trash", "sm")}</button></div>`);
    if (selected.size === 0) actionbar.querySelectorAll("button").forEach(b => b.disabled = true);
    actionbar.addEventListener("click", async e => {
      const b = e.target.closest("[data-b]"); if (!b) return;
      const picked = list.filter(i => selected.has(i.id));
      if (b.dataset.b === "loc") pickLocation({ name: `${picked.length} items`, location: "" }, v => { const batch = App.batch(); picked.forEach(i => { batch.set(col.doc(i.id), { location: v }, { merge: true }); remember(i.name, v); }); batch.commit(); setSelectMode(false); });
      if (b.dataset.b === "got") { picked.forEach(i => pickUp(i)); setSelectMode(false); }
      if (b.dataset.b === "del") { if (await App.confirm({ title: `Remove ${picked.length} items?`, okLabel: "Remove", danger: true })) { const batch = App.batch(); picked.forEach(i => batch.delete(col.doc(i.id))); batch.commit(); setSelectMode(false); } }
    });
    document.body.appendChild(actionbar);
  }

  // ---------- events ----------
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = nameEl.value.trim();
    if (!name) return;
    if (!add(name, qtyEl.value.trim())) App.toast(`${name} is already on the list.`);
    else App.haptic();
    form.reset(); nameEl.focus();
  });
  selectBtn.addEventListener("click", () => setSelectMode(!selectMode));
  moreBtn.addEventListener("click", () => {
    const body = App.el(`<div class="list tight">
      <button class="item" type="button" data-a="restock"><span class="lead">↩️</span><span class="body"><span class="title">Restock expired items</span><span class="meta">Add everything expired in your kitchen to this list</span></span></button>
      <button class="item" type="button" data-a="clear"><span class="lead">🗑️</span><span class="body"><span class="title">Clear the whole list</span></span></button>
    </div>`);
    body.addEventListener("click", async e => {
      const b = e.target.closest("[data-a]"); if (!b) return;
      App.sheet.close();
      if (b.dataset.a === "clear") { if (list.length && await App.confirm({ title: "Clear your shopping list?", okLabel: "Clear", danger: true })) { const batch = App.batch(); list.forEach(i => batch.delete(col.doc(i.id))); batch.commit(); } }
      if (b.dataset.a === "restock") {
        const expired = (global.Groceries ? Groceries.items() : []).filter(i => Groceries.urgency(i) === "expired");
        let n = 0; expired.forEach(i => { if (add(i.name, i.qty)) n++; });
        App.toast(n ? `Added ${App.plural(n, "expired item")} to the list.` : "Nothing expired to restock.");
      }
    });
    App.sheet.open({ title: "Shopping list", body });
  });
  App.on("tab", ({ tab }) => { if (tab !== "shopping" && selectMode) setSelectMode(false); });

  global.Shopping = { init, add, has, items: () => list, guessLocation };
})(window);
