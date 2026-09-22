/*
 * Core: Firebase connection, shared helpers, toast, bottom sheet, dialogs,
 * tab routing. Every feature module builds on window.App.
 */
(function (global) {
  "use strict";

  const App = {};
  const listeners = new Map();

  // ---------- tiny event bus ----------
  App.on = (evt, fn) => { if (!listeners.has(evt)) listeners.set(evt, new Set()); listeners.get(evt).add(fn); return () => listeners.get(evt).delete(fn); };
  App.emit = (evt, data) => { (listeners.get(evt) || []).forEach(fn => { try { fn(data); } catch (e) { console.error(e); } }); };

  // ---------- helpers ----------
  App.escapeHtml = str => String(str ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  App.genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  App.icon = (name, cls) => `<svg class="ic ${cls || ""}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  App.plural = (n, word, pl) => `${n} ${n === 1 ? word : (pl || word + "s")}`;
  App.debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  App.haptic = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms || 8); } catch (e) { /* ignore */ } };
  App.lsGet = (k, fallback) => { try { const v = localStorage.getItem(k); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; } };
  App.lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } };
  App.el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  // ---------- dates ----------
  App.startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  App.parseDateLocal = s => { const [y, m, d] = String(s).split("-").map(Number); return new Date(y, m - 1, d); };
  App.toDateStr = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  App.todayStr = () => App.toDateStr(App.startOfToday());
  App.addDays = (days, from) => { const d = from ? App.parseDateLocal(from) : App.startOfToday(); d.setDate(d.getDate() + days); return App.toDateStr(d); };
  App.daysUntil = s => Math.round((App.parseDateLocal(s) - App.startOfToday()) / 86400000);
  App.formatDate = s => App.parseDateLocal(s).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  App.formatDateLong = s => App.parseDateLocal(s).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  App.formatIso = iso => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  App.relative = iso => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 90) return "just now";
    if (diff < 3600) return `${Math.round(diff / 60)} min ago`;
    if (diff < 86400 * 1.5) return `${Math.round(diff / 3600)} hr ago`;
    return `${Math.round(diff / 86400)} days ago`;
  };

  // ---------- urgency ----------
  App.urgencyOf = dateStr => {
    if (!dateStr) return "fresh";
    const diff = App.daysUntil(dateStr);
    if (diff < 0) return "expired";
    if (diff === 0) return "today";
    if (diff <= 3) return "soon";
    return "fresh";
  };
  App.expiryShort = dateStr => {
    if (!dateStr) return "∞";
    const diff = App.daysUntil(dateStr);
    if (diff < 0) return `${Math.abs(diff)}d ago`;
    if (diff === 0) return "Today";
    if (diff === 1) return "1 day";
    if (diff < 14) return `${diff} days`;
    if (diff < 60) return `${Math.round(diff / 7)} wks`;
    return `${Math.round(diff / 30)} mo`;
  };
  App.expiryNote = dateStr => {
    if (!dateStr) return "No expiration";
    const diff = App.daysUntil(dateStr);
    if (diff < 0) return `Expired ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} ago`;
    if (diff === 0) return "Expires today";
    if (diff === 1) return "Expires tomorrow";
    return `Expires in ${diff} days · ${App.formatDate(dateStr)}`;
  };
  // Effective expiry: earlier of printed date and "use within N days of opening".
  App.effectiveExpiry = item => {
    if (item.openedAt && global.ShelfLifeDB) {
      const match = ShelfLifeDB.lookup(item.name);
      const afterDays = ShelfLifeDB.daysAfterOpening(match);
      if (afterDays != null) {
        const openedExpiry = App.addDays(afterDays, item.openedAt);
        if (item.noExpiration) return openedExpiry;
        return openedExpiry < item.expiry ? openedExpiry : item.expiry;
      }
    }
    return item.noExpiration ? null : item.expiry;
  };
  App.sortKey = item => App.effectiveExpiry(item) || "9999-12-31";
  App.storageLabel = v => { const o = (global.ShelfLifeDB?.STORAGE_OPTIONS || []).find(x => x.value === v); return o ? `${o.icon} ${o.label}` : (v || ""); };
  App.storageIcon = v => { const o = (global.ShelfLifeDB?.STORAGE_OPTIONS || []).find(x => x.value === v); return o ? o.icon : "🧊"; };
  App.CATEGORIES = ["Produce", "Dairy", "Meat & Seafood", "Bakery", "Frozen", "Pantry", "Beverages", "Leftovers", "Other"];
  App.CATEGORY_EMOJI = { "Produce": "🥬", "Dairy": "🥛", "Meat & Seafood": "🥩", "Bakery": "🍞", "Frozen": "🧊", "Pantry": "🥫", "Beverages": "🧃", "Leftovers": "🍱", "Other": "🛒" };
  App.itemEmoji = item => {
    const keys = global.Ingredients ? Ingredients.keysFor(item.name) : [];
    if (keys.length) return Ingredients.emoji(keys[0]);
    return App.CATEGORY_EMOJI[item.category] || "🛒";
  };

  // ---------- Firebase ----------
  const syncEl = document.getElementById("syncStatus");
  function setSync(state, text) {
    if (!syncEl) return;
    syncEl.className = "brand-sub " + state;
    syncEl.querySelector(".txt").textContent = text;
  }
  App.db = null;
  App.online = navigator.onLine;
  window.addEventListener("online", () => { App.online = true; App.emit("online", true); });
  window.addEventListener("offline", () => { App.online = false; setSync("", "Offline — changes sync later"); App.emit("online", false); });

  App.initFirebase = function () {
    const cfg = global.FIREBASE_CONFIG || {};
    if (!cfg.apiKey || typeof firebase === "undefined") {
      setSync("error", typeof firebase === "undefined" ? "Couldn't load sync library" : "Not connected");
      return null;
    }
    try {
      firebase.initializeApp(cfg);
      const db = firebase.firestore();
      try { db.enablePersistence({ synchronizeTabs: true }).catch(() => {}); } catch (e) { /* ignore */ }
      App.db = db;
      setSync("", "Syncing…");
      return db;
    } catch (e) {
      console.error("Firebase init failed", e);
      setSync("error", "Couldn't connect");
      return null;
    }
  };
  App.setSynced = () => setSync("synced", App.online ? "Synced" : "Offline — cached");
  App.setSyncError = (msg) => setSync("error", msg || "Sync error");
  App.col = name => App.db ? App.db.collection(name) : null;
  App.batch = () => App.db ? App.db.batch() : null;

  // ---------- toast ----------
  const toastEl = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  const toastAct = document.getElementById("toastAct");
  let toastTimer = null;
  App.toast = function (msg, action) {
    toastMsg.textContent = msg;
    if (action) {
      toastAct.textContent = action.label;
      toastAct.hidden = false;
      toastAct.onclick = () => { clearTimeout(toastTimer); toastEl.classList.remove("show"); action.onClick(); };
    } else {
      toastAct.hidden = true;
      toastAct.onclick = null;
    }
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), action ? 6000 : 2600);
  };

  // ---------- confirm dialog ----------
  const dialog = document.getElementById("dialog");
  App.confirm = function ({ title, text, okLabel = "OK", cancelLabel = "Cancel", danger = false }) {
    return new Promise(resolve => {
      document.getElementById("dialogTitle").textContent = title || "Are you sure?";
      document.getElementById("dialogText").textContent = text || "";
      const ok = document.getElementById("dialogOk");
      const cancel = document.getElementById("dialogCancel");
      ok.textContent = okLabel; cancel.textContent = cancelLabel;
      ok.className = "btn " + (danger ? "danger" : "primary");
      const done = v => { dialog.classList.remove("show"); ok.onclick = cancel.onclick = null; resolve(v); };
      ok.onclick = () => done(true);
      cancel.onclick = () => done(false);
      dialog.onclick = e => { if (e.target === dialog) done(false); };
      dialog.classList.add("show");
    });
  };

  // ---------- bottom sheet ----------
  const sheet = document.getElementById("sheet");
  const backdrop = document.getElementById("sheetBackdrop");
  const sheetHead = document.getElementById("sheetHead");
  const sheetBody = document.getElementById("sheetBody");
  const sheetFoot = document.getElementById("sheetFoot");
  let sheetOnClose = null;
  let sheetOpen = false;

  App.sheet = {
    open({ title, subtitle, body, foot, tall = false, onClose = null, headExtra = "" }) {
      sheetOnClose = onClose;
      sheetHead.innerHTML = `<div class="grow"><h2>${App.escapeHtml(title || "")}</h2>${subtitle ? `<p class="hint">${subtitle}</p>` : ""}</div>${headExtra}<button class="icon-btn sm" type="button" id="sheetClose" aria-label="Close">${App.icon("x")}</button>`;
      sheetBody.innerHTML = "";
      if (typeof body === "string") sheetBody.innerHTML = body; else if (body) sheetBody.appendChild(body);
      if (foot) { sheetFoot.hidden = false; sheetFoot.innerHTML = ""; if (typeof foot === "string") sheetFoot.innerHTML = foot; else sheetFoot.appendChild(foot); }
      else sheetFoot.hidden = true;
      sheet.classList.toggle("tall", tall);
      sheetBody.scrollTop = 0;
      document.getElementById("sheetClose").onclick = () => App.sheet.close();
      requestAnimationFrame(() => { backdrop.classList.add("show"); sheet.classList.add("show"); document.body.classList.add("sheet-open"); });
      if (!sheetOpen) { sheetOpen = true; history.pushState({ sheet: true }, ""); }
      return { body: sheetBody, foot: sheetFoot, head: sheetHead };
    },
    close(fromPop) {
      if (!sheetOpen) return;
      sheetOpen = false;
      backdrop.classList.remove("show"); sheet.classList.remove("show"); document.body.classList.remove("sheet-open");
      const cb = sheetOnClose; sheetOnClose = null;
      if (cb) cb();
      if (!fromPop && history.state && history.state.sheet) history.back();
    },
    isOpen: () => sheetOpen,
    setTitle(t) { const h = sheetHead.querySelector("h2"); if (h) h.textContent = t; }
  };
  backdrop.addEventListener("click", () => App.sheet.close());
  window.addEventListener("popstate", () => { if (sheetOpen) App.sheet.close(true); });
  // swipe-down to dismiss
  (function () {
    let startY = null, dy = 0;
    sheet.addEventListener("touchstart", e => { if (sheetBody.scrollTop > 0 && sheetBody.contains(e.target)) { startY = null; return; } startY = e.touches[0].clientY; dy = 0; sheet.style.transition = "none"; }, { passive: true });
    sheet.addEventListener("touchmove", e => { if (startY == null) return; dy = Math.max(0, e.touches[0].clientY - startY); sheet.style.transform = `translateY(${dy}px)`; }, { passive: true });
    sheet.addEventListener("touchend", () => { if (startY == null) return; sheet.style.transition = ""; sheet.style.transform = ""; if (dy > 110) App.sheet.close(); startY = null; });
  })();

  // ---------- tabs ----------
  const TABS = ["kitchen", "shopping", "bogo", "recipes"];
  const fab = document.getElementById("fab");
  App.tab = "kitchen";
  App.go = function (tab, opts) {
    if (!TABS.includes(tab)) tab = "kitchen";
    App.tab = tab;
    document.querySelectorAll(".panel").forEach(p => { p.hidden = p.dataset.panel !== tab; });
    document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    fab.hidden = tab !== "kitchen";
    if (!(opts && opts.silent)) { try { history.replaceState(history.state, "", "#" + tab); } catch (e) { /* ignore */ } }
    window.scrollTo({ top: 0 });
    App.emit("tab", { tab, opts: opts || {} });
  };
  document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => { App.haptic(); App.go(b.dataset.tab); }));
  App.setBadge = (tab, n, accent) => {
    const el = document.getElementById("badge" + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (!el) return;
    el.hidden = !n;
    el.textContent = n > 99 ? "99+" : String(n);
    if (accent != null) el.classList.toggle("accent", !!accent);
  };

  // Search boxes: show/hide the clear button.
  document.querySelectorAll(".search").forEach(box => {
    const input = box.querySelector("input");
    const clear = box.querySelector(".clear");
    if (!input || !clear) return;
    const sync = () => box.classList.toggle("has-value", !!input.value);
    input.addEventListener("input", sync);
    clear.addEventListener("click", () => { input.value = ""; sync(); input.dispatchEvent(new Event("input", { bubbles: true })); input.focus(); });
    sync();
  });

  // ---------- notifications (fire while app is open) ----------
  const notifyBtn = document.getElementById("notifyBtn");
  const notificationsSupported = "Notification" in window && "serviceWorker" in navigator;
  App.updateNotifyBtn = () => {
    if (!notificationsSupported || !notifyBtn) return;
    notifyBtn.hidden = Notification.permission !== "default";
  };
  if (notificationsSupported && notifyBtn) {
    App.updateNotifyBtn();
    notifyBtn.addEventListener("click", async () => {
      const perm = await Notification.requestPermission();
      App.updateNotifyBtn();
      App.toast(perm === "granted" ? "Alerts on — you'll be reminded when something's expiring." : "Alerts not enabled.");
      if (perm === "granted") App.emit("notify-check", true);
    });
  }
  App.notify = (title, body, tag) => {
    if (!notificationsSupported || Notification.permission !== "granted") return;
    navigator.serviceWorker.ready.then(reg => reg.showNotification(title, { body, icon: "icon-192.png", badge: "icon-192.png", tag })).catch(() => {});
  };

  global.App = App;
})(window);
