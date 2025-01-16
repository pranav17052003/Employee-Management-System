import axios from "axios";

// Base Axios instance for all API requests
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Backend server URL
  withCredentials: true, // Ensure cookies (e.g., CSRF) are sent with requests
  timeout: 5000, // Set a timeout of 5 seconds for all requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optionally log requests in development for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making request to ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Received response from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);



axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken; // Attach CSRF token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
