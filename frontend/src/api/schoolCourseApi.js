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
        const response = await api.post(API_URL, courseData);
        return response.data;
    };

    const updateSchoolCourse = async (id, courseData) => {
        const response = await api.put(`${API_URL}/${id}`, courseData);
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
