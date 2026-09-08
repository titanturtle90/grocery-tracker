/*
 * Recipe database, part A (chicken, beef, pork). Each ingredient is a tuple:
 *   [catalogKey | [alternativeKeys], quantity, description, optional?]
 * Quantities are for the listed servings and scale in the app.
 */
window.RECIPE_DATA = window.RECIPE_DATA || [];
window.RECIPE_DATA.push(
  {
    id: "sheet-pan-chicken-fajitas", name: "Sheet-Pan Chicken Fajitas", emoji: "🌮", cuisine: "Mexican", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["one-pan", "weeknight", "meal-prep"], diet: ["dairy-free", "gluten-free-option"],
    desc: "Everything roasts on one tray while you warm the tortillas. Smoky, a little charred, and endlessly customizable.",
    ing: [["chicken", "1½ lb", "boneless skinless chicken breasts or thighs, sliced into strips"], ["bell-pepper", "3", "bell peppers, sliced"], ["onion", "1", "large red onion, sliced"], ["olive-oil", "2 tbsp", "olive oil"], ["taco-seasoning", "2 tbsp", "fajita or taco seasoning"], ["lime", "1", "lime"], ["tortilla", "8", "flour or corn tortillas"], ["cilantro", "¼ cup", "chopped cilantro", true], ["sour-cream", "½ cup", "sour cream or Greek yogurt", true], ["avocado", "1", "avocado, sliced", true]],
    steps: ["Heat the oven to 425°F. Line a large sheet pan with foil or parchment.", "Toss the chicken, peppers, and onion with the oil and seasoning until evenly coated. Spread in a single layer.", "Roast 18–22 minutes, tossing once, until the chicken is cooked through and the vegetables are lightly charred at the edges.", "Squeeze the lime over everything. Warm the tortillas in a dry skillet or wrapped in a damp towel in the microwave for 30 seconds.", "Pile into tortillas with cilantro, sour cream, and avocado."],
    tip: "Slice the chicken against the grain into ½-inch strips so it cooks in the same time as the vegetables."
  },
  {
    id: "honey-garlic-chicken-thighs", name: "Honey Garlic Chicken Thighs", emoji: "🍯", cuisine: "American", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["one-pan", "weeknight", "kid-friendly"], diet: ["dairy-free"],
    desc: "Crisp-skinned thighs glazed in a sticky honey-garlic-soy sauce. Serve over rice with something green.",
    ing: [["chicken", "2 lb", "bone-in or boneless chicken thighs"], ["honey", "¼ cup", "honey"], ["soy-sauce", "3 tbsp", "soy sauce"], ["garlic", "4 cloves", "garlic, minced"], ["vinegar", "1 tbsp", "rice or apple cider vinegar"], ["olive-oil", "1 tbsp", "oil"], ["salt", "", "salt and pepper"], ["green-onion", "2", "green onions, sliced", true], ["rice", "1½ cups", "rice, for serving", true]],
    steps: ["Pat the chicken dry and season with salt and pepper. Whisk the honey, soy sauce, garlic, and vinegar in a small bowl.", "Heat the oil in a large skillet over medium-high. Cook the chicken skin-side down (or presentation side) 6–7 minutes until deeply golden. Flip and cook 5 more minutes.", "Pour in the sauce and lower the heat to medium. Simmer, turning the chicken to coat, 4–6 minutes until the sauce is glossy and thick and the chicken reads 165°F.", "Rest 3 minutes, then spoon the glaze over and top with green onions. Serve over rice."],
    tip: "If the sauce reduces too fast, add a splash of water; if it's thin, simmer a minute longer once the chicken is out."
  },
  {
    id: "chicken-broccoli-stir-fry", name: "Chicken & Broccoli Stir-Fry", emoji: "🥦", cuisine: "Chinese", meal: ["dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["weeknight", "healthy", "one-pan"], diet: ["dairy-free"],
    desc: "Better-than-takeout: velvety chicken, crisp broccoli, and a glossy garlic-ginger sauce in under half an hour.",
    ing: [["chicken", "1¼ lb", "chicken breast, thinly sliced"], ["broccoli", "1 large head", "broccoli, cut into florets"], ["garlic", "3 cloves", "garlic, minced"], ["ginger", "1 tbsp", "fresh ginger, grated"], ["soy-sauce", "¼ cup", "soy sauce"], ["broth", "½ cup", "chicken broth or water"], ["honey", "1 tbsp", "honey or brown sugar"], ["flour", "2 tbsp", "cornstarch or flour, divided"], ["sesame-oil", "1 tsp", "sesame oil", true], ["olive-oil", "2 tbsp", "oil"], ["rice", "1½ cups", "rice, for serving", true]],
    steps: ["Toss the chicken with 1 tablespoon cornstarch, a pinch of salt, and 1 tablespoon of the soy sauce. Let sit while you prep.", "Whisk the remaining soy sauce, broth, honey, sesame oil, and 1 tablespoon cornstarch for the sauce.", "Heat 1 tablespoon oil in a large skillet or wok over high heat. Sear the chicken in a single layer, 2–3 minutes per side, until golden. Remove.", "Add the remaining oil and the broccoli with a splash of water; cover and steam-fry 3 minutes until bright green and just tender.", "Add the garlic and ginger, stir 30 seconds, then return the chicken and pour in the sauce. Toss 1–2 minutes until thickened and glossy. Serve over rice."],
    tip: "Slicing the chicken while partially frozen makes paper-thin, even pieces."
  },
  {
    id: "creamy-tuscan-chicken", name: "Creamy Tuscan Chicken", emoji: "🍗", cuisine: "Italian", meal: ["dinner"], time: 35, servings: 4, difficulty: "medium",
    tags: ["date-night", "one-pan", "comfort"], diet: ["gluten-free", "low-carb"],
    desc: "Seared chicken in a garlic-parmesan cream sauce with spinach and sun-dried tomatoes. Restaurant-good, one skillet.",
    ing: [["chicken", "1½ lb", "chicken breasts, halved lengthwise into cutlets"], ["olive-oil", "2 tbsp", "olive oil"], ["garlic", "4 cloves", "garlic, minced"], ["capers", "½ cup", "sun-dried tomatoes, chopped"], ["heavy-cream", "1 cup", "heavy cream"], ["broth", "½ cup", "chicken broth"], ["parmesan", "½ cup", "grated parmesan"], ["spinach", "3 cups", "baby spinach"], ["italian-seasoning", "1 tsp", "Italian seasoning"], ["salt", "", "salt and pepper"], ["pasta", "12 oz", "pasta, for serving", true]],
    steps: ["Season the cutlets with salt, pepper, and Italian seasoning. Sear in the oil over medium-high, 4–5 minutes per side until golden and cooked through. Remove to a plate.", "Lower the heat to medium. Add the garlic and sun-dried tomatoes; cook 1 minute.", "Pour in the broth and cream, scraping up the browned bits. Simmer 3 minutes, then stir in the parmesan until smooth.", "Add the spinach by the handful, stirring until wilted. Return the chicken and any juices; simmer 2 minutes to reheat.", "Serve over pasta, rice, or with crusty bread."],
    tip: "Use the oil from the sun-dried tomato jar instead of plain olive oil for extra flavor."
  },
  {
    id: "chicken-parm", name: "Weeknight Chicken Parmesan", emoji: "🧀", cuisine: "Italian", meal: ["dinner"], time: 40, servings: 4, difficulty: "medium",
    tags: ["comfort", "kid-friendly", "family"], diet: [],
    desc: "Crunchy breaded cutlets under bubbling marinara and mozzarella, finished in the oven so the crust stays crisp.",
    ing: [["chicken", "1½ lb", "chicken breasts, pounded ½-inch thick"], ["eggs", "2", "eggs, beaten"], ["breadcrumbs", "1½ cups", "panko or Italian breadcrumbs"], ["parmesan", "½ cup", "grated parmesan"], ["flour", "½ cup", "flour"], ["tomato-sauce", "2 cups", "marinara sauce"], ["mozzarella", "8 oz", "mozzarella, sliced or shredded"], ["olive-oil", "⅓ cup", "olive oil, for frying"], ["italian-seasoning", "1 tsp", "Italian seasoning"], ["basil", "", "fresh basil, torn", true], ["pasta", "12 oz", "spaghetti, for serving", true]],
    steps: ["Heat the oven to 425°F. Set up three dishes: flour seasoned with salt and pepper; beaten eggs; breadcrumbs mixed with parmesan and Italian seasoning.", "Dredge each cutlet in flour, then egg, then press firmly into the crumbs.", "Heat the oil in a large skillet over medium-high. Fry the cutlets 3 minutes per side until golden. Transfer to a baking sheet.", "Spoon marinara over the center of each cutlet (leave the edges bare so they stay crunchy) and top with mozzarella.", "Bake 8–10 minutes until the cheese is melted and bubbling. Top with basil and serve over spaghetti tossed with the remaining sauce."],
    tip: "Don't drown the cutlets in sauce — a modest spoonful keeps the breading crisp."
  },
  {
    id: "lemon-herb-roast-chicken", name: "Lemon-Herb Roast Chicken & Potatoes", emoji: "🍋", cuisine: "Mediterranean", meal: ["dinner"], time: 60, servings: 4, difficulty: "easy",
    tags: ["one-pan", "sunday", "family"], diet: ["gluten-free", "dairy-free"],
    desc: "Chicken thighs roasted over lemony, garlicky potatoes that soak up all the drippings.",
    ing: [["chicken", "2 lb", "bone-in chicken thighs"], ["potato", "1½ lb", "baby potatoes, halved"], ["lemon", "2", "lemons (1 juiced, 1 sliced)"], ["garlic", "5 cloves", "garlic, smashed"], ["olive-oil", "3 tbsp", "olive oil"], ["rosemary", "2 tbsp", "fresh rosemary or thyme, chopped"], ["italian-seasoning", "1 tsp", "dried oregano"], ["salt", "", "salt and pepper"], ["green-beans", "12 oz", "green beans", true]],
    steps: ["Heat the oven to 425°F. Toss the potatoes and garlic with 2 tablespoons oil, half the lemon juice, half the herbs, and salt in a roasting pan or sheet pan.", "Rub the chicken with the remaining oil, lemon juice, herbs, oregano, salt, and pepper. Nestle skin-side up among the potatoes and tuck in the lemon slices.", "Roast 40–45 minutes until the skin is crisp, the potatoes are tender, and the chicken reads 165°F. Add the green beans to the pan for the last 12 minutes if using.", "Rest 5 minutes and spoon the pan juices over everything."],
    tip: "Pat the chicken skin bone-dry before oiling — that's the secret to crackly skin."
  },
  {
    id: "chicken-tortilla-soup", name: "Chicken Tortilla Soup", emoji: "🍲", cuisine: "Mexican", meal: ["dinner", "lunch"], time: 35, servings: 6, difficulty: "easy",
    tags: ["soup", "meal-prep", "freezer-friendly"], diet: ["gluten-free", "dairy-free-option"],
    desc: "Smoky tomato-chicken broth loaded with beans and corn, finished with crunchy chips, avocado, and lime.",
    ing: [["chicken", "1 lb", "chicken breasts (or 3 cups shredded rotisserie)"], ["onion", "1", "onion, diced"], ["garlic", "3 cloves", "garlic, minced"], ["jalapeno", "1", "jalapeño, minced", true], ["canned-tomatoes", "1 (14 oz) can", "fire-roasted diced tomatoes"], ["broth", "6 cups", "chicken broth"], ["black-beans", "1 (15 oz) can", "black beans, drained"], ["corn", "1½ cups", "corn, frozen or canned"], ["cumin", "2 tsp", "cumin + 1 tsp chili powder"], ["lime", "1", "lime"], ["tortilla-chips", "2 cups", "tortilla chips, crushed"], ["avocado", "1", "avocado, diced", true], ["cilantro", "", "cilantro", true], ["cheese", "", "shredded cheese", true]],
    steps: ["Sauté the onion in a little oil over medium heat 5 minutes. Add the garlic, jalapeño, cumin, and chili powder; stir 1 minute.", "Add the tomatoes, broth, and whole chicken breasts. Simmer 15–18 minutes until the chicken is cooked through.", "Remove the chicken, shred with two forks, and return it to the pot with the beans and corn. Simmer 5 minutes and season with salt and lime juice.", "Ladle into bowls and pile on chips, avocado, cilantro, and cheese."],
    tip: "Rotisserie chicken cuts this to 20 minutes — just simmer the broth 10 minutes before adding it."
  },
  {
    id: "buffalo-chicken-wraps", name: "Buffalo Chicken Wraps", emoji: "🌯", cuisine: "American", meal: ["lunch", "dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "no-fuss", "game-day"], diet: [],
    desc: "Shredded chicken tossed in buffalo sauce, wrapped up with crunchy lettuce, ranch, and cheddar.",
    ing: [["chicken", "3 cups", "cooked shredded chicken (rotisserie is perfect)"], ["hot-sauce", "⅓ cup", "buffalo sauce"], ["tortilla", "4", "large flour tortillas"], ["lettuce", "2 cups", "shredded romaine"], ["cheddar", "1 cup", "shredded cheddar"], ["ranch", "¼ cup", "ranch or blue cheese dressing"], ["celery", "2 stalks", "celery, thinly sliced", true], ["tomato", "1", "tomato, diced", true]],
    steps: ["Warm the chicken with the buffalo sauce in a skillet or microwave until hot and coated.", "Warm the tortillas 20 seconds in the microwave so they roll without tearing.", "Layer lettuce, chicken, cheddar, celery, tomato, and a drizzle of ranch down the center of each tortilla.", "Fold in the sides and roll tightly. Slice in half. For a crispy version, toast the wraps seam-side down in a dry skillet 2 minutes per side."],
    tip: "Make the chicken ahead and these become a 5-minute lunch all week."
  },
  {
    id: "chicken-caesar-salad", name: "Grilled Chicken Caesar Salad", emoji: "🥗", cuisine: "American", meal: ["lunch", "dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["salad", "healthy", "quick"], diet: ["gluten-free-option"],
    desc: "Juicy seasoned chicken over crisp romaine with a quick homemade Caesar dressing and shaved parmesan.",
    ing: [["chicken", "1 lb", "chicken breasts"], ["lettuce", "2 heads", "romaine, chopped"], ["parmesan", "½ cup", "parmesan, shaved or grated"], ["mayo", "½ cup", "mayonnaise"], ["lemon", "1", "lemon, juiced"], ["garlic", "1 clove", "garlic, grated"], ["mustard", "1 tsp", "Dijon mustard"], ["worcestershire", "1 tsp", "Worcestershire"], ["breadcrumbs", "1 cup", "croutons", true], ["olive-oil", "1 tbsp", "olive oil"], ["salt", "", "salt and pepper"]],
    steps: ["Season the chicken with salt, pepper, and oil. Grill or pan-sear 6–7 minutes per side until 165°F. Rest, then slice.", "Whisk the mayo, lemon juice, garlic, Dijon, Worcestershire, half the parmesan, and a good pinch of pepper. Thin with a teaspoon of water if needed.", "Toss the romaine with most of the dressing. Top with chicken, croutons, and the remaining parmesan; drizzle with the rest of the dressing."],
    tip: "Chill the romaine in ice water for 10 minutes and spin dry for the crispest salad."
  },
  {
    id: "chicken-quesadillas", name: "Crispy Chicken Quesadillas", emoji: "🧀", cuisine: "Mexican", meal: ["lunch", "dinner", "snack"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "kid-friendly", "leftovers"], diet: [],
    desc: "Golden, cheese-pulling quesadillas that use up leftover chicken and whatever veg is in the drawer.",
    ing: [["chicken", "2 cups", "cooked shredded chicken"], ["tortilla", "4", "large flour tortillas"], ["cheese", "2 cups", "shredded Mexican blend or cheddar"], ["bell-pepper", "1", "bell pepper, diced", true], ["green-onion", "2", "green onions, sliced", true], ["taco-seasoning", "1 tsp", "taco seasoning"], ["salsa", "½ cup", "salsa, for dipping"], ["sour-cream", "", "sour cream", true], ["butter", "1 tbsp", "butter or oil"]],
    steps: ["Toss the chicken with the taco seasoning and a splash of salsa.", "Lay a tortilla in a dry or lightly buttered skillet over medium heat. Scatter cheese over the whole surface, then chicken, peppers, and green onion over one half.", "When the cheese melts (about 2 minutes), fold the bare half over and press. Cook 1–2 minutes per side until golden and crisp.", "Rest 1 minute, cut into wedges, and serve with salsa and sour cream."],
    tip: "Cheese on the bottom layer glues the filling in — no more sliding quesadillas."
  },
  {
    id: "chicken-alfredo", name: "Chicken Alfredo", emoji: "🍝", cuisine: "Italian", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["comfort", "kid-friendly", "pasta"], diet: [],
    desc: "Silky parmesan cream sauce clinging to fettuccine with golden seared chicken. No jar required.",
    ing: [["pasta", "12 oz", "fettuccine or penne"], ["chicken", "1 lb", "chicken breasts"], ["butter", "3 tbsp", "butter"], ["garlic", "3 cloves", "garlic, minced"], ["heavy-cream", "1½ cups", "heavy cream"], ["parmesan", "1 cup", "grated parmesan"], ["salt", "", "salt, pepper, and a pinch of nutmeg"], ["parsley", "", "parsley, chopped", true], ["broccoli", "2 cups", "broccoli florets", true]],
    steps: ["Cook the pasta in salted water until al dente (add broccoli for the last 3 minutes if using). Reserve 1 cup pasta water; drain.", "Meanwhile season the chicken and sear in 1 tablespoon butter over medium-high, 6 minutes per side. Rest and slice.", "In the same pan over medium-low, melt the remaining butter with the garlic 1 minute. Add the cream and simmer 3–4 minutes until slightly thickened.", "Off the heat, whisk in the parmesan until smooth. Season with salt, pepper, and nutmeg.", "Toss the pasta in the sauce, loosening with pasta water as needed. Top with chicken and parsley."],
    tip: "Adding parmesan off the heat keeps the sauce silky instead of grainy."
  },
  {
    id: "chicken-curry", name: "Weeknight Coconut Chicken Curry", emoji: "🍛", cuisine: "Indian", meal: ["dinner"], time: 35, servings: 4, difficulty: "easy",
    tags: ["one-pot", "comfort", "meal-prep"], diet: ["dairy-free", "gluten-free"],
    desc: "Tender chicken in a fragrant coconut-tomato curry sauce. Pantry spices, big flavor, ready before the rice.",
    ing: [["chicken", "1½ lb", "chicken thighs, cubed"], ["onion", "1", "onion, diced"], ["garlic", "4 cloves", "garlic, minced"], ["ginger", "1 tbsp", "grated ginger"], ["curry-paste", "2 tbsp", "curry powder or garam masala"], ["canned-tomatoes", "1 (14 oz) can", "diced tomatoes"], ["coconut-milk", "1 (14 oz) can", "coconut milk"], ["olive-oil", "2 tbsp", "oil"], ["spinach", "2 cups", "spinach or frozen peas", true], ["cilantro", "", "cilantro", true], ["rice", "1½ cups", "rice, for serving"], ["lime", "1", "lime", true]],
    steps: ["Heat the oil over medium-high. Brown the chicken in batches, 3 minutes per side; set aside.", "Lower to medium; cook the onion 5 minutes. Add the garlic, ginger, and curry powder; stir 1 minute until fragrant.", "Add the tomatoes and coconut milk, scraping the pan. Return the chicken and simmer 15 minutes until thickened and the chicken is tender.", "Stir in spinach or peas until wilted. Season with salt and a squeeze of lime. Serve over rice with cilantro."],
    tip: "Toasting the spices in the oil for a full minute is what makes this taste like a restaurant curry."
  },
  {
    id: "chicken-noodle-soup", name: "Classic Chicken Noodle Soup", emoji: "🍜", cuisine: "American", meal: ["dinner", "lunch"], time: 45, servings: 6, difficulty: "easy",
    tags: ["soup", "comfort", "freezer-friendly"], diet: ["dairy-free"],
    desc: "The real thing: golden broth, tender chicken, sweet carrots, and plenty of noodles.",
    ing: [["chicken", "1½ lb", "chicken thighs or breasts"], ["carrot", "3", "carrots, sliced"], ["celery", "3 stalks", "celery, sliced"], ["onion", "1", "onion, diced"], ["garlic", "3 cloves", "garlic, minced"], ["broth", "8 cups", "chicken broth"], ["pasta", "8 oz", "egg noodles"], ["rosemary", "1 tsp", "thyme, plus 1 bay leaf"], ["olive-oil", "1 tbsp", "oil"], ["parsley", "¼ cup", "chopped parsley", true], ["lemon", "½", "lemon", true]],
    steps: ["Heat the oil in a large pot over medium. Cook the onion, carrots, and celery 6 minutes until softened. Add the garlic and thyme; stir 1 minute.", "Add the broth, bay leaf, and chicken. Bring to a gentle simmer and cook 20 minutes until the chicken is cooked through.", "Remove the chicken, shred it, and return to the pot. Add the noodles and cook 7–8 minutes until tender.", "Season generously with salt and pepper. Finish with parsley and a squeeze of lemon."],
    tip: "If freezing, leave out the noodles and cook them fresh when you reheat — they go mushy otherwise."
  },
  {
    id: "bbq-chicken-pizza", name: "BBQ Chicken Flatbread Pizza", emoji: "🍕", cuisine: "American", meal: ["dinner", "snack"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "kid-friendly", "leftovers"], diet: [],
    desc: "Smoky BBQ sauce, shredded chicken, red onion, and melty mozzarella on a crisp store-bought crust.",
    ing: [["pizza-dough", "1", "pizza dough, naan, or flatbread"], ["chicken", "1½ cups", "cooked shredded chicken"], ["bbq-sauce", "½ cup", "BBQ sauce"], ["mozzarella", "1½ cups", "shredded mozzarella"], ["onion", "½", "red onion, thinly sliced"], ["cilantro", "", "cilantro", true], ["cheddar", "½ cup", "smoked gouda or cheddar", true]],
    steps: ["Heat the oven to 450°F (or as the dough package directs). Stretch dough onto an oiled sheet pan or lay out flatbreads.", "Toss the chicken with half the BBQ sauce. Spread the rest over the crust.", "Top with mozzarella, chicken, and red onion.", "Bake 10–14 minutes until the crust is golden and the cheese bubbles. Scatter cilantro over the top and slice."],
    tip: "Par-bake raw dough 5 minutes before topping for a crisper base."
  },
  {
    id: "chicken-shawarma-bowls", name: "Chicken Shawarma Bowls", emoji: "🥙", cuisine: "Middle Eastern", meal: ["dinner", "lunch"], time: 35, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "healthy", "bowl"], diet: ["gluten-free-option"],
    desc: "Spiced yogurt-marinated chicken over rice with cucumber-tomato salad and a garlicky yogurt sauce.",
    ing: [["chicken", "1½ lb", "boneless chicken thighs"], ["yogurt", "1 cup", "plain Greek yogurt, divided"], ["lemon", "1", "lemon"], ["garlic", "4 cloves", "garlic, minced"], ["cumin", "2 tsp", "cumin + 1 tsp paprika + ½ tsp cinnamon"], ["olive-oil", "2 tbsp", "olive oil"], ["cucumber", "1", "cucumber, diced"], ["tomato", "2", "tomatoes, diced"], ["onion", "¼", "red onion, thinly sliced"], ["rice", "1½ cups", "rice or quinoa"], ["pita", "4", "pita, warmed", true], ["hummus", "½ cup", "hummus", true], ["parsley", "", "parsley or mint", true]],
    steps: ["Mix ½ cup yogurt with half the lemon juice, half the garlic, the spices, oil, and 1 teaspoon salt. Coat the chicken and marinate 15 minutes (or overnight).", "Cook the rice. Stir the remaining yogurt with the remaining garlic and lemon juice for the sauce; season with salt.", "Grill or pan-sear the chicken over medium-high, 5–6 minutes per side until charred and cooked through. Rest, then slice.", "Toss the cucumber, tomato, and onion with a pinch of salt and a squeeze of lemon.", "Build bowls: rice, chicken, salad, a spoon of hummus, yogurt sauce, and herbs. Serve with warm pita."],
    tip: "The chicken freezes beautifully in its marinade — thaw and cook for an instant weeknight dinner."
  },
  {
    id: "chicken-pot-pie-skillet", name: "Skillet Chicken Pot Pie", emoji: "🥧", cuisine: "American", meal: ["dinner"], time: 45, servings: 6, difficulty: "medium",
    tags: ["comfort", "family", "one-pan"], diet: [],
    desc: "Creamy chicken and vegetable filling under a golden puff-pastry or biscuit lid, all in one skillet.",
    ing: [["chicken", "3 cups", "cooked shredded chicken"], ["butter", "4 tbsp", "butter"], ["onion", "1", "onion, diced"], ["carrot", "2", "carrots, diced"], ["celery", "2 stalks", "celery, diced"], ["flour", "⅓ cup", "flour"], ["broth", "2 cups", "chicken broth"], ["milk", "¾ cup", "milk or half-and-half"], ["peas", "1 cup", "frozen peas"], ["rosemary", "1 tsp", "dried thyme"], ["pizza-dough", "1 sheet", "puff pastry or 1 tube biscuit dough"], ["eggs", "1", "egg, beaten", true]],
    steps: ["Heat the oven to 400°F. Melt the butter in a 10-inch oven-safe skillet over medium. Cook the onion, carrot, and celery 7 minutes until soft.", "Stir in the flour and thyme; cook 1 minute. Gradually whisk in the broth, then the milk. Simmer 3–4 minutes until thick.", "Fold in the chicken and peas. Season well with salt and pepper.", "Lay the pastry (or arrange biscuits) over the filling. Brush with egg and cut a few vents.", "Bake 20–25 minutes until deep golden. Rest 5 minutes before serving."],
    tip: "Frozen mixed vegetables can replace the fresh carrot, celery, and peas entirely."
  },
  {
    id: "chicken-lettuce-wraps", name: "Asian Chicken Lettuce Wraps", emoji: "🥬", cuisine: "Asian", meal: ["dinner", "lunch"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "healthy", "low-carb"], diet: ["dairy-free", "gluten-free-option", "low-carb"],
    desc: "Savory-sweet ground chicken with water chestnut crunch, scooped into cool lettuce cups.",
    ing: [[["ground-turkey", "chicken", "ground-pork"], "1 lb", "ground chicken or turkey"], ["lettuce", "1 head", "butter or iceberg lettuce, leaves separated"], ["garlic", "3 cloves", "garlic, minced"], ["ginger", "1 tbsp", "ginger, grated"], ["mushroom", "8 oz", "mushrooms, finely chopped", true], ["soy-sauce", "3 tbsp", "soy sauce"], ["teriyaki", "2 tbsp", "hoisin sauce"], ["vinegar", "1 tbsp", "rice vinegar"], ["sesame-oil", "1 tsp", "sesame oil"], ["green-onion", "3", "green onions, sliced"], ["peanuts", "¼ cup", "chopped peanuts or cashews", true], ["hot-sauce", "", "sriracha", true]],
    steps: ["Brown the ground meat in a hot skillet with a little oil, breaking it up, about 5 minutes. Add the mushrooms and cook 3 more minutes.", "Add the garlic and ginger; stir 1 minute.", "Stir in the soy sauce, hoisin, vinegar, and sesame oil. Cook 2 minutes until glossy. Toss in the green onions.", "Spoon into lettuce leaves and top with peanuts and sriracha."],
    tip: "Serve the filling over rice for a heartier bowl version."
  },
  {
    id: "smash-burgers", name: "Diner-Style Smash Burgers", emoji: "🍔", cuisine: "American", meal: ["dinner", "lunch"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "grill", "crowd-pleaser"], diet: [],
    desc: "Thin, crusty, lacy-edged patties with melted American cheese on soft toasted buns.",
    ing: [["ground-beef", "1¼ lb", "80/20 ground beef"], ["buns", "4", "soft hamburger buns"], ["cheese", "4 slices", "American or cheddar"], ["onion", "½", "onion, very thinly sliced", true], ["pickles", "", "pickles", true], ["lettuce", "", "lettuce and tomato", true], ["mayo", "3 tbsp", "mayo"], ["ketchup", "1 tbsp", "ketchup"], ["mustard", "1 tsp", "yellow mustard"], ["salt", "", "salt and pepper"]],
    steps: ["Mix the mayo, ketchup, mustard, and a pinch of pickle juice for a quick burger sauce. Toast the buns.", "Divide the beef into 8 loose balls (don't compact them). Heat a cast-iron skillet or griddle over high until smoking.", "Drop 2–4 balls into the pan and immediately smash flat with a sturdy spatula. Season with salt and pepper. Cook 2 minutes until the edges are dark and crisp.", "Scrape up, flip, top each with cheese, and cook 45 seconds more. Stack two patties per bun.", "Add sauce, onion, pickles, and greens."],
    tip: "Smash once, hard, right away — then don't touch. Pressing later squeezes out the juice."
  },
  {
    id: "beef-tacos", name: "Ground Beef Tacos", emoji: "🌮", cuisine: "Mexican", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "kid-friendly", "taco-tuesday"], diet: ["gluten-free-option"],
    desc: "Well-seasoned skillet taco meat (better than the packet) with all the fixings.",
    ing: [[["ground-beef", "ground-turkey"], "1 lb", "ground beef or turkey"], ["onion", "½", "onion, diced"], ["garlic", "2 cloves", "garlic, minced"], ["taco-seasoning", "2 tbsp", "taco seasoning (or 1 tbsp chili powder + 1 tsp cumin + ½ tsp each garlic powder, oregano, paprika)"], ["tomato-sauce", "¼ cup", "tomato sauce or salsa"], ["tortilla", "8", "tortillas or taco shells"], ["cheddar", "1 cup", "shredded cheddar"], ["lettuce", "2 cups", "shredded lettuce"], ["tomato", "1", "tomato, diced"], ["sour-cream", "", "sour cream", true], ["salsa", "", "salsa", true], ["lime", "1", "lime", true]],
    steps: ["Brown the meat with the onion over medium-high, breaking it up, 6–7 minutes. Drain excess fat.", "Add the garlic and seasoning; stir 1 minute. Add the tomato sauce and ⅓ cup water; simmer 5 minutes until saucy.", "Warm the tortillas in a dry skillet or the oven.", "Fill with meat, cheese, lettuce, tomato, and your toppings. Squeeze lime over."],
    tip: "Double the meat and freeze half — it's the fastest future dinner you'll ever make."
  },
  {
    id: "beef-chili", name: "Big-Batch Beef Chili", emoji: "🌶️", cuisine: "American", meal: ["dinner"], time: 60, servings: 8, difficulty: "easy",
    tags: ["one-pot", "meal-prep", "freezer-friendly", "game-day"], diet: ["gluten-free", "dairy-free-option"],
    desc: "Deep, smoky chili with beans and beef that only gets better on day two.",
    ing: [["ground-beef", "2 lb", "ground beef"], ["onion", "1", "large onion, diced"], ["bell-pepper", "1", "bell pepper, diced"], ["garlic", "4 cloves", "garlic, minced"], ["cumin", "3 tbsp", "chili powder + 2 tsp cumin + 1 tsp smoked paprika"], ["canned-tomatoes", "2 (14 oz) cans", "diced or crushed tomatoes"], ["beans", "2 (15 oz) cans", "kidney or pinto beans, drained"], ["black-beans", "1 (15 oz) can", "black beans, drained", true], ["broth", "1 cup", "beef broth"], ["jalapeno", "1", "jalapeño, minced", true], ["cheddar", "", "cheddar, sour cream, green onion, for topping", true], ["salt", "", "salt and pepper"]],
    steps: ["Brown the beef in a large pot over medium-high, breaking it up. Drain most of the fat.", "Add the onion, pepper, and jalapeño; cook 5 minutes. Add the garlic and all the spices; stir 1 minute until fragrant.", "Add the tomatoes, beans, and broth. Bring to a simmer, then partially cover and cook 40 minutes (longer is better), stirring occasionally.", "Season with salt and pepper. Serve with cheddar, sour cream, green onion, and cornbread or chips."],
    tip: "A square of dark chocolate or a teaspoon of cocoa stirred in adds incredible depth."
  },
  {
    id: "spaghetti-bolognese", name: "Weeknight Bolognese", emoji: "🍝", cuisine: "Italian", meal: ["dinner"], time: 45, servings: 6, difficulty: "easy",
    tags: ["pasta", "family", "freezer-friendly"], diet: [],
    desc: "A rich, meaty tomato sauce that tastes like it simmered all day — done in 45 minutes.",
    ing: [["ground-beef", "1 lb", "ground beef"], ["sausage", "½ lb", "Italian sausage", true], ["onion", "1", "onion, finely diced"], ["carrot", "1", "carrot, finely diced"], ["garlic", "4 cloves", "garlic, minced"], ["tomato-sauce", "1 (24 oz) jar", "marinara, or 28 oz crushed tomatoes"], ["milk", "½ cup", "milk or cream"], ["wine", "½ cup", "red wine", true], ["pasta", "1 lb", "spaghetti or rigatoni"], ["parmesan", "", "parmesan"], ["italian-seasoning", "1 tsp", "Italian seasoning"], ["olive-oil", "2 tbsp", "olive oil"]],
    steps: ["Heat the oil over medium. Cook the onion and carrot 6 minutes until soft. Add the garlic; stir 1 minute.", "Add the beef and sausage; brown well, breaking it up, about 8 minutes. Pour in the wine and let it bubble away.", "Add the tomatoes, milk, and seasoning. Simmer uncovered 25 minutes, stirring now and then, until thick.", "Cook the pasta in salted water. Toss with the sauce and a splash of pasta water. Shower with parmesan."],
    tip: "The milk sounds odd but it tenderizes the meat and rounds out the acidity — trust it."
  },
  {
    id: "stuffed-peppers", name: "Cheesy Stuffed Peppers", emoji: "🫑", cuisine: "American", meal: ["dinner"], time: 50, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "healthy", "family"], diet: ["gluten-free"],
    desc: "Bell peppers stuffed with seasoned beef, rice, and tomato, baked until tender under melted cheese.",
    ing: [["bell-pepper", "4", "large bell peppers, halved and seeded"], [["ground-beef", "ground-turkey"], "1 lb", "ground beef or turkey"], ["rice", "1 cup", "cooked rice"], ["onion", "1", "onion, diced"], ["garlic", "3 cloves", "garlic, minced"], ["canned-tomatoes", "1 (14 oz) can", "diced tomatoes"], ["italian-seasoning", "1 tsp", "Italian seasoning"], ["cheese", "1½ cups", "shredded mozzarella or cheddar"], ["parmesan", "¼ cup", "parmesan", true], ["olive-oil", "1 tbsp", "oil"]],
    steps: ["Heat the oven to 375°F. Arrange the pepper halves cut-side up in a baking dish; drizzle with a little oil and salt.", "Brown the meat with the onion, 7 minutes. Add the garlic and seasoning; stir 1 minute. Stir in the tomatoes, rice, and half the cheese. Season well.", "Fill the peppers, cover the dish with foil, and bake 25 minutes.", "Uncover, top with the remaining cheese and parmesan, and bake 10 more minutes until bubbling."],
    tip: "Microwave the empty pepper halves 3 minutes first if you like them extra soft."
  },
  {
    id: "beef-stir-fry", name: "Beef & Pepper Stir-Fry", emoji: "🥩", cuisine: "Chinese", meal: ["dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["quick", "one-pan"], diet: ["dairy-free"],
    desc: "Tender strips of beef and snappy peppers in a savory garlic-black-pepper sauce.",
    ing: [["beef", "1 lb", "flank or sirloin steak, thinly sliced against the grain"], ["bell-pepper", "2", "bell peppers, sliced"], ["onion", "1", "onion, sliced"], ["garlic", "3 cloves", "garlic, minced"], ["soy-sauce", "3 tbsp", "soy sauce"], ["teriyaki", "2 tbsp", "oyster or hoisin sauce"], ["flour", "1 tbsp", "cornstarch"], ["sugar", "1 tsp", "sugar"], ["olive-oil", "2 tbsp", "oil"], ["salt", "1 tsp", "coarsely ground black pepper"], ["rice", "1½ cups", "rice, for serving"]],
    steps: ["Toss the beef with 1 tablespoon soy sauce and the cornstarch. Mix the remaining soy, oyster sauce, sugar, and 3 tablespoons water for the sauce.", "Heat 1 tablespoon oil in a wok or large skillet over high heat until smoking. Sear the beef in a single layer 1–2 minutes per side; remove.", "Add the remaining oil, onion, and peppers. Stir-fry 3 minutes until charred but crisp. Add the garlic and black pepper; stir 30 seconds.", "Return the beef, pour in the sauce, and toss 1 minute until glossy. Serve over rice."],
    tip: "Freeze the steak for 20 minutes before slicing to get restaurant-thin strips."
  },
  {
    id: "beef-stew", name: "Sunday Beef Stew", emoji: "🍲", cuisine: "American", meal: ["dinner"], time: 150, servings: 6, difficulty: "medium",
    tags: ["sunday", "comfort", "one-pot", "freezer-friendly"], diet: ["dairy-free"],
    desc: "Fall-apart beef, potatoes, and carrots in a deeply savory gravy. Low effort, long simmer.",
    ing: [["beef", "2½ lb", "chuck roast, cut into 1½-inch cubes"], ["potato", "1½ lb", "potatoes, chunked"], ["carrot", "4", "carrots, thick sliced"], ["onion", "1", "onion, chopped"], ["garlic", "4 cloves", "garlic, minced"], ["flour", "3 tbsp", "flour"], ["broth", "4 cups", "beef broth"], ["tomato-sauce", "2 tbsp", "tomato paste"], ["wine", "1 cup", "red wine", true], ["worcestershire", "1 tbsp", "Worcestershire"], ["rosemary", "2 sprigs", "thyme or rosemary + 1 bay leaf"], ["peas", "1 cup", "frozen peas", true], ["olive-oil", "2 tbsp", "oil"]],
    steps: ["Pat the beef dry, season with salt and pepper, and toss with the flour. Brown in batches in the oil over medium-high, 3–4 minutes per side. Remove.", "Cook the onion in the same pot 5 minutes. Add the garlic and tomato paste; stir 1 minute. Add the wine and scrape up the fond.", "Return the beef with the broth, Worcestershire, and herbs. Cover and simmer very gently 1½ hours (or bake at 325°F).", "Add the potatoes and carrots; cook 40 more minutes until everything is tender. Stir in the peas for the last 5 minutes. Season and remove the bay leaf."],
    tip: "The stew is even better the next day, and it freezes for 3 months."
  },
  {
    id: "steak-with-garlic-butter", name: "Pan-Seared Steak with Garlic Butter", emoji: "🥩", cuisine: "American", meal: ["dinner"], time: 20, servings: 2, difficulty: "medium",
    tags: ["date-night", "quick", "low-carb"], diet: ["gluten-free", "low-carb"],
    desc: "A steakhouse crust, a rosy center, and a spoonful of sizzling garlic-herb butter.",
    ing: [["beef", "2 (12 oz)", "ribeye, NY strip, or sirloin steaks, 1-inch thick"], ["butter", "3 tbsp", "butter"], ["garlic", "3 cloves", "garlic, smashed"], ["rosemary", "2 sprigs", "rosemary or thyme"], ["olive-oil", "1 tbsp", "high-heat oil"], ["salt", "", "kosher salt and coarse pepper"], ["potato", "1 lb", "potatoes, for roasting or mashing", true], ["asparagus", "1 bunch", "asparagus", true]],
    steps: ["Take the steaks out 30 minutes ahead. Pat very dry and season generously on all sides.", "Heat a heavy skillet over high until the oil shimmers and just smokes. Lay in the steaks and don't move them for 3–4 minutes until deeply crusted.", "Flip. Add the butter, garlic, and herbs. Tilt the pan and spoon the foaming butter over the steaks for 2–3 minutes (130°F for medium-rare).", "Rest 5 minutes on a board, then slice against the grain and pour the pan butter over."],
    tip: "The rest is not optional — cut too soon and the juices end up on the board instead of in the steak."
  },
  {
    id: "beef-and-broccoli", name: "Beef & Broccoli", emoji: "🥦", cuisine: "Chinese", meal: ["dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["quick", "takeout-at-home"], diet: ["dairy-free"],
    desc: "The takeout classic: tender velveted beef and bright broccoli in a glossy brown sauce.",
    ing: [["beef", "1 lb", "flank steak, thinly sliced"], ["broccoli", "1 large head", "broccoli florets"], ["garlic", "3 cloves", "garlic, minced"], ["ginger", "1 tbsp", "grated ginger"], ["soy-sauce", "¼ cup", "soy sauce"], ["honey", "2 tbsp", "brown sugar or honey"], ["teriyaki", "1 tbsp", "oyster sauce", true], ["broth", "½ cup", "beef broth or water"], ["flour", "2 tbsp", "cornstarch, divided"], ["sesame-oil", "1 tsp", "sesame oil"], ["olive-oil", "2 tbsp", "oil"], ["rice", "1½ cups", "rice, for serving"]],
    steps: ["Toss the beef with 1 tablespoon cornstarch and 1 tablespoon soy sauce. Whisk the remaining soy, sugar, oyster sauce, broth, sesame oil, and remaining cornstarch.", "Steam or blanch the broccoli 2–3 minutes until bright green; drain.", "Sear the beef in the hot oil over high heat in a single layer, 1–2 minutes per side. Push aside; add the garlic and ginger and stir 30 seconds.", "Pour in the sauce and add the broccoli. Toss 1–2 minutes until the sauce thickens and coats everything. Serve over rice."],
    tip: "Baking soda trick: toss the sliced beef with ½ teaspoon baking soda for 15 minutes, rinse, and it'll be takeout-tender."
  },
  {
    id: "meatball-subs", name: "Meatball Subs", emoji: "🥖", cuisine: "Italian", meal: ["dinner", "lunch"], time: 30, servings: 4, difficulty: "easy",
    tags: ["comfort", "kid-friendly", "game-day"], diet: [],
    desc: "Saucy meatballs and melted provolone on toasted rolls. Use frozen meatballs for a 15-minute version.",
    ing: [[["meatballs", "ground-beef"], "1 lb", "meatballs (frozen, or homemade from ground beef)"], ["tomato-sauce", "2 cups", "marinara"], ["buns", "4", "hoagie or sub rolls"], [["mozzarella", "cheese"], "8 slices", "provolone or mozzarella"], ["butter", "2 tbsp", "butter"], ["garlic", "1 clove", "garlic, grated"], ["parmesan", "", "parmesan", true], ["basil", "", "basil", true]],
    steps: ["Simmer the meatballs in the marinara, covered, 15 minutes (until cooked through if raw).", "Mix the butter and garlic; spread on the split rolls. Toast under the broiler 1–2 minutes.", "Load each roll with meatballs and sauce, lay cheese over the top, and broil 1–2 minutes until melted and bubbling.", "Top with parmesan and basil."],
    tip: "Hollow out a little bread from the top half of each roll so the meatballs sit snugly."
  },
  {
    id: "shepherds-pie", name: "Shepherd's Pie", emoji: "🥧", cuisine: "British", meal: ["dinner"], time: 60, servings: 6, difficulty: "medium",
    tags: ["comfort", "family", "freezer-friendly"], diet: ["gluten-free-option"],
    desc: "Savory beef and vegetable gravy under a blanket of buttery mashed potatoes, baked until golden.",
    ing: [["potato", "2 lb", "potatoes, peeled and chunked"], ["butter", "4 tbsp", "butter"], ["milk", "½ cup", "milk"], [["ground-beef", "ground-turkey"], "1½ lb", "ground beef or lamb"], ["onion", "1", "onion, diced"], ["carrot", "2", "carrots, diced"], ["garlic", "3 cloves", "garlic, minced"], ["flour", "2 tbsp", "flour"], ["broth", "1½ cups", "beef broth"], ["tomato-sauce", "2 tbsp", "tomato paste"], ["worcestershire", "1 tbsp", "Worcestershire"], ["peas", "1 cup", "frozen peas"], ["rosemary", "1 tsp", "thyme"], ["cheddar", "½ cup", "cheddar", true]],
    steps: ["Boil the potatoes in salted water until tender, 15 minutes. Drain, mash with the butter and milk, and season well.", "Brown the meat with the onion and carrots over medium-high, 8 minutes. Add the garlic, tomato paste, and thyme; stir 1 minute.", "Sprinkle in the flour, stir, then add the broth and Worcestershire. Simmer 5 minutes until thick. Stir in the peas.", "Spread the filling in a baking dish, top with the mash, rough up the surface with a fork, and scatter cheddar over. Bake at 400°F for 20–25 minutes until golden."],
    tip: "Assemble ahead and refrigerate; bake straight from the fridge, adding 10 minutes."
  },
  {
    id: "philly-cheesesteak", name: "Skillet Philly Cheesesteaks", emoji: "🥪", cuisine: "American", meal: ["dinner", "lunch"], time: 25, servings: 4, difficulty: "easy",
    tags: ["quick", "comfort"], diet: [],
    desc: "Thin-sliced steak, caramelized onions and peppers, and melty provolone on toasted hoagies.",
    ing: [["beef", "1¼ lb", "ribeye or sirloin, very thinly sliced"], ["onion", "1", "onion, sliced"], ["bell-pepper", "1", "green bell pepper, sliced", true], ["mushroom", "8 oz", "mushrooms, sliced", true], ["cheese", "8 slices", "provolone or American"], ["buns", "4", "hoagie rolls"], ["butter", "2 tbsp", "butter"], ["worcestershire", "1 tbsp", "Worcestershire"], ["mayo", "", "mayo", true]],
    steps: ["Cook the onion, pepper, and mushrooms in 1 tablespoon butter over medium-high, 8 minutes until soft and browned. Push to the side.", "Add the remaining butter and the steak. Season with salt, pepper, and Worcestershire. Cook 2–3 minutes, chopping with the spatula, until just cooked.", "Mix the meat and vegetables into 4 piles in the pan. Lay cheese over each pile and cover 1 minute to melt.", "Toast the rolls with a swipe of mayo, then scoop each pile in."],
    tip: "Deli roast beef, chopped and crisped in the pan, is a surprisingly good shortcut."
  },
  {
    id: "korean-beef-bowls", name: "Korean-Style Ground Beef Bowls", emoji: "🍚", cuisine: "Korean", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "meal-prep", "kid-friendly"], diet: ["dairy-free"],
    desc: "Sweet-savory garlicky beef over rice with cucumbers and a fried egg. Faster than delivery.",
    ing: [["ground-beef", "1 lb", "ground beef"], ["garlic", "4 cloves", "garlic, minced"], ["ginger", "1 tsp", "grated ginger", true], ["soy-sauce", "¼ cup", "soy sauce"], ["honey", "3 tbsp", "brown sugar or honey"], ["sesame-oil", "1 tbsp", "sesame oil"], ["red-pepper-flakes", "½ tsp", "red pepper flakes or 1 tbsp gochujang"], ["green-onion", "3", "green onions, sliced"], ["rice", "1½ cups", "rice"], ["cucumber", "1", "cucumber, sliced", true], ["eggs", "4", "eggs, fried", true], ["sesame", "", "sesame seeds", true]],
    steps: ["Cook the rice. Brown the beef over medium-high, breaking it up, 6 minutes. Drain excess fat.", "Add the garlic and ginger; stir 1 minute. Add the soy sauce, sugar, sesame oil, and pepper flakes. Simmer 2–3 minutes until glossy.", "Stir in most of the green onions.", "Serve over rice with cucumber, a fried egg, sesame seeds, and the remaining green onion."],
    tip: "Quick-pickle the cucumbers in a splash of rice vinegar, sugar, and salt while the beef cooks."
  },
  {
    id: "pork-chops-apples", name: "Pork Chops with Caramelized Apples & Onions", emoji: "🍎", cuisine: "American", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["fall", "one-pan", "date-night"], diet: ["gluten-free"],
    desc: "Golden pork chops with sweet-tart apples, onions, and a splash of cider vinegar pan sauce.",
    ing: [["pork", "4", "bone-in or thick boneless pork chops"], ["apple", "2", "apples, sliced"], ["onion", "1", "onion, sliced"], ["butter", "2 tbsp", "butter"], ["olive-oil", "1 tbsp", "oil"], ["rosemary", "1 tbsp", "fresh thyme or rosemary"], ["vinegar", "2 tbsp", "apple cider vinegar"], ["broth", "½ cup", "chicken broth"], ["mustard", "1 tsp", "Dijon"], ["salt", "", "salt and pepper"]],
    steps: ["Season the chops well. Sear in the oil over medium-high, 4–5 minutes per side until golden and 140°F. Remove to rest.", "Add the butter, onion, and apples to the pan. Cook 6–8 minutes until soft and caramelized. Add the herbs.", "Pour in the vinegar, broth, and Dijon; scrape up the browned bits and simmer 2 minutes.", "Return the chops to warm through and spoon the apples and sauce over."],
    tip: "Pull chops at 140°F and rest them — they'll be juicy, not gray."
  },
  {
    id: "pulled-pork", name: "Slow-Cooker Pulled Pork", emoji: "🐖", cuisine: "American", meal: ["dinner"], time: 480, servings: 10, difficulty: "easy",
    tags: ["slow-cooker", "crowd-pleaser", "meal-prep", "freezer-friendly"], diet: ["gluten-free", "dairy-free"],
    desc: "Set-and-forget pork shoulder that shreds with a fork. Sandwiches tonight, tacos tomorrow, nachos this weekend.",
    ing: [["pork", "4–5 lb", "pork shoulder (Boston butt)"], ["onion", "1", "onion, sliced"], ["garlic", "4 cloves", "garlic, smashed"], ["cumin", "2 tbsp", "smoked paprika + 1 tbsp chili powder + 1 tsp cumin"], ["sugar", "2 tbsp", "brown sugar"], ["bbq-sauce", "1 cup", "BBQ sauce, plus more for serving"], ["vinegar", "¼ cup", "apple cider vinegar"], ["buns", "10", "buns, for sandwiches", true], ["cabbage", "", "coleslaw", true], ["salt", "1 tbsp", "salt + 1 tsp pepper"]],
    steps: ["Mix the spices, sugar, salt, and pepper; rub all over the pork.", "Put the onion and garlic in the slow cooker, set the pork on top, and pour in the vinegar and ½ cup BBQ sauce.", "Cook on low 8–10 hours (or high 5–6) until the pork falls apart.", "Shred, discarding fat. Toss with the remaining BBQ sauce and enough cooking liquid to keep it juicy. Pile onto buns with slaw."],
    tip: "Oven method: 300°F, covered, 5–6 hours. Broil the shredded pork 5 minutes for crispy edges."
  },
  {
    id: "pork-fried-rice", name: "Pork Fried Rice", emoji: "🍚", cuisine: "Chinese", meal: ["dinner", "lunch"], time: 20, servings: 4, difficulty: "easy",
    tags: ["quick", "leftovers", "one-pan"], diet: ["dairy-free"],
    desc: "The best use of day-old rice: smoky wok-fried grains with pork, egg, peas, and green onion.",
    ing: [["rice", "4 cups", "cold cooked rice"], [["pork", "ham", "chicken", "shrimp"], "1 lb", "pork loin, diced (or ham, chicken, shrimp)"], ["eggs", "3", "eggs"], ["peas", "1 cup", "frozen peas and carrots"], ["green-onion", "4", "green onions, sliced"], ["garlic", "3 cloves", "garlic, minced"], ["soy-sauce", "3 tbsp", "soy sauce"], ["sesame-oil", "1 tsp", "sesame oil"], ["olive-oil", "3 tbsp", "oil"], ["teriyaki", "1 tbsp", "oyster sauce", true]],
    steps: ["Heat 1 tablespoon oil in a wok or large skillet over high. Cook the pork until browned and cooked through, 4 minutes. Remove.", "Scramble the eggs in 1 tablespoon oil, breaking into pieces. Remove.", "Add the remaining oil, garlic, and peas and carrots; stir 1 minute. Add the rice, pressing it flat, and let it sizzle 2 minutes before tossing. Repeat twice.", "Add the pork, eggs, soy sauce, oyster sauce, and sesame oil. Toss 1 minute. Finish with green onions."],
    tip: "Fresh rice steams instead of frying. If that's all you have, spread it on a tray and freeze 20 minutes first."
  },
  {
    id: "sausage-peppers-onions", name: "Sausage, Peppers & Onions", emoji: "🌭", cuisine: "Italian", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["one-pan", "quick", "crowd-pleaser"], diet: ["dairy-free", "gluten-free-option"],
    desc: "Italian sausage seared with sweet peppers and onions — on rolls, over pasta, or with polenta.",
    ing: [["sausage", "1½ lb", "Italian sausage links"], ["bell-pepper", "3", "bell peppers, sliced"], ["onion", "2", "onions, sliced"], ["garlic", "3 cloves", "garlic, sliced"], ["olive-oil", "2 tbsp", "olive oil"], ["italian-seasoning", "1 tsp", "oregano"], ["tomato-sauce", "½ cup", "marinara", true], ["buns", "4", "hoagie rolls", true], ["parmesan", "", "parmesan", true]],
    steps: ["Brown the sausages in the oil over medium-high, 3 minutes per side. Remove.", "Add the peppers, onions, and a pinch of salt. Cook 10 minutes, stirring occasionally, until soft and browned. Add the garlic and oregano; stir 1 minute.", "Slice the sausages and return them with the marinara (if using) and a splash of water. Simmer 5–7 minutes until the sausage is cooked through.", "Serve on toasted rolls with parmesan, or over pasta or rice."],
    tip: "Roast everything on a sheet pan at 425°F for 25 minutes if you'd rather not stand at the stove."
  },
  {
    id: "bacon-egg-cheese-sandwich", name: "Bacon, Egg & Cheese Breakfast Sandwich", emoji: "🥪", cuisine: "American", meal: ["breakfast"], time: 15, servings: 2, difficulty: "easy",
    tags: ["quick", "weekend"], diet: [],
    desc: "Crispy bacon, a soft-folded egg, and gooey cheese on a toasted bagel or English muffin.",
    ing: [["bacon", "4 slices", "bacon"], ["eggs", "4", "eggs"], [["cheese", "cheddar"], "2 slices", "American or cheddar"], [["bagel", "buns", "bread"], "2", "bagels, English muffins, or croissants"], ["butter", "1 tbsp", "butter"], ["hot-sauce", "", "hot sauce or ketchup", true]],
    steps: ["Cook the bacon in a skillet over medium until crisp; drain on paper towels. Toast the bagels in the bacon fat or a toaster.", "Wipe the pan, add butter over medium-low, and pour in the beaten, salted eggs. Let set 30 seconds, then fold into a rough square the size of your bread. Lay cheese on top and cover 30 seconds to melt.", "Stack: bottom bun, egg and cheese, bacon, hot sauce, top bun."],
    tip: "Cook a whole pound of bacon on a sheet pan at 400°F for 18 minutes and keep it in the fridge for the week."
  },
  {
    id: "carbonara", name: "Spaghetti Carbonara", emoji: "🍝", cuisine: "Italian", meal: ["dinner"], time: 25, servings: 4, difficulty: "medium",
    tags: ["pasta", "date-night", "pantry"], diet: [],
    desc: "Five ingredients, one silky sauce: crisp bacon, egg, parmesan, black pepper, pasta.",
    ing: [["pasta", "1 lb", "spaghetti"], ["bacon", "8 oz", "bacon or pancetta, diced"], ["eggs", "4", "eggs (2 whole + 2 yolks)"], ["parmesan", "1 cup", "finely grated parmesan or pecorino"], ["salt", "1 tsp", "coarsely ground black pepper"], ["garlic", "2 cloves", "garlic, smashed", true]],
    steps: ["Cook the pasta in salted water until al dente. Reserve 1 cup pasta water.", "Meanwhile cook the bacon over medium until crisp; add the garlic for the last minute. Turn off the heat.", "Whisk the eggs, yolks, parmesan, and pepper in a bowl.", "Add the drained hot pasta to the bacon pan and toss. Off the heat, pour in the egg mixture and ¼ cup pasta water, tossing vigorously until creamy — the heat of the pasta cooks the egg. Add more water to loosen. Serve immediately with more cheese and pepper."],
    tip: "Off the heat is the whole game. If the pan is on the burner, you'll get scrambled eggs."
  }
);
