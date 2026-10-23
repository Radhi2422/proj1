// import axios from "axios";
//  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
     
// const api = axios.create({
//   baseURL: `${VITE_BASE_URL}`
// });
// console.log("API base URL:", api);

// export default api;

import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        error.userMessage = "Request timed out. Please try again.";
      } else {
        error.userMessage =
          "Unable to connect to the server. Please try again.";
      }
    } else if (error.response.status === 401) {
      error.userMessage = "Invalid email or password.";
    } else if (error.response.status === 403) {
      error.userMessage = "You are not authorized.";
    } else if (error.response.status === 404) {
      error.userMessage = "Requested resource was not found.";
    } else if (error.response.status >= 500) {
      error.userMessage =
        "Server error. Please try again later.";
    } else {
      error.userMessage =
        "Something went wrong. Please try again.";
    }

    return Promise.reject(error);
  }
);

export default apiClient;