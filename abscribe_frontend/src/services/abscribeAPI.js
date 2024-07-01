import axios from "axios";

// API client for general backend endpoints
const apiClient = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// API client for chatgpt endpoints
const chatgptClient = axios.create({
  baseURL: "/chatgpt_api/",
  headers: {
    "Content-Type": "application/json",
    "responseType": 'stream',
  },
});

export { apiClient, chatgptClient };
