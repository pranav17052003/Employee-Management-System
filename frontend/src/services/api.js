import axios from "axios";

// Create an Axios instance for API calls
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET method
export const get = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

// Generic POST method
export const post = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

// Generic PUT method
export const put = async (url, data) => {
  const response = await api.put(url, data);
  return response.data;
};

// Generic DELETE method
export const del = async (url) => {
  const response = await api.delete(url);
  return response.data;
};

// Specific API Endpoints
export const getEmployees = async (params = {}) => {
  try {
    const response = await get("employees/", params);
    return response; // Expecting paginated response
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  return get(`/employees/${id}/`);
};

export const createEmployee = async (data) => {
  return post("/employees/", data);
};

export const updateEmployee = async (id, data) => {
  return put(`/employees/${id}/`, data);
};

export const deleteEmployee = async (id) => {
  try {
    const response = await del(`/employees/${id}/`);
    return response;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};


export const registerEmployee = async (data) => {
  return await api.post("/register/", data);
};

export default api;
