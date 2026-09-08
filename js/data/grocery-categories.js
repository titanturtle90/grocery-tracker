/*
 * Best-effort category guess for the Groceries add form, matched against
 * the app's fixed category dropdown (Produce, Dairy, Meat & Seafood,
 * Bakery, Frozen, Pantry, Beverages, Leftovers). Falls back to null
 * ("Other") when nothing matches.
 */
(function (global) {
  "use strict";

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const ENTRIES = [
    { keywords: ["apple", "banana", "orange", "mandarin", "clementine", "tangerine", "lemon", "lime", "grape", "strawberry", "blueberry", "raspberry", "blackberry", "pineapple", "watermelon", "cantaloupe", "melon", "honeydew", "mango", "avocado", "peach", "nectarine", "pear", "plum", "kiwi", "cherry", "broccoli", "cauliflower", "carrot", "celery", "cucumber", "zucchini", "squash", "bell pepper", "pepper", "tomato", "sweet potato", "yam", "potato", "onion", "garlic", "ginger", "lettuce", "spinach", "kale", "cabbage", "mushroom", "green bean", "corn", "asparagus", "eggplant", "radish", "beet", "brussels sprout", "artichoke", "basil", "cilantro", "parsley", "herb", "dill", "mint", "pea"], category: "Produce" },
    { keywords: ["milk", "egg", "butter", "cream cheese", "cottage cheese", "sour cream", "heavy cream", "half and half", "creamer", "mozzarella", "cheddar", "cheese", "yogurt"], category: "Dairy" },
    { keywords: ["chicken", "ground beef", "ground turkey", "ground pork", "steak", "beef", "pork", "bacon", "sausage", "salmon", "shrimp", "fish", "turkey", "deli meat", "lunch meat", "ham", "hot dog", "tofu"], category: "Meat & Seafood" },
    { keywords: ["bread", "bagel", "tortilla"], category: "Bakery" },
    { keywords: ["ice cream", "popsicle", "frozen pizza", "frozen waffle", "frozen vegetable", "frozen fruit", "frozen meal", "frozen dinner", "hash brown", "tater tot"], category: "Frozen" },
    { keywords: ["rice", "pasta", "flour", "sugar", "cereal", "bean", "broth", "stock", "peanut butter", "honey", "oat", "cracker", "chip", "coffee", "tea"], category: "Pantry" },
    { keywords: ["juice", "soda", "pop", "water", "gatorade"], category: "Beverages" },
    { keywords: ["leftover", "cooked rice", "soup"], category: "Leftovers" }
  ];

  const KEYWORD_MAP = new Map();
  ENTRIES.forEach(entry => {
    entry.keywords.forEach(kw => KEYWORD_MAP.set(kw, entry.category));
  });
  const COMPILED = Array.from(KEYWORD_MAP.keys())
    .sort((a, b) => b.length - a.length)
    .map(kw => ({ kw, re: new RegExp("\\b" + escapeRegExp(kw) + "s?\\b", "i") }));

  const CANNED_RE = /\bcanned\b/i;

  function lookup(name) {
    if (!name) return null;
    // "Canned" overrides the specific ingredient — "Canned Corn" belongs in
    // Pantry, not Produce.
    if (CANNED_RE.test(name)) return "Pantry";
    for (const { kw, re } of COMPILED) {
      if (re.test(name)) return KEYWORD_MAP.get(kw);
    }
    return null;
  }

  global.GroceryCategories = { lookup };
})(window);
