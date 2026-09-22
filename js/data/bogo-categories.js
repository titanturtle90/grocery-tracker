/*
 * Best-effort department guess for BOGO deal items, modeled loosely on
 * Publix's own weekly-ad category taxonomy. Used only to group/sort the
 * BOGO list — not stored, so it re-evaluates fresh each time.
 */
(function (global) {
  "use strict";

  const CATEGORY_ORDER = [
    "Produce", "Deli", "Bakery", "Meat", "Seafood", "Dairy", "Frozen Food",
    "Beverages", "Beer & Wine", "Liquor", "Health & Nutrition", "Baby",
    "Beauty & Personal Care", "Pet", "Housewares", "Non-Foods", "Grocery"
  ];

  const ENTRIES = [
    { keywords: ["apple", "banana", "orange", "lemon", "lime", "grape", "berry", "melon", "cucumber", "garlic", "onion", "potato", "tomato", "lettuce", "avocado", "mushroom", "pepper", "squash", "carrot", "celery", "broccoli", "cauliflower", "kale", "spinach", "cabbage", "ginger"], category: "Produce" },
    { keywords: ["deli", "charcuterie", "pepperoni", "salami", "brie", "gorgonzola", "parmigiano", "camembert", "prosciutto", "lunch meat"], category: "Deli" },
    { keywords: ["bread", "bagel", "croissant", "muffin", "cheesecake", "pound cake", "loaf cake", "bun", "roll"], category: "Bakery" },
    { keywords: ["chicken", "turkey burger", "beef", "pork", "steak", "bacon", "sausage", "meatball", "hot dog", "frank", "kielbasa", "corn dog", "ground turkey", "ham"], category: "Meat" },
    { keywords: ["shrimp", "salmon", "tuna", "crab", "lobster", "tilapia", "cod", "scallop", "fish"], category: "Seafood" },
    { keywords: ["milk", "cheese", "yogurt", "yoghurt", "cream", "butter", "egg", "kefir"], category: "Dairy" },
    { keywords: ["ice cream", "gelato", "sorbet", "frozen", "waffle", "hashbrown", "french fried potato", "pizza", "hot pocket", "skillet meal", "popsicle", "ice pop", "tater tot", "frittata", "entrée"], category: "Frozen Food" },
    { keywords: ["water", "juice", "soda", "coffee", "tea", "sparkling", "gatorade", "smoothie", "punch", "k-cup", "hydration"], category: "Beverages" },
    { keywords: ["wine", "cabernet", "chardonnay", "merlot", "pinot", "brewing co", "beer", "wicked apple", "ale"], category: "Beer & Wine" },
    { keywords: ["vodka", "whiskey", "bourbon", "rum", "tequila", "liqueur", "scotch"], category: "Liquor" },
    { keywords: ["protein", "supplement", "vitamin", "probiotic", "fiber cereal", "electrolyte"], category: "Health & Nutrition" },
    { keywords: ["baby", "diaper", "newborn", "infant"], category: "Baby" },
    { keywords: ["shampoo", "conditioner", "deodorant", "razor", "toothpaste", "toothbrush", "lotion", "sunscreen", "acne"], category: "Beauty & Personal Care" },
    { keywords: ["dog", "cat", "pet", "kibble", "flea", "tick"], category: "Pet" },
    { keywords: ["candle", "light bulb", "night light", "lighter", "plastic cup", "napkin"], category: "Housewares" },
    { keywords: ["detergent", "dish liquid", "dish soap", "disinfect", "stain remover", "drain", "insecticide", "trash bag", "sponge", "cleaner", "aluminum foil", "wipes"], category: "Non-Foods" }
  ];

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const KEYWORD_MAP = new Map();
  ENTRIES.forEach(entry => {
    entry.keywords.forEach(kw => KEYWORD_MAP.set(kw, entry.category));
  });
  // Word-boundary matches only, longest keyword wins — plain substring
  // matching produced false positives like "pepper" inside "Pepperidge"
  // or "ale" inside "Valencia".
  const COMPILED = Array.from(KEYWORD_MAP.keys())
    .sort((a, b) => b.length - a.length)
    .map(kw => ({ kw, re: new RegExp("\\b" + escapeRegExp(kw) + "s?\\b", "i") }));

  function lookup(name) {
    if (!name) return "Grocery";
    for (const { kw, re } of COMPILED) {
      if (re.test(name)) return KEYWORD_MAP.get(kw);
    }
    return "Grocery";
  }

  global.BogoCategories = { lookup, CATEGORY_ORDER };
})(window);
