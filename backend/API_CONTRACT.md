# API_CONTRACT.md

| Module | Method | Path | Auth required? | Request body/params shape | Response shape (success) | Response shape (error) | Frontend Usage |
| ------ | ------ | ---- | -------------- | ------------------------- | ------------------------ | ---------------------- | -------------- |
| User | POST | `/api/users/register` | Check Route | JSON Body | User registered successfully | 400 Error | Unknown |
| User | POST | `/api/users/login` | Check Route | JSON Body | User authenticated successfully | 404 Error | Unknown |
| User | GET | `/api/users/google/callback` | Check Route | None | Google callback successful | N/A | Unknown |
| User | POST | `/api/users/logout` | Check Route | None | Logged out successfully | N/A | Unknown |
| BlogCategory | GET | `/api/blog-categories` | Check Route | None | Categories fetched successfully | N/A | Unknown |
| BlogCategory | POST | `/api/blog-categories` | Check Route | JSON Body | Category created successfully | N/A | Unknown |
| BlogCategory | GET | `/api/blog-categories/{id}` | Check Route | Params: id | Category fetched successfully | 404 Error | Unknown |
| BlogCategory | PUT | `/api/blog-categories/{id}` | Check Route | JSON Body + Params: id | Category updated successfully | 404 Error | Unknown |
| BlogCategory | DELETE | `/api/blog-categories/{id}` | Check Route | Params: id | Category deleted successfully | 404 Error | Unknown |
| CourseCategory | POST | `/api/course-categories` | Check Route | JSON Body | Category created successfully | 400 Error | Unknown |
| CourseCategory | GET | `/api/course-categories` | Check Route | None | A list of categories | N/A | Unknown |
| CourseCategory | GET | `/api/course-categories/{id}` | Check Route | Params: id | Category found | 404 Error | Unknown |
| CourseCategory | PUT | `/api/course-categories/{id}` | Check Route | JSON Body + Params: id | Category updated successfully | 404 Error | Unknown |
| CourseCategory | DELETE | `/api/course-categories/{id}` | Check Route | Params: id | Category deleted successfully | 404 Error | Unknown |
| Course | POST | `/api/courses` | Check Route | JSON Body | Course created successfully | 400 Error | Unknown |
| Course | GET | `/api/courses` | Check Route | Params: page, limit | Courses fetched successfully | N/A | Unknown |
| Course | GET | `/api/courses/{id}` | Check Route | Params: id | Course fetched successfully | 404 Error | Unknown |
| Course | PUT | `/api/courses/{id}` | Check Route | JSON Body + Params: id | Course updated successfully | 404 Error | Unknown |
| Course | DELETE | `/api/courses/{id}` | Check Route | Params: id | Course deleted successfully | 404 Error | Unknown |
| Course | PUT | `/api/courses/{courseId}/details` | Check Route | JSON Body + Params: courseId | Course details updated successfully | 404 Error | Unknown |
| Course | GET | `/api/courses/category/{categoryId}` | Check Route | Params: categoryId | Courses fetched successfully | N/A | Unknown |
| Event | POST | `/api/events` | Check Route | JSON Body | Event added successfully | 400 Error | Unknown |
| Event | GET | `/api/events` | Check Route | Params: page, limit | Events fetched successfully | N/A | Unknown |
| Event | GET | `/api/events/{id}` | Check Route | Params: id | Event fetched successfully | 404 Error | Unknown |
| Event | PUT | `/api/events/{id}` | Check Route | JSON Body + Params: id | Event updated successfully | 404 Error | Unknown |
| Event | DELETE | `/api/events/{id}` | Check Route | Params: id | Event deleted successfully | 404 Error | Unknown |
| Event | GET | `/api/events/gallery` | Check Route | None | Images fetched successfully | N/A | Unknown |
| Group | POST | `/api/groups/join-request` | Check Route | JSON Body | Request handled successfully | 404 Error | Unknown |
| Group | POST | `/api/groups` | Check Route | JSON Body | Group created successfully | 500 Error | Unknown |
| Messages | GET | `/api/groups` | Check Route | None | List of groups retrieved successfully | 500 Error | Unknown |
| Group | POST | `/api/groups/add-admin` | Check Route | JSON Body | Admin added successfully | 404 Error | Unknown |
| Group | POST | `/api/groups/remove-admin` | Check Route | JSON Body | Admin removed successfully | 404 Error | Unknown |
| Internships | POST | `/api/internships/apply` | Check Route | None | N/A | N/A | Unknown |
| Internships | GET | `/api/internships` | Check Route | None | N/A | N/A | Unknown |
| Internships | PUT | `/api/internships/{id}` | Check Route | None | N/A | N/A | Unknown |
| Internships | DELETE | `/api/internships/{id}` | Check Route | None | N/A | N/A | Unknown |
| Internships | POST | `/api/internships/bulk` | Check Route | None | N/A | N/A | Unknown |
| Job | POST | `/api/jobs` | Yes | JSON Body | Job created successfully | N/A | Unknown |
| Job | GET | `/api/jobs` | Check Route | None | Jobs fetched successfully | N/A | Unknown |
| Job | PUT | `/api/jobs/{id}` | Check Route | Params: id | Job updated successfully | N/A | Unknown |
| Job | DELETE | `/api/jobs/{id}` | Check Route | Params: id | Job deleted successfully | N/A | Unknown |
| Job | POST | `/api/jobs/bulk` | Check Route | None | Jobs deleted successfully | N/A | Unknown |
| Messages | POST | `/api/messages` | Check Route | JSON Body | Message sent successfully | 400 Error | Unknown |
| Messages | GET | `/api/messages/{groupId}` | Check Route | Params: groupId, page | Messages retrieved successfully | 500 Error | Unknown |
| Posts | POST | `/api/posts` | Check Route | JSON Body | Post created successfully | 400 Error | Unknown |
| Posts | GET | `/api/posts` | Check Route | Params: page, limit | Posts fetched successfully | N/A | Unknown |
| Posts | DELETE | `/api/posts/{id}` | Check Route | Params: id | Post removed successfully | 404 Error | Unknown |
| Posts | GET | `/api/posts/{id}` | Check Route | Params: id | Post fetched successfully | 404 Error | Unknown |
| Posts | PUT | `/api/posts/{id}` | Check Route | JSON Body + Params: id | Post updated successfully | 404 Error | Unknown |
| Queries | POST | `/api/queries` | Check Route | JSON Body | Query created successfully | 400 Error | Unknown |
| Queries | GET | `/api/queries` | Check Route | Params: page, limit | Queries retrieved successfully | N/A | Unknown |
| Queries | DELETE | `/api/queries/{id}` | Check Route | Params: id | Query removed successfully | 404 Error | Unknown |
| Queries | GET | `/api/queries/{id}` | Check Route | Params: id | Query retrieved successfully | 404 Error | Unknown |
| Queries | PUT | `/api/queries/{id}` | Check Route | JSON Body + Params: id | Query updated successfully | 404 Error | Unknown |
| test | GET | `/api/test` | Check Route | Params: page, limit | List of tests | N/A | Unknown |
| test | POST | `/api/test` | Check Route | JSON Body | Created test | N/A | Unknown |
| test | GET | `/api/test/{id}` | Check Route | Params: id | A test object | 404 Error | Unknown |
| test | PUT | `/api/test/{id}` | Check Route | JSON Body + Params: id | Updated test | 404 Error | Unknown |
| test | DELETE | `/api/test/{id}` | Check Route | Params: id | test deleted successfully | 404 Error | Unknown |
| Unknown | POST | `/api/users` | Check Route | None | N/A | N/A | Unknown |
| Unknown | GET | `/api/users` | Check Route | None | N/A | N/A | Unknown |
| Unknown | DELETE | `/api/users/{id}` | Check Route | None | N/A | N/A | Unknown |
| Unknown | GET | `/api/users/{id}` | Check Route | None | N/A | N/A | Unknown |
| Unknown | PUT | `/api/users/{id}` | Check Route | None | N/A | N/A | Unknown |
| Users | POST | `/api/users/bulk` | Check Route | None | N/A | N/A | Unknown |
| Users | GET | `/api/users/growth` | Check Route | None | N/A | N/A | Unknown |
| Users | POST | `/api/users/interns/reset-password` | Check Route | None | N/A | N/A | Unknown |
