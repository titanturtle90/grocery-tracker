/* Recipe database, part C (breakfast, salads & sides, snacks, desserts, quick dinners). */
window.RECIPE_DATA = window.RECIPE_DATA || [];
window.RECIPE_DATA.push(
  {
    id: "fluffy-pancakes", name: "Fluffy Buttermilk Pancakes", emoji: "🥞", cuisine: "American", meal: ["breakfast"], time: 25, servings: 4, difficulty: "easy",
    tags: ["weekend", "kid-friendly"], diet: ["vegetarian"],
    desc: "Tall, tender diner pancakes from scratch. Works with regular milk plus a splash of vinegar too.",
    ing: [["flour", "2 cups", "flour"], ["sugar", "2 tbsp", "sugar"], ["baking-powder", "2 tsp", "baking powder + ½ tsp baking soda"], [["buttermilk", "milk"], "1¾ cups", "buttermilk (or milk + 1 tbsp vinegar)"], ["eggs", "2", "eggs"], ["butter", "3 tbsp", "melted butter, plus more for the pan"], ["vanilla", "1 tsp", "vanilla"], ["salt", "½ tsp", "salt"], ["berries", "1 cup", "blueberries", true], ["honey", "", "maple syrup, for serving"]],
    steps: ["Whisk the flour, sugar, baking powder, baking soda, and salt. In another bowl whisk the buttermilk, eggs, melted butter, and vanilla.", "Pour wet into dry and stir just until combined — lumps are fine. Rest 5 minutes.", "Heat a buttered griddle over medium. Pour ⅓-cup rounds; scatter berries on top. Cook until bubbles pop and edges look dry, 2–3 minutes; flip and cook 1–2 more.", "Serve with butter and syrup."],
    tip: "Overmixing = tough pancakes. Ten stirs, max."
  },
  {
    id: "overnight-oats", name: "Overnight Oats, 3 Ways", emoji: "🥣", cuisine: "American", meal: ["breakfast"], time: 5, servings: 1, difficulty: "easy",
    tags: ["meal-prep", "no-cook", "healthy"], diet: ["vegetarian", "gluten-free-option", "vegan-option"],
    desc: "Stir, refrigerate, eat. Peanut-butter-banana, berry-vanilla, or apple-cinnamon.",
    ing: [["oats", "½ cup", "rolled oats"], [["milk", "yogurt"], "½ cup", "milk + ¼ cup yogurt"], ["honey", "1 tbsp", "honey or maple"], ["cinnamon", "¼ tsp", "cinnamon"], [["banana", "berries", "apple"], "½ cup", "banana, berries, or diced apple"], ["peanut-butter", "1 tbsp", "peanut butter", true], ["vanilla", "¼ tsp", "vanilla", true], ["peanuts", "1 tbsp", "chopped nuts or chia", true]],
    steps: ["Stir the oats, milk, yogurt, sweetener, cinnamon, and vanilla in a jar.", "Fold in your fruit (and peanut butter, if using). Cover and refrigerate at least 4 hours or overnight.", "Top with nuts and more fruit before eating. Keeps 4 days."],
    tip: "Make 4 jars on Sunday. Add a splash of milk in the morning if it's too thick."
  },
  {
    id: "veggie-omelet", name: "Diner Veggie & Cheese Omelet", emoji: "🍳", cuisine: "American", meal: ["breakfast"], time: 15, servings: 1, difficulty: "easy",
    tags: ["quick", "use-it-up", "low-carb"], diet: ["vegetarian", "gluten-free", "low-carb"],
    desc: "Fluffy folded eggs around melted cheese and sautéed vegetables. Use whatever's in the drawer.",
    ing: [["eggs", "3", "eggs"], [["cheese", "cheddar", "feta"], "⅓ cup", "shredded cheese"], [["bell-pepper", "mushroom", "spinach", "onion", "tomato"], "¾ cup", "diced peppers, mushrooms, spinach, onion, tomato"], ["butter", "1 tbsp", "butter"], ["milk", "1 tbsp", "milk or water", true], ["green-onion", "", "green onion or chives", true], ["ham", "¼ cup", "diced ham", true]],
    steps: ["Sauté the vegetables (and ham) in half the butter over medium 3–4 minutes. Set aside.", "Whisk the eggs with milk, salt, and pepper. Melt the remaining butter over medium-low and pour in the eggs.", "As the edges set, push them toward the center and tilt the pan to fill. When mostly set but still glossy, add the cheese and filling to one half.", "Fold, slide onto a plate, and top with green onion."],
    tip: "Low heat and patience make a tender omelet; high heat makes rubber."
  },
  {
    id: "breakfast-burritos", name: "Freezer Breakfast Burritos", emoji: "🌯", cuisine: "Mexican", meal: ["breakfast"], time: 35, servings: 8, difficulty: "easy",
    tags: ["meal-prep", "freezer-friendly"], diet: [],
    desc: "Scrambled eggs, sausage, potatoes, and cheese rolled up and frozen for two-minute breakfasts.",
    ing: [["eggs", "10", "eggs"], [["sausage", "bacon"], "1 lb", "breakfast sausage or bacon"], ["potato", "2 cups", "frozen diced potatoes or hash browns"], ["tortilla", "8", "large flour tortillas"], ["cheddar", "2 cups", "shredded cheddar"], ["bell-pepper", "1", "bell pepper, diced", true], ["onion", "½", "onion, diced", true], ["salsa", "½ cup", "salsa"], ["hot-sauce", "", "hot sauce", true]],
    steps: ["Brown the sausage; remove. Cook the potatoes, pepper, and onion in the drippings until golden, 8 minutes.", "Scramble the eggs softly with salt and pepper.", "Lay out the tortillas. Fill each with eggs, sausage, potatoes, cheese, and a spoon of salsa. Fold in the sides and roll tight.", "Eat now, or wrap individually in foil and freeze. Reheat: microwave 2 minutes from frozen, or bake at 375°F for 20 minutes."],
    tip: "Slightly undercook the eggs — they finish when reheated."
  },
  {
    id: "banana-bread", name: "Brown Butter Banana Bread", emoji: "🍌", cuisine: "American", meal: ["breakfast", "dessert", "snack"], time: 70, servings: 10, difficulty: "easy",
    tags: ["baking", "use-it-up"], diet: ["vegetarian"],
    desc: "The best use of black bananas: moist, deeply flavored, with a crackly sugar top.",
    ing: [["banana", "3", "very ripe bananas"], ["butter", "½ cup", "butter"], ["sugar", "¾ cup", "brown sugar"], ["eggs", "2", "eggs"], ["vanilla", "1 tsp", "vanilla"], ["flour", "1¾ cups", "flour"], ["baking-powder", "1 tsp", "baking soda"], ["cinnamon", "½ tsp", "cinnamon"], ["salt", "½ tsp", "salt"], [["chocolate", "peanuts"], "¾ cup", "chocolate chips or walnuts", true]],
    steps: ["Heat the oven to 350°F. Butter a 9×5 loaf pan. Melt the butter in a pan and cook until it foams and turns golden brown with a nutty smell; cool slightly.", "Mash the bananas. Whisk in the brown butter, sugar, eggs, and vanilla.", "Fold in the flour, baking soda, cinnamon, and salt until just combined. Add chips or nuts.", "Bake 55–65 minutes until a skewer comes out clean. Cool 15 minutes before slicing."],
    tip: "Spotty-black bananas are the goal. Freeze overripe ones and thaw when you're ready to bake."
  },
  {
    id: "yogurt-parfait", name: "Berry Granola Yogurt Parfaits", emoji: "🫐", cuisine: "American", meal: ["breakfast", "snack"], time: 5, servings: 2, difficulty: "easy",
    tags: ["no-cook", "quick", "healthy"], diet: ["vegetarian", "gluten-free-option"],
    desc: "Layers of thick yogurt, crunchy granola, and fresh berries with a drizzle of honey.",
    ing: [["yogurt", "1½ cups", "Greek yogurt"], ["granola", "¾ cup", "granola"], ["berries", "1 cup", "mixed berries"], ["honey", "2 tbsp", "honey"], ["banana", "1", "banana, sliced", true], ["peanuts", "2 tbsp", "sliced almonds", true]],
    steps: ["Spoon a layer of yogurt into two glasses. Add granola, then berries. Repeat.", "Finish with a drizzle of honey and nuts."],
    tip: "Pack granola separately if making ahead so it stays crunchy."
  },
  {
    id: "french-toast", name: "Classic French Toast", emoji: "🍞", cuisine: "French", meal: ["breakfast"], time: 20, servings: 4, difficulty: "easy",
    tags: ["weekend", "use-it-up", "kid-friendly"], diet: ["vegetarian"],
    desc: "Custardy inside, golden outside. The best thing to do with slightly stale bread.",
    ing: [["bread", "8 slices", "thick bread (brioche, challah, Texas toast, or day-old sandwich bread)"], ["eggs", "4", "eggs"], ["milk", "1 cup", "milk or half-and-half"], ["sugar", "2 tbsp", "sugar"], ["vanilla", "1 tsp", "vanilla"], ["cinnamon", "½ tsp", "cinnamon"], ["butter", "3 tbsp", "butter"], ["honey", "", "maple syrup"], ["berries", "", "berries or banana", true]],
    steps: ["Whisk the eggs, milk, sugar, vanilla, cinnamon, and a pinch of salt in a shallow dish.", "Soak each slice 20 seconds per side — longer for stale bread.", "Cook in butter over medium 2–3 minutes per side until golden.", "Serve with syrup, butter, and fruit."],
    tip: "Keep finished slices warm on a rack in a 200°F oven while you cook the rest."
  },
  {
    id: "avocado-toast-eggs", name: "Avocado Toast with Jammy Eggs", emoji: "🥑", cuisine: "American", meal: ["breakfast", "lunch"], time: 12, servings: 2, difficulty: "easy",
    tags: ["quick", "healthy"], diet: ["vegetarian", "dairy-free"],
    desc: "Smashed lime-chili avocado on crunchy toast with soft-boiled eggs and everything seasoning.",
    ing: [["avocado", "1", "ripe avocado"], ["bread", "2 slices", "sourdough or whole grain"], ["eggs", "2", "eggs"], ["lime", "½", "lime or lemon"], ["red-pepper-flakes", "", "red pepper flakes"], ["garlic-powder", "", "everything bagel seasoning or flaky salt", true], ["tomato", "½ cup", "cherry tomatoes", true], ["feta", "", "feta", true]],
    steps: ["Lower the eggs into boiling water for 6½ minutes; transfer to ice water, then peel.", "Toast the bread. Mash the avocado with lime, salt, and pepper flakes; spread thick.", "Halve the eggs over the toast. Top with seasoning, tomatoes, and feta."],
    tip: "7 minutes gives a firmer yolk, 6 a runnier one."
  },
  {
    id: "smoothie-bowl", name: "Mango-Banana Smoothie", emoji: "🥭", cuisine: "American", meal: ["breakfast", "snack"], time: 5, servings: 2, difficulty: "easy",
    tags: ["quick", "healthy", "no-cook", "use-it-up"], diet: ["vegetarian", "gluten-free", "vegan-option"],
    desc: "Thick, creamy, and bright. Swap any frozen fruit and use whatever milk or yogurt you have.",
    ing: [[["mango", "berries", "pineapple", "peach"], "1½ cups", "frozen mango, berries, or pineapple"], ["banana", "1", "banana"], [["milk", "coconut-water", "yogurt"], "1 cup", "milk, juice, or yogurt"], ["spinach", "1 cup", "spinach (you won't taste it)", true], ["honey", "1 tsp", "honey", true], ["peanut-butter", "1 tbsp", "peanut butter", true], ["ginger", "½ tsp", "ginger", true]],
    steps: ["Blend everything until completely smooth, adding more liquid a splash at a time as needed.", "Pour into glasses, or use less liquid and top a bowl with granola and fruit."],
    tip: "Peel and freeze bananas that are getting too ripe — they make the creamiest smoothies."
  },
  {
    id: "egg-salad-sandwich", name: "Egg Salad Sandwiches", emoji: "🥪", cuisine: "American", meal: ["lunch"], time: 20, servings: 4, difficulty: "easy",
    tags: ["lunch", "pantry", "meal-prep"], diet: ["vegetarian"],
    desc: "Creamy, tangy egg salad with dill and a little crunch on soft bread or a buttery croissant.",
    ing: [["eggs", "8", "eggs"], ["mayo", "⅓ cup", "mayo"], ["mustard", "1 tsp", "Dijon or yellow mustard"], ["celery", "1 stalk", "celery, minced", true], ["green-onion", "2", "green onions or chives"], ["dill", "1 tbsp", "dill or parsley", true], ["pickles", "1 tbsp", "relish", true], ["lemon", "1 tsp", "lemon juice or vinegar"], ["bread", "8 slices", "bread or croissants"], ["lettuce", "", "lettuce", true], ["cumin", "", "paprika", true]],
    steps: ["Cover the eggs with cold water, bring to a boil, cover, and turn off the heat. Sit 11 minutes, then ice-bath and peel.", "Chop the eggs. Fold with the mayo, mustard, celery, green onion, dill, relish, lemon, salt, and pepper.", "Pile onto bread with lettuce and a dusting of paprika."],
    tip: "Older eggs peel more easily than fresh ones."
  },
  {
    id: "greek-salad", name: "Big Greek Salad", emoji: "🥗", cuisine: "Greek", meal: ["lunch", "dinner"], time: 15, servings: 4, difficulty: "easy",
    tags: ["no-cook", "summer", "side", "healthy"], diet: ["vegetarian", "gluten-free"],
    desc: "Crunchy cucumbers, ripe tomatoes, briny olives, and a block of feta in a lemon-oregano dressing.",
    ing: [["cucumber", "1", "cucumber, chunked"], ["tomato", "3", "tomatoes, chunked"], ["bell-pepper", "1", "green bell pepper, sliced"], ["onion", "½", "red onion, thinly sliced"], ["olives", "½ cup", "kalamata olives"], ["feta", "6 oz", "feta, in a block or crumbled"], ["olive-oil", "¼ cup", "olive oil"], ["lemon", "1", "lemon (or 2 tbsp red wine vinegar)"], ["italian-seasoning", "1 tsp", "dried oregano"], ["lettuce", "3 cups", "romaine, chopped", true], ["chickpeas", "1 cup", "chickpeas", true], ["pita", "", "warm pita", true]],
    steps: ["Whisk the oil, lemon juice, oregano, salt, and pepper.", "Toss the vegetables, olives, and chickpeas with most of the dressing.", "Top with feta, drizzle with the remaining dressing, and more oregano. Serve with pita."],
    tip: "Salt the tomatoes and cucumbers 5 minutes before dressing — they'll taste twice as good."
  },
  {
    id: "cobb-salad", name: "Cobb Salad", emoji: "🥗", cuisine: "American", meal: ["lunch", "dinner"], time: 25, servings: 4, difficulty: "easy",
    tags: ["salad", "healthy", "use-it-up"], diet: ["gluten-free", "low-carb"],
    desc: "Rows of chicken, bacon, egg, avocado, tomato, and blue cheese over crisp greens with a creamy dressing.",
    ing: [["lettuce", "1 head", "romaine or mixed greens"], ["chicken", "2 cups", "cooked chicken, diced"], ["bacon", "6 slices", "bacon, cooked and crumbled"], ["eggs", "3", "hard-boiled eggs"], ["avocado", "1", "avocado"], ["tomato", "1 cup", "cherry tomatoes"], [["feta", "cheese"], "½ cup", "blue cheese or feta"], ["ranch", "½ cup", "ranch or blue cheese dressing"], ["green-onion", "2", "green onions", true]],
    steps: ["Spread the greens on a platter.", "Arrange the chicken, bacon, eggs, avocado, tomatoes, and cheese in rows.", "Drizzle with dressing, season with pepper, and toss at the table."],
    tip: "Rotisserie chicken and pre-cooked bacon make this a 10-minute dinner."
  },
  {
    id: "caprese-salad", name: "Caprese Salad", emoji: "🍅", cuisine: "Italian", meal: ["lunch", "snack"], time: 10, servings: 4, difficulty: "easy",
    tags: ["no-cook", "summer", "side"], diet: ["vegetarian", "gluten-free"],
    desc: "Ripe tomato, fresh mozzarella, basil, olive oil, balsamic, salt. That's it, and it's perfect.",
    ing: [["tomato", "3", "ripe tomatoes, sliced"], ["mozzarella", "8 oz", "fresh mozzarella, sliced"], ["basil", "1 cup", "basil leaves"], ["olive-oil", "3 tbsp", "good olive oil"], ["vinegar", "1 tbsp", "balsamic"], ["salt", "", "flaky salt and pepper"], ["bread", "", "crusty bread", true]],
    steps: ["Alternate tomato, mozzarella, and basil on a platter.", "Drizzle with olive oil and balsamic; season generously."],
    tip: "Room-temperature tomatoes and cheese — never straight from the fridge."
  },
  {
    id: "roasted-brussels-bacon", name: "Crispy Brussels Sprouts with Bacon", emoji: "🥬", cuisine: "American", meal: ["dinner"], time: 30, servings: 4, difficulty: "easy",
    tags: ["side", "holiday"], diet: ["gluten-free", "dairy-free"],
    desc: "Charred, caramelized sprouts with crispy bacon and a balsamic-honey glaze.",
    ing: [["brussels", "1½ lb", "Brussels sprouts, halved"], ["bacon", "4 slices", "bacon, chopped"], ["olive-oil", "2 tbsp", "olive oil"], ["vinegar", "1 tbsp", "balsamic"], ["honey", "1 tbsp", "honey or maple"], ["garlic", "2 cloves", "garlic", true], ["parmesan", "", "parmesan", true]],
    steps: ["Heat the oven to 425°F. Toss the sprouts with oil, salt, and pepper; spread cut-side down on a sheet pan with the bacon.", "Roast 20–25 minutes until deeply browned and the bacon is crisp.", "Drizzle with balsamic and honey, toss, and roast 3 more minutes. Top with parmesan."],
    tip: "Cut-side down and don't touch them for the first 15 minutes — that's where the caramelization happens."
  },
  {
    id: "garlic-parmesan-roasted-broccoli", name: "Garlic-Parmesan Roasted Broccoli", emoji: "🥦", cuisine: "American", meal: ["dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["side", "quick", "healthy"], diet: ["vegetarian", "gluten-free", "low-carb"],
    desc: "Crispy-edged broccoli that converts skeptics. Also works with cauliflower, green beans, or asparagus.",
    ing: [[["broccoli", "cauliflower", "green-beans", "asparagus"], "1 large head", "broccoli (or cauliflower, green beans, asparagus)"], ["olive-oil", "3 tbsp", "olive oil"], ["garlic", "3 cloves", "garlic, minced"], ["parmesan", "⅓ cup", "parmesan"], ["lemon", "½", "lemon"], ["red-pepper-flakes", "", "red pepper flakes", true]],
    steps: ["Heat the oven to 450°F. Toss the florets with oil, garlic, salt, and pepper on a sheet pan.", "Roast 15–18 minutes until charred at the edges.", "Toss with parmesan, lemon juice, and pepper flakes."],
    tip: "High heat and a dry pan — wet vegetables steam instead of roasting."
  },
  {
    id: "smashed-potatoes", name: "Crispy Smashed Potatoes", emoji: "🥔", cuisine: "American", meal: ["dinner"], time: 45, servings: 4, difficulty: "easy",
    tags: ["side", "crowd-pleaser"], diet: ["vegetarian", "gluten-free", "vegan-option"],
    desc: "Boiled, smashed, and roasted until shatteringly crisp, with garlic butter and herbs.",
    ing: [["potato", "1½ lb", "baby potatoes"], ["butter", "3 tbsp", "butter or olive oil"], ["garlic", "3 cloves", "garlic, minced"], ["rosemary", "1 tbsp", "rosemary, thyme, or parsley"], ["parmesan", "", "parmesan", true], ["sour-cream", "", "sour cream, for dipping", true], ["olive-oil", "2 tbsp", "olive oil"]],
    steps: ["Boil the potatoes in salted water until fork-tender, 15–20 minutes. Drain and let steam dry 5 minutes.", "Heat the oven to 450°F. Arrange on an oiled sheet pan and smash each with a glass to ½-inch thick. Brush with oil, season.", "Roast 25 minutes until golden and crisp.", "Mix the melted butter, garlic, and herbs; brush over the potatoes and scatter parmesan."],
    tip: "The drier the potatoes before roasting, the crispier they get."
  },
  {
    id: "coleslaw", name: "Creamy Coleslaw", emoji: "🥬", cuisine: "American", meal: ["dinner", "lunch"], time: 10, servings: 6, difficulty: "easy",
    tags: ["side", "no-cook", "bbq"], diet: ["vegetarian", "gluten-free"],
    desc: "Crunchy, tangy, just-sweet-enough slaw for pulled pork, tacos, or burgers.",
    ing: [["cabbage", "1 (14 oz) bag", "coleslaw mix or ½ head cabbage, shredded"], ["carrot", "1", "carrot, grated", true], ["mayo", "½ cup", "mayo"], ["vinegar", "2 tbsp", "apple cider vinegar"], ["sugar", "1 tbsp", "sugar or honey"], ["mustard", "1 tsp", "Dijon"], ["salt", "", "salt, pepper, celery seed"]],
    steps: ["Whisk the mayo, vinegar, sugar, Dijon, salt, pepper, and celery seed.", "Toss with the cabbage and carrot. Chill 20 minutes if you can."],
    tip: "For a lighter version, swap half the mayo for Greek yogurt."
  },
  {
    id: "cucumber-salad", name: "Quick Cucumber Salad", emoji: "🥒", cuisine: "Asian", meal: ["lunch", "dinner"], time: 10, servings: 4, difficulty: "easy",
    tags: ["side", "no-cook", "summer", "use-it-up"], diet: ["vegetarian", "vegan", "gluten-free"],
    desc: "Smashed cucumbers in a garlicky sesame-soy-vinegar dressing. Cooling and crunchy.",
    ing: [["cucumber", "2", "cucumbers"], ["garlic", "2 cloves", "garlic, minced"], ["vinegar", "2 tbsp", "rice vinegar"], ["soy-sauce", "1 tbsp", "soy sauce"], ["sesame-oil", "1 tsp", "sesame oil"], ["sugar", "1 tsp", "sugar"], ["red-pepper-flakes", "", "chili flakes or chili crisp"], ["sesame", "", "sesame seeds", true], ["cilantro", "", "cilantro", true]],
    steps: ["Smash the cucumbers with the flat of a knife, then cut into bite-size pieces. Salt and drain 5 minutes.", "Whisk the garlic, vinegar, soy, sesame oil, sugar, and chili.", "Toss with the cucumbers; top with sesame seeds and cilantro."],
    tip: "Swap the dressing for sour cream, dill, and lemon for a creamy version."
  },
  {
    id: "guacamole", name: "Proper Guacamole", emoji: "🥑", cuisine: "Mexican", meal: ["snack"], time: 10, servings: 4, difficulty: "easy",
    tags: ["no-cook", "game-day", "quick"], diet: ["vegetarian", "vegan", "gluten-free"],
    desc: "Chunky, limey, with plenty of salt, onion, and cilantro. Never from a tub again.",
    ing: [["avocado", "3", "ripe avocados"], ["lime", "1", "lime"], ["onion", "¼", "red or white onion, minced"], ["cilantro", "¼ cup", "cilantro, chopped"], ["jalapeno", "1", "jalapeño, minced", true], ["tomato", "1", "tomato, diced", true], ["garlic", "1 clove", "garlic, grated", true], ["tortilla-chips", "", "tortilla chips"]],
    steps: ["Mash the avocados roughly with lime juice and ½ teaspoon salt.", "Fold in the onion, cilantro, jalapeño, tomato, and garlic. Taste — it probably needs more salt and lime."],
    tip: "Press plastic wrap directly on the surface to keep leftovers green."
  },
  {
    id: "loaded-nachos", name: "Sheet-Pan Loaded Nachos", emoji: "🧀", cuisine: "Mexican", meal: ["snack", "dinner"], time: 20, servings: 4, difficulty: "easy",
    tags: ["game-day", "leftovers", "crowd-pleaser"], diet: ["gluten-free", "vegetarian-option"],
    desc: "Layers of chips, melted cheese, seasoned meat or beans, and all the cold toppings.",
    ing: [["tortilla-chips", "1 (10 oz) bag", "tortilla chips"], ["cheddar", "3 cups", "shredded cheddar or Mexican blend"], [["ground-beef", "chicken", "black-beans", "pork"], "1 lb", "taco meat, shredded chicken, or black beans"], ["jalapeno", "1", "jalapeño, sliced", true], ["salsa", "1 cup", "salsa or pico"], ["sour-cream", "½ cup", "sour cream"], ["avocado", "1", "avocado or guacamole", true], ["green-onion", "2", "green onions", true], ["cilantro", "", "cilantro", true], ["taco-seasoning", "1 tbsp", "taco seasoning"]],
    steps: ["Heat the oven to 400°F. Season the meat or beans with taco seasoning and warm through.", "Spread half the chips on a sheet pan, top with half the cheese and half the meat. Repeat.", "Bake 8–10 minutes until the cheese is fully melted.", "Top with salsa, sour cream, avocado, jalapeño, green onion, and cilantro."],
    tip: "Two thin layers beat one thick pile — every chip gets cheese."
  },
  {
    id: "hummus-veggie-plate", name: "Hummus Snack Plate", emoji: "🥙", cuisine: "Mediterranean", meal: ["snack", "lunch"], time: 10, servings: 2, difficulty: "easy",
    tags: ["no-cook", "healthy", "quick"], diet: ["vegetarian", "vegan", "gluten-free-option"],
    desc: "A no-cook lunch or snack: hummus, crunchy vegetables, warm pita, olives, and feta.",
    ing: [["hummus", "1 cup", "hummus"], [["cucumber", "carrot", "bell-pepper", "celery", "radish"], "3 cups", "cucumber, carrots, bell pepper, celery"], ["pita", "2", "pita, warmed and cut into wedges"], ["olives", "⅓ cup", "olives", true], ["feta", "", "feta", true], ["olive-oil", "1 tbsp", "olive oil"], ["cumin", "", "paprika or za'atar", true], ["tomato", "1 cup", "cherry tomatoes", true]],
    steps: ["Spread the hummus on a plate and swirl. Drizzle with oil and sprinkle with paprika.", "Arrange the vegetables, pita, olives, and feta around it."],
    tip: "Add a hard-boiled egg or leftover chicken to make it a full meal."
  },
  {
    id: "buffalo-chicken-dip", name: "Buffalo Chicken Dip", emoji: "🌶️", cuisine: "American", meal: ["snack"], time: 30, servings: 8, difficulty: "easy",
    tags: ["game-day", "crowd-pleaser", "leftovers"], diet: ["gluten-free"],
    desc: "Creamy, spicy, cheesy, and gone in ten minutes at any party.",
    ing: [["chicken", "3 cups", "cooked shredded chicken"], ["cream-cheese", "8 oz", "cream cheese, softened"], ["hot-sauce", "½ cup", "buffalo sauce"], ["ranch", "½ cup", "ranch dressing"], ["cheddar", "1½ cups", "shredded cheddar"], ["green-onion", "2", "green onions", true], ["tortilla-chips", "", "chips, celery, or crackers"]],
    steps: ["Heat the oven to 375°F. Mix the cream cheese, buffalo sauce, and ranch until smooth. Fold in the chicken and 1 cup cheddar.", "Spread in a baking dish, top with the remaining cheddar, and bake 20 minutes until bubbling.", "Top with green onions. Serve with chips and celery."],
    tip: "Slow cooker: low for 2 hours, stir, and keep on warm."
  },
  {
    id: "chocolate-chip-cookies", name: "Chewy Chocolate Chip Cookies", emoji: "🍪", cuisine: "American", meal: ["dessert", "snack"], time: 30, servings: 24, difficulty: "easy",
    tags: ["baking", "kid-friendly"], diet: ["vegetarian"],
    desc: "Crisp edges, soft centers, puddles of chocolate. The one to memorize.",
    ing: [["butter", "1 cup", "butter, softened"], ["sugar", "1½ cups", "sugar (¾ brown + ¾ white)"], ["eggs", "2", "eggs"], ["vanilla", "2 tsp", "vanilla"], ["flour", "2¼ cups", "flour"], ["baking-powder", "1 tsp", "baking soda"], ["salt", "1 tsp", "salt"], ["chocolate", "2 cups", "chocolate chips"]],
    steps: ["Heat the oven to 350°F. Beat the butter and sugars until fluffy, 2 minutes. Beat in the eggs and vanilla.", "Stir in the flour, baking soda, and salt, then the chocolate chips.", "Scoop 2-tablespoon balls onto lined sheets, 2 inches apart. Bake 10–12 minutes until the edges are golden but centers look underdone.", "Cool on the pan 5 minutes. Sprinkle with flaky salt."],
    tip: "Chill the dough 30 minutes (or overnight) for thicker cookies with deeper flavor."
  },
  {
    id: "berry-crisp", name: "Any-Fruit Crisp", emoji: "🥧", cuisine: "American", meal: ["dessert"], time: 50, servings: 6, difficulty: "easy",
    tags: ["baking", "use-it-up"], diet: ["vegetarian", "gluten-free-option"],
    desc: "Bubbling fruit under a buttery oat crumble. Berries, apples, peaches, or whatever's about to turn.",
    ing: [[["berries", "apple", "peach", "pear"], "6 cups", "berries, sliced apples, peaches, or pears"], ["sugar", "⅓ cup + ½ cup", "sugar (⅓ for fruit, ½ brown for topping)"], ["lemon", "1", "lemon"], ["flour", "2 tbsp + ¾ cup", "flour"], ["oats", "1 cup", "rolled oats"], ["butter", "½ cup", "cold butter, cubed"], ["cinnamon", "1 tsp", "cinnamon"], ["peanuts", "½ cup", "chopped pecans or almonds", true]],
    steps: ["Heat the oven to 375°F. Toss the fruit with ⅓ cup sugar, lemon juice, and 2 tablespoons flour in a baking dish.", "Mix the oats, ¾ cup flour, brown sugar, cinnamon, and a pinch of salt. Work in the butter with your fingers until clumpy. Add nuts.", "Scatter over the fruit and bake 35–40 minutes until golden and bubbling.", "Serve warm with vanilla ice cream."],
    tip: "Frozen fruit works straight from the bag — add 10 minutes."
  },
  {
    id: "no-bake-pb-bars", name: "No-Bake Peanut Butter Oat Bars", emoji: "🥜", cuisine: "American", meal: ["snack", "dessert"], time: 15, servings: 12, difficulty: "easy",
    tags: ["no-bake", "meal-prep", "kid-friendly"], diet: ["vegetarian", "gluten-free-option", "vegan-option"],
    desc: "Chewy, chocolate-topped peanut butter bars from pantry staples. No oven required.",
    ing: [["peanut-butter", "1 cup", "peanut butter"], ["honey", "½ cup", "honey or maple"], ["oats", "2½ cups", "rolled or quick oats"], ["chocolate", "1 cup", "chocolate chips"], ["vanilla", "1 tsp", "vanilla"], ["butter", "¼ cup", "butter or coconut oil"], ["salt", "½ tsp", "salt"]],
    steps: ["Warm the peanut butter, honey, butter, and vanilla until smooth. Stir in the oats and salt.", "Press firmly into a lined 8×8 pan.", "Melt the chocolate and spread over the top. Chill 1 hour, then cut into bars."],
    tip: "Keep them in the fridge — they soften at room temperature."
  },
  {
    id: "mug-cake", name: "5-Minute Chocolate Mug Cake", emoji: "🍫", cuisine: "American", meal: ["dessert"], time: 5, servings: 1, difficulty: "easy",
    tags: ["quick", "single-serve"], diet: ["vegetarian"],
    desc: "A warm, gooey chocolate cake made in a mug when the craving hits.",
    ing: [["flour", "4 tbsp", "flour"], ["sugar", "3 tbsp", "sugar"], ["chocolate", "2 tbsp + 2 tbsp", "cocoa powder + chocolate chips"], ["baking-powder", "¼ tsp", "baking powder"], ["milk", "3 tbsp", "milk"], ["butter", "2 tbsp", "melted butter or oil"], ["vanilla", "¼ tsp", "vanilla"], ["salt", "", "pinch of salt"]],
    steps: ["Whisk the flour, sugar, cocoa, baking powder, and salt in a large mug.", "Stir in the milk, butter, and vanilla until smooth. Drop the chocolate chips in the center.", "Microwave 70–90 seconds until puffed and just set. Cool 1 minute."],
    tip: "Undercook slightly — the center keeps cooking after it stops."
  },
  {
    id: "apple-cinnamon-oatmeal", name: "Apple Cinnamon Stovetop Oatmeal", emoji: "🍎", cuisine: "American", meal: ["breakfast"], time: 15, servings: 2, difficulty: "easy",
    tags: ["quick", "healthy", "fall"], diet: ["vegetarian", "gluten-free-option", "vegan-option"],
    desc: "Creamy oats with tender sautéed apples, cinnamon, and a drizzle of maple.",
    ing: [["oats", "1 cup", "rolled oats"], ["apple", "1", "apple, diced"], [["milk", "coconut-milk"], "1 cup", "milk + 1 cup water"], ["cinnamon", "1 tsp", "cinnamon"], ["honey", "2 tbsp", "maple syrup"], ["butter", "1 tbsp", "butter"], ["peanuts", "", "walnuts or pecans", true], ["dried-fruit", "", "raisins", true], ["salt", "", "pinch of salt"]],
    steps: ["Cook the apple in the butter with cinnamon 3 minutes until softened.", "Add the oats, milk, water, and salt. Simmer 5–7 minutes, stirring, until creamy.", "Sweeten with maple and top with nuts and raisins."],
    tip: "Stir in a spoon of peanut butter at the end for staying power."
  },
  {
    id: "pigs-in-blankets", name: "Hot Dogs, Two Ways", emoji: "🌭", cuisine: "American", meal: ["dinner", "lunch"], time: 15, servings: 4, difficulty: "easy",
    tags: ["quick", "kid-friendly", "budget"], diet: [],
    desc: "Griddled hot dogs with caramelized onions on toasted buns — or wrapped in crescent dough for the kids.",
    ing: [["hot-dog", "8", "hot dogs"], ["buns", "8", "hot dog buns"], ["onion", "1", "onion, sliced", true], ["butter", "1 tbsp", "butter"], ["mustard", "", "mustard and ketchup"], ["pickles", "", "relish", true], ["cheddar", "½ cup", "shredded cheddar", true], ["pizza-dough", "1 tube", "crescent dough (for pigs in blankets)", true]],
    steps: ["Cook the onion in the butter over medium 10 minutes until golden.", "Split the hot dogs lengthwise and griddle cut-side down until browned and crisp. Toast the buns.", "Load with onions, cheese, mustard, and relish.", "Kids' version: wrap each dog in a crescent triangle and bake at 375°F for 12 minutes."],
    tip: "A split, griddled hot dog has twice the browned surface of a boiled one."
  },
  {
    id: "ham-cheese-sliders", name: "Baked Ham & Cheese Sliders", emoji: "🥪", cuisine: "American", meal: ["dinner", "snack"], time: 30, servings: 6, difficulty: "easy",
    tags: ["game-day", "crowd-pleaser", "kid-friendly"], diet: [],
    desc: "Sweet rolls stuffed with ham and Swiss, brushed with poppy-seed mustard butter, baked until golden.",
    ing: [["buns", "12", "Hawaiian sweet rolls"], ["ham", "¾ lb", "sliced deli ham"], ["cheese", "12 slices", "Swiss or provolone"], ["butter", "4 tbsp", "butter, melted"], ["mustard", "1 tbsp", "Dijon"], ["worcestershire", "1 tsp", "Worcestershire"], ["honey", "1 tsp", "honey or brown sugar"], ["garlic-powder", "½ tsp", "onion powder + poppy seeds", true]],
    steps: ["Heat the oven to 350°F. Slice the whole slab of rolls in half horizontally; set the bottom in a baking dish.", "Layer ham and cheese; replace the top.", "Whisk the butter, Dijon, Worcestershire, honey, and onion powder. Brush over the tops.", "Cover with foil and bake 15 minutes; uncover and bake 5 more until golden. Cut apart."],
    tip: "Turkey and cheddar, or roast beef and provolone, work just as well."
  },
  {
    id: "tomato-basil-bruschetta", name: "Tomato Basil Bruschetta", emoji: "🍅", cuisine: "Italian", meal: ["snack", "lunch"], time: 15, servings: 4, difficulty: "easy",
    tags: ["summer", "no-cook-ish", "use-it-up"], diet: ["vegetarian", "vegan-option"],
    desc: "Garlicky grilled bread piled with marinated tomatoes and basil.",
    ing: [["tomato", "4", "ripe tomatoes, diced"], ["basil", "½ cup", "basil, sliced"], ["garlic", "2 cloves", "garlic (1 minced, 1 whole)"], ["olive-oil", "3 tbsp", "olive oil"], ["vinegar", "1 tbsp", "balsamic"], ["bread", "1", "baguette or crusty loaf, sliced"], ["mozzarella", "", "fresh mozzarella or parmesan", true]],
    steps: ["Toss the tomatoes with basil, minced garlic, 2 tablespoons oil, balsamic, salt, and pepper. Sit 10 minutes.", "Brush the bread with oil and grill or toast until golden. Rub with the whole garlic clove.", "Spoon the tomatoes over just before serving."],
    tip: "Drain the tomatoes in a sieve for 5 minutes so the bread doesn't go soggy."
  },
  {
    id: "chicken-salad", name: "Classic Chicken Salad", emoji: "🥪", cuisine: "American", meal: ["lunch"], time: 15, servings: 4, difficulty: "easy",
    tags: ["meal-prep", "leftovers", "no-cook"], diet: ["gluten-free-option"],
    desc: "Creamy chicken salad with crunchy celery, grapes or apple, and toasted nuts. Sandwiches, wraps, or over greens.",
    ing: [["chicken", "3 cups", "cooked chicken, diced (rotisserie is perfect)"], ["mayo", "½ cup", "mayo (or half Greek yogurt)"], ["celery", "2 stalks", "celery, diced"], [["grapes", "apple", "dried-fruit"], "1 cup", "halved grapes, diced apple, or dried cranberries", true], ["peanuts", "⅓ cup", "toasted pecans or almonds", true], ["lemon", "1", "lemon"], ["mustard", "1 tsp", "Dijon"], ["green-onion", "2", "green onions or chives"], [["bread", "buns", "lettuce", "tortilla"], "", "bread, croissants, wraps, or lettuce cups"]],
    steps: ["Whisk the mayo, lemon juice, Dijon, salt, and pepper.", "Fold in the chicken, celery, fruit, nuts, and green onion.", "Chill 15 minutes. Serve on bread, in wraps, or over greens."],
    tip: "A pinch of curry powder turns it into a completely different (and excellent) salad."
  },
  {
    id: "potato-leek-soup", name: "Creamy Potato Soup", emoji: "🥔", cuisine: "American", meal: ["dinner", "lunch"], time: 40, servings: 6, difficulty: "easy",
    tags: ["comfort", "budget", "soup"], diet: ["vegetarian-option", "gluten-free"],
    desc: "Velvety potato soup with all the loaded-baked-potato toppings.",
    ing: [["potato", "2 lb", "potatoes, peeled and diced"], ["onion", "1", "onion, diced"], ["garlic", "3 cloves", "garlic"], ["broth", "4 cups", "chicken or vegetable broth"], [["milk", "heavy-cream"], "1 cup", "milk or cream"], ["butter", "2 tbsp", "butter"], ["cheddar", "1 cup", "cheddar", true], ["bacon", "4 slices", "bacon, cooked and crumbled", true], ["green-onion", "2", "green onions", true], ["sour-cream", "", "sour cream", true], ["rosemary", "1 tsp", "thyme", true]],
    steps: ["Cook the onion in the butter over medium 6 minutes. Add the garlic and thyme; stir 1 minute.", "Add the potatoes and broth. Simmer 18–20 minutes until very tender.", "Blend half (or mash roughly) for a creamy-but-chunky texture. Stir in the milk and season well.", "Top with cheddar, bacon, green onions, and sour cream."],
    tip: "Russets make the creamiest soup; Yukon golds hold their shape better."
  },
  {
    id: "butternut-squash-soup", name: "Roasted Butternut Squash Soup", emoji: "🎃", cuisine: "American", meal: ["dinner", "lunch"], time: 55, servings: 6, difficulty: "easy",
    tags: ["fall", "soup", "freezer-friendly"], diet: ["vegetarian", "vegan-option", "gluten-free"],
    desc: "Sweet roasted squash blended silky with apple, ginger, and a swirl of cream.",
    ing: [["butternut", "1 large", "butternut squash, cubed"], ["onion", "1", "onion, chopped"], ["apple", "1", "apple, chopped", true], ["garlic", "3 cloves", "garlic"], ["ginger", "1 tbsp", "ginger", true], ["broth", "4 cups", "broth"], [["heavy-cream", "coconut-milk"], "½ cup", "cream or coconut milk"], ["olive-oil", "2 tbsp", "olive oil"], ["cinnamon", "¼ tsp", "nutmeg or cinnamon"], ["peanuts", "", "toasted pumpkin seeds or pecans", true]],
    steps: ["Heat the oven to 425°F. Toss the squash, onion, and apple with oil and salt; roast 30 minutes until caramelized.", "Simmer the roasted vegetables with the garlic, ginger, and broth 10 minutes.", "Blend completely smooth. Stir in the cream and nutmeg; season.", "Top with seeds and a swirl of cream."],
    tip: "Buy pre-cubed squash to skip the hardest part."
  }
);
