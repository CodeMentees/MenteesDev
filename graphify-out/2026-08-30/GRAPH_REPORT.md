# Graph Report - MenteesDev  (2026-08-30)

## Corpus Check
- 227 files · ~279,218 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 882 nodes · 1529 edges · 122 communities (57 shown, 65 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d800cc6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useCRUD
- Toast.jsx
- authController.js
- liveCourseRoutes.js
- devDependencies
- Home.jsx
- backend/index.js
- Carousel.jsx
- App.jsx
- internshipRoutes.js
- postRoutes.js
- BlogPage.jsx
- Table.jsx
- rbacMiddleware.js
- courseRoutes.js
- dependencies
- useBlogCategory
- blogCategoryRoutes.js
- backend/package.json
- dependencies
- eventRoutes.js
- SEOHead.jsx
- jobRoutes.js
- queryRoutes.js
- routes/index.js
- LoadingSpinner.jsx
- dependencies
- visitorController.js
- vercel.json
- prerender.js
- CourseDetails.jsx
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
- schoolCodingLeadRoutes.js
- googleapis
- node-cron
- nodemailer
- socket.io
- turndown
- frontend/README.md
- README.md
- isAdmin.js
- useEvent
- useUserAPI
- useQueryAPI
- AddEvent.jsx
- BulkMailSender.jsx
- SummerInternship.jsx

## God Nodes (most connected - your core abstractions)
1. `useCRUD()` - 20 edges
2. `Toast()` - 19 edges
3. `requirePermission()` - 16 edges
4. `useCourse()` - 16 edges
5. `useDelete()` - 13 edges
6. `User` - 12 edges
7. `useCategoryAPI()` - 12 edges
8. `useLiveCourseAPI()` - 12 edges
9. `SEOHead()` - 12 edges
10. `ReusableTable()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `CreateEvent()` --calls--> `useEvent()`  [EXTRACTED]
  frontend/src/Pages/Event/AddEvent.jsx → frontend/src/api/eventApi.jsx
- `QueryList()` --calls--> `useQueryAPI()`  [EXTRACTED]
  frontend/src/Pages/Query/QueryList.jsx → frontend/src/api/queryApi.jsx
- `JobManagement()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/Job/JobManagement.jsx → frontend/src/Components/API/useDelete.js
- `LiveCourseList()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Admin/LiveCourse/LiveCourseList.jsx → frontend/src/Components/API/useDelete.js
- `EventManager()` --calls--> `useDelete()`  [EXTRACTED]
  frontend/src/Pages/Event/AddEvent.jsx → frontend/src/Components/API/useDelete.js

## Import Cycles
- None detected.

## Communities (122 total, 65 thin omitted)

### Community 0 - "useCRUD"
Cohesion: 0.21
Nodes (10): api, useLiveCourseAPI(), useCRUD(), AddEditLiveCourse, LiveCourseContent, LivePage, AddEditLiveCourse(), LiveCourseContent() (+2 more)

### Community 1 - "Toast.jsx"
Cohesion: 0.09
Nodes (26): useAuth(), useSchoolCodingLeadAPI(), useSchoolCourseAPI(), AddEditSchoolCourse, CurriculumCatalog, ForgotPassword, LoginPage, OTPVerification (+18 more)

### Community 2 - "authController.js"
Cohesion: 0.06
Nodes (40): authUser, client, googleCallback, logoutUser(), registerUser, resendOTP, verifyOTP, compressPDF() (+32 more)

### Community 3 - "liveCourseRoutes.js"
Cohesion: 0.09
Nodes (24): createGroup(), handleJoinRequest(), addLiveCourseContent, createLiveCourse, deleteLiveCourse, deleteLiveCourseContent, getLiveCourseById, getLiveCourses (+16 more)

### Community 4 - "devDependencies"
Cohesion: 0.04
Nodes (46): autoprefixer, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, autoprefixer, eslint (+38 more)

### Community 5 - "Home.jsx"
Cohesion: 0.07
Nodes (30): useCategoryAPI(), fetchCourseByCategory(), updateDetails(), useCourse(), AddCourse, AddCourseCategory, AllCourse, CategoryList (+22 more)

### Community 6 - "backend/index.js"
Cohesion: 0.06
Nodes (34): createtest, deletetest, gettestById, gettests, updatetest, app, corsOptions, __dirname (+26 more)

### Community 7 - "Carousel.jsx"
Cohesion: 0.27
Nodes (7): fetchSiteData(), postSiteData(), HomeSite, Carousel(), TYPEWRITER_WORDS, useTypewriter(), HomeSite()

### Community 8 - "App.jsx"
Cohesion: 0.08
Nodes (13): AddEditJob, AdminRoutes, App(), AppInner(), NotFound, ProtectedRoute, SchoolCoding, StudentRoute (+5 more)

### Community 9 - "internshipRoutes.js"
Cohesion: 0.26
Nodes (10): applyForInternship, bulkDeleteInternships, deleteInternship, getInternships, updateInternship, uploadToCloudinary(), InternshipApplication, internshipApplicationSchema (+2 more)

### Community 10 - "postRoutes.js"
Cohesion: 0.15
Nodes (16): addComment, bulkDeletePosts, createPost, deleteComment, deletePost, getPost, getPosts, likePost (+8 more)

### Community 11 - "BlogPage.jsx"
Cohesion: 0.25
Nodes (10): useBlog(), Blog, BlogPage, BlogAuthModal(), BlogGridFour(), BlogPromoSidebar(), Loading(), Blog() (+2 more)

### Community 12 - "Table.jsx"
Cohesion: 0.17
Nodes (16): CourseList, InternshipList, JobManagement, LiveCourseList, PostList, QueryList, UserList, useDelete() (+8 more)

### Community 13 - "rbacMiddleware.js"
Cohesion: 0.40
Nodes (3): requirePermission(), router, upload

### Community 14 - "courseRoutes.js"
Cohesion: 0.08
Nodes (31): storage, createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, bulkDeleteCourses, createCourse (+23 more)

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

### Community 21 - "SEOHead.jsx"
Cohesion: 0.16
Nodes (12): About, FAQ, organizationJsonLd, faqData, faqJsonLd, DEFAULT_OG_IMAGE, getSEOForPath(), SEO_ROUTES (+4 more)

### Community 22 - "jobRoutes.js"
Cohesion: 0.36
Nodes (7): bulkDeleteJobs, createJob, deleteJob, getJobs, updateJob, JobOpportunity, jobOpportunitySchema

### Community 23 - "queryRoutes.js"
Cohesion: 0.36
Nodes (7): createQuery, deleteQuery, getQueries, getQuery, updateQuery, Query, querySchema

### Community 24 - "routes/index.js"
Cohesion: 0.22
Nodes (8): Home, homeSchema, router, router, router, router, router, router

### Community 25 - "LoadingSpinner.jsx"
Cohesion: 0.20
Nodes (4): MyCourses, PlacementSupport, LoadingSpinner(), SkeletonGrid()

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

### Community 30 - "CourseDetails.jsx"
Cohesion: 0.31
Nodes (7): CourseDetails, LiveCourseDetails, CourseDetails(), LiveCourseDetails(), stripHtml(), useDynamicSEO(), generatePdf()

### Community 46 - "CodeMentees SEO System — Developer Guide"
Cohesion: 0.18
Nodes (10): Adding a Custom OG Image, Adding SEO to a New Page (2 Steps), Admin / Utility Pages (noindex), All `SEOHead` Props Reference, CodeMentees SEO System — Developer Guide, Dynamic Pages (Content from API), How the Pre-Rendering Works, SEO Checklist for Every New Page (+2 more)

### Community 107 - "schoolCodingLeadRoutes.js"
Cohesion: 0.31
Nodes (7): createLead, deleteLead, getLeads, updateLeadStatus, SchoolCodingLead, schoolCodingLeadSchema, router

### Community 116 - "useEvent"
Cohesion: 0.36
Nodes (4): useEvent(), UpcomingEvents(), WorkshopCard(), WorkshopSection()

### Community 117 - "useUserAPI"
Cohesion: 0.39
Nodes (5): useUserAPI(), AddEditUser, DashboardOverview, DashboardOverview(), AddEditUser()

### Community 118 - "useQueryAPI"
Cohesion: 0.48
Nodes (4): useQueryAPI(), Contact, QueryForm(), Contact()

### Community 119 - "AddEvent.jsx"
Cohesion: 0.40
Nodes (4): CreateEvent, EventManager, CreateEvent(), EventManager()

## Knowledge Gaps
- **196 isolated node(s):** `client`, `deflate`, `__filename`, `__dirname`, `__filename` (+191 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `easymde`, `flowbite`, `framer-motion`, `axios`, `highlight.js`, `jspdf`, `jspdf-autotable`, `lucide-react`, `react`, `react-dom`, `react-helmet`, `react-helmet-async`, `react-icons`, `react-markdown`, `@react-oauth/google`, `react-quill`, `react-redux`, `react-router-dom`, `react-simplemde-editor`, `react-syntax-highlighter`, `@reduxjs/toolkit`, `socket.io-client`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `rbacMiddleware.js` to `authController.js`, `liveCourseRoutes.js`, `internshipRoutes.js`, `postRoutes.js`, `schoolCodingLeadRoutes.js`, `courseRoutes.js`, `blogCategoryRoutes.js`, `eventRoutes.js`, `jobRoutes.js`, `queryRoutes.js`, `routes/index.js`, `visitorController.js`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `client`, `deflate`, `__filename` to the rest of the system?**
  _196 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Toast.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0851063829787234 - nodes in this community are weakly interconnected._
- **Should `authController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06428988895382817 - nodes in this community are weakly interconnected._
- **Should `liveCourseRoutes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09246088193456614 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._