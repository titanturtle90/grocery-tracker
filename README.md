# Grocery Glance

A personal, installable grocery app (PWA) that tracks what's in your kitchen and when to eat it, keeps a store-ordered shopping list, pulls Publix BOGO deals automatically every Thursday, and matches 100+ hand-written recipes to the ingredients you actually have.

No build step — plain HTML/CSS/JS served statically (GitHub Pages works), with Firebase Firestore for sync across your devices.

## Tabs

| Tab | What it does |
| --- | --- |
| **Kitchen** | Inventory with expiry tracking. Shelf-life estimates fill in the date for you, "opened" tracking shortens it, and a "Use it up" banner jumps straight to recipes for what's expiring. |
| **Shopping** | Grouped by store section/aisle (it remembers where you found things). Checking an item off moves it into the Kitchen with an estimated expiry. |
| **BOGOs** | This week's Publix buy-one-get-one deals, grouped by department, searchable, one tap to add to the shopping list, plus "Cook with this week's deals" recipe suggestions. Refreshed automatically every Thursday morning. |
| **Recipes** | Pick ingredients from your kitchen, this week's BOGOs, or the full catalog. Recipes are ranked by how many of your picks they use and how little you're missing. Detail view has a servings scaler, have/missing markers, add-missing-to-list, favorites, sharing, and a "Cooked it" flow that clears used-up groceries. |

## Project layout

```
index.html               app shell
css/app.css              design system (light + dark)
js/core.js               Firebase, toast, bottom sheet, dialogs, tabs
js/groceries.js          Kitchen tab
js/shopping.js           Shopping tab
js/bogo.js               BOGO tab
js/recipe-engine.js      recipe matching + quantity scaling (pure logic)
js/recipes.js            Recipes tab UI
js/data/ingredients.js   ingredient catalog (keys, groups, name matching, staples)
js/data/recipes-*.js     recipe database (≈100 recipes)
js/data/*.js             shelf-life, store-section, and category lookups
scripts/fetch-publix-bogos.mjs   weekly BOGO fetcher (Node 22, no dependencies)
.github/workflows/publix-bogos.yml  Thursday cron + manual trigger
firestore.rules          reference rules for the collections the app uses
sw.js, manifest.json     PWA bits
```

Firestore collections: `groceryItems`, `shoppingList`, `bogoItems`, `recipeFavorites`, and a single `meta/bogo` document with the last refresh info. The existing data model is unchanged, so previous data keeps working.

## Setting up the automatic Publix BOGO refresh

The workflow runs Thursdays at 6:30 AM Eastern (and again at 11 AM as a safety net), reads Publix's weekly ad for your zip code from Flipp's public flyer API, keeps only buy-one-get-one items, and replaces the `bogoItems` collection. It also writes `meta/bogo` so the app can show "Updated 2 hours ago · valid Sep 4 – Sep 10".

1. **Repository → Settings → Secrets and variables → Actions → Variables**
   - `PUBLIX_ZIP` — the zip code of your Publix (deals vary by region). Defaults to `33602` if unset.
   - `FIREBASE_PROJECT_ID` — optional, defaults to `grocery-tracker-b45f1`.
   - `PUBLIX_AD_URL` — optional fallback. The URL from the "Weekly Ad Accessibility" link at the bottom of Publix's weekly ad page, used only if Flipp returns nothing.
2. **Secrets** (one of the two):
   - `FIREBASE_SERVICE_ACCOUNT` — recommended. Firebase console → Project settings → Service accounts → *Generate new private key*, paste the whole JSON. The script exchanges it for a short-lived token itself; no npm packages needed.
   - `FIREBASE_API_KEY` — the web API key from `index.html`. Works only while your Firestore rules allow unauthenticated writes to `bogoItems` and `meta` (see `firestore.rules`).
3. **Actions → Publix BOGO refresh → Run workflow** to test. Tick *dry run* to just print the deals without writing. The BOGO tab's "Refresh now" button opens this page.

Local test without touching Firestore:

```
PUBLIX_ZIP=33602 node scripts/fetch-publix-bogos.mjs --dry-run
```

The script exits non-zero if it finds zero deals, so a failed scrape shows up as a red run instead of silently wiping your list.

## Firestore rules

Apply `firestore.rules` in the Firebase console. The two new collections (`recipeFavorites`, `meta`) need rules just like the existing ones; without them favorites fall back to this device only and the BOGO "last updated" banner stays blank.

## Notifications

Expiry alerts fire when you open the app (there's no server). Tap the bell in the header to enable them.

## Development

Everything is static — open `index.html` from any local web server:

```
npx serve .
```

Bump the `?v=` query on the asset tags in `index.html` and `CACHE_NAME` in `sw.js` when you ship changes so installed apps pick them up.
