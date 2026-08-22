import api from './api';

// Enroll in a course
export const enrollInCourse = async (courseId) => {
  try {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to enroll');
  }
};

// Get user enrollments
export const getUserEnrollments = async () => {
  try {
    const response = await api.get('/courses/student/enrollments');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch enrollments');
  }
};
