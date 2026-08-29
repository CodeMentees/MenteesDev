export const getDefaultPermissions = (role) => {
  switch (role) {
    case "super admin":
      return [
        "manage_site",
        "manage_users",
        "manage_careers",
        "manage_mail",
        "manage_courses",
        "manage_live",
        "manage_chat",
        "manage_content",
        "manage_queries",
      ];
    case "editor":
      return [
        "manage_mail",
        "manage_courses",
        "manage_live",
        "manage_chat",
        "manage_content",
        "manage_queries",
      ];
    case "instructor":
      return [
        "manage_courses",
        "manage_live",
        "manage_chat",
      ];
    case "intern":
      return [
        "manage_courses",
        "manage_live",
        "manage_chat",
        "manage_content",
        "manage_queries",
      ];
    case "student":
    default:
      return [];
  }
};
