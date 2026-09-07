# Graph Report - MenteesDev  (2026-09-07)

## Corpus Check
- 233 files · ~282,154 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 904 nodes · 1572 edges · 113 communities (50 shown, 63 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bec33c7a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AllCourse.jsx
- Toast.jsx
- authController.js
- liveCourseRoutes.js
- devDependencies
- useCRUD
- backend/index.js
- SEOHead.jsx
- App.jsx
- courseRoutes.js
- postRoutes.js
- Table.jsx
- useLiveCourseAPI
- eventRoutes.js
- dependencies
- useBlogCategory
- routes/index.js
- backend/package.json
- dependencies
- CourseDetails.jsx
- BlogPage.jsx
- FAQ.jsx
- queryRoutes.js
- BulkMailSender.jsx
- dependencies
- Dashboard.jsx
- vercel.json
- prerender.js
- SummerInternship.jsx
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

## God Nodes (most connected - your core abstractions)
1. `useCRUD()` - 20 edges
2. `Toast()` - 19 edges
3. `useCourse()` - 16 edges
4. `requirePermission()` - 15 edges
5. `useDelete()` - 13 edges
6. `SEOHead()` - 13 edges
7. `User` - 12 edges
8. `api` - 12 edges
9. `useCategoryAPI()` - 12 edges
10. `useLiveCourseAPI()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/Job/JobManagement.jsx → frontend/src/Components/API/useDelete.js
- `BlogCategoryManager()` --calls--> `useBlogCategory()`  [EXTRACTED]
  frontend/src/Components/Blog/BlogCategoryManger.jsx → frontend/src/api/blogCategoryApi.jsx
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  frontend/src/Components/UI/AuthModal.jsx → frontend/src/api/authApi.jsx
- `WorkshopSection()` --calls--> `useEvent()`  [EXTRACTED]
  frontend/src/Components/WorkshopSection/WorkshopSection.jsx → frontend/src/api/eventApi.jsx
- `AddEditLiveCourse()` --calls--> `useLiveCourseAPI()`  [EXTRACTED]
  frontend/src/Pages/Admin/LiveCourse/AddEditLiveCourse.jsx → frontend/src/api/liveCourseApi.jsx

## Import Cycles
- None detected.

## Communities (113 total, 63 thin omitted)

### Community 0 - "AllCourse.jsx"
Cohesion: 0.15
Nodes (7): AllCourse, MyCourses, PlacementSupport, CourseCard(), levelColors, LoadingSpinner(), SkeletonGrid()

### Community 1 - "Toast.jsx"
Cohesion: 0.06
Nodes (31): useAuth(), useQueryAPI(), useSchoolCourseAPI(), AddEditSchoolCourse, Contact, CurriculumCatalog, ForgotPassword, LoginPage (+23 more)

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
Nodes (40): api, useCategoryAPI(), fetchCourseByCategory(), updateDetails(), useCourse(), fetchSiteData(), postSiteData(), useCRUD() (+32 more)

### Community 6 - "backend/index.js"
Cohesion: 0.07
Nodes (30): createtest, deletetest, gettestById, gettests, updatetest, app, corsOptions, __dirname (+22 more)

### Community 7 - "SEOHead.jsx"
Cohesion: 0.24
Nodes (9): About, organizationJsonLd, DEFAULT_OG_IMAGE, getSEOForPath(), SEO_ROUTES, SITE_NAME, SITE_URL, TWITTER_HANDLE (+1 more)

### Community 8 - "App.jsx"
Cohesion: 0.07
Nodes (16): AddEditJob, AdminRoutes, App(), AppInner(), CategoryList, NotFound, ProtectedRoute, QueryList (+8 more)

### Community 9 - "courseRoutes.js"
Cohesion: 0.11
Nodes (23): storage, bulkDeleteCourses, createCourse, deleteCourse, getCourse, getCourses, getCoursesByCategory, updateCourse (+15 more)

### Community 10 - "postRoutes.js"
Cohesion: 0.12
Nodes (21): addComment, bulkDeletePosts, createPost, deleteComment, deletePost, generateSlug(), getPost, getPostBySlug (+13 more)

### Community 12 - "Table.jsx"
Cohesion: 0.13
Nodes (22): useSchoolCodingLeadAPI(), CourseList, CreateEvent, EventManager, InternshipList, JobManagement, LiveCourseList, PostList (+14 more)

### Community 13 - "useLiveCourseAPI"
Cohesion: 0.24
Nodes (7): useLiveCourseAPI(), AddEditLiveCourse, LiveCourseContent, LivePage, AddEditLiveCourse(), LiveCourseContent(), LiveCourse()

### Community 14 - "eventRoutes.js"
Cohesion: 0.09
Nodes (24): createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, addEvent, deleteEvent, getAllEvents (+16 more)

### Community 15 - "dependencies"
Cohesion: 0.15
Nodes (13): autonodeapi, dependencies, autonodeapi, cloudinary, express, nodemon, passport, swagger-jsdoc (+5 more)

### Community 16 - "useBlogCategory"
Cohesion: 0.27
Nodes (7): useBlogCategory(), AddPost, BlogCategoryManager, BlogCategoryManager(), BlogSidebar(), RichTextEditor(), AddPost()

### Community 17 - "routes/index.js"
Cohesion: 0.06
Nodes (43): createCategory, deleteCategory, getCategories, getCategory, updateCategory, applyForInternship, bulkDeleteInternships, deleteInternship (+35 more)

### Community 18 - "backend/package.json"
Cohesion: 0.18
Nodes (10): author, description, license, main, name, scripts, dev, test (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.22
Nodes (8): dependencies, googleapis, nodemailer, vercel, googleapis, nodemailer, vercel, type

### Community 20 - "CourseDetails.jsx"
Cohesion: 0.31
Nodes (7): CourseDetails, LiveCourseDetails, CourseDetails(), LiveCourseDetails(), stripHtml(), useDynamicSEO(), generatePdf()

### Community 21 - "BlogPage.jsx"
Cohesion: 0.13
Nodes (18): useBlog(), useEvent(), Blog, BlogPage, EventsPage, BlogGridFour(), BlogPromoSidebar(), UpcomingEvents() (+10 more)

### Community 22 - "FAQ.jsx"
Cohesion: 0.40
Nodes (3): FAQ, faqData, faqJsonLd

### Community 23 - "queryRoutes.js"
Cohesion: 0.18
Nodes (12): createQuery, deleteQuery, getQueries, getQuery, updateQuery, BlockedIp, blockedIpSchema, ipBlockMiddleware (+4 more)

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

## Knowledge Gaps
- **201 isolated node(s):** `client`, `deflate`, `__filename`, `__dirname`, `__filename` (+196 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **63 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `axios`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet`, `react-helmet-async`, `react-icons`, `react-markdown`, `@react-oauth/google`, `react-quill`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `@reduxjs/toolkit`, `socket.io-client`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `routes/index.js` to `authController.js`, `liveCourseRoutes.js`, `courseRoutes.js`, `postRoutes.js`, `eventRoutes.js`, `queryRoutes.js`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `client`, `deflate`, `__filename` to the rest of the system?**
  _201 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AllCourse.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._
- **Should `Toast.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05989110707803993 - nodes in this community are weakly interconnected._
- **Should `authController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06594071385359952 - nodes in this community are weakly interconnected._
- **Should `liveCourseRoutes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0960960960960961 - nodes in this community are weakly interconnected._