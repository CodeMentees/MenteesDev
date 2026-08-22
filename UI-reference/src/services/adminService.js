import api from './api';

export const getAdminStats = async () => {
    try {
        const res = await api.get('/admin/stats');
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch admin stats');
    }
};

export const getAdminUsers = async (page = 1, limit = 10) => {
    try {
        const res = await api.get(`/admin/users?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
};

export const getAdminCourses = async (page = 1, limit = 10, search = '') => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit)
        });
        if (search) params.append('search', search);

        const res = await api.get(`/admin/courses?${params.toString()}`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
};

export const assignCourse = async (userId, courseId, dueDate) => {
    try {
        const res = await api.post('/admin/assign', { userId, courseId, dueDate: dueDate || null });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to assign course');
    }
};

export const getSystemPrompt = async () => {
    try {
        const res = await api.get('/admin/prompt');
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch AI system prompt');
    }
};

export const updateSystemPrompt = async (aiSystemPrompt) => {
    try {
        const res = await api.post('/admin/prompt', { aiSystemPrompt });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update AI system prompt');
    }
};

