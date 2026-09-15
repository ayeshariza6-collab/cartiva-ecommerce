# CARTIVA — Shop Smart. Live Better.

A premium, fully-featured e-commerce web application built with React, Vite, and Tailwind CSS. Designed and developed by **Ayesha Riza** as a BCA portfolio project.

## Features

- **9 fully functional pages**: Home, Shop, Product Details, Cart, Wishlist, Checkout, Order Success, About, and Contact
- **24+ realistic products** across 6 categories (Electronics, Fashion, Footwear, Beauty, Accessories, Home & Lifestyle)
- **Advanced shop filtering**: search, category filter, price range, rating filter, and 5 sort options
- **Shopping cart** with quantity controls, subtotal/discount/shipping/tax breakdown, and localStorage persistence
- **Wishlist** with add/remove/move-to-cart functionality and localStorage persistence
- **Demo checkout** with full form validation (name, email, phone, address, PIN code) and order confirmation
- **Dark / light mode** with smooth transitions and localStorage persistence
- **Toast notifications** for cart, wishlist, and order actions
- **Recently viewed products** tracking via localStorage
- **Responsive design** optimized for 320px to 1440px+ viewports
- **Smooth animations**: scroll reveal, hover effects, page transitions, mobile menu drawer
- **Accessible**: semantic HTML, keyboard navigation, focus states, ARIA labels, alt text

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — build tool and dev server
- **TypeScript** — type safety
- **Tailwind CSS 3** — styling and design system
- **React Router 6** — client-side routing
- **lucide-react** — icons
- **localStorage** — cart, wishlist, recently viewed, and theme persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cartiva.git
cd cartiva

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` folder, ready to deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
cartiva/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── BackToTop.tsx
│   ├── context/           # Global state management
│   │   └── AppContext.tsx
│   ├── data/              # Centralized product data
│   │   └── products.ts
│   ├── pages/             # Route-level page components
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── Cart.tsx
│   │   ├── Wishlist.tsx
│   │   ├── Checkout.tsx
│   │   ├── Success.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── utils/             # Utility functions
│   │   └── format.ts
│   ├── App.tsx            # Root component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles + Tailwind
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Customization

### Adding or Editing Products

All product data lives in `src/data/products.ts`. Each product has:
- `id`, `name`, `category`, `description`
- `price`, `originalPrice`, `discount`, `rating`, `reviewCount`
- `image`, `additionalImages`, `badge`
- `colors` and `sizes` (where applicable)
- `specifications` array

Simply edit the `products` array to add, remove, or modify products.

### Changing the Theme

Colors are defined in `tailwind.config.js` under the `primary`, `accent`, `success`, `warning`, `error`, and `neutral` color ramps. Update these to change the entire site's color scheme.

## Deployment

### Netlify
1. Run `npm run build`
2. Drag the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop)

### Vercel
1. Import the repository at [vercel.com](https://vercel.com)
2. Vercel auto-detects Vite — just click Deploy

### GitHub Pages
1. Run `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch or use a CI action

## License

This project is open source and available for educational and portfolio use.

---

Designed & Developed by **Ayesha Riza** — BCA Student
