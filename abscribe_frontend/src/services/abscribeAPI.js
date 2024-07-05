import axios from "axios";

// API client for general backend endpoints
const apiClient = axios.create({
  // baseURL: "/api/",
  baseURL: "/api/" || "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// API client for chatgpt endpoints
const chatgptClient = axios.create({
  // baseURL: "/chatgpt_api/",
  baseURL: "/chatgpt_api/" || "http://localhost:11434/api/",
  headers: {
    "Content-Type": "application/json",
    "responseType": 'stream',
  },
});

export { apiClient, chatgptClient };
