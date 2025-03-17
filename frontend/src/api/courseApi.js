import api from "./api";

// 🔹 Fetch a single course by ID (with category)
export const fetchCourse = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
};

export const fetchCourseByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/courses/${categoryId}/category`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
};

// 🔹 Fetch all courses with pagination
export const fetchCourses = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/courses?page=${page}&limit=${limit}`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }

    return {
      courses: response.data.data,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching course list:", error.response?.data?.message || error.message);
    return { courses: [], currentPage: 1, totalPages: 1 }; // Default safe values
  }
};

// 🔹 Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// 🔹 Update an existing course
export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// 🔹 Delete a course
export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};


// 🔹 Update Course Details
export const updateCourseDetails = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}/details`, courseData);
    return response.data
  } catch (error) {
    console.error("Error updating course details:", error);
    throw error;
  }
};

