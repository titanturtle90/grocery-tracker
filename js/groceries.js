/*
 * Kitchen tab: the grocery inventory. Firestore collection "groceryItems"
 * (same schema as before: id, name, qty, category, storage, expiry, noExpiration, openedAt, addedAt).
 */
(function (global) {
  "use strict";
  const App = global.App;
  const { escapeHtml: esc, icon } = App;

  let items = [];
  let col = null;
  const state = { search: "", category: "", storage: "", urgency: "", sort: "status" };
  let selectMode = false;
  const selected = new Set();

  const listEl = document.getElementById("kitchenList");
  const filtersEl = document.getElementById("kitchenFilters");
  const searchEl = document.getElementById("kitchenSearch");
  const statsEl = document.getElementById("stats");
  const selectBtn = document.getElementById("kitchenSelectBtn");
  const useUpEl = document.getElementById("kitchenUseUp");
  const ledeEl = document.getElementById("kitchenLede");
  const fab = document.getElementById("fab");

  const GROUPS = [
    { key: "expired", title: "Expired" },
    { key: "today", title: "Eat today" },
    { key: "soon", title: "Eat soon" },
    { key: "fresh", title: "Fresh" }
  ];

  // ---------- data ----------
  function upsert(item) { if (!col) return Promise.reject(new Error("offline")); return col.doc(item.id).set(item); }
  function removeDoc(id) { if (!col) return Promise.reject(new Error("offline")); return col.doc(id).delete(); }
  function urgency(item) { return App.urgencyOf(App.effectiveExpiry(item)); }

  function init() {
    col = App.col("groceryItems");
    render();
    if (!col) { listEl.innerHTML = emptyHtml("🔌", "Not connected", "Check the Firebase config, then reload."); return; }
    col.onSnapshot(snap => {
      items = snap.docs.map(d => d.data());
      App.setSynced();
      render();
      App.emit("groceries", items);
      checkNotifications(false);
    }, err => {
      console.error("groceryItems sync error", err);
      App.setSyncError("Sync error");
    });
  }

  // ---------- notifications ----------
  const NOTIFY_KEY = "grocery-tracker-last-notify-date";
  function checkNotifications(force) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const today = App.todayStr();
    if (!force && localStorage.getItem(NOTIFY_KEY) === today) return;
    const urgent = items.filter(i => ["expired", "today"].includes(urgency(i)));
    if (!urgent.length) return;
    localStorage.setItem(NOTIFY_KEY, today);
    const names = urgent.slice(0, 3).map(i => i.name).join(", ");
    const extra = urgent.length > 3 ? ` +${urgent.length - 3} more` : "";
    App.notify("Grocery Glance", `${names}${extra} — expired or due today.`, "grocery-expiry");
  }
  App.on("notify-check", () => checkNotifications(true));

  // ---------- rendering ----------
  function render() {
    renderStats();
    renderFilters();
    renderUseUp();
    renderList();
    App.setBadge("kitchen", items.filter(i => ["expired", "today"].includes(urgency(i))).length);
  }

  function renderStats() {
    const counts = { expired: 0, today: 0, soon: 0, fresh: 0 };
    items.forEach(i => counts[urgency(i)]++);
    ["Expired", "Today", "Soon", "Fresh"].forEach(k => { document.getElementById("count" + k).textContent = counts[k.toLowerCase()]; });
    statsEl.querySelectorAll(".stat").forEach(s => s.classList.toggle("on", s.dataset.urgency === state.urgency));
    const total = items.length;
    ledeEl.textContent = total === 0 ? "What you have, and what to eat first." : `${App.plural(total, "item")} · ${counts.expired + counts.today} need attention`;
  }

  function renderFilters() {
    const cats = Array.from(new Set(items.map(i => i.category || "Other"))).sort((a, b) => App.CATEGORIES.indexOf(a) - App.CATEGORIES.indexOf(b));
    const storages = (global.ShelfLifeDB?.STORAGE_OPTIONS || []).filter(o => items.some(i => i.storage === o.value));
    let html = `<button class="chip ${state.sort === "expiry" ? "on" : ""}" data-sort type="button">${icon("clock", "sm")} By date</button>`;
    html += cats.map(c => `<button class="chip ${state.category === c ? "on" : ""}" data-cat="${esc(c)}" type="button"><span class="em">${App.CATEGORY_EMOJI[c] || "🛒"}</span>${esc(c)}</button>`).join("");
    html += storages.map(o => `<button class="chip ${state.storage === o.value ? "on" : ""}" data-storage="${o.value}" type="button"><span class="em">${o.icon}</span>${o.label}</button>`).join("");
    if (state.category || state.storage || state.urgency || state.search || state.sort !== "status") html += `<button class="chip" data-clear type="button">${icon("x", "sm")} Clear</button>`;
    filtersEl.innerHTML = html;
  }

  function renderUseUp() {
    const urgent = items.filter(i => urgency(i) !== "fresh").sort((a, b) => App.sortKey(a).localeCompare(App.sortKey(b)));
    if (urgent.length === 0 || state.urgency) { useUpEl.hidden = true; useUpEl.innerHTML = ""; return; }
    const names = urgent.slice(0, 3).map(i => i.name).join(", ") + (urgent.length > 3 ? ` +${urgent.length - 3}` : "");
    useUpEl.hidden = false;
    useUpEl.innerHTML = `<div class="banner warn"><span style="font-size:1.3rem">🍳</span><div class="grow"><b>Use it up:</b> ${esc(names)}</div><button class="btn sm primary" type="button" id="useUpBtn">Recipes</button></div>`;
    useUpEl.querySelector("#useUpBtn").addEventListener("click", () => { if (global.Recipes) Recipes.openWithItems(urgent); });
  }

  function filtered() {
    const q = state.search.trim().toLowerCase();
    return items.filter(i => {
      if (state.urgency && urgency(i) !== state.urgency) return false;
      if (state.category && (i.category || "Other") !== state.category) return false;
      if (state.storage && i.storage !== state.storage) return false;
      if (q && !i.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function emptyHtml(em, title, text, btn) {
    return `<div class="empty fade-in"><div class="em">${em}</div><h3>${esc(title)}</h3><p>${esc(text)}</p>${btn || ""}</div>`;
  }

  function renderList() {
    const list = filtered();
    if (items.length === 0) {
      listEl.innerHTML = emptyHtml("🛒", "Your kitchen is empty", "Add what you have and I'll track when to eat it.", `<button class="btn primary" type="button" data-add>${icon("plus")} Add your first item</button>`);
      listEl.querySelector("[data-add]").addEventListener("click", () => openForm(null));
      return;
    }
    if (list.length === 0) { listEl.innerHTML = emptyHtml("🔍", "Nothing matches", "Try a different search or clear the filters."); return; }

    const frag = document.createDocumentFragment();
    const byDate = (a, b) => App.sortKey(a).localeCompare(App.sortKey(b)) || a.name.localeCompare(b.name);
    if (state.sort === "expiry") {
      const wrap = App.el(`<div class="list"></div>`);
      [...list].sort(byDate).forEach(i => wrap.appendChild(row(i)));
      frag.appendChild(wrap);
    } else {
      GROUPS.forEach(g => {
        const gi = list.filter(i => urgency(i) === g.key).sort(byDate);
        if (!gi.length) return;
        frag.appendChild(App.el(`<h2 class="group-title ${g.key}"><span class="dot"></span>${g.title}<span class="n">${gi.length}</span></h2>`));
        App.CATEGORIES.forEach(cat => {
          const ci = gi.filter(i => (i.category || "Other") === cat);
          if (!ci.length) return;
          if (!state.category) frag.appendChild(App.el(`<div class="sub-title">${App.CATEGORY_EMOJI[cat] || ""} ${esc(cat)}</div>`));
          const wrap = App.el(`<div class="list"></div>`);
          ci.forEach(i => wrap.appendChild(row(i)));
          frag.appendChild(wrap);
        });
      });
    }
    listEl.innerHTML = "";
    listEl.appendChild(frag);
  }

  function row(item) {
    const u = urgency(item);
    const eff = App.effectiveExpiry(item);
    const meta = [];
    meta.push(esc(item.category || "Other"));
    if (item.storage) meta.push(esc(App.storageLabel(item.storage)));
    if (item.qty) meta.push(esc(item.qty));
    if (item.openedAt) meta.push(`Opened ${App.formatDate(item.openedAt)}`);
    const el = App.el(`
      <button class="item ${selectMode && selected.has(item.id) ? "selected" : ""}" type="button" data-id="${item.id}">
        ${selectMode ? `<span class="checkbox">${icon("check")}</span>` : `<span class="lead ${u}">${App.itemEmoji(item)}</span>`}
        <span class="body">
          <span class="title">${esc(item.name)}</span>
          <span class="meta">${meta.join('<span class="sep">·</span>')}</span>
        </span>
        <span class="trail">
          <span class="when ${u}">${App.expiryShort(eff)}</span>
          <span class="sub">${eff ? App.formatDate(eff) : "no expiry"}</span>
        </span>
      </button>`);
    el.addEventListener("click", () => {
      if (selectMode) { toggleSelect(item.id, el); return; }
      openDetail(item);
    });
    return el;
  }

  // ---------- detail sheet ----------
  function openDetail(item) {
    const live = () => items.find(i => i.id === item.id) || item;
    const it = live();
    const u = urgency(it);
    const eff = App.effectiveExpiry(it);
    const body = App.el(`<div>
      <div class="row" style="gap:14px; margin-top:4px;">
        <div class="lead ${u}" style="width:64px;height:64px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:2rem;background:var(--surface-2);" data-emoji></div>
        <div class="grow">
          <div class="pill ${u}" style="font-size:0.8rem;">${esc(App.expiryNote(eff))}</div>
          <div class="hint mt-8">${it.qty ? esc(it.qty) + " · " : ""}${esc(it.category || "Other")} · ${esc(App.storageLabel(it.storage))}</div>
        </div>
      </div>
      <div class="action-grid mt-16">
        <button class="act accent" data-act="eaten" type="button">${icon("check")}Eaten</button>
        <button class="act" data-act="opened" type="button">${icon(it.openedAt ? "undo" : "box")}${it.openedAt ? "Unopen" : "Opened"}</button>
        <button class="act" data-act="edit" type="button">${icon("edit")}Edit</button>
        <button class="act danger" data-act="delete" type="button">${icon("trash")}Delete</button>
      </div>
      <div class="sheet-section">
        <div class="kv"><span class="k">Expires</span><span>${it.noExpiration ? "Doesn't expire" : App.formatDateLong(it.expiry)}</span></div>
        ${it.openedAt ? `<div class="kv"><span class="k">Opened</span><span>${App.formatDateLong(it.openedAt)}${eff !== it.expiry && eff ? ` · use by ${App.formatDate(eff)}` : ""}</span></div>` : ""}
        ${it.addedAt ? `<div class="kv"><span class="k">Added</span><span>${App.formatIso(it.addedAt)}</span></div>` : ""}
      </div>
      <div class="row mt-12">
        <button class="btn grow" data-act="recipes" type="button">${icon("chef", "sm")} Recipes with this</button>
        <button class="btn grow" data-act="rebuy" type="button">${icon("cart", "sm")} Add to shopping</button>
      </div>
    </div>`);
    body.querySelector("[data-emoji]").textContent = App.itemEmoji(it);
    body.addEventListener("click", async e => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const cur = live();
      switch (b.dataset.act) {
        case "eaten": App.sheet.close(); markEaten(cur); break;
        case "opened": {
          const updated = { ...cur, openedAt: cur.openedAt ? null : App.todayStr() };
          upsert(updated).catch(() => App.toast("Couldn't save — check your connection."));
          App.toast(updated.openedAt ? `Marked ${cur.name} as opened.` : `Cleared opened date.`);
          App.sheet.close();
          break;
        }
        case "edit": openForm(cur); break;
        case "delete": {
          App.sheet.close();
          removeDoc(cur.id).catch(() => App.toast("Couldn't remove — check your connection."));
          App.toast(`Removed ${cur.name}.`, { label: "Undo", onClick: () => upsert(cur) });
          break;
        }
        case "recipes": App.sheet.close(); if (global.Recipes) Recipes.openWithItems([cur]); break;
        case "rebuy": if (global.Shopping) { Shopping.add(cur.name, cur.qty); App.toast(`Added ${cur.name} to your shopping list.`); App.sheet.close(); } break;
      }
    });
    App.sheet.open({ title: it.name, body });
  }

  function markEaten(item) {
    removeDoc(item.id).catch(() => App.toast("Couldn't remove — check your connection."));
    App.haptic(12);
    App.toast(`Nice — ${item.name} eaten in time!`, { label: "Undo", onClick: () => upsert(item).then(() => App.toast(`Restored ${item.name}.`)) });
  }

  // ---------- add / edit form ----------
  function openForm(item, prefill) {
    const isEdit = !!item;
    const base = item || { name: prefill?.name || "", qty: prefill?.qty || "", category: "Other", storage: "fridge", expiry: App.addDays(7), noExpiration: false, openedAt: null };
    const storages = global.ShelfLifeDB.STORAGE_OPTIONS;
    const names = Array.from(new Set(items.map(i => i.name))).sort();
    const body = App.el(`<form class="stack" id="itemForm" autocomplete="off">
      <div class="field"><label for="fName">Item</label><input class="input" id="fName" list="fNames" placeholder="e.g. Spinach" required value="${esc(base.name)}"><datalist id="fNames">${names.map(n => `<option value="${esc(n)}">`).join("")}</datalist></div>
      <div class="grid-2">
        <div class="field"><label for="fQty">Quantity</label><input class="input" id="fQty" placeholder="1 bag" value="${esc(base.qty || "")}"></div>
        <div class="field"><label for="fCat">Category</label><select class="select" id="fCat">${App.CATEGORIES.map(c => `<option value="${esc(c)}" ${c === base.category ? "selected" : ""}>${App.CATEGORY_EMOJI[c]} ${esc(c)}</option>`).join("")}</select></div>
      </div>
      <div class="field"><span class="label">Stored in</span><div class="seg" id="fStorage" style="display:flex;">${storages.map(o => `<button type="button" class="grow ${o.value === base.storage ? "on" : ""}" data-v="${o.value}">${o.icon} ${o.label}</button>`).join("")}</div></div>
      <div class="field">
        <div class="row" style="justify-content:space-between;"><label for="fExp">Expires</label><label class="switch"><input type="checkbox" id="fNoExp" ${base.noExpiration ? "checked" : ""}><span class="track"></span>Doesn't expire</label></div>
        <input class="input" type="date" id="fExp" value="${esc(base.expiry || "")}" ${base.noExpiration ? "disabled" : ""}>
        <p class="hint" id="fHint"></p>
      </div>
      ${isEdit ? `<div class="field"><label for="fOpened">Opened on (optional)</label><input class="input" type="date" id="fOpened" value="${esc(base.openedAt || "")}"></div>` : ""}
    </form>`);
    const foot = App.el(`<div style="display:flex;gap:10px;width:100%"><button class="btn lg primary grow" type="submit" form="itemForm">${isEdit ? "Save changes" : "Add to kitchen"}</button></div>`);

    const fName = body.querySelector("#fName"), fQty = body.querySelector("#fQty"), fCat = body.querySelector("#fCat");
    const fExp = body.querySelector("#fExp"), fNoExp = body.querySelector("#fNoExp"), fHint = body.querySelector("#fHint"), fStorage = body.querySelector("#fStorage");
    let storage = base.storage || "fridge";
    let touched = { date: isEdit, storage: isEdit, category: isEdit };

    function setStorage(v) { storage = v; fStorage.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.v === v)); }
    fStorage.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]"); if (!b) return;
      touched.storage = true; setStorage(b.dataset.v);
      const map = { pantry: "Pantry", freezer: "Frozen" };
      if (!touched.category && map[storage]) fCat.value = map[storage];
      updateHint();
    });
    fNoExp.addEventListener("change", () => { fExp.disabled = fNoExp.checked; updateHint(); });
    fExp.addEventListener("input", () => { touched.date = true; updateHint(); });
    fCat.addEventListener("change", () => { touched.category = true; });
    fName.addEventListener("input", App.debounce(() => {
      if (!fName.value.trim()) touched = { date: false, storage: false, category: false };
      if (!touched.category) { const g = global.GroceryCategories?.lookup(fName.value.trim()); if (g) fCat.value = g; }
      updateHint();
    }, 200));
    fHint.addEventListener("click", e => { const b = e.target.closest("[data-apply]"); if (!b) return; fExp.value = b.dataset.apply; touched.date = false; updateHint(); });

    function updateHint() {
      const name = fName.value.trim();
      fHint.className = "hint";
      if (!name || fNoExp.checked) { fHint.textContent = fNoExp.checked ? "Sealed goods like cans — mark it opened later and I'll track it from there." : ""; return; }
      const match = global.ShelfLifeDB.lookup(name);
      if (!match) { fHint.textContent = `No shelf-life estimate for "${name}" — set the date yourself.`; return; }
      if (!touched.storage) setStorage(match.defaultStorage);
      const days = global.ShelfLifeDB.daysFor(match, storage);
      const suggested = App.addDays(days);
      fHint.classList.add("ok");
      if (!touched.date) { fExp.value = suggested; fHint.textContent = `Typical ${App.storageLabel(storage)} shelf life is ${days} days — applied. Edit if yours differs.`; }
      else if (fExp.value === suggested) fHint.textContent = `Matches the typical ${App.storageLabel(storage)} shelf life (${days} days).`;
      else fHint.innerHTML = `Typical ${esc(App.storageLabel(storage))} shelf life: ${days} days (${esc(App.formatDate(suggested))}). <button type="button" class="link" data-apply="${suggested}">Use that</button>`;
    }

    body.addEventListener("submit", e => {
      e.preventDefault();
      const name = fName.value.trim();
      const noExpiration = fNoExp.checked;
      const expiry = fExp.value;
      if (!name || (!noExpiration && !expiry)) { App.toast("Name and expiration date are required."); return; }
      const rec = {
        ...(item || { id: App.genId(), addedAt: new Date().toISOString(), openedAt: null }),
        name, qty: fQty.value.trim(), category: fCat.value, storage, expiry: expiry || (item ? item.expiry : App.todayStr()), noExpiration,
        openedAt: isEdit ? (body.querySelector("#fOpened").value || null) : null
      };
      upsert(rec).catch(() => App.toast("Couldn't save — check your connection."));
      App.haptic(10);
      App.toast(isEdit ? `Updated ${name}.` : `Added ${name}.`);
      App.sheet.close();
      if (prefill && prefill.onDone) prefill.onDone(rec);
    });

    App.sheet.open({ title: isEdit ? "Edit item" : "Add to kitchen", body, foot });
    if (!isEdit) { if (base.name) updateHint(); setTimeout(() => fName.focus(), 350); }
    else updateHint();
  }

  // ---------- select mode ----------
  let actionbar = null;
  function setSelectMode(on) {
    selectMode = on;
    selected.clear();
    selectBtn.textContent = on ? "Cancel" : "Select";
    selectBtn.classList.toggle("primary", on);
    fab.hidden = on || App.tab !== "kitchen";
    updateActionbar();
    renderList();
  }
  function toggleSelect(id, el) {
    if (selected.has(id)) selected.delete(id); else selected.add(id);
    el.classList.toggle("selected", selected.has(id));
    updateActionbar();
  }
  function updateActionbar() {
    if (actionbar) { actionbar.remove(); actionbar = null; }
    if (!selectMode) return;
    actionbar = App.el(`<div class="actionbar">
      <span class="n">${selected.size} selected</span>
      <button class="btn" data-b="cat" type="button">Category</button>
      <button class="btn" data-b="loc" type="button">Location</button>
      <button class="btn" data-b="eaten" type="button">${icon("check", "sm")}</button>
      <button class="btn danger" data-b="del" type="button">${icon("trash", "sm")}</button>
    </div>`);
    actionbar.querySelectorAll("button").forEach(b => { if (selected.size === 0) b.disabled = true; });
    actionbar.addEventListener("click", async e => {
      const b = e.target.closest("[data-b]"); if (!b) return;
      const ids = Array.from(selected);
      if (b.dataset.b === "cat") pickOption("Set category", App.CATEGORIES.map(c => ({ v: c, label: `${App.CATEGORY_EMOJI[c]} ${c}` })), v => bulk(ids, { category: v }, `Moved ${ids.length} to ${v}.`));
      if (b.dataset.b === "loc") pickOption("Set location", global.ShelfLifeDB.STORAGE_OPTIONS.map(o => ({ v: o.value, label: `${o.icon} ${o.label}` })), v => bulk(ids, { storage: v }, `Moved ${ids.length} to ${App.storageLabel(v)}.`));
      if (b.dataset.b === "eaten") { bulkDelete(ids, `${ids.length} eaten — nice work!`); }
      if (b.dataset.b === "del") { if (await App.confirm({ title: `Remove ${ids.length} items?`, text: "This can't be undone.", okLabel: "Remove", danger: true })) bulkDelete(ids, `Removed ${ids.length} items.`); }
    });
    document.body.appendChild(actionbar);
  }
  function pickOption(title, options, onPick) {
    const body = App.el(`<div class="list tight">${options.map(o => `<button class="item" type="button" data-v="${esc(o.v)}"><span class="body"><span class="title">${o.label}</span></span></button>`).join("")}</div>`);
    body.addEventListener("click", e => { const b = e.target.closest("[data-v]"); if (!b) return; App.sheet.close(); onPick(b.dataset.v); });
    App.sheet.open({ title, body });
  }
  function bulk(ids, patch, msg) {
    const batch = App.batch(); if (!batch) return;
    ids.forEach(id => batch.set(col.doc(id), patch, { merge: true }));
    batch.commit().then(() => App.toast(msg)).catch(() => App.toast("Couldn't update — check your connection."));
    setSelectMode(false);
  }
  function bulkDelete(ids, msg) {
    const batch = App.batch(); if (!batch) return;
    const backup = items.filter(i => ids.includes(i.id));
    ids.forEach(id => batch.delete(col.doc(id)));
    batch.commit().then(() => App.toast(msg, { label: "Undo", onClick: () => { const b2 = App.batch(); backup.forEach(i => b2.set(col.doc(i.id), i)); b2.commit(); } })).catch(() => App.toast("Couldn't remove — check your connection."));
    setSelectMode(false);
  }

  // ---------- events ----------
  searchEl.addEventListener("input", () => { state.search = searchEl.value; renderFilters(); renderList(); });
  statsEl.addEventListener("click", e => {
    const s = e.target.closest(".stat"); if (!s) return;
    state.urgency = state.urgency === s.dataset.urgency ? "" : s.dataset.urgency;
    App.haptic(); render();
  });
  filtersEl.addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    if (c.hasAttribute("data-sort")) state.sort = state.sort === "expiry" ? "status" : "expiry";
    else if (c.dataset.cat != null) state.category = state.category === c.dataset.cat ? "" : c.dataset.cat;
    else if (c.dataset.storage != null) state.storage = state.storage === c.dataset.storage ? "" : c.dataset.storage;
    else if (c.hasAttribute("data-clear")) { Object.assign(state, { search: "", category: "", storage: "", urgency: "", sort: "status" }); searchEl.value = ""; searchEl.dispatchEvent(new Event("input")); }
    render();
  });
  selectBtn.addEventListener("click", () => setSelectMode(!selectMode));
  fab.addEventListener("click", () => { App.haptic(); openForm(null); });
  App.on("tab", ({ tab }) => { if (tab !== "kitchen" && selectMode) setSelectMode(false); });

  global.Groceries = { init, items: () => items, upsert, remove: removeDoc, openForm, openDetail, markEaten, urgency };
})(window);
