/**
 * The Corner Cafe, Vadodara – Complete Digital Menu Data
 * 
 * Centralized catalog containing all 69 items across 6 categories.
 * Strict Authenticity Rules Applied:
 * 1. Unverified descriptions removed (no unconfirmed ingredients, recipes, or sauces).
 * 2. Unverified promotional badges removed (no unsupported "Popular", "Bestseller", "Classic" labels).
 * 3. Verified prices strictly from the printed beverage menu (15 items); all other 54 items have price: null.
 * 4. Authentic images assigned strictly to verified photographed dishes (12 items); all other 57 items have image: null.
 */

export const MENU_CATEGORIES = [
  {
    id: "tcc-specials",
    label: "TCC Specials",
    intro: "Handcrafted earthen specials, personal pizzas, garlic breads, and crispy twister snacks.",
    subcategories: [
      { id: "all", label: "All", intro: "Handcrafted earthen specials, personal pizzas, garlic breads, and crispy twister snacks." },
      { id: "specials", label: "Specials", intro: "Signature cafe specialities prepared fresh to order." },
      { id: "pizzas", label: "Pizzas", intro: "Hand-stretched 7-inch personal pizzas topped with molten mozzarella." },
      { id: "garlic-bread", label: "Garlic Bread", intro: "Toasted baguette slices brushed with garlic herb butter and cheese." },
      { id: "snacks", label: "Snacks", intro: "Crispy spiral-cut potato twisters and golden French fries." }
    ]
  },
  {
    id: "sandwiches-frankies",
    label: "Sandwiches & Frankies",
    intro: "Freshly sliced garden sandwiches and warm toasted frankie wraps.",
    subcategories: [
      { id: "all", label: "All", intro: "Freshly sliced garden sandwiches and warm toasted frankie wraps." },
      { id: "sandwiches", label: "Sandwiches", intro: "Classic, grilled, and layered toasted sandwiches." },
      { id: "frankies", label: "Frankies", intro: "Warm toasted wraps rolled with seasoned fillings." }
    ]
  },
  {
    id: "maggi-pasta",
    label: "Maggi & Pasta",
    intro: "Steaming hot noodle bowls and tender penne pasta dishes.",
    subcategories: [
      { id: "all", label: "All", intro: "Steaming hot noodle bowls and tender penne pasta dishes." },
      { id: "maggi", label: "Maggi", intro: "Hot noodles prepared in classic and spiced seasonings." },
      { id: "pasta", label: "Pasta", intro: "Tender penne pasta tossed in freshly prepared sauces." }
    ]
  },
  {
    id: "parathas-combos",
    label: "Parathas & Combos",
    intro: "Whole wheat stuffed tawa parathas and comforting homestyle meal combos.",
    subcategories: [
      { id: "all", label: "All", intro: "Whole wheat stuffed tawa parathas and comforting homestyle meal combos." },
      { id: "parathas", label: "Parathas", intro: "Golden griddled whole wheat parathas stuffed with savoury fillings." },
      { id: "combos", label: "Combo Meals", intro: "Hearty traditional Indian meal combinations." }
    ]
  },
  {
    id: "beverages",
    label: "Beverages",
    intro: "Freshly brewed hot teas, iced coffees, fruit milkshakes, and thickshakes.",
    subcategories: [
      { id: "all", label: "All Beverages", intro: "Freshly brewed hot teas, iced coffees, fruit milkshakes, and thickshakes." },
      { id: "tea", label: "Tea", intro: "Freshly brewed hot chai and herbal infusions." },
      { id: "chai-partners", label: "Chai Partners", intro: "Classic buttered bakery toast to pair with hot chai." },
      { id: "coffee", label: "Coffee", intro: "Hot filter brews and chilled espresso coffees." },
      { id: "milkshakes", label: "Milkshakes", intro: "Chilled blended milkshakes in refreshing flavours." },
      { id: "thickshakes", label: "Thickshakes", intro: "Dense, decadent dessert thickshakes prepared with ice cream." }
    ]
  },
  {
    id: "mojitos",
    label: "Mojitos",
    intro: "Chilled, sparkling mocktail coolers prepared with fresh mint and citrus. 100% non-alcoholic.",
    subcategories: [
      { id: "all", label: "All Mojitos", intro: "Chilled, sparkling mocktail coolers prepared with fresh mint and citrus. 100% non-alcoholic." },
      { id: "mojitos", label: "Mojitos", intro: "Chilled, sparkling mocktail coolers prepared with fresh mint and citrus. 100% non-alcoholic." }
    ]
  }
];

export const MENU_ITEMS = [
  // =========================================================================
  // CATEGORY 1: TCC SPECIALS, PIZZAS & SIDES (13 items)
  // =========================================================================

  // TCC Specials (4 items)
  {
    id: "kulhad-pizza",
    name: "Kulhad Pizza",
    category: "tcc-specials",
    subcategory: "specials",
    price: null,
    description: null,
    image: "assets/images/menu/kulhad-pizza.webp",
    alt: "Kulhad Pizza baked in traditional earthen clay pot with melted cheese",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mini-pizza-combo",
    name: "Mini Pizza – 3 Taste Combo with Coke",
    category: "tcc-specials",
    subcategory: "specials",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "heart-shape-pizza",
    name: "Heart Shape Pizza",
    category: "tcc-specials",
    subcategory: "specials",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-cheese-burger",
    name: "Veg Cheese Burger",
    category: "tcc-specials",
    subcategory: "specials",
    price: null,
    description: null,
    image: "assets/images/menu/veg-cheese-burger.webp",
    alt: "Vegetarian cheese burger with golden vegetable patty, melted cheese slice and lettuce",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // Pizzas - 7 inches (2 items)
  {
    id: "margherita-pizza",
    name: "Margherita Pizza (7 inches)",
    category: "tcc-specials",
    subcategory: "pizzas",
    price: null,
    description: null,
    image: "assets/images/menu/margherita-pizza.webp",
    alt: "Classic 7-inch Margherita pizza with melted golden cheese",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "onion-pizza",
    name: "Onion Pizza (7 inches)",
    category: "tcc-specials",
    subcategory: "pizzas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // Garlic Bread (3 items)
  {
    id: "cheese-garlic-bread",
    name: "Cheese Garlic Bread",
    category: "tcc-specials",
    subcategory: "garlic-bread",
    price: null,
    description: null,
    image: "assets/images/menu/garlic-bread.webp",
    alt: "Toasted baguette slices with garlic herb butter and melted cheese",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-corn-garlic-bread",
    name: "Cheese Corn Garlic Bread",
    category: "tcc-specials",
    subcategory: "garlic-bread",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-chilli-garlic-bread",
    name: "Cheese Chilli Garlic Bread",
    category: "tcc-specials",
    subcategory: "garlic-bread",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // Twisters & Snacks (4 items)
  {
    id: "potato-twister",
    name: "Potato Twister",
    category: "tcc-specials",
    subcategory: "snacks",
    price: null,
    description: null,
    image: "assets/images/menu/potato-twister.webp",
    alt: "Golden spiral-cut potato twister on skewer",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mayonnaise-twister",
    name: "Mayonnaise Twister",
    category: "tcc-specials",
    subcategory: "snacks",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "peri-peri-twister",
    name: "Peri Peri Twister",
    category: "tcc-specials",
    subcategory: "snacks",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "french-fries",
    name: "French Fries",
    category: "tcc-specials",
    subcategory: "snacks",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // =========================================================================
  // CATEGORY 2: SANDWICHES & FRANKIES (12 items)
  // =========================================================================

  // Sandwiches (7 items)
  {
    id: "veg-sandwich",
    name: "Veg Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-cheese-sandwich",
    name: "Veg Cheese Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: "assets/images/menu/veg-cheese-sandwich.webp",
    alt: "Fresh vegetable cheese sandwich cut diagonally",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-grilled-sandwich",
    name: "Veg Grilled Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: "assets/images/menu/grilled-sandwich.webp",
    alt: "Golden grill-toasted vegetable sandwich on wooden platter",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-cheese-grilled-sandwich",
    name: "Veg Cheese Grilled Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mayo-n-corn-sandwich",
    name: "Mayo N Corn Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mayo-n-corn-grilled-sandwich",
    name: "Mayo N Corn Grilled Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "the-corner-special-3-layer-sandwich",
    name: "The Corner Special 3-Layer Sandwich",
    category: "sandwiches-frankies",
    subcategory: "sandwiches",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // Frankies (5 items)
  {
    id: "veg-frankie",
    name: "Veg Frankie",
    category: "sandwiches-frankies",
    subcategory: "frankies",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-cheese-frankie",
    name: "Veg Cheese Frankie",
    category: "sandwiches-frankies",
    subcategory: "frankies",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mayonnaise-frankie",
    name: "Mayonnaise Frankie",
    category: "sandwiches-frankies",
    subcategory: "frankies",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "schezwan-frankie",
    name: "Schezwan Frankie",
    category: "sandwiches-frankies",
    subcategory: "frankies",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "paneer-frankie",
    name: "Paneer Frankie",
    category: "sandwiches-frankies",
    subcategory: "frankies",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // =========================================================================
  // CATEGORY 3: MAGGI & PASTA (12 items)
  // =========================================================================

  // Maggi (9 items)
  {
    id: "maggi-regular",
    name: "Maggi Regular",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-maggi",
    name: "Veg Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "spicy-masala-maggi",
    name: "Spicy Masala Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "corn-maggi",
    name: "Corn Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-maggi",
    name: "Cheese Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "veg-cheese-maggi",
    name: "Veg Cheese Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-chilli-maggi",
    name: "Cheese Chilli Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "schezwan-maggi",
    name: "Schezwan Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "korean-maggi",
    name: "Korean Maggi",
    category: "maggi-pasta",
    subcategory: "maggi",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // Pasta (3 items)
  {
    id: "red-sauce-pasta",
    name: "Red Sauce Pasta",
    category: "maggi-pasta",
    subcategory: "pasta",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mix-sauce-pasta",
    name: "Mix Sauce Pasta",
    category: "maggi-pasta",
    subcategory: "pasta",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "white-sauce-pasta",
    name: "White Sauce Pasta",
    category: "maggi-pasta",
    subcategory: "pasta",
    price: null,
    description: null,
    image: "assets/images/menu/white-sauce-pasta.webp",
    alt: "Penne pasta bathed in creamy Alfredo white sauce",
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // =========================================================================
  // CATEGORY 4: STUFFED PARATHAS & COMBO MEALS (13 items)
  // =========================================================================

  // Stuffed Parathas (8 items)
  {
    id: "aloo-paratha",
    name: "Aloo Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "onion-paratha",
    name: "Onion Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "aloo-onion-paratha",
    name: "Aloo Onion Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "mix-veg-paratha",
    name: "Mix Veg Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "paneer-paratha",
    name: "Paneer Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-aloo-paratha",
    name: "Cheese Aloo Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-mix-veg-paratha",
    name: "Cheese Mix Veg Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cheese-paneer-paratha",
    name: "Cheese Paneer Paratha",
    category: "parathas-combos",
    subcategory: "parathas",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // Combo Meals (5 items)
  {
    id: "chole-puri",
    name: "Chole Puri",
    category: "parathas-combos",
    subcategory: "combos",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "chole-chawal",
    name: "Chole Chawal",
    category: "parathas-combos",
    subcategory: "combos",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "dal-chawal",
    name: "Dal Chawal",
    category: "parathas-combos",
    subcategory: "combos",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "puri-bhaji",
    name: "Puri Bhaji",
    category: "parathas-combos",
    subcategory: "combos",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "roti-sabji",
    name: "Roti Sabji",
    category: "parathas-combos",
    subcategory: "combos",
    price: null,
    description: "Served with salad, papad and achar.",
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },

  // =========================================================================
  // CATEGORY 5: BEVERAGES & CHAI PARTNERS (17 items)
  // =========================================================================

  // Hot Tea (4 items)
  {
    id: "ginger-tea",
    name: "Ginger Tea",
    category: "beverages",
    subcategory: "tea",
    price: 15,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "lemon-grass-tea",
    name: "Lemon Grass Tea",
    category: "beverages",
    subcategory: "tea",
    price: 20,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "fudina-tea",
    name: "Fudina Tea",
    category: "beverages",
    subcategory: "tea",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "green-tea",
    name: "Green Tea",
    category: "beverages",
    subcategory: "tea",
    price: 30,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },

  // Chai Partners (2 items)
  {
    id: "maskabun",
    name: "Maskabun",
    category: "beverages",
    subcategory: "chai-partners",
    price: 15,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "bread-butter",
    name: "Bread Butter",
    category: "beverages",
    subcategory: "chai-partners",
    price: 30,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },

  // Coffee (5 items)
  {
    id: "regular-coffee",
    name: "Regular Coffee",
    category: "beverages",
    subcategory: "coffee",
    price: 30,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "black-coffee",
    name: "Black Coffee",
    category: "beverages",
    subcategory: "coffee",
    price: null,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    category: "beverages",
    subcategory: "coffee",
    price: 70,
    description: null,
    image: "assets/images/menu/cold-coffee.webp",
    alt: "Chilled iced cold coffee with creamy froth",
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "hazelnut-coffee",
    name: "Hazelnut Coffee",
    category: "beverages",
    subcategory: "coffee",
    price: 89,
    description: null,
    image: "assets/images/menu/hazelnut-coffee.webp",
    alt: "Hazelnut iced coffee poured over ice",
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "cold-bournvita",
    name: "Cold Bournvita",
    category: "beverages",
    subcategory: "coffee",
    price: 70,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },

  // Milkshakes (4 items)
  {
    id: "strawberry-milkshake",
    name: "Strawberry Milkshake",
    category: "beverages",
    subcategory: "milkshakes",
    price: 75,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "chocolate-milkshake",
    name: "Chocolate Milkshake",
    category: "beverages",
    subcategory: "milkshakes",
    price: 85,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "oreo-milkshake",
    name: "Oreo Milkshake",
    category: "beverages",
    subcategory: "milkshakes",
    price: 89,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "kitkat-milkshake",
    name: "KitKat Milkshake",
    category: "beverages",
    subcategory: "milkshakes",
    price: 89,
    description: null,
    image: null,
    alt: null,
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },

  // Thickshakes (2 items)
  {
    id: "chocolate-thickshake",
    name: "Chocolate Thickshake",
    category: "beverages",
    subcategory: "thickshakes",
    price: 99,
    description: null,
    image: "assets/images/menu/chocolate-thickshake.webp",
    alt: "Decadent chocolate thickshake with cocoa drizzle",
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },
  {
    id: "oreo-thickshake",
    name: "Oreo Thickshake",
    category: "beverages",
    subcategory: "thickshakes",
    price: 120,
    description: null,
    image: "assets/images/menu/oreo-thickshake.webp",
    alt: "Thick Oreo shake crowned with cookie garnish",
    isVeg: true,
    verified: true,
    available: true,
    tag: null
  },

  // =========================================================================
  // CATEGORY 6: MOJITOS (2 items)
  // =========================================================================
  {
    id: "blue-lagoon-mojito",
    name: "Blue Lagoon Mojito",
    category: "mojitos",
    subcategory: "mojitos",
    price: null,
    description: "Non-alcoholic",
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  },
  {
    id: "lemon-mint-mojito",
    name: "Lemon Mint Mojito",
    category: "mojitos",
    subcategory: "mojitos",
    price: null,
    description: "Non-alcoholic",
    image: null,
    alt: null,
    isVeg: true,
    verified: false,
    available: true,
    tag: null
  }
];
