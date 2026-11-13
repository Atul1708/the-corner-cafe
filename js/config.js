/**
 * The Corner Cafe – Central Configuration
 * All business information, menu items, gallery items, and public listing data are managed here.
 * The cafe owner or developer can easily update this file without modifying HTML structure.
 */

import { MENU_CATEGORIES, MENU_ITEMS } from './menuData.js';

export const CAFE_CONFIG = {
  business: {
    name: "The Corner Cafe",
    shortName: "The Corner",
    tagline: "Good Food. Great Coffee. Better Company.",
    eyebrow: "WAGHODIA ROAD, VADODARA",
    category: "Cafe / Vegetarian Restaurant",
    menuType: "Vegetarian (Subject to management confirmation)",
    priceForTwo: "Approx. ₹300 for two (Subject to counter verification)",
    isConceptDemo: true,
    conceptNote: "Demonstration website concept created for The Corner Cafe, Vadodara. All details subject to cafe owner verification."
  },

  contact: {
    phone: "+91 73592 95384",
    phoneDisplay: "+91 73592 95384",
    phoneRaw: "+917359295384",
    whatsappNumber: "917359295384",
    whatsappMessage: "Hello! I saw your website concept and would like to know more about today's menu at The Corner Cafe.",
    get whatsappUrl() {
      return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
    },
    get callUrl() {
      return `tel:${this.phoneRaw}`;
    }
  },

  location: {
    addressLine1: "33-Phoenix Resicom, Vaikunth Char Rasta",
    addressLine2: "Waghodia Road, Kendranagar",
    city: "Vadodara",
    state: "Gujarat",
    postalCode: "390019",
    country: "India",
    fullAddress: "33-Phoenix Resicom, Vaikunth Char Rasta, Waghodia Road, Kendranagar, Vadodara, Gujarat 390019, India",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Corner+Cafe+Vaikunth+Char+Rasta+Vadodara",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.684346853754!2d73.2274!3d22.2897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f6c8d76a5b%3A0x6b1cfb9b8b2e537!2sThe%20Corner%20Cafe!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    landmark: "Near Vaikunth Char Rasta, Waghodia Road"
  },

  hours: {
    display: "Daily, 9:00 AM – 11:00 PM",
    days: "Monday through Sunday",
    openTime: "09:00",
    closeTime: "23:00",
    verificationNote: "Google business listing currently shows 9:00 AM to 11:00 PM daily. Subject to cafe owner verification."
  },

  ratings: {
    googleRating: 4.9,
    maxRating: 5.0,
    reviewCount: "approx. 196",
    reviewSource: "Google Maps Public Listing",
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=The+Corner+Cafe+Vaikunth+Char+Rasta+Vadodara",
    // Neutral descriptive highlights reflecting public listing information
    highlights: [
      {
        id: "hl-1",
        title: "Kulhad Pizza & Cold Coffee",
        description: "Popular items highlighted in public listings and reviews. Baked kulhad dishes and chilled coffee offerings.",
        badge: "Menu Listing"
      },
      {
        id: "hl-2",
        title: "Vegetarian Cafe Menu",
        description: "Offers a range of vegetarian cafe food including sandwiches, burgers, pizzas, and beverages.",
        badge: "Cuisine"
      },
      {
        id: "hl-3",
        title: "Approx. ₹300 for Two",
        description: "Approximate price for two noted on public directories. Confirm individual item pricing at the counter.",
        badge: "Pricing Guide"
      },
      {
        id: "hl-4",
        title: "Waghodia Road Location",
        description: "Situated at 33-Phoenix Resicom, Vaikunth Char Rasta, Kendranagar, Vadodara. Dine-in and takeaway.",
        badge: "Location"
      }
    ]
  },

  social: {
    instagram: "",
    facebook: "",
    zomato: ""
  },

  categories: MENU_CATEGORIES,
  menuItems: MENU_ITEMS,

  experiences: [
    {
      number: "01",
      title: "Cafe Food",
      description: "A selection of vegetarian pizzas, burgers, sandwiches, pasta and savory bites prepared to order.",
      icon: "utensils"
    },
    {
      number: "02",
      title: "Coffee & Drinks",
      description: "Classic espresso coffees, cold brews, herbal tea infusions, and blended thick milkshakes.",
      icon: "coffee"
    },
    {
      number: "03",
      title: "Seating & Space",
      description: "Comfortable indoor cafe seating arranged for conversations and casual dining with friends and family.",
      icon: "users"
    },
    {
      number: "04",
      title: "Convenient Location",
      description: "Located at Vaikunth Char Rasta on Waghodia Road, serving both dine-in and takeaway guests.",
      icon: "map-pin"
    }
  ],

  galleryItems: [
    {
      id: "gal-1",
      title: "Artisanal Margherita Pizza",
      subtitle: "Demonstration Concept",
      category: "Pizza",
      image: "assets/images/gallery/gallery-pizza.webp",
      alt: "Artisan margherita pizza with melted mozzarella (Concept Photography)"
    },
    {
      id: "gal-2",
      title: "Signature Chilled Coffee",
      subtitle: "Demonstration Concept",
      category: "Beverages",
      image: "assets/images/gallery/gallery-coffee.webp",
      alt: "Chilled iced coffee with milk swirl (Concept Photography)"
    },
    {
      id: "gal-3",
      title: "Roasted Coffee Selection",
      subtitle: "Demonstration Concept",
      category: "Coffee",
      image: "assets/images/gallery/gallery-interior.webp",
      alt: "Aromatic roasted coffee beans (Concept Photography)"
    },
    {
      id: "gal-4",
      title: "Chocolate Thickshake",
      subtitle: "Demonstration Concept",
      category: "Shakes",
      image: "assets/images/gallery/gallery-shake.webp",
      alt: "Rich chocolate thickshake with drizzle (Concept Photography)"
    },
    {
      id: "gal-5",
      title: "Crisp Toasted Sandwich",
      subtitle: "Demonstration Concept",
      category: "Sandwiches",
      image: "assets/images/gallery/gallery-sandwich.webp",
      alt: "Toasted golden grilled sandwich (Concept Photography)"
    },
    {
      id: "gal-6",
      title: "Cafe Table Spread",
      subtitle: "Demonstration Concept",
      category: "Food",
      image: "assets/images/gallery/gallery-moments.webp",
      alt: "Table spread of cafe dishes (Concept Photography)"
    },
    {
      id: "gal-7",
      title: "Creamy Penne Pasta",
      subtitle: "Demonstration Concept",
      category: "Pasta",
      image: "assets/images/gallery/gallery-pasta.webp",
      alt: "Penne pasta in creamy white sauce (Concept Photography)"
    },
    {
      id: "gal-8",
      title: "Fresh Table Bites",
      subtitle: "Demonstration Concept",
      category: "Dining",
      image: "assets/images/gallery/gallery-bread.webp",
      alt: "Freshly prepared cafe bites (Concept Photography)"
    }
  ]
};
