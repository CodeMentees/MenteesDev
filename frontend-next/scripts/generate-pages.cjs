// Generates all page.jsx files for the Next.js App Router
// Run with: node scripts/generate-pages.cjs

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '..', 'src', 'app');

function writePage(routePath, content) {
  const dir = path.join(APP_DIR, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.jsx'), content, 'utf8');
  console.log('Created:', path.join(routePath, 'page.jsx'));
}

function page(importPath, componentName, isStatic = false) {
  const viewsPath = importPath.replace(/^Pages\//, 'views/');
  const strategy = isStatic ? 'export const revalidate = 3600;' : "export const dynamic = 'force-dynamic';";
  return `import React from 'react';
import ${componentName} from '@/${viewsPath}';

${strategy}

export default function Page() {
  return <${componentName} />;
}
`;
}

// ─── PUBLIC PAGES ────────────────────────────────────────────────────────────
writePage('(public)', page('views/Home', 'Home'));

const publicRoutes = [
  ['(public)/login', 'Login', 'views/Login'],
  ['(public)/register', 'RegisterPage', 'views/Register'],
  ['(public)/verify-otp', 'OTPVerification', 'views/OTPVerification'],
  ['(public)/forgot-password', 'ForgotPassword', 'views/ForgotPassword'],
  ['(public)/about', 'About', 'views/About/About', true],
  ['(public)/contact', 'Contact', 'views/Contact/Contact', true],
  ['(public)/faq', 'FAQ', 'views/FAQ/FAQ', true],
  ['(public)/blogs', 'Blog', 'views/Blog'],
  ['(public)/blogs/[slug]', 'BlogPage', 'views/BlogPage'],
  ['(public)/courses', 'AllCourse', 'views/AllCourse'],
  ['(public)/courses/[courseId]', 'CourseDetails', 'views/CourseDetails'],
  ['(public)/live', 'LivePage', 'views/Live/LiveCourse'],
  ['(public)/live/[id]', 'LiveCourseDetails', 'views/Live/LiveCourseDetails'],
  ['(public)/school-coding', 'SchoolCoding', 'views/SchoolCoding'],
  ['(public)/school-coding/catalog', 'CurriculumCatalog', 'views/CurriculumCatalog'],
  ['(public)/placement-support', 'PlacementSupport', 'views/PlacementSupport'],
  ['(public)/careers', 'Careers', 'views/Careers/Careers', true],
  ['(public)/events', 'EventsPage', 'views/Events'],
  ['(public)/privacy-policy', 'PrivacyPolicy', 'views/Legal/PrivacyPolicy', true],
  ['(public)/terms', 'TermsConditions', 'views/Legal/TermsConditions', true],
  ['(public)/unauthorized', 'Unauth', 'views/Error/Unauth', true],
];

publicRoutes.forEach(([route, name, importPath, isStatic]) => {
  writePage(route, page(importPath, name, isStatic));
});

// ─── ADMIN PAGES ──────────────────────────────────────────────────────────────
writePage('admin', page('views/DashboardOverview', 'DashboardOverview'));

const adminRoutes = [
  ['admin/site-settings', 'HomeSite', 'views/Home/HomeSite'],
  ['admin/posts', 'PostList', 'views/Post/PostList'],
  ['admin/posts/create', 'AddPost', 'views/Post/AddPost'],
  ['admin/posts/edit/[id]', 'AddPost', 'views/Post/AddPost'],
  ['admin/posts/categories', 'BlogCategoryManger', 'views/Post/BlogCategoryManger'],
  ['admin/courses', 'CourseList', 'views/Course/CourseList'],
  ['admin/courses/create', 'CourseManagement', 'views/Course/CourseManagement'],
  ['admin/courses/[id]/manage', 'CourseManagement', 'views/Course/CourseManagement'],
  ['admin/courses/[id]/edit', 'UpdateCourseDetails', 'views/Course/UpdateCourseDetails'],
  ['admin/categories', 'CategoryList', 'views/Course/CategoryList'],
  ['admin/categories/create', 'AddCourseCategory', 'views/Course/AddCourseCategory'],
  ['admin/categories/edit/[id]', 'AddCourseCategory', 'views/Course/AddCourseCategory'],
  ['admin/live-courses', 'LiveCourseList', 'views/Admin/LiveCourse/LiveCourseList'],
  ['admin/live-courses/create', 'AddEditLiveCourse', 'views/Admin/LiveCourse/AddEditLiveCourse'],
  ['admin/live-courses/edit/[id]', 'AddEditLiveCourse', 'views/Admin/LiveCourse/AddEditLiveCourse'],
  ['admin/live-courses/[id]/content', 'LiveCourseContent', 'views/Admin/LiveCourse/LiveCourseContent'],
  ['admin/school-courses', 'SchoolCourseList', 'views/Course/SchoolCourseList'],
  ['admin/school-courses/add', 'AddEditSchoolCourse', 'views/Course/AddEditSchoolCourse'],
  ['admin/school-courses/edit/[id]', 'AddEditSchoolCourse', 'views/Course/AddEditSchoolCourse'],
  ['admin/school-coding-leads', 'SchoolCodingLeadList', 'views/Query/SchoolCodingLeadList'],
  ['admin/users', 'UserList', 'views/User/UserList'],
  ['admin/users/create', 'AddEditUser', 'views/User/AddEditUser'],
  ['admin/users/edit/[id]', 'AddEditUser', 'views/User/AddEditUser'],
  ['admin/queries', 'QueryList', 'views/Query/QueryList'],
  ['admin/jobs', 'JobManagement', 'views/Admin/Job/JobManagement'],
  ['admin/jobs/create', 'AddEditJob', 'views/Admin/Job/AddEditJob'],
  ['admin/jobs/edit/[id]', 'AddEditJob', 'views/Admin/Job/AddEditJob'],
  ['admin/career-applications', 'CareerApplicationsList', 'views/Admin/Careers/CareerApplicationsList'],
  ['admin/careers', 'ManageCareers', 'views/Admin/Careers/ManageCareers'],
  ['admin/social-links', 'SocialLinksSettings', 'views/Admin/SocialLinksSettings'],
  ['admin/bulk-mail', 'BulkMailSender', 'views/Admin/BulkMail/BulkMailSender'],
];

adminRoutes.forEach(([route, name, importPath]) => {
  writePage(route, page(importPath, name));
});

// Named exports for Events
writePage('admin/events', `import React from 'react';
import { EventManager } from '@/views/Event/AddEvent';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <EventManager />;
}
`);

writePage('admin/events/create', `import React from 'react';
import { CreateEvent } from '@/views/Event/AddEvent';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <CreateEvent />;
}
`);

writePage('admin/events/edit/[id]', `import React from 'react';
import { CreateEvent } from '@/views/Event/AddEvent';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <CreateEvent />;
}
`);

// ─── STUDENT PAGES ────────────────────────────────────────────────────────────
writePage('student', page('views/Student/MyCourses', 'MyCourses'));

const studentRoutes = [
  ['student/courses', 'MyCourses', 'views/Student/MyCourses'],
  ['student/live-classes', 'LiveCourse', 'views/Live/LiveCourse'],
  ['student/certificates', 'Certificates', 'views/Student/Certificates'],
  ['student/profile', 'Profile', 'views/Student/Profile'],
];

studentRoutes.forEach(([route, name, importPath]) => {
  writePage(route, page(importPath, name));
});

console.log('All pages generated successfully!');
