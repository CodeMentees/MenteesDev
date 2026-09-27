'use client';

import api from './api';

/**
 * useCourse — hooks for course CRUD operations.
 */
export function useCourse() {
  const fetchCourses = async (params = {}) => {
    const res = await api.get('/courses', { params });
    return res.data;
  };

  const fetchCourseById = async (id) => {
    const res = await api.get(`/courses/${id}`);
    return res.data;
  };

  const createCourse = async (data) => {
    const res = await api.post('/courses', data);
    return res.data;
  };

  const updateCourse = async (id, data) => {
    const res = await api.put(`/courses/${id}`, data);
    return res.data;
  };

  const deleteCourse = async (id) => {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  };

  const enrollCourse = async (courseId) => {
    const res = await api.post(`/courses/${courseId}/enroll`);
    return res.data;
  };

  return { fetchCourses, fetchCourseById, createCourse, updateCourse, deleteCourse, enrollCourse };
}

/**
 * fetchCourseByCategory — fetches courses filtered by category (used by CourseSection component).
 */
export async function fetchCourseByCategory(categoryId) {
  const { default: api } = await import('./api');
  const res = await api.get('/courses', { params: { category: categoryId } });
  return res.data;
}
