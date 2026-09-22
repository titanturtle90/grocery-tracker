/* Recipe database, part B (seafood, vegetarian mains, pasta & grains). */
window.RECIPE_DATA = window.RECIPE_DATA || [];
window.RECIPE_DATA.push(
  {
    id: "garlic-shrimp-scampi", name: "Garlic Shrimp Scampi", emoji: "🦐", cuisine: "Italian", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "date-night", "pasta"], diet: [],
    desc: "Plump shrimp in garlic-butter-white wine sauce over linguine, finished with lemon and parsley.",
    ing: [["shrimp", "1 lb", "large shrimp, peeled"], ["pasta", "12 oz", "linguine or angel hair"], ["butter", "4 tbsp", "butter"], ["olive-oil", "2 tbsp", "olive oil"], ["garlic", "5 cloves", "garlic, thinly sliced"], ["wine", "½ cup", "dry white wine (or broth)"], ["lemon", "1", "lemon"], ["red-pepper-flakes", "¼ tsp", "red pepper flakes"], ["parsley", "¼ cup", "parsley, chopped"], ["parmesan", "", "parmesan", true]],
    steps: ["Cook the pasta in salted water; reserve ½ cup water before draining.", "Season the shrimp. Heat the oil and 1 tablespoon butter over medium-high; cook the shrimp 1 minute per side until just pink. Remove.", "Lower to medium, add the garlic and pepper flakes; cook 1 minute. Pour in the wine and simmer 2 minutes.", "Add the remaining butter, lemon juice and zest, shrimp, and pasta. Toss with pasta water until glossy. Finish with parsley."],
    tip: "Shrimp cook in 2 minutes total — pull them early and let them finish in the sauce."
  },
  {
    id: "shrimp-tacos", name: "Shrimp Tacos with Lime Slaw", emoji: "🌮", cuisine: "Mexican", meal: ["dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["quick", "summer", "healthy"], diet: ["dairy-free-option", "gluten-free-option"],
    desc: "Chili-lime shrimp, crunchy cabbage slaw, and a creamy drizzle in warm tortillas.",
    ing: [["shrimp", "1 lb", "shrimp, peeled"], ["tortilla", "8", "small tortillas"], ["cabbage", "3 cups", "shredded cabbage or slaw mix"], ["lime", "2", "limes"], ["cilantro", "½ cup", "cilantro, chopped"], [["sour-cream", "mayo", "yogurt"], "⅓ cup", "sour cream or mayo"], ["hot-sauce", "1 tbsp", "sriracha or hot sauce", true], ["cumin", "1 tsp", "chili powder + ½ tsp cumin"], ["garlic-powder", "½ tsp", "garlic powder"], ["avocado", "1", "avocado", true], ["olive-oil", "1 tbsp", "oil"]],
    steps: ["Toss the cabbage with the juice of 1 lime, half the cilantro, and a pinch of salt. Mix the sour cream, sriracha, and a squeeze of lime for the sauce.", "Toss the shrimp with the chili powder, cumin, garlic powder, salt, and oil.", "Sear in a hot skillet 1–2 minutes per side until pink and lightly charred. Squeeze the remaining lime over.", "Warm the tortillas. Fill with slaw, shrimp, avocado, sauce, and cilantro."],
    tip: "Frozen shrimp thaw in 10 minutes under cold running water."
  },
  {
    id: "shrimp-fried-rice", name: "Shrimp Fried Rice", emoji: "🍚", cuisine: "Chinese", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "leftovers", "one-pan"], diet: ["dairy-free"],
    desc: "Wok-charred rice with juicy shrimp, egg, and peas — done faster than the delivery app.",
    ing: [["shrimp", "¾ lb", "shrimp, peeled"], ["rice", "4 cups", "cold cooked rice"], ["eggs", "3", "eggs"], ["peas", "1 cup", "frozen peas and carrots"], ["garlic", "3 cloves", "garlic, minced"], ["green-onion", "4", "green onions"], ["soy-sauce", "3 tbsp", "soy sauce"], ["sesame-oil", "1 tsp", "sesame oil"], ["olive-oil", "3 tbsp", "oil"]],
    steps: ["Sear the shrimp in 1 tablespoon oil over high heat, 1 minute per side. Remove.", "Scramble the eggs in 1 tablespoon oil; remove.", "Add remaining oil, garlic, and vegetables; stir 1 minute. Add the rice and press flat; let sizzle 2 minutes, toss, and repeat.", "Return shrimp and eggs, add soy sauce and sesame oil, toss, and finish with green onions."],
    tip: "Highest heat you've got and don't crowd the pan — that's where the smoky flavor comes from."
  },
  {
    id: "honey-garlic-salmon", name: "Honey Garlic Glazed Salmon", emoji: "🐟", cuisine: "American", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "healthy", "one-pan"], diet: ["dairy-free", "gluten-free-option"],
    desc: "Crisp-edged salmon fillets in a sticky honey-soy-garlic glaze. Weeknight fancy in 20 minutes.",
    ing: [["salmon", "4 (6 oz)", "salmon fillets"], ["honey", "3 tbsp", "honey"], ["soy-sauce", "2 tbsp", "soy sauce"], ["garlic", "3 cloves", "garlic, minced"], ["lemon", "1", "lemon"], ["olive-oil", "1 tbsp", "oil"], ["red-pepper-flakes", "¼ tsp", "red pepper flakes", true], ["rice", "1½ cups", "rice, for serving", true], ["broccoli", "1 head", "broccoli or asparagus", true]],
    steps: ["Pat the salmon dry and season. Whisk the honey, soy sauce, garlic, half the lemon juice, and pepper flakes.", "Heat the oil in a skillet over medium-high. Sear the salmon skin-side up 4 minutes until golden. Flip.", "Pour the glaze around the fish and simmer 3–4 minutes, spooning it over, until the salmon flakes and the sauce is syrupy.", "Finish with the remaining lemon. Serve over rice with steamed broccoli."],
    tip: "Salmon is done when it flakes at the thickest part but still looks slightly translucent in the center."
  },
  {
    id: "sheet-pan-salmon-veggies", name: "Sheet-Pan Lemon Salmon & Vegetables", emoji: "🍋", cuisine: "Mediterranean", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["one-pan", "healthy", "meal-prep"], diet: ["gluten-free", "dairy-free", "low-carb"],
    desc: "Salmon, asparagus, and potatoes roasted on one pan with lemon, garlic, and herbs.",
    ing: [["salmon", "4 (6 oz)", "salmon fillets"], ["potato", "1 lb", "baby potatoes, halved"], [["asparagus", "green-beans", "broccoli"], "1 bunch", "asparagus or green beans"], ["lemon", "1", "lemon, sliced"], ["garlic", "3 cloves", "garlic, minced"], ["olive-oil", "3 tbsp", "olive oil"], ["rosemary", "1 tbsp", "fresh dill, thyme, or rosemary"], ["salt", "", "salt and pepper"]],
    steps: ["Heat the oven to 425°F. Toss the potatoes with 1 tablespoon oil and salt; roast 15 minutes.", "Mix the remaining oil, garlic, herbs, salt, and pepper. Push the potatoes aside, add the asparagus and salmon, and brush everything with the garlic oil. Lay lemon slices over the fish.", "Roast 12–14 minutes until the salmon flakes and the asparagus is tender."],
    tip: "Thick fillets need the full 14 minutes; thin tail pieces are done at 10."
  },
  {
    id: "fish-tacos", name: "Crispy Baja Fish Tacos", emoji: "🐟", cuisine: "Mexican", meal: ["dinner"], time: 30, servings: 4, difficulty: "medium",
    tags: ["summer", "crowd-pleaser"], diet: ["dairy-free-option"],
    desc: "Beer-battered white fish, crunchy cabbage, and chipotle crema in warm corn tortillas.",
    ing: [["white-fish", "1½ lb", "cod, tilapia, or mahi, cut into strips"], ["flour", "1 cup", "flour"], ["beer", "¾ cup", "beer (or sparkling water)"], ["baking-powder", "1 tsp", "baking powder"], ["cumin", "1 tsp", "chili powder + ½ tsp cumin"], ["tortilla", "8", "corn tortillas"], ["cabbage", "3 cups", "shredded cabbage"], ["lime", "2", "limes"], [["mayo", "sour-cream"], "⅓ cup", "mayo or sour cream"], ["hot-sauce", "1 tbsp", "chipotle in adobo or hot sauce"], ["cilantro", "", "cilantro"], ["olive-oil", "2 cups", "oil, for frying"]],
    steps: ["Toss the cabbage with the juice of 1 lime and salt. Mix the mayo with the chipotle and a squeeze of lime.", "Whisk the flour, baking powder, spices, 1 teaspoon salt, and beer into a batter the texture of pancake batter.", "Heat 1 inch of oil to 365°F. Pat the fish dry, dip in batter, and fry 3–4 minutes until golden and crisp. Drain on a rack; salt.", "Warm the tortillas. Fill with slaw, fish, crema, cilantro, and lime."],
    tip: "For a lighter version, skip the batter: season the fish and pan-sear 3 minutes per side."
  },
  {
    id: "lemon-butter-fish", name: "Pan-Seared Fish with Lemon Butter", emoji: "🍋", cuisine: "American", meal: ["dinner"], time: 15, servings: 4, difficulty: "easy",
    tags: ["quick", "healthy", "low-carb"], diet: ["gluten-free", "low-carb"],
    desc: "Any white fish, golden in 8 minutes, finished with a lemon-caper-butter pan sauce.",
    ing: [["white-fish", "4 (6 oz)", "tilapia, cod, or flounder fillets"], ["butter", "3 tbsp", "butter"], ["lemon", "1", "lemon"], ["garlic", "2 cloves", "garlic, minced"], ["capers", "1 tbsp", "capers", true], ["parsley", "2 tbsp", "parsley"], ["flour", "2 tbsp", "flour, for dusting", true], ["olive-oil", "1 tbsp", "oil"], ["rice", "", "rice or potatoes, for serving", true]],
    steps: ["Pat the fish dry, season, and dust lightly with flour.", "Heat the oil and 1 tablespoon butter over medium-high. Cook the fish 3 minutes per side until golden and opaque. Plate.", "Add the remaining butter, garlic, and capers to the pan; cook 30 seconds. Add the lemon juice and parsley, swirl, and pour over the fish."],
    tip: "Flour is optional but gives a beautiful golden crust that holds the sauce."
  },
  {
    id: "tuna-melts", name: "Diner Tuna Melts", emoji: "🥪", cuisine: "American", meal: ["lunch"], time: 15, servings: 2, difficulty: "easy",
    tags: ["quick", "pantry", "lunch"], diet: [],
    desc: "Crunchy celery-studded tuna salad under bubbling cheddar on toasted bread.",
    ing: [["tuna", "2 (5 oz) cans", "tuna, drained"], ["mayo", "3 tbsp", "mayo"], ["celery", "1 stalk", "celery, finely diced"], ["onion", "2 tbsp", "red onion, minced", true], ["pickles", "1 tbsp", "relish or chopped pickles", true], ["mustard", "1 tsp", "Dijon"], ["lemon", "½", "lemon"], ["bread", "4 slices", "sourdough or rye"], ["cheddar", "4 slices", "cheddar"], ["tomato", "1", "tomato, sliced", true], ["butter", "1 tbsp", "butter"]],
    steps: ["Mix the tuna, mayo, celery, onion, relish, Dijon, lemon juice, salt, and pepper.", "Butter one side of each bread slice. Toast butter-side down in a skillet until golden. Flip.", "Top each with tuna, tomato, and cheddar. Cover the pan (or broil) 2–3 minutes until the cheese melts."],
    tip: "Open-faced under the broiler is faster; closed in the skillet is the classic."
  },
  {
    id: "tuna-pasta-salad", name: "Lemony Tuna Pasta Salad", emoji: "🥗", cuisine: "Mediterranean", meal: ["lunch"], time: 20, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "pantry", "no-cook-ish"], diet: ["dairy-free-option"],
    desc: "Pasta tossed with tuna, crunchy veg, olives, and a bright lemon-olive-oil dressing. Great cold for lunches.",
    ing: [["pasta", "8 oz", "rotini or shells"], ["tuna", "2 (5 oz) cans", "tuna in oil, drained"], ["cucumber", "1", "cucumber, diced"], ["tomato", "1 cup", "cherry tomatoes, halved"], ["olives", "⅓ cup", "olives, sliced", true], ["onion", "¼", "red onion, minced"], ["lemon", "1", "lemon"], ["olive-oil", "3 tbsp", "olive oil"], ["parsley", "¼ cup", "parsley or dill"], ["feta", "½ cup", "feta", true], ["mustard", "1 tsp", "Dijon"]],
    steps: ["Cook the pasta; rinse under cold water and drain well.", "Whisk the lemon juice, olive oil, Dijon, salt, and pepper.", "Toss everything together. Taste and add more lemon or salt. Chill 15 minutes if you can."],
    tip: "Keeps 3 days — the flavor is even better on day two."
  },
  {
    id: "crab-cakes", name: "Maryland-Style Crab Cakes", emoji: "🦀", cuisine: "American", meal: ["dinner"], time: 30, servings: 4, difficulty: "medium",
    tags: ["date-night", "special"], diet: [],
    desc: "Mostly crab, barely bound, pan-fried golden. Serve with lemon and a quick remoulade.",
    ing: [["crab", "1 lb", "lump crab meat"], ["mayo", "⅓ cup", "mayo"], ["eggs", "1", "egg"], ["mustard", "1 tsp", "Dijon"], ["worcestershire", "1 tsp", "Worcestershire"], ["breadcrumbs", "½ cup", "panko or crushed crackers"], ["parsley", "2 tbsp", "parsley"], ["lemon", "1", "lemon"], ["cumin", "1 tsp", "Old Bay or paprika"], ["butter", "2 tbsp", "butter"], ["olive-oil", "1 tbsp", "oil"]],
    steps: ["Whisk the mayo, egg, Dijon, Worcestershire, Old Bay, and parsley. Gently fold in the crab and panko — keep the lumps intact.", "Shape into 8 cakes and chill 15 minutes to firm up.", "Heat the butter and oil over medium. Cook 3–4 minutes per side until deep golden.", "Serve with lemon wedges and mayo spiked with hot sauce and pickle relish."],
    tip: "Chilling is what keeps them from falling apart in the pan."
  },
  {
    id: "seared-scallops", name: "Seared Scallops with Brown Butter", emoji: "🐚", cuisine: "French", meal: ["dinner"], time: 15, servings: 2, difficulty: "medium",
    tags: ["date-night", "quick", "low-carb"], diet: ["gluten-free", "low-carb"],
    desc: "Golden-crusted scallops in nutty brown butter with lemon. Ten minutes to impressive.",
    ing: [["scallops", "1 lb", "large sea scallops, side muscle removed"], ["butter", "3 tbsp", "butter"], ["lemon", "1", "lemon"], ["garlic", "1 clove", "garlic, minced"], ["parsley", "1 tbsp", "parsley"], ["olive-oil", "1 tbsp", "high-heat oil"], ["salt", "", "salt and pepper"]],
    steps: ["Pat the scallops completely dry and season. Heat the oil in a skillet over high until shimmering.", "Add the scallops without crowding. Sear 2 minutes untouched until deeply golden. Flip.", "Add the butter and garlic. Cook 1 minute, spooning the foaming butter over, until the butter smells nutty.", "Off heat, add lemon juice and parsley. Serve immediately."],
    tip: "Dry scallops + a screaming-hot pan = crust. Wet scallops steam."
  },
  {
    id: "coconut-shrimp-curry", name: "Thai Coconut Shrimp Curry", emoji: "🍛", cuisine: "Thai", meal: ["dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["quick", "one-pot"], diet: ["dairy-free", "gluten-free"],
    desc: "Creamy red-curry coconut broth with shrimp, peppers, and spinach over jasmine rice.",
    ing: [["shrimp", "1 lb", "shrimp, peeled"], ["coconut-milk", "1 (14 oz) can", "coconut milk"], ["curry-paste", "2–3 tbsp", "red curry paste"], ["bell-pepper", "1", "bell pepper, sliced"], ["onion", "1", "onion, sliced"], ["garlic", "3 cloves", "garlic, minced"], ["ginger", "1 tbsp", "ginger, grated"], ["fish-sauce", "1 tbsp", "fish sauce (or soy)"], ["lime", "1", "lime"], ["spinach", "2 cups", "spinach", true], ["basil", "", "Thai or regular basil", true], ["rice", "1½ cups", "jasmine rice"], ["olive-oil", "1 tbsp", "oil"], ["sugar", "1 tsp", "sugar"]],
    steps: ["Cook the rice. Sauté the onion and pepper in the oil over medium-high 4 minutes. Add the garlic, ginger, and curry paste; stir 1 minute.", "Pour in the coconut milk, fish sauce, and sugar. Simmer 5 minutes.", "Add the shrimp and spinach; cook 3 minutes until the shrimp are pink.", "Finish with lime juice and basil. Serve over rice."],
    tip: "Swap the shrimp for chicken, tofu, or chickpeas — same timing, just cook chicken longer."
  },
  {
    id: "veggie-stir-fry", name: "Everything-in-the-Drawer Veggie Stir-Fry", emoji: "🥦", cuisine: "Asian", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "healthy", "use-it-up"], diet: ["vegetarian", "vegan", "dairy-free"],
    desc: "A flexible garlic-ginger stir-fry for whatever vegetables need using up, with a glossy sauce.",
    ing: [[["broccoli", "bell-pepper", "carrot", "zucchini", "mushroom", "cabbage", "frozen-veg", "green-beans", "asparagus"], "6 cups", "mixed vegetables (broccoli, peppers, carrots, snap peas, mushrooms...)"], ["garlic", "3 cloves", "garlic, minced"], ["ginger", "1 tbsp", "ginger, grated"], ["soy-sauce", "3 tbsp", "soy sauce"], ["honey", "1 tbsp", "honey or maple syrup"], ["vinegar", "1 tbsp", "rice vinegar"], ["flour", "1 tsp", "cornstarch"], ["sesame-oil", "1 tsp", "sesame oil"], ["olive-oil", "2 tbsp", "oil"], [["tofu", "eggs"], "14 oz", "tofu, cubed, or 3 eggs", true], ["rice", "1½ cups", "rice or noodles"], ["sesame", "", "sesame seeds", true]],
    steps: ["Whisk the soy sauce, honey, vinegar, cornstarch, sesame oil, and 3 tablespoons water.", "Heat the oil in a wok over high. If using tofu, crisp it first (4 minutes) and remove.", "Add the hardest vegetables first (carrots, broccoli), stir-fry 2 minutes, then the rest. Cook 3–4 minutes until crisp-tender and charred in spots.", "Add the garlic and ginger, stir 30 seconds, then the sauce and tofu. Toss until glossy. Serve over rice."],
    tip: "Cut everything roughly the same size so it finishes at the same time."
  },
  {
    id: "black-bean-tacos", name: "Crispy Black Bean Tacos", emoji: "🌮", cuisine: "Mexican", meal: ["dinner", "lunch"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "pantry", "budget"], diet: ["vegetarian", "gluten-free-option"],
    desc: "Smashed seasoned black beans and cheese griddled inside tortillas until crisp. Cheap, fast, addictive.",
    ing: [["black-beans", "2 (15 oz) cans", "black beans, drained"], ["tortilla", "8", "corn or flour tortillas"], [["cheese", "cheddar"], "1½ cups", "shredded cheese"], ["cumin", "1 tsp", "cumin + 1 tsp chili powder"], ["garlic", "2 cloves", "garlic, minced"], ["lime", "1", "lime"], ["salsa", "½ cup", "salsa"], ["avocado", "1", "avocado", true], ["cilantro", "", "cilantro", true], ["olive-oil", "2 tbsp", "oil"], ["onion", "½", "onion, diced", true]],
    steps: ["Sauté the onion and garlic in 1 tablespoon oil 3 minutes. Add the beans, spices, and ¼ cup water; mash roughly and cook 3 minutes. Season with lime and salt.", "Spread beans on half of each tortilla, top with cheese, and fold.", "Cook in a lightly oiled skillet over medium 2–3 minutes per side until golden and crisp.", "Serve with salsa, avocado, and cilantro."],
    tip: "Add leftover rice or roasted sweet potato to the filling to stretch it further."
  },
  {
    id: "chickpea-curry", name: "Chickpea & Spinach Curry", emoji: "🍛", cuisine: "Indian", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["pantry", "budget", "meal-prep", "one-pot"], diet: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    desc: "A creamy tomato-coconut chickpea curry that comes together from cans and a few spices.",
    ing: [["chickpeas", "2 (15 oz) cans", "chickpeas, drained"], ["onion", "1", "onion, diced"], ["garlic", "4 cloves", "garlic, minced"], ["ginger", "1 tbsp", "ginger, grated"], ["curry-paste", "2 tbsp", "curry powder or garam masala"], ["canned-tomatoes", "1 (14 oz) can", "diced tomatoes"], ["coconut-milk", "1 (14 oz) can", "coconut milk"], ["spinach", "4 cups", "spinach"], ["lime", "1", "lime or lemon"], ["cilantro", "", "cilantro", true], ["rice", "1½ cups", "rice or naan"], ["olive-oil", "2 tbsp", "oil"]],
    steps: ["Cook the onion in the oil over medium 6 minutes. Add the garlic, ginger, and spices; stir 1 minute.", "Add the tomatoes, coconut milk, and chickpeas. Simmer 15 minutes until thickened.", "Stir in the spinach until wilted. Season with salt and lime.", "Serve over rice or with naan, topped with cilantro."],
    tip: "Mash a third of the chickpeas for a thicker, creamier sauce."
  },
  {
    id: "veggie-fried-rice", name: "Veggie Egg Fried Rice", emoji: "🍚", cuisine: "Chinese", meal: ["dinner", "lunch"], time: 15, servings: 4, difficulty: "easy",
    tags: ["quick", "leftovers", "budget"], diet: ["vegetarian", "dairy-free"],
    desc: "Day-old rice, eggs, frozen veg, soy sauce. The 15-minute dinner that never fails.",
    ing: [["rice", "4 cups", "cold cooked rice"], ["eggs", "4", "eggs"], [["frozen-veg", "peas", "carrot", "corn"], "2 cups", "frozen peas, carrots, or mixed veg"], ["green-onion", "4", "green onions, sliced"], ["garlic", "3 cloves", "garlic, minced"], ["soy-sauce", "3 tbsp", "soy sauce"], ["sesame-oil", "1 tsp", "sesame oil"], ["olive-oil", "3 tbsp", "oil"], ["butter", "1 tbsp", "butter", true]],
    steps: ["Scramble the eggs in 1 tablespoon oil over high heat; break into pieces and remove.", "Add the remaining oil and the vegetables; stir-fry 2 minutes. Add the garlic.", "Add the rice, press flat, and let it crisp 2 minutes before tossing. Repeat.", "Add the eggs, soy sauce, sesame oil, and butter. Toss, then fold in green onions."],
    tip: "A knob of butter at the end is the secret to takeout-style richness."
  },
  {
    id: "caprese-pasta", name: "Caprese Pasta with Burst Tomatoes", emoji: "🍅", cuisine: "Italian", meal: ["dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["summer", "quick", "pasta"], diet: ["vegetarian"],
    desc: "Cherry tomatoes burst into a garlicky sauce, tossed with pasta, fresh mozzarella, and basil.",
    ing: [["pasta", "12 oz", "penne or spaghetti"], ["tomato", "2 pints", "cherry tomatoes"], ["garlic", "4 cloves", "garlic, sliced"], ["olive-oil", "¼ cup", "olive oil"], ["mozzarella", "8 oz", "fresh mozzarella, torn"], ["basil", "1 cup", "basil leaves"], ["parmesan", "½ cup", "parmesan"], ["red-pepper-flakes", "¼ tsp", "red pepper flakes"], ["vinegar", "1 tsp", "balsamic", true]],
    steps: ["Cook the pasta; reserve 1 cup water.", "Heat the oil over medium-high. Add the tomatoes, garlic, pepper flakes, and salt. Cook 8–10 minutes, pressing tomatoes as they soften, until saucy.", "Toss in the pasta, parmesan, and enough pasta water to make it glossy.", "Off heat, fold in the mozzarella and basil so the cheese just starts to melt. Drizzle with balsamic."],
    tip: "Works with any tomato in late summer — dice big ones and cook a few minutes longer."
  },
  {
    id: "pesto-pasta-chicken", name: "Pesto Pasta with Peas", emoji: "🌿", cuisine: "Italian", meal: ["dinner", "lunch"], time: 15, servings: 4, difficulty: "easy",
    tags: ["quick", "kid-friendly", "pasta"], diet: ["vegetarian-option"],
    desc: "Store-bought pesto, sweet peas, parmesan, and a splash of cream. The fastest dinner there is.",
    ing: [["pasta", "12 oz", "any short pasta"], ["pesto", "½ cup", "pesto"], ["peas", "1 cup", "frozen peas"], ["parmesan", "½ cup", "parmesan"], ["heavy-cream", "¼ cup", "cream or ricotta", true], ["lemon", "½", "lemon"], ["chicken", "2 cups", "cooked chicken, shredded", true], ["tomato", "1 cup", "cherry tomatoes, halved", true]],
    steps: ["Cook the pasta; add the peas for the last 2 minutes. Reserve ½ cup water and drain.", "Return to the pot with the pesto, cream, parmesan, and chicken. Toss with pasta water until creamy.", "Finish with lemon juice, pepper, and tomatoes."],
    tip: "Don't heat pesto directly on the burner — the residual heat of the pasta is enough and keeps it bright green."
  },
  {
    id: "baked-mac-and-cheese", name: "Baked Mac & Cheese", emoji: "🧀", cuisine: "American", meal: ["dinner"], time: 45, servings: 6, difficulty: "medium",
    tags: ["comfort", "kid-friendly", "crowd-pleaser"], diet: ["vegetarian"],
    desc: "Creamy sharp-cheddar sauce, tender macaroni, and a crunchy golden top. The real deal.",
    ing: [["pasta", "1 lb", "elbow macaroni or cavatappi"], ["butter", "4 tbsp", "butter"], ["flour", "¼ cup", "flour"], ["milk", "3 cups", "whole milk"], ["cheddar", "3 cups", "sharp cheddar, shredded"], [["cheese", "parmesan"], "1 cup", "Gruyère, Monterey Jack, or parmesan"], ["mustard", "1 tsp", "Dijon or ½ tsp mustard powder"], ["breadcrumbs", "1 cup", "panko"], ["cumin", "¼ tsp", "smoked paprika or cayenne", true], ["salt", "", "salt, pepper, pinch of nutmeg"]],
    steps: ["Heat the oven to 375°F. Cook the pasta 2 minutes shy of al dente; drain.", "Melt 3 tablespoons butter over medium; whisk in the flour and cook 1 minute. Gradually whisk in the milk; simmer 4–5 minutes until thickened.", "Off heat, stir in the cheeses, mustard, salt, pepper, and nutmeg until smooth. Fold in the pasta.", "Pour into a buttered baking dish. Toss the panko with the remaining melted butter and paprika; scatter over. Bake 20–25 minutes until bubbling and golden."],
    tip: "Shred your own cheese — pre-shredded is coated with starch and makes a grainy sauce."
  },
  {
    id: "baked-ziti", name: "Baked Ziti", emoji: "🍝", cuisine: "Italian", meal: ["dinner"], time: 50, servings: 8, difficulty: "easy",
    tags: ["crowd-pleaser", "freezer-friendly", "family"], diet: ["vegetarian-option"],
    desc: "Layers of pasta, marinara, ricotta, and mozzarella baked until bubbling. Lasagna's easier cousin.",
    ing: [["pasta", "1 lb", "ziti or penne"], ["tomato-sauce", "1 (24 oz) jar", "marinara"], ["ricotta", "15 oz", "ricotta"], ["mozzarella", "3 cups", "shredded mozzarella"], ["parmesan", "½ cup", "parmesan"], ["eggs", "1", "egg"], [["sausage", "ground-beef"], "1 lb", "Italian sausage or ground beef", true], ["garlic", "3 cloves", "garlic"], ["italian-seasoning", "1 tsp", "Italian seasoning"], ["basil", "", "basil", true]],
    steps: ["Heat the oven to 375°F. Cook the pasta 2 minutes under al dente. If using meat, brown it with the garlic and drain.", "Mix the ricotta, egg, parmesan, half the mozzarella, seasoning, salt, and pepper.", "Toss the pasta with the marinara and meat. Layer half in a 9×13 dish, dollop the ricotta over, add the rest of the pasta, and top with the remaining mozzarella.", "Cover with foil and bake 20 minutes; uncover and bake 15 more until browned and bubbling. Rest 10 minutes."],
    tip: "Assemble up to 2 days ahead or freeze unbaked for a month."
  },
  {
    id: "lasagna-soup", name: "One-Pot Lasagna Soup", emoji: "🍲", cuisine: "Italian", meal: ["dinner"], time: 40, servings: 6, difficulty: "easy",
    tags: ["one-pot", "comfort", "soup"], diet: [],
    desc: "All the flavor of lasagna in a cozy bowl, with a dollop of ricotta-parmesan on top.",
    ing: [[["sausage", "ground-beef"], "1 lb", "Italian sausage or ground beef"], ["onion", "1", "onion, diced"], ["garlic", "4 cloves", "garlic, minced"], ["canned-tomatoes", "1 (28 oz) can", "crushed tomatoes"], ["broth", "5 cups", "chicken or vegetable broth"], ["pasta", "8 oz", "lasagna noodles, broken, or any pasta"], ["italian-seasoning", "2 tsp", "Italian seasoning"], ["ricotta", "1 cup", "ricotta"], ["parmesan", "½ cup", "parmesan"], ["mozzarella", "1 cup", "mozzarella"], ["basil", "", "basil", true]],
    steps: ["Brown the meat with the onion, 7 minutes. Add the garlic and seasoning; stir 1 minute.", "Add the tomatoes and broth. Bring to a boil, add the pasta, and simmer 10–12 minutes until tender.", "Mix the ricotta, parmesan, and a pinch of salt.", "Ladle into bowls, dollop with the ricotta mixture, and top with mozzarella and basil."],
    tip: "Cook the pasta separately if you plan on leftovers — it soaks up the broth overnight."
  },
  {
    id: "cacio-e-pepe", name: "Cacio e Pepe", emoji: "🧀", cuisine: "Italian", meal: ["dinner"], time: 15, servings: 2, difficulty: "medium",
    tags: ["quick", "pantry", "pasta"], diet: ["vegetarian"],
    desc: "Three ingredients — pasta, pecorino, black pepper — turned into a creamy sauce with nothing but pasta water.",
    ing: [["pasta", "8 oz", "spaghetti or bucatini"], ["parmesan", "1 cup", "finely grated pecorino or parmesan"], ["salt", "1½ tsp", "coarsely ground black pepper"], ["butter", "1 tbsp", "butter", true]],
    steps: ["Cook the pasta in less water than usual (so it's starchy), salted lightly. Reserve 1 cup water.", "Toast the pepper in a dry skillet 1 minute. Add ½ cup pasta water and the butter; simmer.", "Add the drained pasta and toss. Off heat, sprinkle in the cheese gradually while tossing constantly, adding splashes of water, until a glossy sauce coats every strand."],
    tip: "Cheese hits hot pan = clumps. Keep it off the heat and keep the pasta moving."
  },
  {
    id: "mushroom-risotto", name: "Mushroom Risotto", emoji: "🍄", cuisine: "Italian", meal: ["dinner"], time: 40, servings: 4, difficulty: "medium",
    tags: ["date-night", "comfort"], diet: ["vegetarian", "gluten-free"],
    desc: "Creamy parmesan risotto with golden sautéed mushrooms and thyme. Worth the stirring.",
    ing: [["rice", "1½ cups", "arborio rice"], ["mushroom", "1 lb", "mushrooms, sliced"], ["broth", "5 cups", "vegetable or chicken broth, warm"], ["onion", "1", "onion or 2 shallots, minced"], ["garlic", "3 cloves", "garlic, minced"], ["wine", "½ cup", "dry white wine", true], ["butter", "3 tbsp", "butter"], ["parmesan", "¾ cup", "parmesan"], ["rosemary", "1 tsp", "thyme"], ["olive-oil", "2 tbsp", "olive oil"], ["parsley", "", "parsley", true]],
    steps: ["Sauté the mushrooms in the oil over high heat until deeply browned, 8 minutes. Season, add the thyme, and set aside.", "In the same pot, melt 2 tablespoons butter over medium. Cook the onion 4 minutes, then the garlic and rice; stir 2 minutes until the edges look translucent.", "Add the wine and stir until absorbed. Add warm broth a ladle at a time, stirring often, waiting until each is nearly absorbed. About 18–20 minutes total, until the rice is creamy with a slight bite.", "Stir in the mushrooms, remaining butter, and parmesan. Season, top with parsley."],
    tip: "Warm broth is essential — cold broth stalls the cooking and makes the rice gluey."
  },
  {
    id: "spinach-feta-frittata", name: "Spinach & Feta Frittata", emoji: "🍳", cuisine: "Mediterranean", meal: ["breakfast", "lunch", "dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "healthy", "one-pan", "use-it-up"], diet: ["vegetarian", "gluten-free", "low-carb"],
    desc: "Puffy baked eggs with wilted spinach, salty feta, and whatever odds and ends are in the fridge.",
    ing: [["eggs", "8", "eggs"], ["spinach", "4 cups", "spinach"], ["feta", "¾ cup", "feta, crumbled"], ["onion", "½", "onion, diced"], ["milk", "¼ cup", "milk or cream"], ["garlic", "2 cloves", "garlic"], ["olive-oil", "2 tbsp", "olive oil"], [["tomato", "bell-pepper", "mushroom", "potato"], "1 cup", "tomatoes, peppers, mushrooms, or cooked potato", true], ["dill", "", "dill or parsley", true]],
    steps: ["Heat the oven to 400°F. Whisk the eggs, milk, salt, and pepper.", "In a 10-inch oven-safe skillet, cook the onion (and any veg) in the oil 5 minutes. Add the garlic and spinach; cook until wilted.", "Pour in the eggs, scatter the feta over, and cook undisturbed 2 minutes until the edges set.", "Transfer to the oven and bake 10–12 minutes until puffed and just set in the center."],
    tip: "Slices reheat beautifully — make it Sunday for grab-and-go breakfasts."
  },
  {
    id: "shakshuka", name: "Shakshuka", emoji: "🍳", cuisine: "Middle Eastern", meal: ["breakfast", "dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["one-pan", "pantry", "budget"], diet: ["vegetarian", "gluten-free", "dairy-free-option"],
    desc: "Eggs poached in a spiced pepper-tomato sauce. Scoop it up with crusty bread or pita.",
    ing: [["eggs", "6", "eggs"], ["canned-tomatoes", "1 (28 oz) can", "crushed or diced tomatoes"], ["bell-pepper", "1", "red bell pepper, diced"], ["onion", "1", "onion, diced"], ["garlic", "4 cloves", "garlic, minced"], ["cumin", "1 tsp", "cumin + 1 tsp paprika + ½ tsp chili flakes"], ["olive-oil", "2 tbsp", "olive oil"], ["feta", "½ cup", "feta", true], ["parsley", "", "parsley or cilantro"], [["bread", "pita"], "", "crusty bread or pita, for serving"]],
    steps: ["Cook the onion and pepper in the oil over medium 8 minutes until soft. Add the garlic and spices; stir 1 minute.", "Add the tomatoes and simmer 10 minutes until thick. Season.", "Make 6 wells and crack an egg into each. Cover and cook 5–8 minutes until the whites set but yolks are runny.", "Scatter feta and herbs over. Serve with bread."],
    tip: "A spoonful of harissa in the sauce takes it to the next level."
  },
  {
    id: "veggie-quesadillas", name: "Loaded Veggie Quesadillas", emoji: "🧀", cuisine: "Mexican", meal: ["lunch", "dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "use-it-up", "kid-friendly"], diet: ["vegetarian"],
    desc: "Sautéed peppers, onions, corn, and black beans sealed in crispy cheesy tortillas.",
    ing: [["tortilla", "4", "large flour tortillas"], ["cheese", "2 cups", "shredded Mexican blend"], ["bell-pepper", "1", "bell pepper, diced"], ["onion", "½", "onion, diced"], [["black-beans", "beans"], "1 cup", "black beans"], ["corn", "1 cup", "corn"], [["spinach", "zucchini", "mushroom"], "1 cup", "spinach, zucchini, or mushrooms", true], ["cumin", "1 tsp", "cumin + ½ tsp chili powder"], ["salsa", "", "salsa and sour cream"], ["olive-oil", "1 tbsp", "oil"]],
    steps: ["Sauté the pepper and onion in the oil 5 minutes. Add the beans, corn, other veg, and spices; cook 3 minutes. Season.", "Scatter cheese over a tortilla in a skillet over medium, spoon filling on one half, fold when the cheese melts.", "Cook 2 minutes per side until golden. Cut and serve with salsa and sour cream."],
    tip: "A thin layer of refried beans on the tortilla holds everything together."
  },
  {
    id: "lentil-soup", name: "Hearty Lentil Soup", emoji: "🍲", cuisine: "Mediterranean", meal: ["dinner", "lunch"], time: 45, servings: 6, difficulty: "easy",
    tags: ["budget", "meal-prep", "freezer-friendly", "one-pot"], diet: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    desc: "Earthy lentils with carrots, celery, tomato, and a squeeze of lemon. Costs almost nothing, tastes like care.",
    ing: [["lentils", "1½ cups", "brown or green lentils"], ["onion", "1", "onion, diced"], ["carrot", "2", "carrots, diced"], ["celery", "2 stalks", "celery, diced"], ["garlic", "4 cloves", "garlic, minced"], ["canned-tomatoes", "1 (14 oz) can", "diced tomatoes"], ["broth", "6 cups", "vegetable broth"], ["cumin", "1½ tsp", "cumin + 1 tsp smoked paprika"], ["lemon", "1", "lemon"], ["spinach", "3 cups", "spinach or kale", true], ["olive-oil", "2 tbsp", "olive oil"], ["rosemary", "1", "bay leaf + 1 tsp thyme", true]],
    steps: ["Cook the onion, carrot, and celery in the oil over medium 8 minutes. Add the garlic and spices; stir 1 minute.", "Add the lentils, tomatoes, broth, and bay leaf. Simmer 25–30 minutes until the lentils are tender.", "Stir in the greens until wilted. Season generously with salt, pepper, and lemon juice."],
    tip: "Blend a cup of the soup and stir it back in for a creamier body without any cream."
  },
  {
    id: "sweet-potato-black-bean-bowls", name: "Roasted Sweet Potato & Black Bean Bowls", emoji: "🍠", cuisine: "Mexican", meal: ["dinner", "lunch"], time: 35, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "healthy", "bowl"], diet: ["vegetarian", "vegan-option", "gluten-free"],
    desc: "Caramelized sweet potatoes, black beans, rice, avocado, and a zippy lime-cilantro drizzle.",
    ing: [["sweet-potato", "2 large", "sweet potatoes, cubed"], ["black-beans", "1 (15 oz) can", "black beans"], ["rice", "1 cup", "rice or quinoa"], ["avocado", "1", "avocado"], ["lime", "2", "limes"], ["cilantro", "½ cup", "cilantro"], ["cumin", "1 tsp", "cumin + 1 tsp chili powder + ½ tsp smoked paprika"], ["olive-oil", "2 tbsp", "olive oil"], ["corn", "1 cup", "corn", true], ["yogurt", "⅓ cup", "Greek yogurt or sour cream", true], ["feta", "", "feta or cotija", true], ["onion", "¼", "red onion, minced", true]],
    steps: ["Heat the oven to 425°F. Toss the sweet potatoes with the oil, spices, and salt. Roast 25 minutes, flipping once, until caramelized.", "Cook the rice. Warm the beans with a pinch of cumin and salt.", "Blend or whisk the yogurt with the juice of 1 lime, half the cilantro, and a pinch of salt.", "Build bowls: rice, beans, sweet potato, corn, avocado, onion, drizzle, cilantro, and lime."],
    tip: "Roast a double batch of sweet potatoes — they're great in tacos and salads all week."
  },
  {
    id: "tofu-stir-fry", name: "Crispy Tofu with Garlic-Ginger Sauce", emoji: "🧈", cuisine: "Asian", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["healthy", "meal-prep"], diet: ["vegetarian", "vegan", "dairy-free"],
    desc: "Cornstarch-crisped tofu cubes tossed in a sticky garlic-ginger-soy glaze with broccoli.",
    ing: [["tofu", "1 (14 oz) block", "extra-firm tofu, pressed and cubed"], ["flour", "3 tbsp", "cornstarch"], ["broccoli", "1 head", "broccoli florets"], ["garlic", "4 cloves", "garlic, minced"], ["ginger", "1 tbsp", "ginger, grated"], ["soy-sauce", "¼ cup", "soy sauce"], ["honey", "2 tbsp", "maple syrup or honey"], ["vinegar", "1 tbsp", "rice vinegar"], ["hot-sauce", "1 tsp", "sriracha", true], ["sesame-oil", "1 tsp", "sesame oil"], ["olive-oil", "3 tbsp", "oil"], ["rice", "1½ cups", "rice"], ["green-onion", "2", "green onions", true]],
    steps: ["Toss the tofu with 2 tablespoons cornstarch and a pinch of salt. Pan-fry in the oil over medium-high, turning, 8–10 minutes until golden and crisp. Remove.", "Steam the broccoli 3 minutes (or stir-fry with a splash of water).", "Whisk the soy sauce, maple, vinegar, sriracha, sesame oil, remaining cornstarch, and ¼ cup water. Sauté the garlic and ginger 30 seconds, add the sauce, and simmer until thick.", "Toss in the tofu and broccoli. Serve over rice with green onions."],
    tip: "Press tofu 15 minutes between paper towels with a heavy pan on top — the drier it is, the crispier it gets."
  },
  {
    id: "eggplant-parm", name: "Sheet-Pan Eggplant Parmesan", emoji: "🍆", cuisine: "Italian", meal: ["dinner"], time: 50, servings: 4, difficulty: "medium",
    tags: ["comfort", "vegetarian-main"], diet: ["vegetarian"],
    desc: "Crispy baked (not fried) eggplant rounds layered with marinara and melted mozzarella.",
    ing: [["eggplant", "2", "medium eggplants, sliced ½-inch"], ["eggs", "2", "eggs"], ["breadcrumbs", "1½ cups", "panko or Italian breadcrumbs"], ["parmesan", "½ cup", "parmesan"], ["tomato-sauce", "2 cups", "marinara"], ["mozzarella", "2 cups", "shredded mozzarella"], ["italian-seasoning", "1 tsp", "Italian seasoning"], ["olive-oil", "3 tbsp", "olive oil"], ["basil", "", "basil", true], ["pasta", "12 oz", "pasta, for serving", true]],
    steps: ["Heat the oven to 425°F. Salt the eggplant slices and let sit 10 minutes; pat dry.", "Dip in beaten egg, then press into breadcrumbs mixed with parmesan and seasoning. Arrange on oiled sheet pans, drizzle with oil, and bake 20 minutes, flipping halfway, until golden.", "Spoon marinara onto each round and top with mozzarella. Bake 8 more minutes until melted.", "Serve stacked, over pasta, or in sandwiches, with torn basil."],
    tip: "Salting draws out bitterness and moisture so the coating stays crisp."
  },
  {
    id: "veggie-pad-thai", name: "Quick Pad Thai", emoji: "🍜", cuisine: "Thai", meal: ["dinner"], time: 25, servings: 4, difficulty: "medium",
    tags: ["takeout-at-home", "quick"], diet: ["vegetarian-option", "gluten-free", "dairy-free"],
    desc: "Chewy rice noodles in a tangy-sweet tamarind-lime sauce with egg, peanuts, and lime.",
    ing: [["ramen", "8 oz", "flat rice noodles"], ["eggs", "2", "eggs"], [["shrimp", "chicken", "tofu"], "½ lb", "shrimp, chicken, or tofu"], ["garlic", "3 cloves", "garlic, minced"], ["fish-sauce", "3 tbsp", "fish sauce (or soy)"], ["sugar", "3 tbsp", "brown sugar"], ["lime", "2", "limes"], ["hot-sauce", "1 tbsp", "sriracha or chili garlic sauce"], ["peanuts", "⅓ cup", "peanuts, chopped"], ["green-onion", "3", "green onions"], [["cabbage", "carrot"], "1 cup", "bean sprouts, shredded cabbage, or carrot", true], ["cilantro", "", "cilantro", true], ["olive-oil", "3 tbsp", "oil"]],
    steps: ["Soak the noodles in hot water 8–10 minutes until pliable; drain. Mix the fish sauce, sugar, juice of 1 lime, and sriracha.", "Heat 2 tablespoons oil in a wok over high. Cook the protein until done; push aside. Add the garlic, then crack in the eggs and scramble.", "Add the noodles and sauce; toss 2–3 minutes until the noodles are tender and coated.", "Fold in the sprouts and green onions. Top with peanuts, cilantro, and lime."],
    tip: "Undersoak the noodles slightly — they finish cooking in the sauce."
  },
  {
    id: "quinoa-power-bowl", name: "Mediterranean Quinoa Bowls", emoji: "🥗", cuisine: "Mediterranean", meal: ["lunch", "dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "healthy", "no-cook-ish"], diet: ["vegetarian", "gluten-free", "vegan-option"],
    desc: "Fluffy quinoa with cucumber, tomato, chickpeas, olives, and feta in a lemon-herb dressing.",
    ing: [["quinoa", "1 cup", "quinoa"], ["chickpeas", "1 (15 oz) can", "chickpeas"], ["cucumber", "1", "cucumber, diced"], ["tomato", "1 pint", "cherry tomatoes, halved"], ["onion", "¼", "red onion, minced"], ["olives", "⅓ cup", "kalamata olives"], ["feta", "½ cup", "feta"], ["lemon", "1", "lemon"], ["olive-oil", "3 tbsp", "olive oil"], ["parsley", "½ cup", "parsley or mint"], ["italian-seasoning", "1 tsp", "oregano"], ["hummus", "", "hummus", true]],
    steps: ["Rinse the quinoa; simmer in 2 cups water, covered, 15 minutes. Rest 5 minutes and fluff.", "Whisk the lemon juice, oil, oregano, salt, and pepper.", "Toss the quinoa with the vegetables, chickpeas, olives, herbs, and dressing. Top with feta and a scoop of hummus."],
    tip: "Keeps 4 days in the fridge — dress it all at once; quinoa doesn't get soggy."
  },
  {
    id: "grilled-cheese-tomato-soup", name: "Grilled Cheese & Tomato Soup", emoji: "🥪", cuisine: "American", meal: ["lunch", "dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["comfort", "kid-friendly", "pantry"], diet: ["vegetarian"],
    desc: "Creamy roasted-garlic tomato soup with the crispiest, meltiest grilled cheese for dunking.",
    ing: [["canned-tomatoes", "1 (28 oz) can", "whole or crushed tomatoes"], ["onion", "1", "onion, diced"], ["garlic", "3 cloves", "garlic"], ["broth", "2 cups", "vegetable broth"], ["heavy-cream", "½ cup", "cream or milk"], ["butter", "4 tbsp", "butter"], ["bread", "8 slices", "sourdough or white bread"], ["cheddar", "8 oz", "sharp cheddar, sliced"], ["basil", "", "basil", true], ["sugar", "1 tsp", "sugar"], ["olive-oil", "1 tbsp", "olive oil"]],
    steps: ["Cook the onion in the oil over medium 6 minutes. Add the garlic, 1 minute. Add the tomatoes, broth, and sugar; simmer 15 minutes.", "Blend smooth, stir in the cream, and season well.", "Butter the bread, lay cheese between slices, and cook in a skillet over medium-low 3–4 minutes per side until deep golden.", "Slice diagonally and serve with the soup."],
    tip: "Mayo instead of butter on the outside of the bread gives an even crispier, more even crust."
  }
);
