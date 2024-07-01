import { apiClient } from "./abscribeAPI";

export const getDocuments = async () => {
  console.log("API Client Base URL:", apiClient.defaults.baseURL);
  const response = await apiClient.get("/documents");
  return response.data;
};

export const getDocument = async (documentId) => {
  const response = await apiClient.get(`/documents/${documentId}`);
  return response.data;
};

export const createDocument = async (content, task_id, prolific_id, name="") => {
  console.log("API Client Base URL:", apiClient.defaults.baseURL);
  const response = await apiClient.post("/documents", { content, task_id, prolific_id, name});
  return response.data;
};

export const updateDocument = async (documentId, content, name) => {
  const response = await apiClient.put(`/documents/${documentId}`, {
    content,
    name,
  });
  return response.data;
};

export const deleteDocument = async (documentId) => {
  await apiClient.delete(`/documents/${documentId}`);
};
