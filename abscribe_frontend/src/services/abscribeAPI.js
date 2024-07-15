import axios from "axios";

// API client for general backend endpoints
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: "/api/" || "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// API client for chatgpt endpoints
const chatgptClient = axios.create({
  // baseURL: "http://localhost:11434/api/",
  baseURL: "/chatgpt_api/" || "http://localhost:11434/api/",
  headers: {
    "Content-Type": "application/json",
    "responseType": 'stream',
  },
});

export { apiClient, chatgptClient };
