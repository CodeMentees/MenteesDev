import api from './api';

const API_URL = '/school-courses';

export const useSchoolCourseAPI = () => {
    const fetchSchoolCourses = async () => {
        const response = await api.get(API_URL);
        return response.data;
    };

    const fetchSchoolCourse = async (id) => {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    };

    const createSchoolCourse = async (courseData) => {
        const isFormData = courseData instanceof FormData;
        const response = await api.post(API_URL, courseData, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
        });
        return response.data;
    };

    const updateSchoolCourse = async (id, courseData) => {
        const isFormData = courseData instanceof FormData;
        const response = await api.put(`${API_URL}/${id}`, courseData, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
        });
        return response.data;
    };

    const deleteSchoolCourse = async (id) => {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    };

    return {
        fetchSchoolCourses,
        fetchSchoolCourse,
        createSchoolCourse,
        updateSchoolCourse,
        deleteSchoolCourse,
    };
};
