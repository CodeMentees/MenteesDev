# Graph Report - MenteesDev  (2026-08-28)

## Corpus Check
- 219 files · ~437,950 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 855 nodes · 1475 edges · 120 communities (58 shown, 62 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `26db8c05`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BlogPage.jsx
- Toast.jsx
- authController.js
- messageController.js
- devDependencies
- useCRUD
- backend/index.js
- Home.jsx
- App.jsx
- schoolCourseRoutes.js
- postRoutes.js
- queryRoutes.js
- Table.jsx
- AddEvent.jsx
- courseRoutes.js
- dependencies
- useBlogCategory
- routes/index.js
- backend/package.json
- dependencies
- UserList.jsx
- blogCategoryRoutes.js
- categoryRoutes.js
- eventRoutes.js
- jobRoutes.js
- liveCourseRoutes.js
- dependencies
- visitorController.js
- vercel.json
- prerender.js
- BulkMailSender.jsx
- CardContainer.jsx
- test_swagger.js
- refactorApp.cjs
- constants.js
- schoolCodingLeadRoutes.js
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
- Dashboard.jsx
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
- SummerInternship.jsx
- rules/graphify.md
- workflows/graphify.md
- googleapis
- node-cron
- nodemailer
- socket.io
- turndown
- frontend/README.md
- README.md
- internshipRoutes.js
- testController.js
- swagger.js
- test_hang.js
- ipBlockMiddleware.js

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
- `WorkshopSection()` --calls--> `useEvent()`  [EXTRACTED]
  frontend/src/Components/WorkshopSection/WorkshopSection.jsx → frontend/src/api/eventApi.jsx
- `Home()` --calls--> `useCategoryAPI()`  [EXTRACTED]
  frontend/src/Pages/Home.jsx → frontend/src/api/categoryApi.jsx
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/Job/JobManagement.jsx → frontend/src/Components/API/useDelete.js
- `EventManager()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Event/AddEvent.jsx → frontend/src/Components/API/useDelete.js
- `UserList()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/User/UserList.jsx → frontend/src/Components/API/useDelete.js

## Import Cycles
- None detected.

## Communities (120 total, 62 thin omitted)

### Community 0 - "BlogPage.jsx"
Cohesion: 0.07
Nodes (32): useBlog(), About, Blog, BlogPage, CourseDetails, FAQ, LiveCourseDetails, PlacementSupport (+24 more)

### Community 1 - "Toast.jsx"
Cohesion: 0.07
Nodes (27): useAuth(), useSchoolCodingLeadAPI(), useSchoolCourseAPI(), AddEditSchoolCourse, CurriculumCatalog, ForgotPassword, Header, LoginPage (+19 more)

### Community 2 - "authController.js"
Cohesion: 0.07
Nodes (36): authUser, client, googleCallback, logoutUser(), registerUser, resendOTP, verifyOTP, compressPDF() (+28 more)

### Community 3 - "messageController.js"
Cohesion: 0.15
Nodes (12): createGroup(), handleJoinRequest(), getList(), getMessages(), sendMessage(), Group, groupSchema, Message (+4 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (42): autoprefixer, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, autoprefixer, eslint (+34 more)

### Community 5 - "useCRUD"
Cohesion: 0.07
Nodes (30): api, useCategoryAPI(), fetchCourseByCategory(), updateDetails(), useCourse(), useLiveCourseAPI(), useCRUD(), AddCourse (+22 more)

### Community 6 - "backend/index.js"
Cohesion: 0.18
Nodes (9): app, corsOptions, __dirname, __filename, frontendDistPath, PRE_RENDERED_ROUTES, errorHandler(), notFound() (+1 more)

### Community 7 - "Home.jsx"
Cohesion: 0.09
Nodes (17): fetchSiteData(), postSiteData(), Home, HomeSite, Carousel(), TYPEWRITER_WORDS, useTypewriter(), featuresData (+9 more)

### Community 8 - "App.jsx"
Cohesion: 0.08
Nodes (15): AddEditJob, AdminRoutes, App(), AppInner(), Footer, InternshipList, JobManagement, NotFound (+7 more)

### Community 9 - "schoolCourseRoutes.js"
Cohesion: 0.21
Nodes (11): storage, createSchoolCourse, deleteSchoolCourse, getSchoolCourseById, getSchoolCourses, updateSchoolCourse, SchoolCourse, schoolCourseSchema (+3 more)

### Community 10 - "postRoutes.js"
Cohesion: 0.16
Nodes (15): addComment, bulkDeletePosts, createPost, deleteComment, deletePost, getPost, getPosts, likePost (+7 more)

### Community 11 - "queryRoutes.js"
Cohesion: 0.31
Nodes (8): createQuery, deleteQuery, getQueries, getQuery, updateQuery, Query, querySchema, router

### Community 12 - "Table.jsx"
Cohesion: 0.19
Nodes (13): CategoryList, CourseList, LiveCourseList, PostList, QueryList, useDelete(), ReusableTable(), DeleteConfirmModal() (+5 more)

### Community 13 - "AddEvent.jsx"
Cohesion: 0.36
Nodes (6): useEvent(), CreateEvent, EventManager, UpcomingEvents(), CreateEvent(), EventManager()

### Community 14 - "courseRoutes.js"
Cohesion: 0.25
Nodes (11): bulkDeleteCourses, createCourse, deleteCourse, getCourse, getCourses, getCoursesByCategory, updateCourse, updateCourseDetails (+3 more)

### Community 15 - "dependencies"
Cohesion: 0.15
Nodes (13): autonodeapi, dependencies, autonodeapi, cloudinary, express, nodemon, passport, swagger-jsdoc (+5 more)

### Community 16 - "useBlogCategory"
Cohesion: 0.27
Nodes (7): useBlogCategory(), AddPost, BlogCategoryManager, BlogCategoryManager(), BlogSidebar(), RichTextEditor(), AddPost()

### Community 17 - "routes/index.js"
Cohesion: 0.13
Nodes (14): isAdmin(), Home, homeSchema, authRouter, router, upload, router, router (+6 more)

### Community 18 - "backend/package.json"
Cohesion: 0.18
Nodes (10): author, description, license, main, name, scripts, dev, test (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.22
Nodes (8): dependencies, googleapis, nodemailer, vercel, googleapis, nodemailer, vercel, type

### Community 20 - "UserList.jsx"
Cohesion: 0.29
Nodes (7): useUserAPI(), AddEditUser, DashboardOverview, UserList, DashboardOverview(), AddEditUser(), UserList()

### Community 21 - "blogCategoryRoutes.js"
Cohesion: 0.31
Nodes (8): createCategory, deleteCategory, getCategories, getCategory, updateCategory, BlogCategory, blogCategorySchema, router

### Community 22 - "categoryRoutes.js"
Cohesion: 0.36
Nodes (7): createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, CourseCategory, courseCategorySchema

### Community 23 - "eventRoutes.js"
Cohesion: 0.36
Nodes (7): addEvent, deleteEvent, getAllEvents, getEvent, updateEvent, Event, eventSchema

### Community 24 - "jobRoutes.js"
Cohesion: 0.31
Nodes (8): bulkDeleteJobs, createJob, deleteJob, getJobs, updateJob, JobOpportunity, jobOpportunitySchema, router

### Community 25 - "liveCourseRoutes.js"
Cohesion: 0.28
Nodes (10): addLiveCourseContent, createLiveCourse, deleteLiveCourse, deleteLiveCourseContent, getLiveCourseById, getLiveCourses, updateLiveCourse, updateLiveCourseContent (+2 more)

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
Cohesion: 0.40
Nodes (3): __dirname, distDir, routesToPrerender

### Community 35 - "schoolCodingLeadRoutes.js"
Cohesion: 0.26
Nodes (8): createLead, deleteLead, getLeads, updateLeadStatus, isAuthenticated(), SchoolCodingLead, schoolCodingLeadSchema, router

### Community 46 - "CodeMentees SEO System — Developer Guide"
Cohesion: 0.18
Nodes (10): Adding a Custom OG Image, Adding SEO to a New Page (2 Steps), Admin / Utility Pages (noindex), All `SEOHead` Props Reference, CodeMentees SEO System — Developer Guide, Dynamic Pages (Content from API), How the Pre-Rendering Works, SEO Checklist for Every New Page (+2 more)

### Community 54 - "useQueryAPI"
Cohesion: 0.39
Nodes (5): useQueryAPI(), Contact, QueryForm(), Contact(), QueryList()

### Community 115 - "internshipRoutes.js"
Cohesion: 0.29
Nodes (9): applyForInternship, bulkDeleteInternships, deleteInternship, getInternships, updateInternship, uploadToCloudinary(), InternshipApplication, internshipApplicationSchema (+1 more)

### Community 116 - "testController.js"
Cohesion: 0.29
Nodes (8): createtest, deletetest, gettestById, gettests, updatetest, test, testSchema, router

### Community 117 - "swagger.js"
Cohesion: 0.32
Nodes (6): options, router, schemas, specs, generateSwaggerSchema(), mapMongooseTypeToSwaggerType()

### Community 118 - "test_hang.js"
Cohesion: 0.25
Nodes (7): app, corsOptions, __dirname, __filename, frontendDistPath, PRE_RENDERED_ROUTES, server

### Community 119 - "ipBlockMiddleware.js"
Cohesion: 0.33
Nodes (4): BlockedIp, blockedIpSchema, ipBlockMiddleware, limiter

## Knowledge Gaps
- **189 isolated node(s):** `client`, `deflate`, `__filename`, `__dirname`, `__filename` (+184 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **62 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `axios`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet`, `react-helmet-async`, `react-icons`, `react-markdown`, `@react-oauth/google`, `react-quill`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `@reduxjs/toolkit`, `socket.io-client`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `isAdmin()` connect `routes/index.js` to `authController.js`, `schoolCodingLeadRoutes.js`, `schoolCourseRoutes.js`, `postRoutes.js`, `queryRoutes.js`, `courseRoutes.js`, `internshipRoutes.js`, `blogCategoryRoutes.js`, `categoryRoutes.js`, `eventRoutes.js`, `jobRoutes.js`, `liveCourseRoutes.js`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `client`, `deflate`, `__filename` to the rest of the system?**
  _189 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BlogPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07272727272727272 - nodes in this community are weakly interconnected._
- **Should `Toast.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07428571428571429 - nodes in this community are weakly interconnected._
- **Should `authController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07058823529411765 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._