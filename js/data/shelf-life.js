/*
 * Shelf-life reference data, in days from the day an item is added, by
 * storage location. General consumer guidance, not food-safety
 * guarantees — always trust your own senses and any printed date over
 * this estimate.
 */
(function (global) {
  "use strict";

  const STORAGE_OPTIONS = [
    { value: "counter", label: "Counter", icon: "🍽️" },
    { value: "pantry", label: "Pantry", icon: "🗄️" },
    { value: "fridge", label: "Fridge", icon: "🧊" },
    { value: "freezer", label: "Freezer", icon: "❄️" }
  ];

  const ENTRIES = [
    { keywords: ["apple"], life: { counter: 7, fridge: 35, freezer: 240 }, defaultStorage: "fridge" },
    { keywords: ["banana"], life: { counter: 5, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["orange"], life: { counter: 7, fridge: 21 }, defaultStorage: "fridge" },
    { keywords: ["mandarin", "clementine", "tangerine"], life: { counter: 7, fridge: 21 }, defaultStorage: "fridge" },
    { keywords: ["lemon"], life: { counter: 7, fridge: 28 }, defaultStorage: "fridge" },
    { keywords: ["lime"], life: { counter: 7, fridge: 28 }, defaultStorage: "fridge" },
    { keywords: ["grape"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["strawberry"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["blueberry"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["raspberry"], life: { fridge: 3 }, defaultStorage: "fridge" },
    { keywords: ["blackberry"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["pineapple"], life: { counter: 3, fridge: 5 }, defaultStorage: "counter" },
    { keywords: ["watermelon"], life: { counter: 10, fridge: 5 }, defaultStorage: "counter" },
    { keywords: ["cantaloupe", "melon", "honeydew"], life: { counter: 4, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["mango"], life: { counter: 5, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["avocado"], life: { counter: 5, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["peach", "nectarine"], life: { counter: 4, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["pear"], life: { counter: 5, fridge: 14 }, defaultStorage: "counter" },
    { keywords: ["plum"], life: { counter: 4, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["kiwi"], life: { counter: 7, fridge: 28 }, defaultStorage: "counter" },
    { keywords: ["cherry"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["broccoli"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["cauliflower"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["carrot"], life: { fridge: 28 }, defaultStorage: "fridge" },
    { keywords: ["celery"], life: { fridge: 14 }, defaultStorage: "fridge" },
    { keywords: ["cucumber"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["zucchini"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["winter squash", "butternut squash", "acorn squash"], life: { pantry: 60, fridge: 14 }, defaultStorage: "pantry" },
    { keywords: ["squash", "summer squash"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["bell pepper", "pepper"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["tomato"], life: { counter: 5, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["sweet potato", "yam"], life: { pantry: 35 }, defaultStorage: "pantry" },
    { keywords: ["potato"], life: { pantry: 45 }, defaultStorage: "pantry" },
    { keywords: ["onion"], life: { pantry: 30 }, defaultStorage: "pantry" },
    { keywords: ["garlic"], life: { pantry: 120 }, defaultStorage: "pantry" },
    { keywords: ["ginger"], life: { fridge: 21 }, defaultStorage: "fridge" },
    { keywords: ["lettuce"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["spinach"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["kale"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["cabbage"], life: { fridge: 30 }, defaultStorage: "fridge" },
    { keywords: ["mushroom"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["green bean"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["corn"], life: { fridge: 3 }, defaultStorage: "fridge" },
    { keywords: ["asparagus"], life: { fridge: 4 }, defaultStorage: "fridge" },
    { keywords: ["eggplant"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["radish"], life: { fridge: 14 }, defaultStorage: "fridge" },
    { keywords: ["beet"], life: { fridge: 21 }, defaultStorage: "fridge" },
    { keywords: ["brussels sprout"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["artichoke"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["basil"], life: { counter: 5, fridge: 7 }, defaultStorage: "counter" },
    { keywords: ["cilantro", "parsley", "herb", "dill", "mint"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["pea"], life: { fridge: 5 }, defaultStorage: "fridge" },

    { keywords: ["milk"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["egg"], life: { fridge: 28 }, defaultStorage: "fridge" },
    { keywords: ["butter"], life: { fridge: 60, freezer: 270 }, defaultStorage: "fridge" },
    { keywords: ["cream cheese"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["cottage cheese"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["sour cream"], life: { fridge: 21 }, defaultStorage: "fridge" },
    { keywords: ["heavy cream", "half and half", "creamer"], life: { fridge: 10 }, defaultStorage: "fridge" },
    { keywords: ["mozzarella"], life: { fridge: 14 }, defaultStorage: "fridge" },
    { keywords: ["cheddar", "cheese"], life: { fridge: 30 }, defaultStorage: "fridge" },
    { keywords: ["yogurt"], life: { fridge: 14 }, defaultStorage: "fridge" },

    { keywords: ["chicken"], life: { fridge: 2, freezer: 270 }, defaultStorage: "fridge" },
    { keywords: ["ground beef", "ground turkey", "ground pork"], life: { fridge: 2, freezer: 120 }, defaultStorage: "fridge" },
    { keywords: ["steak", "beef"], life: { fridge: 4, freezer: 270 }, defaultStorage: "fridge" },
    { keywords: ["pork"], life: { fridge: 4, freezer: 180 }, defaultStorage: "fridge" },
    { keywords: ["bacon"], life: { fridge: 7, freezer: 150 }, defaultStorage: "fridge" },
    { keywords: ["sausage"], life: { fridge: 2, freezer: 60 }, defaultStorage: "fridge" },
    { keywords: ["salmon"], life: { fridge: 2, freezer: 90 }, defaultStorage: "fridge" },
    { keywords: ["shrimp"], life: { fridge: 2, freezer: 180 }, defaultStorage: "fridge" },
    { keywords: ["fish"], life: { fridge: 2, freezer: 180 }, defaultStorage: "fridge" },
    { keywords: ["turkey"], life: { fridge: 2, freezer: 270 }, defaultStorage: "fridge" },
    { keywords: ["deli meat", "lunch meat", "ham"], life: { fridge: 5 }, defaultStorage: "fridge", afterOpening: 4 },
    { keywords: ["hot dog"], life: { fridge: 7, freezer: 60 }, defaultStorage: "fridge" },
    { keywords: ["tofu"], life: { fridge: 7 }, defaultStorage: "fridge" },

    { keywords: ["bread"], life: { pantry: 5, fridge: 14, freezer: 90 }, defaultStorage: "pantry" },
    { keywords: ["bagel"], life: { pantry: 5, freezer: 90 }, defaultStorage: "pantry" },
    { keywords: ["tortilla"], life: { fridge: 21, pantry: 7 }, defaultStorage: "fridge" },

    { keywords: ["rice"], life: { pantry: 730 }, defaultStorage: "pantry" },
    { keywords: ["pasta"], life: { pantry: 730 }, defaultStorage: "pantry" },
    { keywords: ["flour"], life: { pantry: 240 }, defaultStorage: "pantry" },
    { keywords: ["sugar"], life: { pantry: 730 }, defaultStorage: "pantry" },
    { keywords: ["cereal"], life: { pantry: 240 }, defaultStorage: "pantry" },
    { keywords: ["bean", "canned soup", "broth", "stock"], life: { pantry: 730 }, defaultStorage: "pantry", afterOpening: 4 },
    { keywords: ["peanut butter"], life: { pantry: 270 }, defaultStorage: "pantry" },
    { keywords: ["honey"], life: { pantry: 1825 }, defaultStorage: "pantry" },
    { keywords: ["hummus"], life: { fridge: 14 }, defaultStorage: "fridge", afterOpening: 7 },
    { keywords: ["salsa"], life: { pantry: 365, fridge: 14 }, defaultStorage: "pantry", afterOpening: 14 },
    { keywords: ["guacamole"], life: { fridge: 5 }, defaultStorage: "fridge", afterOpening: 4 },
    { keywords: ["mayo", "mayonnaise"], life: { fridge: 180 }, defaultStorage: "fridge", afterOpening: 60 },
    { keywords: ["ketchup"], life: { pantry: 365 }, defaultStorage: "pantry", afterOpening: 180 },
    { keywords: ["mustard"], life: { pantry: 730 }, defaultStorage: "pantry", afterOpening: 365 },
    { keywords: ["jam", "jelly", "preserve"], life: { pantry: 365 }, defaultStorage: "pantry", afterOpening: 180 },
    { keywords: ["pickle"], life: { pantry: 730 }, defaultStorage: "pantry", afterOpening: 30 },
    { keywords: ["salad dressing", "ranch", "dressing"], life: { fridge: 180 }, defaultStorage: "fridge", afterOpening: 30 },
    { keywords: ["pesto"], life: { fridge: 14 }, defaultStorage: "fridge", afterOpening: 7 },
    { keywords: ["oat"], life: { pantry: 365 }, defaultStorage: "pantry" },
    { keywords: ["cracker"], life: { pantry: 180 }, defaultStorage: "pantry" },
    { keywords: ["chip"], life: { pantry: 60 }, defaultStorage: "pantry" },
    { keywords: ["coffee"], life: { pantry: 90 }, defaultStorage: "pantry" },
    { keywords: ["tea"], life: { pantry: 365 }, defaultStorage: "pantry" },

    { keywords: ["juice"], life: { fridge: 7 }, defaultStorage: "fridge" },
    { keywords: ["soda", "pop"], life: { pantry: 270 }, defaultStorage: "pantry" },

    { keywords: ["leftover"], life: { fridge: 4 }, defaultStorage: "fridge" },
    { keywords: ["cooked rice"], life: { fridge: 5 }, defaultStorage: "fridge" },
    { keywords: ["soup"], life: { fridge: 4 }, defaultStorage: "fridge" }
  ];

  const KEYWORD_MAP = new Map();
  ENTRIES.forEach(entry => {
    entry.keywords.forEach(kw => KEYWORD_MAP.set(kw, entry));
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

  const CANNED_MATCH = { matchedKeyword: "canned", life: { pantry: 730 }, defaultStorage: "pantry", afterOpening: 4 };

  function lookup(name) {
    if (!name) return null;
    const words = normalizeWords(name);
    if (words.length === 0) return null;

    // "Canned" overrides the specific ingredient (e.g. "Canned Corn" is
    // pantry-stable for years, not fresh corn's 3-day fridge estimate).
    if (words.includes("canned") || words.includes("can")) return CANNED_MATCH;

    const maxWindow = Math.min(3, words.length);
    for (let windowSize = maxWindow; windowSize >= 1; windowSize--) {
      for (let start = 0; start + windowSize <= words.length; start++) {
        const candidate = words.slice(start, start + windowSize).join(" ");
        if (KEYWORD_MAP.has(candidate)) {
          const entry = KEYWORD_MAP.get(candidate);
          return { matchedKeyword: candidate, life: entry.life, defaultStorage: entry.defaultStorage, afterOpening: entry.afterOpening ?? null };
        }
      }
    }
    return null;
  }

  function daysFor(match, storage) {
    if (!match) return null;
    return match.life[storage] ?? match.life[match.defaultStorage] ?? Object.values(match.life)[0] ?? null;
  }

  function daysAfterOpening(match) {
    return match ? match.afterOpening ?? null : null;
  }

  global.ShelfLifeDB = { lookup, daysFor, daysAfterOpening, STORAGE_OPTIONS };
})(window);
