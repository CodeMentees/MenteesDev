'use client';

import api from './api';

/**
 * useQueryAPI — hooks for contact/query operations.
 */
export function useQueryAPI() {
  const submitQuery = async (data) => {
    const res = await api.post('/query', data);
    return res.data;
  };

  const fetchQueries = async (params = {}) => {
    const res = await api.get('/query', { params });
    return res.data;
  };

  const updateQueryStatus = async (id, status) => {
    const res = await api.put(`/query/${id}`, { status });
    return res.data;
  };

  const deleteQuery = async (id) => {
    const res = await api.delete(`/query/${id}`);
    return res.data;
  };

  return { submitQuery, fetchQueries, updateQueryStatus, deleteQuery };
}
