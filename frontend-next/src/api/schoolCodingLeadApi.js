import axios from "axios";

const API_URL = "/api/school-coding-leads";

export const useSchoolCodingLeadAPI = () => {
  const createLead = async (leadData) => {
    try {
      const { data } = await axios.post(API_URL, leadData);
      return data;
    } catch (error) {
      console.error("Error creating school coding lead:", error);
      return null;
    }
  };

  const getLeads = async () => {
    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (error) {
      console.error("Error fetching school coding leads:", error);
      return [];
    }
  };

  const deleteLead = async (id) => {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error("Error deleting school coding lead:", error);
      return null;
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(`${API_URL}/${id}/status`, { status });
      return data;
    } catch (error) {
      console.error("Error updating school coding lead status:", error);
      return null;
    }
  };

  return { createLead, getLeads, deleteLead, updateLeadStatus };
};
