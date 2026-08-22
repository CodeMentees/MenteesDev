import api from "./api";

// Send a user query to the RAG chatbot and retrieve the AI's reply
export const sendChatMessage = async (message, history = []) => {
  try {
    const res = await api.post("/ai/chat", { message, history });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get AI response");
  }
};
