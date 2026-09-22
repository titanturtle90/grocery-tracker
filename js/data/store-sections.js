/*
 * Typical grocery-store department for common items — a general default
 * guess, not specific to any one store. The shopping list lets you
 * override this per item (e.g. a real aisle number) and remembers what
 * you set, so it gets more accurate to your actual store over time.
 */
(function (global) {
  "use strict";

  const SECTION_ORDER = ["Produce", "Poultry", "Seafood", "Beef", "Deli", "Dairy"];
  const AISLE_COUNT = 13;
  const LOCATION_OPTIONS = [...SECTION_ORDER, ...Array.from({ length: AISLE_COUNT }, (_, i) => `Aisle ${i + 1}`)];

  const ENTRIES = [
    { keywords: ["apple", "banana", "orange", "mandarin", "clementine", "tangerine", "lemon", "lime", "grape", "strawberry", "blueberry", "raspberry", "blackberry", "pineapple", "watermelon", "cantaloupe", "melon", "honeydew", "mango", "avocado", "peach", "nectarine", "pear", "plum", "kiwi", "cherry", "broccoli", "cauliflower", "carrot", "celery", "cucumber", "zucchini", "squash", "bell pepper", "pepper", "tomato", "sweet potato", "yam", "potato", "onion", "garlic", "ginger", "lettuce", "spinach", "kale", "cabbage", "mushroom", "green bean", "corn", "asparagus", "eggplant", "radish", "beet", "brussels sprout", "artichoke", "basil", "cilantro", "parsley", "herb", "dill", "mint", "pea"], section: "Produce" },
    { keywords: ["milk", "egg", "butter", "cream cheese", "cottage cheese", "sour cream", "heavy cream", "half and half", "creamer", "mozzarella", "cheddar", "cheese", "yogurt"], section: "Dairy" },
    { keywords: ["chicken", "ground turkey", "turkey"], section: "Poultry" },
    { keywords: ["salmon", "shrimp", "fish", "tuna", "crab", "lobster", "scallop"], section: "Seafood" },
    { keywords: ["ground beef", "steak", "beef", "pork", "bacon", "sausage", "ground pork"], section: "Beef" },
    { keywords: ["deli meat", "lunch meat", "ham", "hot dog"], section: "Deli" }
  ];

  const KEYWORD_MAP = new Map();
  ENTRIES.forEach(entry => {
    entry.keywords.forEach(kw => KEYWORD_MAP.set(kw, entry.section));
  });

  function singularize(word) {
    if (word.length <= 3) return word;
    if (word.endsWith("ies")) return word.slice(0, -3) + "y";
    if (word.endsWith("oes")) return word.slice(0, -2);
    if (word.endsWith("ches") || word.endsWith("shes") || word.endsWith("xes") || word.endsWith("ses")) {
      return word.slice(0, -2);
    }
    if (word.endsWith("us")) return word;
    if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
    return word;
  }

  function normalizeWords(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map(singularize);
  }

  function lookup(name) {
    if (!name) return null;
    const words = normalizeWords(name);
    if (words.length === 0) return null;

    const maxWindow = Math.min(3, words.length);
    for (let windowSize = maxWindow; windowSize >= 1; windowSize--) {
      for (let start = 0; start + windowSize <= words.length; start++) {
        const candidate = words.slice(start, start + windowSize).join(" ");
        if (KEYWORD_MAP.has(candidate)) return KEYWORD_MAP.get(candidate);
      }
    }
    return null;
  }

  global.StoreSections = { lookup, SECTION_ORDER, LOCATION_OPTIONS };
})(window);
