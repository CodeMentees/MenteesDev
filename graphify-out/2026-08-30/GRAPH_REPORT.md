# Graph Report - MenteesDev  (2026-08-30)

## Corpus Check
- 225 files · ~278,591 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 877 nodes · 1516 edges · 116 communities (52 shown, 64 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a380e81c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Toast.jsx
- CurriculumCatalog.jsx
- authController.js
- messageController.js
- devDependencies
- useCRUD
- backend/index.js
- Carousel.jsx
- App.jsx
- internshipRoutes.js
- postRoutes.js
- useAuth
- Table.jsx
- rbacMiddleware.js
- courseRoutes.js
- dependencies
- useBlogCategory
- blogCategoryRoutes.js
- backend/package.json
- dependencies
- eventRoutes.js
- Home.jsx
- jobRoutes.js
- queryRoutes.js
- routes/index.js
- liveCourseRoutes.js
- dependencies
- visitorController.js
- vercel.json
- prerender.js
- store.js
- CardContainer.jsx
- test_swagger.js
- refactorApp.cjs
- constants.js
- Dashboard.jsx
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
- StudentDashboard.jsx
- Header.jsx
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
- AdminRoute.jsx
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
4. `requirePermission()` - 15 edges
5. `useDelete()` - 13 edges
6. `useCategoryAPI()` - 12 edges
7. `useLiveCourseAPI()` - 12 edges
8. `SEOHead()` - 12 edges
9. `ReusableTable()` - 11 edges
10. `User` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `useCategoryAPI()`  [EXTRACTED]
  frontend/src/Pages/Home.jsx → frontend/src/api/categoryApi.jsx
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/Job/JobManagement.jsx → frontend/src/Components/API/useDelete.js
- `PostList()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Post/PostList.jsx → frontend/src/Components/API/useDelete.js
- `BlogCategoryManager()` --calls--> `useBlogCategory()`  [EXTRACTED]
  frontend/src/Components/Blog/BlogCategoryManger.jsx → frontend/src/api/blogCategoryApi.jsx
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  frontend/src/Components/UI/AuthModal.jsx → frontend/src/api/authApi.jsx

## Import Cycles
- None detected.

## Communities (116 total, 64 thin omitted)

### Community 0 - "Toast.jsx"
Cohesion: 0.20
Nodes (8): useSchoolCodingLeadAPI(), ForgotPassword, OTPVerification, SchoolCodingLeadList, SchoolCodingQueryForm(), Toast(), STEPS, SchoolCodingLeadList()

### Community 1 - "CurriculumCatalog.jsx"
Cohesion: 0.24
Nodes (11): useSchoolCourseAPI(), AddEditSchoolCourse, CurriculumCatalog, SchoolCourseList, AddEditSchoolCourse(), SchoolCourseList(), CurriculumCatalog(), FALLBACK_IMAGE_URL (+3 more)

### Community 2 - "authController.js"
Cohesion: 0.07
Nodes (37): authUser, client, googleCallback, logoutUser(), registerUser, resendOTP, verifyOTP, compressPDF() (+29 more)

### Community 3 - "messageController.js"
Cohesion: 0.16
Nodes (11): createGroup(), handleJoinRequest(), getList(), getMessages(), sendMessage(), Group, groupSchema, Message (+3 more)

### Community 4 - "devDependencies"
Cohesion: 0.04
Nodes (46): autoprefixer, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, autoprefixer, eslint (+38 more)

### Community 5 - "useCRUD"
Cohesion: 0.07
Nodes (32): api, useCategoryAPI(), fetchCourseByCategory(), updateDetails(), useCourse(), useLiveCourseAPI(), useCRUD(), AddCourse (+24 more)

### Community 6 - "backend/index.js"
Cohesion: 0.06
Nodes (34): createtest, deletetest, gettestById, gettests, updatetest, app, corsOptions, __dirname (+26 more)

### Community 7 - "Carousel.jsx"
Cohesion: 0.27
Nodes (7): fetchSiteData(), postSiteData(), HomeSite, Carousel(), TYPEWRITER_WORDS, useTypewriter(), HomeSite()

### Community 8 - "App.jsx"
Cohesion: 0.07
Nodes (14): AddEditJob, AppInner(), BulkMailSender, NotFound, ProtectedRoute, SchoolCoding, StudentRoute, SummerInternship (+6 more)

### Community 9 - "internshipRoutes.js"
Cohesion: 0.29
Nodes (9): applyForInternship, bulkDeleteInternships, deleteInternship, getInternships, updateInternship, uploadToCloudinary(), InternshipApplication, internshipApplicationSchema (+1 more)

### Community 10 - "postRoutes.js"
Cohesion: 0.16
Nodes (15): addComment, bulkDeletePosts, createPost, deleteComment, deletePost, getPost, getPosts, likePost (+7 more)

### Community 11 - "useAuth"
Cohesion: 0.23
Nodes (7): useAuth(), LoginPage, RegisterPage, Register(), AuthModal(), LoginPage(), authSlice

### Community 12 - "Table.jsx"
Cohesion: 0.08
Nodes (32): useEvent(), useQueryAPI(), useUserAPI(), AddEditUser, Contact, CourseList, CreateEvent, DashboardOverview (+24 more)

### Community 13 - "rbacMiddleware.js"
Cohesion: 0.24
Nodes (6): requirePermission(), Home, homeSchema, router, upload, router

### Community 14 - "courseRoutes.js"
Cohesion: 0.06
Nodes (39): storage, createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, bulkDeleteCourses, createCourse (+31 more)

### Community 15 - "dependencies"
Cohesion: 0.15
Nodes (13): autonodeapi, dependencies, autonodeapi, cloudinary, express, nodemon, passport, swagger-jsdoc (+5 more)

### Community 16 - "useBlogCategory"
Cohesion: 0.27
Nodes (7): useBlogCategory(), AddPost, BlogCategoryManager, BlogCategoryManager(), BlogSidebar(), RichTextEditor(), AddPost()

### Community 17 - "blogCategoryRoutes.js"
Cohesion: 0.36
Nodes (7): createCategory, deleteCategory, getCategories, getCategory, updateCategory, BlogCategory, blogCategorySchema

### Community 18 - "backend/package.json"
Cohesion: 0.18
Nodes (10): author, description, license, main, name, scripts, dev, test (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.22
Nodes (8): dependencies, googleapis, nodemailer, vercel, googleapis, nodemailer, vercel, type

### Community 20 - "eventRoutes.js"
Cohesion: 0.36
Nodes (7): addEvent, deleteEvent, getAllEvents, getEvent, updateEvent, Event, eventSchema

### Community 21 - "Home.jsx"
Cohesion: 0.06
Nodes (41): useBlog(), About, Blog, BlogPage, CourseDetails, FAQ, Home, LiveCourseDetails (+33 more)

### Community 22 - "jobRoutes.js"
Cohesion: 0.36
Nodes (7): bulkDeleteJobs, createJob, deleteJob, getJobs, updateJob, JobOpportunity, jobOpportunitySchema

### Community 23 - "queryRoutes.js"
Cohesion: 0.36
Nodes (7): createQuery, deleteQuery, getQueries, getQuery, updateQuery, Query, querySchema

### Community 24 - "routes/index.js"
Cohesion: 0.20
Nodes (9): router, router, router, router, router, router, router, router (+1 more)

### Community 25 - "liveCourseRoutes.js"
Cohesion: 0.25
Nodes (11): addLiveCourseContent, createLiveCourse, deleteLiveCourse, deleteLiveCourseContent, getLiveCourseById, getLiveCourses, updateLiveCourse, updateLiveCourseContent (+3 more)

### Community 26 - "dependencies"
Cohesion: 0.22
Nodes (9): aos, dependencies, aos, recharts, rehype-raw, remark-gfm, recharts, rehype-raw (+1 more)

### Community 27 - "visitorController.js"
Cohesion: 0.36
Nodes (5): getVisitorStats, trackVisitor, Visitor, visitorSchema, router

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
- **193 isolated node(s):** `client`, `deflate`, `__filename`, `__dirname`, `__filename` (+188 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **64 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `axios`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet`, `react-helmet-async`, `react-icons`, `react-markdown`, `@react-oauth/google`, `react-quill`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `@reduxjs/toolkit`, `socket.io-client`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `rbacMiddleware.js` to `authController.js`, `internshipRoutes.js`, `postRoutes.js`, `courseRoutes.js`, `blogCategoryRoutes.js`, `eventRoutes.js`, `jobRoutes.js`, `queryRoutes.js`, `liveCourseRoutes.js`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `client`, `deflate`, `__filename` to the rest of the system?**
  _193 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `authController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07058001397624039 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `useCRUD` be split into smaller, more focused modules?**
  _Cohesion score 0.06829573934837092 - nodes in this community are weakly interconnected._
- **Should `backend/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05673758865248227 - nodes in this community are weakly interconnected._