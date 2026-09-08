/*
 * Ingredient catalog — the shared vocabulary between what's in your kitchen
 * (free-text grocery names), what's on BOGO this week (Publix product names),
 * and the recipe database. Every recipe ingredient references one or more
 * catalog keys; free-text names are mapped onto keys with word-boundary
 * matching (longest match first, with per-entry exclusions).
 *
 * `staple: true` marks things almost every kitchen keeps on hand (salt, oil,
 * dried spices). They're listed in recipes but never counted as "missing".
 * `implies` lets a specific key satisfy a generic one (cheddar → cheese).
 */
(function (global) {
  "use strict";

  const GROUPS = [
    { id: "protein", label: "Proteins", emoji: "🍗" },
    { id: "veg", label: "Vegetables", emoji: "🥦" },
    { id: "fruit", label: "Fruit", emoji: "🍎" },
    { id: "dairy", label: "Dairy & Eggs", emoji: "🥚" },
    { id: "grain", label: "Grains, Pasta & Bread", emoji: "🍞" },
    { id: "pantry", label: "Pantry & Canned", emoji: "🥫" },
    { id: "flavor", label: "Herbs, Spices & Sauces", emoji: "🌿" }
  ];

  // match: word-boundary terms (plural "s"/"es" tolerated). not: if the name
  // matches any of these phrases, this entry is skipped for that name.
  const CATALOG = [
    // ---- proteins ----
    { key: "chicken", label: "Chicken", emoji: "🍗", group: "protein", match: ["chicken", "rotisserie chicken", "chicken breast", "chicken thigh", "chicken tender", "chicken wing", "drumstick"], not: ["chicken broth", "chicken stock", "chicken bouillon", "chicken base", "chicken nugget", "chicken sausage"] },
    { key: "ground-beef", label: "Ground beef", emoji: "🥩", group: "protein", match: ["ground beef", "ground chuck", "hamburger meat", "ground sirloin", "minced beef", "beef mince"] },
    { key: "beef", label: "Steak / beef", emoji: "🥩", group: "protein", match: ["steak", "beef", "sirloin", "ribeye", "flank", "chuck roast", "stew meat", "brisket", "skirt steak", "roast beef", "short rib"], not: ["ground beef", "ground chuck", "beef broth", "beef stock", "beef bouillon", "corned beef", "beef jerky", "roast beef deli"] },
    { key: "ground-turkey", label: "Ground turkey", emoji: "🦃", group: "protein", match: ["ground turkey", "turkey mince"] },
    { key: "turkey", label: "Turkey", emoji: "🦃", group: "protein", match: ["turkey", "turkey breast", "deli turkey"], not: ["ground turkey", "turkey bacon", "turkey sausage", "turkey burger"] },
    { key: "pork", label: "Pork chops / loin", emoji: "🐖", group: "protein", match: ["pork", "pork chop", "pork loin", "pork tenderloin", "pork shoulder", "pork butt", "boston butt", "pork rib", "baby back"], not: ["ground pork", "pork sausage", "pulled pork sandwich", "pork rind"] },
    { key: "ground-pork", label: "Ground pork", emoji: "🐖", group: "protein", match: ["ground pork", "pork mince"] },
    { key: "bacon", label: "Bacon", emoji: "🥓", group: "protein", match: ["bacon", "turkey bacon", "pancetta"], not: ["bacon bits", "bacon ranch"] },
    { key: "sausage", label: "Sausage", emoji: "🌭", group: "protein", match: ["sausage", "bratwurst", "kielbasa", "andouille", "chorizo", "italian sausage", "breakfast sausage", "smoked sausage"] },
    { key: "ham", label: "Ham / deli meat", emoji: "🍖", group: "protein", match: ["ham", "deli meat", "lunch meat", "prosciutto", "salami", "pepperoni", "deli ham"], not: ["hamburger", "graham"] },
    { key: "hot-dog", label: "Hot dogs", emoji: "🌭", group: "protein", match: ["hot dog", "frank", "wiener", "beef frank"], not: ["hot dog bun", "frankfurter bun", "corn dog"] },
    { key: "shrimp", label: "Shrimp", emoji: "🦐", group: "protein", match: ["shrimp", "prawn"] },
    { key: "salmon", label: "Salmon", emoji: "🐟", group: "protein", match: ["salmon"], not: ["smoked salmon", "canned salmon"] },
    { key: "white-fish", label: "White fish", emoji: "🐟", group: "protein", match: ["tilapia", "cod", "haddock", "mahi", "grouper", "flounder", "snapper", "halibut", "white fish", "fish fillet", "swai", "catfish", "fish"], not: ["fish sauce", "fish stick", "tuna", "goldfish", "fish sandwich"] },
    { key: "tuna", label: "Canned tuna", emoji: "🐟", group: "protein", match: ["tuna", "canned tuna", "tuna pouch"] },
    { key: "crab", label: "Crab", emoji: "🦀", group: "protein", match: ["crab", "crab meat", "imitation crab"] },
    { key: "scallops", label: "Scallops", emoji: "🐚", group: "protein", match: ["scallop"] },
    { key: "tofu", label: "Tofu", emoji: "🧈", group: "protein", match: ["tofu", "bean curd"] },
    { key: "eggs", label: "Eggs", emoji: "🥚", group: "dairy", match: ["egg", "eggs", "large eggs", "dozen eggs"], not: ["egg noodle", "eggplant", "egg roll", "eggnog", "egg white"] },
    { key: "meatballs", label: "Meatballs", emoji: "🧆", group: "protein", match: ["meatball"] },
    { key: "chickpeas", label: "Chickpeas", emoji: "🫘", group: "pantry", match: ["chickpea", "garbanzo", "garbanzo bean"] },
    { key: "black-beans", label: "Black beans", emoji: "🫘", group: "pantry", match: ["black bean"] },
    { key: "beans", label: "Beans (kidney, pinto, etc.)", emoji: "🫘", group: "pantry", match: ["bean", "kidney bean", "pinto bean", "cannellini", "white bean", "navy bean", "great northern", "refried bean", "baked bean"], not: ["green bean", "black bean", "garbanzo bean", "bean sprout", "coffee bean", "vanilla bean", "jelly bean", "soy bean", "edamame", "string bean"] },
    { key: "lentils", label: "Lentils", emoji: "🫘", group: "pantry", match: ["lentil"] },

    // ---- vegetables ----
    { key: "onion", label: "Onion", emoji: "🧅", group: "veg", match: ["onion", "yellow onion", "red onion", "white onion", "sweet onion", "vidalia", "shallot"], not: ["green onion", "onion powder", "onion ring", "onion soup", "french fried onion", "onion dip"] },
    { key: "green-onion", label: "Green onion", emoji: "🌱", group: "veg", match: ["green onion", "scallion", "spring onion"] },
    { key: "garlic", label: "Garlic", emoji: "🧄", group: "veg", match: ["garlic", "garlic clove", "minced garlic"], not: ["garlic powder", "garlic salt", "garlic bread", "garlic butter", "garlic sauce"] },
    { key: "bell-pepper", label: "Bell pepper", emoji: "🫑", group: "veg", match: ["bell pepper", "red pepper", "green pepper", "yellow pepper", "orange pepper", "sweet pepper", "mini pepper", "peppers"], not: ["black pepper", "red pepper flake", "crushed red pepper", "pepperoni", "pepper jack", "dr pepper", "chili pepper", "jalapeno pepper", "banana pepper", "roasted red pepper", "cayenne pepper", "peppercorn", "pepperidge"] },
    { key: "jalapeno", label: "Jalapeño / chili", emoji: "🌶️", group: "veg", match: ["jalapeno", "jalapeño", "serrano", "chili pepper", "chile", "poblano", "habanero", "hot pepper"], not: ["chili powder", "chili sauce", "chili crisp", "canned chili"] },
    { key: "tomato", label: "Tomato", emoji: "🍅", group: "veg", match: ["tomato", "roma tomato", "cherry tomato", "grape tomato", "tomatoes on the vine", "heirloom tomato"], not: ["tomato sauce", "tomato paste", "canned tomato", "diced tomato", "crushed tomato", "tomato soup", "sun dried tomato", "tomato juice", "stewed tomato", "tomato ketchup"] },
    { key: "canned-tomatoes", label: "Canned tomatoes", emoji: "🥫", group: "pantry", match: ["canned tomato", "diced tomato", "crushed tomato", "whole peeled tomato", "stewed tomato", "fire roasted tomato", "san marzano", "canned tomatoes", "tomato can"] },
    { key: "tomato-sauce", label: "Tomato / pasta sauce", emoji: "🥫", group: "pantry", match: ["tomato sauce", "marinara", "pasta sauce", "spaghetti sauce", "pizza sauce", "tomato paste", "passata", "rao", "prego", "ragu"] },
    { key: "potato", label: "Potatoes", emoji: "🥔", group: "veg", match: ["potato", "russet", "yukon gold", "red potato", "baby potato", "gold potato", "fingerling", "idaho potato"], not: ["sweet potato", "potato chip", "potato salad", "potato starch", "mashed potato", "hash brown", "tater tot", "french fry", "potato bread", "potato roll", "potato bun"] },
    { key: "sweet-potato", label: "Sweet potato", emoji: "🍠", group: "veg", match: ["sweet potato", "yam"], not: ["sweet potato fries", "sweet potato chips"] },
    { key: "carrot", label: "Carrot", emoji: "🥕", group: "veg", match: ["carrot", "baby carrot"], not: ["carrot cake"] },
    { key: "celery", label: "Celery", emoji: "🥬", group: "veg", match: ["celery"] },
    { key: "broccoli", label: "Broccoli", emoji: "🥦", group: "veg", match: ["broccoli", "broccolini", "broccoli floret", "broccoli crown"] },
    { key: "cauliflower", label: "Cauliflower", emoji: "🥦", group: "veg", match: ["cauliflower", "cauliflower rice"] },
    { key: "spinach", label: "Spinach", emoji: "🥬", group: "veg", match: ["spinach", "baby spinach"], not: ["spinach dip"] },
    { key: "kale", label: "Kale", emoji: "🥬", group: "veg", match: ["kale"], not: ["kale chip"] },
    { key: "lettuce", label: "Lettuce / salad greens", emoji: "🥬", group: "veg", match: ["lettuce", "romaine", "iceberg", "salad mix", "spring mix", "arugula", "mixed greens", "salad greens", "butter lettuce", "salad kit", "chopped salad"] },
    { key: "cabbage", label: "Cabbage / slaw", emoji: "🥬", group: "veg", match: ["cabbage", "coleslaw mix", "slaw mix", "cole slaw", "napa cabbage", "bok choy", "slaw"] },
    { key: "brussels", label: "Brussels sprouts", emoji: "🥬", group: "veg", match: ["brussels sprout", "brussel sprout", "brussels"] },
    { key: "mushroom", label: "Mushrooms", emoji: "🍄", group: "veg", match: ["mushroom", "portobello", "shiitake", "cremini", "baby bella", "button mushroom"], not: ["mushroom soup", "cream of mushroom"] },
    { key: "zucchini", label: "Zucchini / squash", emoji: "🥒", group: "veg", match: ["zucchini", "courgette", "yellow squash", "summer squash", "squash"], not: ["butternut squash", "acorn squash", "spaghetti squash", "squash soup"] },
    { key: "butternut", label: "Butternut squash", emoji: "🎃", group: "veg", match: ["butternut squash", "butternut", "acorn squash", "pumpkin", "kabocha"], not: ["pumpkin pie", "pumpkin spice", "canned pumpkin", "pumpkin seed"] },
    { key: "cucumber", label: "Cucumber", emoji: "🥒", group: "veg", match: ["cucumber", "english cucumber", "persian cucumber", "mini cucumber"] },
    { key: "asparagus", label: "Asparagus", emoji: "🌿", group: "veg", match: ["asparagus"] },
    { key: "green-beans", label: "Green beans", emoji: "🫛", group: "veg", match: ["green bean", "string bean", "haricot vert", "french bean"] },
    { key: "peas", label: "Peas", emoji: "🫛", group: "veg", match: ["pea", "peas", "frozen pea", "sweet pea", "snap pea", "snow pea", "edamame"], not: ["peanut", "peach", "pear", "chickpea", "split pea soup", "black eyed pea"] },
    { key: "corn", label: "Corn", emoji: "🌽", group: "veg", match: ["corn", "sweet corn", "corn on the cob", "frozen corn", "canned corn", "corn kernel"], not: ["cornbread", "corn chip", "corn dog", "corn flake", "corn starch", "cornstarch", "corn syrup", "corn tortilla", "popcorn", "cornmeal", "corn meal", "candy corn", "corned beef", "acorn"] },
    { key: "eggplant", label: "Eggplant", emoji: "🍆", group: "veg", match: ["eggplant", "aubergine"] },
    { key: "avocado", label: "Avocado", emoji: "🥑", group: "veg", match: ["avocado", "guacamole", "guac"] },
    { key: "ginger", label: "Fresh ginger", emoji: "🫚", group: "veg", match: ["ginger", "ginger root", "fresh ginger"], not: ["ginger ale", "gingerbread", "ginger snap", "ginger beer", "ground ginger"] },
    { key: "frozen-veg", label: "Frozen mixed vegetables", emoji: "🧊", group: "veg", match: ["frozen vegetable", "mixed vegetable", "stir fry vegetable", "stir-fry vegetable", "frozen veggie", "veggie mix", "vegetable medley", "steamable"] },
    { key: "beets", label: "Beets", emoji: "🟣", group: "veg", match: ["beet", "beetroot"] },
    { key: "radish", label: "Radish", emoji: "🌱", group: "veg", match: ["radish", "daikon"] },

    // ---- fruit ----
    { key: "lemon", label: "Lemon", emoji: "🍋", group: "fruit", match: ["lemon", "lemon juice"], not: ["lemonade", "lemon pepper", "lemon bar", "lemon cake", "lemon cookie"] },
    { key: "lime", label: "Lime", emoji: "🍈", group: "fruit", match: ["lime", "lime juice"], not: ["key lime pie", "limeade"] },
    { key: "apple", label: "Apples", emoji: "🍎", group: "fruit", match: ["apple", "honeycrisp", "gala apple", "granny smith", "fuji apple"], not: ["apple juice", "applesauce", "apple sauce", "apple cider", "apple pie", "pineapple", "apple butter", "apple chip"] },
    { key: "banana", label: "Bananas", emoji: "🍌", group: "fruit", match: ["banana"], not: ["banana bread", "banana pepper", "banana chip"] },
    { key: "berries", label: "Berries", emoji: "🫐", group: "fruit", match: ["berry", "berries", "strawberry", "blueberry", "raspberry", "blackberry", "mixed berries", "frozen berries"], not: ["berry yogurt", "cranberry sauce", "cranberry juice", "strawberry jam", "strawberry preserve", "blueberry muffin", "berry cereal"] },
    { key: "orange", label: "Oranges / citrus", emoji: "🍊", group: "fruit", match: ["orange", "mandarin", "clementine", "tangerine", "navel orange", "cutie", "halo", "grapefruit"], not: ["orange juice", "orange chicken", "orange soda", "orange pepper", "blood orange soda"] },
    { key: "pineapple", label: "Pineapple", emoji: "🍍", group: "fruit", match: ["pineapple", "pineapple chunk", "canned pineapple"], not: ["pineapple juice"] },
    { key: "mango", label: "Mango", emoji: "🥭", group: "fruit", match: ["mango", "frozen mango"], not: ["mango juice", "mango salsa"] },
    { key: "peach", label: "Peaches / stone fruit", emoji: "🍑", group: "fruit", match: ["peach", "nectarine", "plum", "apricot", "cherry", "cherries"], not: ["peach tea", "cherry tomato", "cherry pie", "cherry coke", "maraschino"] },
    { key: "grapes", label: "Grapes", emoji: "🍇", group: "fruit", match: ["grape", "grapes", "red grape", "green grape"], not: ["grape juice", "grape jelly", "grape tomato", "grapefruit", "grape soda"] },
    { key: "melon", label: "Melon", emoji: "🍉", group: "fruit", match: ["watermelon", "cantaloupe", "honeydew", "melon"] },
    { key: "pear", label: "Pears", emoji: "🍐", group: "fruit", match: ["pear"], not: ["pearl"] },
    { key: "coconut", label: "Coconut / coconut milk", emoji: "🥥", group: "pantry", match: ["coconut milk", "coconut cream", "shredded coconut", "coconut flake", "coconut"], not: ["coconut water", "coconut oil"] },
    { key: "dried-fruit", label: "Raisins / dried fruit", emoji: "🍇", group: "pantry", match: ["raisin", "dried cranberr", "craisin", "dried fruit", "date", "dates", "dried apricot", "prune"], not: ["date night", "expiration date"] },

    // ---- dairy ----
    { key: "milk", label: "Milk", emoji: "🥛", group: "dairy", match: ["milk", "whole milk", "2% milk", "skim milk", "oat milk", "almond milk", "soy milk", "lactaid", "fairlife"], not: ["coconut milk", "condensed milk", "evaporated milk", "milk chocolate", "buttermilk", "milkshake", "chocolate milk"] },
    { key: "butter", label: "Butter", emoji: "🧈", group: "dairy", match: ["butter", "salted butter", "unsalted butter", "land o lakes", "kerrygold"], not: ["peanut butter", "almond butter", "butter lettuce", "butternut", "buttermilk", "apple butter", "butter bean", "cookie butter", "buttercream", "butterfinger", "garlic butter", "butter pecan"] },
    { key: "cheese", label: "Cheese (any)", emoji: "🧀", group: "dairy", match: ["cheese", "shredded cheese", "sliced cheese", "cheese block", "colby", "monterey jack", "pepper jack", "swiss", "provolone", "gouda", "havarti", "mexican blend", "italian blend", "american cheese", "gruyere", "muenster"], not: ["cream cheese", "cottage cheese", "mac and cheese", "macaroni and cheese", "cheese cracker", "cheesecake", "cheese puff", "cheez", "cheese pizza", "cheese ravioli", "cheese stick", "string cheese", "cheese sauce", "goat cheese", "blue cheese", "cheese dip"] },
    { key: "cheddar", label: "Cheddar", emoji: "🧀", group: "dairy", match: ["cheddar", "sharp cheddar", "mild cheddar", "cheddar jack"], implies: ["cheese"], not: ["cheddar cracker", "cheddar popcorn", "cheddar soup"] },
    { key: "mozzarella", label: "Mozzarella", emoji: "🧀", group: "dairy", match: ["mozzarella", "fresh mozzarella", "string cheese", "burrata"], implies: ["cheese"] },
    { key: "parmesan", label: "Parmesan", emoji: "🧀", group: "dairy", match: ["parmesan", "parmigiano", "pecorino", "romano", "grated parmesan", "asiago"], implies: ["cheese"] },
    { key: "feta", label: "Feta / goat cheese", emoji: "🧀", group: "dairy", match: ["feta", "goat cheese", "crumbled feta"] },
    { key: "cream-cheese", label: "Cream cheese", emoji: "🧀", group: "dairy", match: ["cream cheese", "philadelphia", "neufchatel"] },
    { key: "ricotta", label: "Ricotta / cottage cheese", emoji: "🧀", group: "dairy", match: ["ricotta", "cottage cheese"] },
    { key: "yogurt", label: "Yogurt", emoji: "🥣", group: "dairy", match: ["yogurt", "yoghurt", "greek yogurt", "chobani", "oikos", "fage", "skyr"], not: ["frozen yogurt", "yogurt drink", "yogurt covered", "yogurt bar"] },
    { key: "sour-cream", label: "Sour cream", emoji: "🥛", group: "dairy", match: ["sour cream", "crema", "creme fraiche", "crème fraîche"] },
    { key: "heavy-cream", label: "Heavy cream / half & half", emoji: "🥛", group: "dairy", match: ["heavy cream", "whipping cream", "half and half", "half & half", "heavy whipping cream", "light cream", "creamer"], not: ["coffee creamer", "ice cream", "sour cream", "whipped cream", "cream cheese", "cream of"] },
    { key: "buttermilk", label: "Buttermilk", emoji: "🥛", group: "dairy", match: ["buttermilk"], not: ["buttermilk biscuit", "buttermilk pancake", "buttermilk ranch"] },

    // ---- grains / pasta / bread ----
    { key: "pasta", label: "Pasta", emoji: "🍝", group: "grain", match: ["pasta", "spaghetti", "penne", "rigatoni", "linguine", "fettuccine", "rotini", "farfalle", "bowtie", "ziti", "orzo", "fusilli", "angel hair", "shells", "elbow", "macaroni", "lasagna noodle", "barilla", "de cecco", "cavatappi", "bucatini", "tortellini", "ravioli", "gnocchi", "egg noodle", "noodle"], not: ["pasta sauce", "pasta salad kit", "ramen", "rice noodle", "mac and cheese", "macaroni and cheese", "pasta roni", "cup noodle", "instant noodle", "chicken noodle soup", "pasta side"] },
    { key: "ramen", label: "Ramen / Asian noodles", emoji: "🍜", group: "grain", match: ["ramen", "rice noodle", "udon", "soba", "lo mein noodle", "chow mein", "pad thai noodle", "vermicelli", "instant noodle", "glass noodle"] },
    { key: "rice", label: "Rice", emoji: "🍚", group: "grain", match: ["rice", "white rice", "brown rice", "jasmine rice", "basmati", "long grain rice", "sushi rice", "arborio", "minute rice", "instant rice", "microwave rice"], not: ["rice cake", "rice krispies", "rice noodle", "rice vinegar", "cauliflower rice", "fried rice", "rice pudding", "rice cereal", "rice chex", "rice a roni", "rice cracker", "wild rice soup", "rice paper"] },
    { key: "quinoa", label: "Quinoa / couscous / farro", emoji: "🌾", group: "grain", match: ["quinoa", "couscous", "farro", "bulgur", "barley", "wild rice"] },
    { key: "bread", label: "Bread", emoji: "🍞", group: "grain", match: ["bread", "sandwich bread", "loaf", "sourdough", "baguette", "ciabatta", "brioche", "whole wheat bread", "white bread", "italian bread", "french bread", "texas toast", "rye"], not: ["bread crumb", "breadcrumb", "garlic bread", "banana bread", "cornbread", "pita bread", "naan bread", "bread flour", "gingerbread", "shortbread", "flatbread", "bread bowl", "bread pudding"] },
    { key: "buns", label: "Buns / rolls", emoji: "🥯", group: "grain", match: ["bun", "hamburger bun", "hot dog bun", "slider bun", "roll", "dinner roll", "kaiser roll", "hoagie", "sub roll", "brioche bun", "potato roll", "hawaiian roll", "english muffin", "biscuit"], not: ["egg roll", "spring roll", "cinnamon roll", "fruit roll", "roll up", "sushi roll", "tootsie roll", "crescent roll", "toilet", "paper roll", "roll on", "biscuit mix", "dog biscuit"] },
    { key: "bagel", label: "Bagels", emoji: "🥯", group: "grain", match: ["bagel"], not: ["bagel bite", "bagel chip", "bagel seasoning"] },
    { key: "tortilla", label: "Tortillas", emoji: "🫓", group: "grain", match: ["tortilla", "flour tortilla", "corn tortilla", "taco shell", "tostada", "wrap", "burrito size", "mission", "old el paso tortilla"], not: ["tortilla chip", "tortilla soup", "chicken wrap", "plastic wrap", "saran wrap", "wrap sandwich", "lettuce wrap"] },
    { key: "pita", label: "Pita / naan / flatbread", emoji: "🫓", group: "grain", match: ["pita", "naan", "flatbread", "lavash"], not: ["pita chip"] },
    { key: "tortilla-chips", label: "Tortilla chips", emoji: "🔺", group: "pantry", match: ["tortilla chip", "tostitos", "corn chip", "chips"], not: ["potato chip", "kettle chip", "chocolate chip", "pita chip", "kale chip", "apple chip", "banana chip", "lays", "pringles", "ruffles", "chips ahoy", "fish and chips", "bagel chip", "veggie chip"] },
    { key: "oats", label: "Oats", emoji: "🥣", group: "grain", match: ["oat", "oats", "oatmeal", "rolled oat", "quick oat", "steel cut", "quaker"], not: ["oat milk", "oat bar", "oatmeal cookie", "oatmeal cream pie", "granola"] },
    { key: "flour", label: "Flour", emoji: "🌾", group: "pantry", staple: true, match: ["flour", "all purpose flour", "all-purpose flour", "bread flour"], not: ["flour tortilla", "almond flour", "cauliflower"] },
    { key: "breadcrumbs", label: "Breadcrumbs / panko", emoji: "🍞", group: "pantry", match: ["bread crumb", "breadcrumb", "panko", "stuffing mix", "crouton"] },
    { key: "pizza-dough", label: "Pizza dough / crust", emoji: "🍕", group: "grain", match: ["pizza dough", "pizza crust", "flatbread pizza", "naan pizza", "crescent dough", "puff pastry", "pie crust", "biscuit dough", "refrigerated dough", "phyllo"] },
    { key: "granola", label: "Granola / cereal", emoji: "🥣", group: "grain", match: ["granola", "cereal", "muesli", "cheerios", "chex"], not: ["granola bar", "cereal bar"] },
    { key: "pancake-mix", label: "Pancake / baking mix", emoji: "🥞", group: "pantry", match: ["pancake mix", "bisquick", "waffle mix", "baking mix", "cornbread mix", "muffin mix", "cake mix", "brownie mix"] },

    // ---- pantry ----
    { key: "olive-oil", label: "Olive oil / cooking oil", emoji: "🫒", group: "pantry", staple: true, match: ["olive oil", "vegetable oil", "canola oil", "avocado oil", "cooking oil", "oil", "cooking spray", "pam"], not: ["coconut oil", "essential oil", "motor oil", "sesame oil", "fish oil", "oil filter", "baby oil"] },
    { key: "sesame-oil", label: "Sesame oil", emoji: "🫗", group: "pantry", match: ["sesame oil", "toasted sesame oil"] },
    { key: "broth", label: "Broth / stock", emoji: "🥣", group: "pantry", match: ["broth", "stock", "bouillon", "better than bouillon", "chicken base", "bone broth", "chicken broth", "beef broth", "vegetable broth", "chicken stock"], not: ["stockings", "stock pot", "live stock"] },
    { key: "coconut-milk", label: "Coconut milk", emoji: "🥥", group: "pantry", match: ["coconut milk", "coconut cream", "cream of coconut"], implies: ["coconut"] },
    { key: "peanut-butter", label: "Peanut butter", emoji: "🥜", group: "pantry", match: ["peanut butter", "almond butter", "nut butter", "jif", "skippy"], not: ["peanut butter cup", "peanut butter cookie", "peanut butter cracker"] },
    { key: "peanuts", label: "Peanuts / nuts", emoji: "🥜", group: "pantry", match: ["peanut", "almond", "walnut", "pecan", "cashew", "pistachio", "pine nut", "nuts", "mixed nuts", "slivered almond"], not: ["peanut butter", "almond butter", "almond milk", "almond flour", "peanut butter cup", "almond joy", "coconut", "doughnut", "donut", "chestnut", "butternut", "nutella"] },
    { key: "honey", label: "Honey / maple syrup", emoji: "🍯", group: "pantry", match: ["honey", "maple syrup", "syrup", "agave"], not: ["honey mustard", "honeydew", "honey nut", "honey bun", "honey ham", "honey bbq", "honeycrisp", "honey roasted", "chocolate syrup", "corn syrup", "cough syrup", "honey garlic"] },
    { key: "sugar", label: "Sugar", emoji: "🍬", group: "pantry", staple: true, match: ["sugar", "brown sugar", "granulated sugar", "powdered sugar", "cane sugar"], not: ["sugar free", "sugar cookie", "sugar snap", "sugar cone", "sugar wafer"] },
    { key: "chocolate", label: "Chocolate / chocolate chips", emoji: "🍫", group: "pantry", match: ["chocolate chip", "chocolate", "cocoa powder", "cocoa", "baking chocolate", "nutella", "hershey", "ghirardelli"], not: ["chocolate milk", "chocolate ice cream", "chocolate syrup", "hot chocolate", "chocolate cake", "chocolate cookie", "chocolate bar", "chocolate cereal", "chocolate pudding"] },
    { key: "vanilla", label: "Vanilla extract", emoji: "🌼", group: "pantry", staple: true, match: ["vanilla extract", "vanilla"], not: ["vanilla ice cream", "vanilla yogurt", "vanilla creamer", "vanilla wafer", "vanilla latte", "vanilla almond milk", "vanilla cake"] },
    { key: "baking-powder", label: "Baking powder / soda", emoji: "🧁", group: "pantry", staple: true, match: ["baking powder", "baking soda"] },
    { key: "salsa", label: "Salsa", emoji: "🥣", group: "pantry", match: ["salsa", "pico de gallo", "salsa verde", "chipotle salsa"], not: ["salsa dancing"] },
    { key: "hummus", label: "Hummus", emoji: "🥣", group: "pantry", match: ["hummus", "sabra"] },
    { key: "pesto", label: "Pesto", emoji: "🌿", group: "pantry", match: ["pesto"] },
    { key: "olives", label: "Olives", emoji: "🫒", group: "pantry", match: ["olive", "olives", "kalamata", "black olive", "green olive"], not: ["olive oil", "olive garden"] },
    { key: "pickles", label: "Pickles / relish", emoji: "🥒", group: "pantry", match: ["pickle", "relish", "dill pickle", "pickled"], not: ["pickleball"] },
    { key: "capers", label: "Capers / artichokes", emoji: "🫙", group: "pantry", match: ["caper", "artichoke", "artichoke heart", "roasted red pepper", "sun dried tomato", "sun-dried tomato"] },
    { key: "coconut-water", label: "Juice / coconut water", emoji: "🧃", group: "pantry", match: ["orange juice", "apple juice", "coconut water", "pineapple juice", "juice"], not: ["lemon juice", "lime juice", "juice box"] },
    { key: "mayo", label: "Mayonnaise", emoji: "🥄", group: "flavor", match: ["mayo", "mayonnaise", "duke", "hellmann", "miracle whip", "aioli"] },
    { key: "mustard", label: "Mustard", emoji: "🟡", group: "flavor", staple: true, match: ["mustard", "dijon", "yellow mustard", "whole grain mustard", "honey mustard", "spicy mustard"], not: ["mustard green"] },
    { key: "ketchup", label: "Ketchup", emoji: "🍅", group: "flavor", staple: true, match: ["ketchup", "catsup", "heinz"] },
    { key: "bbq-sauce", label: "BBQ sauce", emoji: "🍖", group: "flavor", match: ["bbq sauce", "barbecue sauce", "barbeque sauce", "bbq", "sweet baby ray"], not: ["bbq chip", "bbq rub", "bbq seasoning", "bbq chicken pizza"] },
    { key: "hot-sauce", label: "Hot sauce / sriracha / buffalo", emoji: "🌶️", group: "flavor", match: ["hot sauce", "sriracha", "buffalo sauce", "tabasco", "frank's redhot", "franks red hot", "cholula", "chili crisp", "chili garlic sauce", "gochujang", "sambal", "harissa", "chipotle in adobo", "adobo sauce"] },
    { key: "soy-sauce", label: "Soy sauce", emoji: "🍶", group: "flavor", staple: true, match: ["soy sauce", "tamari", "coconut aminos", "kikkoman"] },
    { key: "teriyaki", label: "Teriyaki / hoisin / stir-fry sauce", emoji: "🍶", group: "flavor", match: ["teriyaki", "hoisin", "stir fry sauce", "stir-fry sauce", "oyster sauce", "general tso", "orange sauce", "sweet and sour", "kung pao sauce", "yum yum", "ponzu"] },
    { key: "fish-sauce", label: "Fish sauce", emoji: "🐟", group: "flavor", match: ["fish sauce"] },
    { key: "curry-paste", label: "Curry paste / powder", emoji: "🍛", group: "flavor", match: ["curry paste", "curry powder", "red curry", "green curry", "yellow curry", "garam masala", "tikka masala", "curry sauce", "curry"], not: ["curry chicken frozen"] },
    { key: "ranch", label: "Ranch / salad dressing", emoji: "🥗", group: "flavor", match: ["ranch", "salad dressing", "dressing", "vinaigrette", "caesar dressing", "italian dressing", "blue cheese dressing"], not: ["ranch chip", "ranch seasoning", "ranch dip", "ranch style bean"] },
    { key: "vinegar", label: "Vinegar", emoji: "🍶", group: "flavor", staple: true, match: ["vinegar", "balsamic", "apple cider vinegar", "rice vinegar", "red wine vinegar", "white wine vinegar"] },
    { key: "worcestershire", label: "Worcestershire", emoji: "🍶", group: "flavor", staple: true, match: ["worcestershire", "worcester"] },
    { key: "taco-seasoning", label: "Taco seasoning", emoji: "🌮", group: "flavor", staple: true, match: ["taco seasoning", "fajita seasoning", "chili seasoning"] },
    { key: "italian-seasoning", label: "Italian seasoning / oregano", emoji: "🌿", group: "flavor", staple: true, match: ["italian seasoning", "oregano", "dried basil", "dried thyme", "dried rosemary", "herbes de provence"] },
    { key: "cumin", label: "Cumin / chili powder", emoji: "🌶️", group: "flavor", staple: true, match: ["cumin", "chili powder", "smoked paprika", "paprika", "cayenne", "chipotle powder", "coriander"] },
    { key: "garlic-powder", label: "Garlic / onion powder", emoji: "🧄", group: "flavor", staple: true, match: ["garlic powder", "onion powder", "garlic salt", "everything bagel seasoning"] },
    { key: "cinnamon", label: "Cinnamon / nutmeg", emoji: "🟤", group: "flavor", staple: true, match: ["cinnamon", "nutmeg", "pumpkin pie spice", "allspice", "cardamom", "cloves"], not: ["cinnamon roll", "cinnamon toast crunch", "cinnamon bun", "cinnamon apple"] },
    { key: "red-pepper-flakes", label: "Red pepper flakes", emoji: "🌶️", group: "flavor", staple: true, match: ["red pepper flake", "crushed red pepper", "chili flake"] },
    { key: "salt", label: "Salt & black pepper", emoji: "🧂", group: "flavor", staple: true, match: ["salt", "black pepper", "kosher salt", "sea salt", "peppercorn", "salt and pepper", "salt & pepper"], not: ["salted butter", "unsalted", "salted caramel", "salt water", "epsom", "sea salt chip", "salt and vinegar chip", "pepper jack", "bell pepper", "red pepper", "green pepper", "salty snack"] },
    { key: "basil", label: "Fresh basil", emoji: "🌿", group: "flavor", match: ["basil", "fresh basil"], not: ["dried basil", "basil pesto"] },
    { key: "cilantro", label: "Cilantro", emoji: "🌿", group: "flavor", match: ["cilantro", "coriander leaves", "fresh coriander"] },
    { key: "parsley", label: "Parsley", emoji: "🌿", group: "flavor", match: ["parsley", "flat leaf parsley", "italian parsley"], not: ["dried parsley"] },
    { key: "dill", label: "Dill", emoji: "🌿", group: "flavor", match: ["dill", "fresh dill"], not: ["dill pickle", "dill chip"] },
    { key: "mint", label: "Mint", emoji: "🌿", group: "flavor", match: ["mint", "fresh mint"], not: ["peppermint", "mint chocolate", "mint gum", "spearmint gum", "mint ice cream", "mint tea"] },
    { key: "rosemary", label: "Rosemary / thyme", emoji: "🌿", group: "flavor", match: ["rosemary", "thyme", "fresh thyme", "fresh rosemary", "sage", "fresh herbs", "herb", "chive", "chives", "tarragon", "bay leaf"], not: ["dried thyme", "dried rosemary", "herb tea", "herbal"] },
    { key: "sesame", label: "Sesame seeds", emoji: "⚪", group: "flavor", match: ["sesame seed", "sesame seeds", "tahini"] },
    { key: "jam", label: "Jam / jelly", emoji: "🍓", group: "pantry", match: ["jam", "jelly", "preserves", "marmalade", "fruit spread", "smucker"], not: ["jelly bean", "jelly donut", "pb&j", "jelly roll", "petroleum jelly"] },
    { key: "wine", label: "White / red wine", emoji: "🍷", group: "pantry", match: ["white wine", "red wine", "wine", "chardonnay", "pinot grigio", "sauvignon blanc", "cabernet", "merlot", "pinot noir", "cooking wine", "sherry", "marsala"], not: ["wine vinegar", "wine glass", "wine opener"] },
    { key: "beer", label: "Beer", emoji: "🍺", group: "pantry", match: ["beer", "lager", "ale", "ipa", "stout", "corona", "modelo", "bud light", "michelob"], not: ["ginger ale", "root beer", "beer bread mix"] }
  ];

  const BY_KEY = new Map();
  CATALOG.forEach(entry => BY_KEY.set(entry.key, entry));

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function termRegex(term) {
    // Tolerate simple plurals and possessives: "tomato" matches "tomatoes",
    // "berry" matches "berries", "chip" matches "chips". Word-boundary only.
    const t = escapeRegExp(term.toLowerCase().trim());
    const stem = t.endsWith("y") ? t.slice(0, -1) + "(?:y|ies)" : t + "(?:s|es)?";
    return new RegExp("(?:^|[^a-z0-9])" + stem + "(?:'s)?(?![a-z0-9])", "i");
  }

  const COMPILED = CATALOG.map(entry => ({
    entry,
    match: entry.match.map(termRegex),
    not: (entry.not || []).map(termRegex)
  }));

  function normalizeName(name) {
    return String(name || "")
      .toLowerCase()
      .replace(/[®™©]/g, " ")
      .replace(/[^a-z0-9&'\s-]/g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /** All catalog keys a free-text name maps onto, most specific first. */
  function keysFor(name) {
    const n = normalizeName(name);
    if (!n) return [];
    const hits = [];
    for (const c of COMPILED) {
      if (c.not.some(re => re.test(n))) continue;
      let best = 0;
      for (let i = 0; i < c.match.length; i++) {
        if (c.match[i].test(n)) {
          // Longer matched term = more specific match.
          best = Math.max(best, c.entry.match[i].length);
        }
      }
      if (best > 0) hits.push({ key: c.entry.key, specificity: best });
    }
    hits.sort((a, b) => b.specificity - a.specificity);
    return hits.map(h => h.key);
  }

  /** Expand a set of keys with everything they imply (cheddar → cheese). */
  function expand(keys) {
    const out = new Set();
    const visit = k => {
      if (out.has(k)) return;
      out.add(k);
      const entry = BY_KEY.get(k);
      (entry && entry.implies || []).forEach(visit);
    };
    (keys || []).forEach(visit);
    return out;
  }

  function get(key) {
    return BY_KEY.get(key) || null;
  }

  function label(key) {
    const e = BY_KEY.get(key);
    return e ? e.label : key;
  }

  function emoji(key) {
    const e = BY_KEY.get(key);
    return e ? e.emoji : "🍽️";
  }

  function isStaple(key) {
    const e = BY_KEY.get(key);
    return !!(e && e.staple);
  }

  global.Ingredients = { GROUPS, CATALOG, keysFor, expand, get, label, emoji, isStaple, normalizeName };
})(window);
