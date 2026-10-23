// hooks/useErrorHandler.js

import { useCallback } from "react";

const useErrorHandler = () => {
  const handleError = useCallback((error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);

      return error.response.data.message || "Something went wrong.";
    }

    if (error.request) {
      console.error("No response received:", error.request);

      return "Unable to connect to server.";
    }

    console.error("Unexpected Error:", error.message);

    return error.message;
  }, []);

  return {
    handleError,
  };
};

export default useErrorHandler;