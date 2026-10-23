import axios from "axios";

export const logFrontendError = async (error, context = {}) => {
  try {
    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
     
    await axios.post(`${VITE_BASE_URL}/api/logs/frontend-error`, {
      message: error?.message || "Unknown frontend error",
      stack: error?.stack || null,
      url: window.location.href,
      component: context.component || null,
      action: context.action || null,
      timestamp: new Date().toISOString()
    });
  } catch (loggingError) {
    console.error("Failed to send frontend error to backend:", loggingError);
  }
};