import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VITE_BACKEND_URL || "http://145.38.194.189/api/",
  // baseURL: "http://145.38.194.189/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
