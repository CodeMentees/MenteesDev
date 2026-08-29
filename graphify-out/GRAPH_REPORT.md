# Graph Report - MenteesDev  (2026-08-28)

## Corpus Check
- 219 files · ~276,609 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 862 nodes · 1484 edges · 112 communities (51 shown, 61 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `58c56316`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BlogPage.jsx
- Home.jsx
- authController.js
- messageController.js
- devDependencies
- AllCourse.jsx
- backend/index.js
- Carousel.jsx
- App.jsx
- schoolCourseRoutes.js
- postRoutes.js
- useAuth
- CourseList.jsx
- Table.jsx
- courseRoutes.js
- dependencies
- useBlogCategory
- routes/index.js
- backend/package.json
- dependencies
- UserList.jsx
- SEOHead.jsx
- useCRUD
- useLiveCourseAPI
- CourseDetails.jsx
- liveCourseRoutes.js
- dependencies
- SchoolCoding.jsx
- vercel.json
- prerender.js
- BulkMailSender.jsx
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
- useQueryAPI
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
- rules/graphify.md
- workflows/graphify.md
- googleapis
- node-cron
- nodemailer
- socket.io
- turndown
- frontend/README.md
- README.md

## God Nodes (most connected - your core abstractions)
1. `useCRUD()` - 20 edges
2. `Toast()` - 19 edges
3. `useCourse()` - 16 edges
4. `isAdmin()` - 15 edges
5. `useDelete()` - 13 edges
6. `useCategoryAPI()` - 12 edges
7. `useLiveCourseAPI()` - 12 edges
8. `SEOHead()` - 12 edges
9. `ReusableTable()` - 11 edges
10. `useBlog()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/Job/JobManagement.jsx → frontend/src/Components/API/useDelete.js
- `EventManager()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Event/AddEvent.jsx → frontend/src/Components/API/useDelete.js
- `PostList()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Post/PostList.jsx → frontend/src/Components/API/useDelete.js
- `UserList()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/User/UserList.jsx → frontend/src/Components/API/useDelete.js
- `BlogCategoryManager()` --calls--> `useBlogCategory()`  [EXTRACTED]
  frontend/src/Components/Blog/BlogCategoryManger.jsx → frontend/src/api/blogCategoryApi.jsx

## Import Cycles
- None detected.

## Communities (112 total, 61 thin omitted)

### Community 0 - "BlogPage.jsx"
Cohesion: 0.14
Nodes (15): useBlog(), useEvent(), Blog, BlogPage, BlogAuthModal(), BlogGridFour(), BlogPromoSidebar(), UpcomingEvents() (+7 more)

### Community 1 - "Home.jsx"
Cohesion: 0.06
Nodes (33): useCategoryAPI(), useSchoolCodingLeadAPI(), useSchoolCourseAPI(), AddCourseCategory, AddEditSchoolCourse, CourseManagement, CurriculumCatalog, ForgotPassword (+25 more)

### Community 2 - "authController.js"
Cohesion: 0.07
Nodes (36): authUser, client, googleCallback, logoutUser(), registerUser, resendOTP, verifyOTP, compressPDF() (+28 more)

### Community 3 - "messageController.js"
Cohesion: 0.15
Nodes (12): createGroup(), handleJoinRequest(), getList(), getMessages(), sendMessage(), Group, groupSchema, Message (+4 more)

### Community 4 - "devDependencies"
Cohesion: 0.04
Nodes (46): autoprefixer, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, autoprefixer, eslint (+38 more)

### Community 5 - "AllCourse.jsx"
Cohesion: 0.14
Nodes (10): fetchCourseByCategory(), AllCourse, PlacementSupport, CourseCard(), levelColors, CourseSection(), CourseCard(), LoadingSpinner() (+2 more)

### Community 6 - "backend/index.js"
Cohesion: 0.06
Nodes (34): createtest, deletetest, gettestById, gettests, updatetest, app, corsOptions, __dirname (+26 more)

### Community 7 - "Carousel.jsx"
Cohesion: 0.27
Nodes (7): fetchSiteData(), postSiteData(), HomeSite, Carousel(), TYPEWRITER_WORDS, useTypewriter(), HomeSite()

### Community 8 - "App.jsx"
Cohesion: 0.07
Nodes (15): AddEditJob, AdminRoutes, App(), AppInner(), DashboardLayout, Footer, NotFound, ProtectedRoute (+7 more)

### Community 9 - "schoolCourseRoutes.js"
Cohesion: 0.11
Nodes (22): storage, applyForInternship, bulkDeleteInternships, deleteInternship, getInternships, updateInternship, uploadToCloudinary(), createSchoolCourse (+14 more)

### Community 10 - "postRoutes.js"
Cohesion: 0.16
Nodes (15): addComment, bulkDeletePosts, createPost, deleteComment, deletePost, getPost, getPosts, likePost (+7 more)

### Community 11 - "useAuth"
Cohesion: 0.11
Nodes (10): useAuth(), Header, LoginPage, RegisterPage, Register(), menuItems, AuthModal(), LoginPage() (+2 more)

### Community 12 - "CourseList.jsx"
Cohesion: 0.23
Nodes (9): CourseList, InternshipList, JobManagement, LiveCourseList, useDelete(), DeleteConfirmModal(), JobManagement(), LiveCourseList() (+1 more)

### Community 13 - "Table.jsx"
Cohesion: 0.24
Nodes (9): CategoryList, CreateEvent, EventManager, PostList, QueryList, ReusableTable(), Pagination(), EventManager() (+1 more)

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

### Community 20 - "UserList.jsx"
Cohesion: 0.29
Nodes (7): useUserAPI(), AddEditUser, DashboardOverview, UserList, DashboardOverview(), AddEditUser(), UserList()

### Community 21 - "SEOHead.jsx"
Cohesion: 0.16
Nodes (12): About, FAQ, organizationJsonLd, faqData, faqJsonLd, DEFAULT_OG_IMAGE, getSEOForPath(), SEO_ROUTES (+4 more)

### Community 22 - "useCRUD"
Cohesion: 0.29
Nodes (9): api, updateDetails(), useCourse(), useCRUD(), AddCourse, UpdateCourseDetails, AddCourse(), CourseManagement() (+1 more)

### Community 23 - "useLiveCourseAPI"
Cohesion: 0.24
Nodes (7): useLiveCourseAPI(), AddEditLiveCourse, LiveCourseContent, LivePage, AddEditLiveCourse(), LiveCourseContent(), LiveCourse()

### Community 24 - "CourseDetails.jsx"
Cohesion: 0.31
Nodes (7): CourseDetails, LiveCourseDetails, CourseDetails(), LiveCourseDetails(), stripHtml(), useDynamicSEO(), generatePdf()

### Community 25 - "liveCourseRoutes.js"
Cohesion: 0.14
Nodes (18): addLiveCourseContent, createLiveCourse, deleteLiveCourse, deleteLiveCourseContent, getLiveCourseById, getLiveCourses, updateLiveCourse, updateLiveCourseContent (+10 more)

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

### Community 54 - "useQueryAPI"
Cohesion: 0.39
Nodes (5): useQueryAPI(), Contact, QueryForm(), Contact(), QueryList()

## Knowledge Gaps
- **191 isolated node(s):** `client`, `deflate`, `__filename`, `__dirname`, `__filename` (+186 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `axios`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet`, `react-helmet-async`, `react-icons`, `react-markdown`, `@react-oauth/google`, `react-quill`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `@reduxjs/toolkit`, `socket.io-client`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `isAdmin()` connect `routes/index.js` to `authController.js`, `schoolCourseRoutes.js`, `postRoutes.js`, `courseRoutes.js`, `liveCourseRoutes.js`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `client`, `deflate`, `__filename` to the rest of the system?**
  _191 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BlogPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._
- **Should `Home.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06428571428571428 - nodes in this community are weakly interconnected._
- **Should `authController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07058823529411765 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._