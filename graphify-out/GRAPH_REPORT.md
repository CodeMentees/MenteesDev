# Graph Report - MenteesDev  (2026-09-06)

## Corpus Check
- 232 files · ~282,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 902 nodes · 1565 edges · 112 communities (52 shown, 60 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27459a26`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- testController.js
- Toast.jsx
- authController.js
- liveCourseRoutes.js
- devDependencies
- useCRUD
- backend/index.js
- Home.jsx
- App.jsx
- schoolCourseRoutes.js
- postRoutes.js
- Table.jsx
- swagger.js
- courseRoutes.js
- dependencies
- useBlogCategory
- routes/index.js
- backend/package.json
- dependencies
- test_hang.js
- BlogPage.jsx
- SchoolCodingLeadList.jsx
- queryRoutes.js
- ipBlockMiddleware.js
- dependencies
- vercel.json
- prerender.js
- CardContainer.jsx
- test_swagger.js
- refactorApp.cjs
- constants.js
- themeReplacer.cjs
- axios
- bcrypt
- bcryptjs
- body-parser
- compression
- cookie-parser
- cors
- dotenv
- CodeMentees SEO System — Developer Guide
- express-async-handler
- express-rate-limit
- google-auth-library
- jsonwebtoken
- mongoose
- multer
- multer-storage-cloudinary
- useAuth
- path
- pdf-lib
- swagger-ui-express
- turndown-plugin-gfm
- url
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- easymde
- flowbite
- framer-motion
- axios
- highlight.js
- jspdf
- jspdf-autotable
- lucide-react
- react
- react-dom
- react-helmet
- react-helmet-async
- react-icons
- react-markdown
- @react-oauth/google
- react-quill
- react-redux
- react-router-dom
- react-simplemde-editor
- react-syntax-highlighter
- @reduxjs/toolkit
- socket.io-client
- enrollmentModel.js
- rules/graphify.md
- googleapis
- node-cron
- nodemailer
- socket.io
- turndown
- frontend/README.md
- README.md
- isAdmin.js
- useUserAPI

## God Nodes (most connected - your core abstractions)
1. `useCRUD()` - 20 edges
2. `Toast()` - 19 edges
3. `requirePermission()` - 16 edges
4. `useCourse()` - 16 edges
5. `useDelete()` - 13 edges
6. `SEOHead()` - 13 edges
7. `User` - 12 edges
8. `useCategoryAPI()` - 12 edges
9. `useLiveCourseAPI()` - 12 edges
10. `ReusableTable()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `useCategoryAPI()`  [EXTRACTED]
  frontend/src/Pages/Home.jsx → frontend/src/api/categoryApi.jsx
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/Job/JobManagement.jsx → frontend/src/Components/API/useDelete.js
- `BlogCategoryManager()` --calls--> `useBlogCategory()`  [EXTRACTED]
  frontend/src/Components/Blog/BlogCategoryManger.jsx → frontend/src/api/blogCategoryApi.jsx
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  frontend/src/Components/UI/AuthModal.jsx → frontend/src/api/authApi.jsx
- `WorkshopSection()` --calls--> `useEvent()`  [EXTRACTED]
  frontend/src/Components/WorkshopSection/WorkshopSection.jsx → frontend/src/api/eventApi.jsx

## Import Cycles
- None detected.

## Communities (112 total, 60 thin omitted)

### Community 0 - "testController.js"
Cohesion: 0.29
Nodes (8): createtest, deletetest, gettestById, gettests, updatetest, test, testSchema, router

### Community 1 - "Toast.jsx"
Cohesion: 0.15
Nodes (15): useSchoolCourseAPI(), AddEditSchoolCourse, CurriculumCatalog, ForgotPassword, OTPVerification, SchoolCourseList, Toast(), AddEditSchoolCourse() (+7 more)

### Community 2 - "authController.js"
Cohesion: 0.07
Nodes (39): authUser, client, googleCallback, logoutUser(), registerUser, resendOTP, verifyOTP, compressPDF() (+31 more)

### Community 3 - "liveCourseRoutes.js"
Cohesion: 0.10
Nodes (23): createGroup(), handleJoinRequest(), addLiveCourseContent, createLiveCourse, deleteLiveCourse, deleteLiveCourseContent, getLiveCourseById, getLiveCourses (+15 more)

### Community 4 - "devDependencies"
Cohesion: 0.04
Nodes (46): autoprefixer, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, autoprefixer, eslint (+38 more)

### Community 5 - "useCRUD"
Cohesion: 0.06
Nodes (36): api, useCategoryAPI(), fetchCourseByCategory(), updateDetails(), useCourse(), useLiveCourseAPI(), useQueryAPI(), useCRUD() (+28 more)

### Community 6 - "backend/index.js"
Cohesion: 0.18
Nodes (9): app, corsOptions, __dirname, __filename, frontendDistPath, PRE_RENDERED_ROUTES, errorHandler(), notFound() (+1 more)

### Community 7 - "Home.jsx"
Cohesion: 0.09
Nodes (17): fetchSiteData(), postSiteData(), Home, HomeSite, Carousel(), TYPEWRITER_WORDS, useTypewriter(), featuresData (+9 more)

### Community 8 - "App.jsx"
Cohesion: 0.05
Nodes (25): AddEditJob, App(), AppInner(), BulkMailSender, CategoryList, CourseList, DashboardLayout, InternshipList (+17 more)

### Community 9 - "schoolCourseRoutes.js"
Cohesion: 0.11
Nodes (22): storage, applyForInternship, bulkDeleteInternships, deleteInternship, getInternships, updateInternship, uploadToCloudinary(), createSchoolCourse (+14 more)

### Community 10 - "postRoutes.js"
Cohesion: 0.11
Nodes (22): addComment, bulkDeletePosts, createPost, deleteComment, deletePost, generateSlug(), getPost, getPostBySlug (+14 more)

### Community 12 - "Table.jsx"
Cohesion: 0.20
Nodes (14): CreateEvent, EventManager, PostList, QueryList, useDelete(), ReusableTable(), DeleteConfirmModal(), Pagination() (+6 more)

### Community 13 - "swagger.js"
Cohesion: 0.32
Nodes (6): options, router, schemas, specs, generateSwaggerSchema(), mapMongooseTypeToSwaggerType()

### Community 14 - "courseRoutes.js"
Cohesion: 0.14
Nodes (19): createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, bulkDeleteCourses, createCourse, deleteCourse (+11 more)

### Community 15 - "dependencies"
Cohesion: 0.15
Nodes (13): autonodeapi, dependencies, autonodeapi, cloudinary, express, nodemon, passport, swagger-jsdoc (+5 more)

### Community 16 - "useBlogCategory"
Cohesion: 0.27
Nodes (7): useBlogCategory(), AddPost, BlogCategoryManager, BlogCategoryManager(), BlogSidebar(), RichTextEditor(), AddPost()

### Community 17 - "routes/index.js"
Cohesion: 0.05
Nodes (47): createCategory, deleteCategory, getCategories, getCategory, updateCategory, addEvent, deleteEvent, getAllEvents (+39 more)

### Community 18 - "backend/package.json"
Cohesion: 0.18
Nodes (10): author, description, license, main, name, scripts, dev, test (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.22
Nodes (8): dependencies, googleapis, nodemailer, vercel, googleapis, nodemailer, vercel, type

### Community 20 - "test_hang.js"
Cohesion: 0.25
Nodes (7): app, corsOptions, __dirname, __filename, frontendDistPath, PRE_RENDERED_ROUTES, server

### Community 21 - "BlogPage.jsx"
Cohesion: 0.06
Nodes (38): useBlog(), useEvent(), About, Blog, BlogPage, CourseDetails, EventsPage, FAQ (+30 more)

### Community 22 - "SchoolCodingLeadList.jsx"
Cohesion: 0.48
Nodes (4): useSchoolCodingLeadAPI(), SchoolCodingLeadList, SchoolCodingQueryForm(), SchoolCodingLeadList()

### Community 23 - "queryRoutes.js"
Cohesion: 0.31
Nodes (8): createQuery, deleteQuery, getQueries, getQuery, updateQuery, Query, querySchema, router

### Community 24 - "ipBlockMiddleware.js"
Cohesion: 0.33
Nodes (4): BlockedIp, blockedIpSchema, ipBlockMiddleware, limiter

### Community 26 - "dependencies"
Cohesion: 0.22
Nodes (9): aos, dependencies, aos, recharts, rehype-raw, remark-gfm, recharts, rehype-raw (+1 more)

### Community 28 - "vercel.json"
Cohesion: 0.29
Nodes (6): includeFiles, buildCommand, functions, api/index.js, outputDirectory, rewrites

### Community 29 - "prerender.js"
Cohesion: 0.32
Nodes (6): __dirname, distDir, fetchDynamicRoutes(), prerender(), proxyRequest(), staticRoutesToPrerender

### Community 46 - "CodeMentees SEO System — Developer Guide"
Cohesion: 0.18
Nodes (10): Adding a Custom OG Image, Adding SEO to a New Page (2 Steps), Admin / Utility Pages (noindex), All `SEOHead` Props Reference, CodeMentees SEO System — Developer Guide, Dynamic Pages (Content from API), How the Pre-Rendering Works, SEO Checklist for Every New Page (+2 more)

### Community 55 - "useAuth"
Cohesion: 0.13
Nodes (11): useAuth(), AdminRoutes, LoginPage, RegisterPage, Register(), ADMIN_ROLES, Header(), menuItems (+3 more)

### Community 117 - "useUserAPI"
Cohesion: 0.39
Nodes (5): useUserAPI(), AddEditUser, DashboardOverview, DashboardOverview(), AddEditUser()

## Knowledge Gaps
- **201 isolated node(s):** `client`, `deflate`, `__filename`, `__dirname`, `__filename` (+196 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requirePermission()` connect `routes/index.js` to `authController.js`, `liveCourseRoutes.js`, `schoolCourseRoutes.js`, `postRoutes.js`, `courseRoutes.js`, `queryRoutes.js`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `axios`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet`, `react-helmet-async`, `react-icons`, `react-markdown`, `@react-oauth/google`, `react-quill`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `@reduxjs/toolkit`, `socket.io-client`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `client`, `deflate`, `__filename` to the rest of the system?**
  _201 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `authController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06594071385359952 - nodes in this community are weakly interconnected._
- **Should `liveCourseRoutes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0960960960960961 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `useCRUD` be split into smaller, more focused modules?**
  _Cohesion score 0.06093189964157706 - nodes in this community are weakly interconnected._