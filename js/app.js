/* Bootstrap: connect, start feature modules, route the hash, register the service worker. */
(function (global) {
  "use strict";
  const App = global.App;

  App.initFirebase();
  Groceries.init();
  Shopping.init();
  Recipes.init();
  Bogo.init();

  const initial = (location.hash || "").replace("#", "");
  App.go(["kitchen", "shopping", "bogo", "recipes"].includes(initial) ? initial : "kitchen", { silent: true });
  window.addEventListener("hashchange", () => {
    const t = (location.hash || "").replace("#", "");
    if (["kitchen", "shopping", "bogo", "recipes"].includes(t) && t !== App.tab) App.go(t, { silent: true });
  });

  // Install prompt (Android/desktop). iOS users add via the Share sheet.
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    if (App.lsGet("gg-install-dismissed", false)) return;
    const el = App.el(`<div class="banner info mt-12" id="installBanner"><span style="font-size:1.3rem">📲</span><div class="grow"><b>Install Grocery Glance</b> for a full-screen app on your home screen.</div><button class="btn sm primary" type="button" data-i>Install</button><button class="icon-btn sm plain" type="button" data-x aria-label="Dismiss">${App.icon("x", "sm")}</button></div>`);
    el.querySelector("[data-i]").addEventListener("click", async () => { el.remove(); if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; } });
    el.querySelector("[data-x]").addEventListener("click", () => { el.remove(); App.lsSet("gg-install-dismissed", true); });
    const head = document.querySelector("#panel-kitchen .page-head");
    head.insertAdjacentElement("afterend", el);
  });

  if ("serviceWorker" in navigator) {
    const register = () => navigator.serviceWorker.register("./sw.js").then(reg => {
      if (!reg || !reg.addEventListener) return;
      reg.addEventListener("updatefound", () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener("statechange", () => {
          if (sw.state === "installed" && navigator.serviceWorker.controller) App.toast("Update ready — reload to get the latest.", { label: "Reload", onClick: () => location.reload() });
        });
      });
    }).catch(err => console.error("SW registration failed", err));
    if (document.readyState === "complete") register(); else window.addEventListener("load", register);
  }
})(window);
