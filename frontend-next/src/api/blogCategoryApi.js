'use client';

import api from './api';

/**
 * useBlogCategory — hooks for blog category operations.
 */
export function useBlogCategory() {
  const fetchCategories = async () => {
    const res = await api.get('/blog-categories');
    return res.data;
  };

  const createCategory = async (data) => {
    const res = await api.post('/blog-categories', data);
    return res.data;
  };

  const updateCategory = async (id, data) => {
    const res = await api.put(`/blog-categories/${id}`, data);
    return res.data;
  };

  const deleteCategory = async (id) => {
    const res = await api.delete(`/blog-categories/${id}`);
    return res.data;
  };

  return { fetchCategories, createCategory, updateCategory, deleteCategory };
}
