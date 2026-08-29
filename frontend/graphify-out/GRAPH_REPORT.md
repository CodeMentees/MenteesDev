# Graph Report - frontend  (2026-08-28)

## Corpus Check
- 135 files · ~258,480 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 473 nodes · 868 edges · 74 communities (32 shown, 42 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `93216aa4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BlogPage.jsx
- devDependencies
- Toast.jsx
- Home.jsx
- Table.jsx
- useCRUD
- App.jsx
- Carousel.jsx
- CodeMentees SEO System — Developer Guide
- useEvent
- dependencies
- prerender.js
- store.js
- BulkMailSender.jsx
- Dashboard.jsx
- SummerInternship.jsx
- CardContainer.jsx
- Header.jsx
- refactorApp.cjs
- AdminRoute.jsx
- constants.js
- AddEditJob.jsx
- useScrollReveal
- NotFound.jsx
- ProtectedRoute.jsx
- SchoolCoding.jsx
- Unauth.jsx
- themeReplacer.cjs
- axios
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- easymde
- flowbite
- framer-motion
- highlight.js
- jspdf
- jspdf-autotable
- lucide-react
- react
- react-dom
- react-helmet-async
- react-markdown
- @react-oauth/google
- react-redux
- react-router-dom
- react-simplemde-editor
- react-syntax-highlighter
- recharts
- @reduxjs/toolkit
- rehype-raw
- remark-gfm
- socket.io-client
- README.md

## God Nodes (most connected - your core abstractions)
1. `useCRUD()` - 20 edges
2. `Toast()` - 19 edges
3. `useCourse()` - 16 edges
4. `useDelete()` - 13 edges
5. `useCategoryAPI()` - 12 edges
6. `useLiveCourseAPI()` - 12 edges
7. `SEOHead()` - 12 edges
8. `ReusableTable()` - 11 edges
9. `useBlog()` - 10 edges
10. `DeleteConfirmModal()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `LiveCourse()` --calls--> `useLiveCourseAPI()`  [EXTRACTED]
  src/Pages/Live/LiveCourse.jsx → src/api/liveCourseApi.jsx
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  src/Pages/Admin/Job/JobManagement.jsx → src/Components/API/useDelete.js
- `BlogCategoryManager()` --calls--> `useBlogCategory()`  [EXTRACTED]
  src/Components/Blog/BlogCategoryManger.jsx → src/api/blogCategoryApi.jsx
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  src/Components/UI/AuthModal.jsx → src/api/authApi.jsx
- `WorkshopSection()` --calls--> `useEvent()`  [EXTRACTED]
  src/Components/WorkshopSection/WorkshopSection.jsx → src/api/eventApi.jsx

## Import Cycles
- None detected.

## Communities (74 total, 42 thin omitted)

### Community 0 - "BlogPage.jsx"
Cohesion: 0.07
Nodes (34): useBlog(), About, Blog, BlogPage, CourseDetails, FAQ, LiveCourseDetails, LivePage (+26 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (46): autoprefixer, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, autoprefixer (+38 more)

### Community 2 - "Toast.jsx"
Cohesion: 0.09
Nodes (26): useAuth(), useSchoolCodingLeadAPI(), useSchoolCourseAPI(), AddEditSchoolCourse, CurriculumCatalog, ForgotPassword, LoginPage, OTPVerification (+18 more)

### Community 3 - "Home.jsx"
Cohesion: 0.08
Nodes (28): useCategoryAPI(), fetchCourseByCategory(), updateDetails(), useCourse(), AddCourse, AddCourseCategory, AllCourse, CourseManagement (+20 more)

### Community 4 - "Table.jsx"
Cohesion: 0.17
Nodes (16): useUserAPI(), AddEditUser, DashboardOverview, InternshipList, useDelete(), ReusableTable(), DeleteConfirmModal(), Pagination() (+8 more)

### Community 5 - "useCRUD"
Cohesion: 0.11
Nodes (19): api, useBlogCategory(), useLiveCourseAPI(), useQueryAPI(), useCRUD(), AddEditLiveCourse, AddPost, BlogCategoryManager (+11 more)

### Community 6 - "App.jsx"
Cohesion: 0.13
Nodes (13): App(), CategoryList, CourseList, CreateEvent, EventManager, JobManagement, LiveCourseList, PostList (+5 more)

### Community 7 - "Carousel.jsx"
Cohesion: 0.27
Nodes (7): fetchSiteData(), postSiteData(), HomeSite, Carousel(), TYPEWRITER_WORDS, useTypewriter(), HomeSite()

### Community 8 - "CodeMentees SEO System — Developer Guide"
Cohesion: 0.18
Nodes (10): Adding a Custom OG Image, Adding SEO to a New Page (2 Steps), Admin / Utility Pages (noindex), All `SEOHead` Props Reference, CodeMentees SEO System — Developer Guide, Dynamic Pages (Content from API), How the Pre-Rendering Works, SEO Checklist for Every New Page (+2 more)

### Community 9 - "useEvent"
Cohesion: 0.31
Nodes (5): useEvent(), UpcomingEvents(), WorkshopCard(), WorkshopSection(), CreateEvent()

### Community 10 - "dependencies"
Cohesion: 0.22
Nodes (9): aos, dependencies, aos, react-helmet, react-icons, react-quill, react-helmet, react-icons (+1 more)

### Community 11 - "prerender.js"
Cohesion: 0.32
Nodes (6): __dirname, distDir, fetchDynamicRoutes(), prerender(), proxyRequest(), staticRoutesToPrerender

## Knowledge Gaps
- **89 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `axios`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet-async`, `react-markdown`, `@react-oauth/google`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `recharts`, `@reduxjs/toolkit`, `rehype-raw`, `remark-gfm`, `socket.io-client`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `useCRUD()` connect `useCRUD` to `BlogPage.jsx`, `Toast.jsx`, `Home.jsx`, `Table.jsx`, `useEvent`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `useCourse()` (e.g. with `fetchCourseByCategory()` and `updateDetails()`) actually correct?**
  _`useCourse()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BlogPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06610169491525424 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `Toast.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0851063829787234 - nodes in this community are weakly interconnected._