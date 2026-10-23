
import { useCallback } from "react";
import axios from "axios";

const useLogger = () => {

  const sendLog = async (level, message, data = null) => {
    try {
      const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
      const token = localStorage.getItem("token");
      console.log(`${VITE_BASE_URL}/api/logs`);
      await axios.post(
        `${VITE_BASE_URL}/api/logs`,
         level,
        message,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
     
    } catch (error) {
      console.error("Unable to send log to backend", error);
    }
  };

  const logInfo = useCallback((message, data = null) => {

    console.log(
      `[INFO] ${new Date().toISOString()} - ${message}`,
      data
    );

    sendLog("info", message, data);

  }, []);

  const logWarning = useCallback((message, data = null) => {

    console.warn(
      `[WARNING] ${new Date().toISOString()} - ${message}`,
      data
    );

    sendLog("warn", message, data);

  }, []);

  const logError = useCallback((message, error = null) => {

    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      error
    );

    sendLog("error", message, {
      error: error?.message || error,
      stack: error?.stack,
    });

  }, []);

  return {
    logInfo,
    logWarning,
    logError,
  };
};

export default useLogger;