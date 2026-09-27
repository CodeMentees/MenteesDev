# 🚀 CodeMentees — Next.js Application Frontend

A high-performance, modern Next.js 16 (App Router + Turbopack) application for **CodeMentees** — a live 1:1 mentorship platform for Web Development, Data Structures & Algorithms (DSA), and tech career prep.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.3](https://nextjs.org/) (App Router, Turbopack)
- **UI & View Engine**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & `react-redux`
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with `@tailwindcss/typography`, Vanilla CSS design system
- **Authentication**: JWT HttpOnly Cookies, [Google OAuth Provider](https://www.npmjs.com/package/@react-oauth/google)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Animate On Scroll (AOS)
- **Icons**: `lucide-react`, `react-icons`, FontAwesome CDN
- **HTTP Client**: [Axios](https://axios-http.com/) with request adapters for SSR/SSG safety

---

## 📁 Project Folder Structure

```text
frontend-next/
├── public/                 # Static assets (images, logos, favicon, og-image)
├── scripts/
│   └── generate-pages.cjs  # Generator script for Next.js App Router entrypoints
├── src/
│   ├── api/                # API client configuration & endpoint service modules
│   ├── app/                # Next.js App Router route layouts and page entries
│   │   ├── (public)/       # Public marketing, auth, course & blog pages
│   │   ├── admin/          # Protected Admin Dashboard routes & management
│   │   ├── student/        # Protected Student Portal routes
│   │   ├── globals.css     # Design tokens, typography, and utility classes
│   │   └── layout.js       # Root HTML layout with self-hosted Google Fonts
│   ├── Components/         # Modular UI components (Header, Footer, Cards, Modals)
│   ├── hooks/              # Custom React hooks (useDelete, etc.)
│   ├── Slices/             # Redux state slices (authSlice, categorySlice, etc.)
│   ├── seo/                # SEOHead component for dynamic page metadata
│   ├── utils/              # Client utilities (generateCoursePdf, imageUtils)
│   ├── views/              # Full-page view components (Home, Blog, CourseDetails)
│   ├── AdminRoute.jsx      # Admin client-side role guard
│   ├── StudentRoute.jsx    # Student client-side authentication guard
│   ├── Providers.jsx       # Client wrapper for Redux Provider & Google OAuth
│   └── store.js            # Redux store configuration
├── jsconfig.json           # Path aliases (@/* -> ./src/*)
├── next.config.mjs         # Next.js rewrites, redirects, headers & performance configs
├── postcss.config.mjs      # PostCSS & Tailwind integration
└── package.json            # Dependencies & scripts
```

---

## ⚡ Quick Start & Development

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Backend API**: Running on `http://localhost:5000`

### 2. Installation
```bash
# Clone or navigate to the project directory
cd frontend-next

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. All `/api/*` and `/uploads/*` requests are automatically proxied to the backend server at `http://localhost:5000`.

### 4. Build for Production
```bash
# Compiles all 62 static and dynamic App Router pages
npm run build

# Start production server
npm run start
```

---

## ⚙️ Key Performance & Architecture Features

### 1. Zero-CLS Self-Hosted Fonts (`next/font/google`)
External font CDN calls have been replaced with Next.js built-in Google Font optimization for `Inter`, `Manrope`, `Outfit`, and `Playwrite_IT_Moderna`. Fonts are downloaded at build time and served locally with zero layout shifts.

### 2. Hybrid SSR & ISR (Incremental Static Regeneration)
- Static public pages (`/about`, `/contact`, `/faq`, `/careers`, `/privacy-policy`, `/terms`, `/unauthorized`) use ISR (`revalidate = 3600`), serving pre-rendered HTML in < 0.5s.
- Dynamic data routes use server-rendered request handling (`force-dynamic`).

### 3. Tree-Shaking Package Import Optimization
Configured `optimizePackageImports` in `next.config.mjs` for heavy icon and animation packages (`lucide-react`, `react-icons`, `framer-motion`, `recharts`), resulting in build times under **11 seconds**.

### 4. Route Page Synchronization
All page routes in `src/app/` are automatically organized and generated via `scripts/generate-pages.cjs`. If new routes are added to `src/views/`, run:
```bash
node scripts/generate-pages.cjs
```

---

## 🔒 Security & Route Guards

- **Admin Routes (`/admin/*`)**: Wrapped with `AdminRoute.jsx` checking Redux `auth` state and verifying `user.role === 'admin'`. Unauthorized users are redirected to `/unauthorized` or `/login`.
- **Student Routes (`/student/*`)**: Wrapped with `StudentRoute.jsx` ensuring user session validity before rendering portal features.
- **Security Headers**: Injected standard response headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`) in `next.config.mjs`.

---

## 📜 License
Private & Proprietary — **CodeMentees Team**. All rights reserved.
