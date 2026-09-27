# 📖 Architecture & System Overview — CodeMentees Frontend

This document provides a comprehensive technical overview of the **CodeMentees Next.js 16 Application**, detailing the React-to-Next.js migration architecture, performance optimizations, state management patterns, and route taxonomy.

---

## 🏗️ 1. High-Level System Architecture

```mermaid
graph TD
    Client["Browser Client"]
    AppRouter["Next.js App Router (Turbopack)"]
    ISRCache["ISR Cache (Static Marketing Pages)"]
    SSRWorker["Node.js SSR Workers (Dynamic App Routes)"]
    ReduxStore["Redux Toolkit Store (Auth & State)"]
    BackendAPI["Node.js / Express Backend (localhost:5000)"]

    Client -->|HTTP Request| AppRouter
    AppRouter -->|Static Match (1h revalidate)| ISRCache
    AppRouter -->|Dynamic Match| SSRWorker
    SSRWorker -->|SSR Fallback Interceptor| ReduxStore
    Client -->|API Rewrites (/api/*)| BackendAPI
```

---

## 🔄 2. React to Next.js Migration Summary

The frontend application was migrated from a Client-Side Rendered (CRA / Vite) React app to **Next.js 16 App Router** with **zero visual or UI changes**:

| Feature / System | Legacy React App | Next.js 16 Migration Architecture |
| :--- | :--- | :--- |
| **Routing** | `react-router-dom` (`BrowserRouter`, `Routes`) | Next.js App Router (`src/app/`) with `next/navigation` |
| **Navigation Links** | `<Link to="...">` | Next.js `<Link href="...">` |
| **Font Delivery** | Render-blocking Google Font `<link>` CDN | `next/font/google` self-hosted zero-CLS typography |
| **Meta & SEO** | `react-helmet` / `react-helmet-async` | Native Next.js metadata API & client `SEOHead` DOM manager |
| **API Proxying** | Vite `server.proxy` | `next.config.mjs` `rewrites()` (`/api/*` $\rightarrow$ `http://localhost:5000`) |
| **State Management** | Redux Toolkit | Redux Toolkit wrapped in SSR-safe `Providers.jsx` |
| **Build System** | Vite / CRA Webpack | Turbopack + Next.js Compiler |

---

## ⚡ 3. Performance & Optimization Strategy

### A. Font Loading (`next/font/google`)
External font network dependencies were eliminated by pre-downloading and self-hosting font subsets during compilation:
- **Primary Body Font**: `Inter` (`var(--font-inter)`)
- **Headings & Display**: `Manrope` (`var(--font-manrope)`), `Outfit` (`var(--font-outfit)`), `Playwrite_IT_Moderna` (`var(--font-playwrite)`)

### B. Package Import Optimization
Tree-shaking and module isolation enabled via `experimental.optimizePackageImports` in `next.config.mjs`:
- `lucide-react` & `react-icons`
- `framer-motion`
- `recharts`

*Result*: Production build time reduced from **56 seconds** down to **10.4 seconds**.

### C. Static Pre-Rendering & ISR
Routes are classified into two rendering strategies:
1. **ISR (Incremental Static Regeneration)**: Pre-rendered HTML regenerated every 3600s (`export const revalidate = 3600`) for `/about`, `/contact`, `/faq`, `/careers`, `/privacy-policy`, `/terms`, `/unauthorized`.
2. **Dynamic SSR**: Server-rendered per request (`export const dynamic = 'force-dynamic'`) for user dashboards, live courses, and dynamic blog/course pages.

---

## 🗺️ 4. Comprehensive Route Taxonomy (62 Routes)

### A. Public Routes (`(public)/`)
- `/` — Homepage (Hero carousel, upcoming events, course cards, testimonials)
- `/login`, `/register`, `/verify-otp`, `/forgot-password` — User authentication flow
- `/about`, `/contact`, `/faq`, `/careers` — Public company pages
- `/blogs`, `/blogs/[slug]` — Blog list and article reader with Prism syntax highlighting
- `/courses`, `/courses/[courseId]` — Self-paced courses catalog and details
- `/live`, `/live/[id]` — Live batch mentorship programs and details
- `/school-coding`, `/school-coding/catalog` — School coding curriculum marketing & catalog
- `/placement-support`, `/events` — Placement support & college event showcase
- `/privacy-policy`, `/terms`, `/unauthorized` — Legal and fallback error views

### B. Admin Dashboard Routes (`admin/`)
- `/admin` — Admin analytics & overview
- `/admin/site-settings` — Homepage & banner content manager
- `/admin/posts`, `/admin/posts/create`, `/admin/posts/edit/[id]`, `/admin/posts/categories` — Blog CMS
- `/admin/courses`, `/admin/courses/create`, `/admin/courses/[id]/manage`, `/admin/courses/[id]/edit` — Course CMS
- `/admin/categories`, `/admin/categories/create`, `/admin/categories/edit/[id]` — Category taxonomy manager
- `/admin/live-courses`, `/admin/live-courses/create`, `/admin/live-courses/edit/[id]`, `/admin/live-courses/[id]/content` — Live course manager
- `/admin/school-courses`, `/admin/school-courses/add`, `/admin/school-courses/edit/[id]` — School coding CMS
- `/admin/school-coding-leads`, `/admin/queries` — Lead & contact query manager
- `/admin/users`, `/admin/users/create`, `/admin/users/edit/[id]` — User RBAC management
- `/admin/jobs`, `/admin/jobs/create`, `/admin/jobs/edit/[id]`, `/admin/career-applications` — Careers & job applications manager
- `/admin/events`, `/admin/events/create`, `/admin/events/edit/[id]` — Event manager
- `/admin/social-links`, `/admin/bulk-mail` — Social link settings & bulk email sender

### C. Student Portal Routes (`student/`)
- `/student` — Student dashboard overview
- `/student/courses` — Enrolled self-paced courses
- `/student/live-classes` — Enrolled live batch classes
- `/student/certificates` — Course completion certificates
- `/student/profile` — Student profile settings & account details

---

## 🛠️ 5. Developer Maintenance & Scripting

### Route Generator Script
All App Router entrypoint files (`page.jsx`) are maintained via [scripts/generate-pages.cjs](file:///d:/code/MenteesDev/frontend-next/scripts/generate-pages.cjs).

If you create a new view in `src/views/`, add it to `publicRoutes`, `adminRoutes`, or `studentRoutes` in `scripts/generate-pages.cjs` and run:
```bash
node scripts/generate-pages.cjs
```

### Verification Checklist
Before committing new features, always verify production compilation:
```bash
# Verify build
npm run build
```
