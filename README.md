# The Corner Cafe – Premium Editorial Website

A high-performance, agency-grade website for **The Corner Cafe**, Vadodara, Gujarat, India.

> **Tagline:** Good Food. Great Coffee. Better Company.  
> **Location:** 33-Phoenix Resicom, Vaikunth Char Rasta, Waghodia Road, Kendranagar, Vadodara, Gujarat 390019, India.  
> **Contact:** +91 73592 95384 | 4.9 ★ Rating on Google (~196 reviews)

---

## ☕ Technical Philosophy

Built with **Zero Framework Dependencies**:
- **HTML5:** Semantic architecture, Schema.org JSON-LD structured data (`CafeOrCoffeeShop`), Open Graph tags, responsive picture elements.
- **Modern CSS3:** Fluid clamp typography, CSS custom properties, GPU-accelerated transforms, clip-paths, masonry grid, and strict `prefers-reduced-motion` accessibility support.
- **Vanilla JavaScript (ES6+):** Pure modular JavaScript (`import`/`export`), IntersectionObserver for smooth scroll reveals, passive scroll listeners, responsive drawer navigation, category filtering, and accessible lightbox modal.

---

## 📁 Project Architecture

```
the-corner-cafe/
│
├── index.html              # Semantic HTML5 entry point with complete metadata & Schema.org JSON-LD
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO indexing
├── README.md               # Documentation & setup guide
│
├── assets/
│   ├── images/
│   │   ├── hero/           # Hero desktop & mobile WebP images
│   │   ├── menu/           # WebP culinary photos of all 14 signature dishes
│   │   ├── gallery/        # Editorial magazine-style photography
│   │   └── general/        # Lifestyle, social share og-image, accents
│   ├── icons/              # Custom brand favicon and vector badges
│   └── fonts/              # Typography references
│
├── css/
│   ├── style.css           # Design tokens, reset, typography, components, and layout
│   ├── animations.css      # Keyframes, scroll reveals, preloader, and reduced-motion handling
│   └── responsive.css      # Breakpoints: 360px, 390px, 430px, 768px, 1024px, 1440px
│
└── js/
    ├── config.js           # Centralized configuration (business info, menu, reviews, hours)
    ├── menu.js             # Category switching & menu card management
    ├── gallery.js          # Masonry grid, keyboard-accessible lightbox modal
    ├── navigation.js       # Sticky navbar transition, active section observer, mobile drawer
    ├── animations.js       # Preloader, hero stagger, scroll reveals, desktop custom cursor
    └── main.js             # Application bootstrap & dynamic hydration
```

---

## 🚀 How to Run Locally

Because the project uses standard ES Modules (`<script type="module">`), it can be served using any local HTTP static server:

### Option 1: Python 3 (Recommended - built-in)
```bash
python3 -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 2: Node.js (Built-in static server)
```bash
npx serve -l 3000
```
Or with a simple one-liner:
```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f='.'+(req.url==='/'?'/index.html':req.url);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('Not found');}else{let ext=path.extname(f);let ct={'html':'text/html','css':'text/css','js':'text/javascript','webp':'image/webp','svg':'image/svg+xml','jpg':'image/jpeg'}[ext.slice(1)]||'text/plain';res.writeHead(200,{'Content-Type':ct});res.end(d);}});}).listen(3000,()=>console.log('Serving on http://localhost:3000'));"
```

---

## ⚙️ Updating Cafe Details & Menu

All content is managed centrally in `js/config.js`:
- **Rating & Reviews:** Update `ratings.googleRating` and `ratings.reviewCount`.
- **Menu Items:** Add, remove, or modify dish names, tags, images, and prices in `menuItems`.
- **Operating Hours:** Edit `hours.display` and `hours.verificationNote`.
- **Phone & WhatsApp:** Update `contact.phone` and `contact.whatsappNumber`.

No HTML markup modifications are required when updating menu items or business info.

---

## 🌿 Highlights

- **Pure Vegetarian Focus:** Green dot veg symbol on dishes, pure vegetarian highlights throughout.
- **Direct Engagement CTAs:** "Get Directions" (Google Maps), "Call Now", and "WhatsApp Us" prefilled enquiry links.
- **Mobile Sticky Action Bar:** Bottom bar with direct Call, WhatsApp, and Directions on small viewports.
- **Performance Optimized:** 100% local WebP images, no bulky UI libraries, fast initial paint.
- **Demonstration Concept:** Built as a demonstration design concept for The Corner Cafe, Vadodara. All details subject to cafe owner verification.

