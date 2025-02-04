import api from "./api";

export const fetchSiteData = async () => {
  try {
    const response = await api.get(`/home`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
};


export const postSiteData = async (siteData) => {
  try {
    const response = await api.post(`/home`, siteData);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }

    console.log("Site data posted successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error posting site data:", error.response?.data?.message || error.message);
    return null; // Return null instead of throwing an error
  }
};
