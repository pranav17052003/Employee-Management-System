import axios from "axios";

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/employees/csrf_token/"
    );
    const csrfToken = response.data.csrftoken;
    // Set default CSRF header for all axios requests
    axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    console.log("CSRF Token fetched:", csrfToken);
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};
