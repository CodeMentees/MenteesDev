import api from "./api";

export const addEvent = async (eventData) => {
    try {
        const response = await api.post("/events", eventData);
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error.message || error);
        throw error;
    }
};

export const fetchEvent = async (id) => {
    try {
        const response = await api.get(`/events/${id}`);
        return response.data.data; // Assuming response contains `data` with event details
    } catch (error) {
        console.error("Error fetching event data:", error.message || error);
        throw error;
    }
};

export const fetchEvents = async (page = 1, limit = 6) => {
    try {
        const response = await api.get(`/events?page=${page}&limit=${limit}`);
        if (!response.data || !response.data.data) {
            throw new Error("Invalid response from server");
        }
        return {
            events: response.data.data,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages
        };
    } catch (error) {
        console.error("Error fetching event list:", error.message || error);
        return { events: [], currentPage: 1, totalPages: 1 };
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        const response = await api.put(`/events/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error("Error updating event:", error.message || error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting event:", error.message || error);
        throw error;
    }
};
