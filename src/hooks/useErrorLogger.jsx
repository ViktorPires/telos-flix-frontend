import { api } from '../server/api'

const useErrorLogger = () => {
  const logError = async (error) => {
    try {
      const errorData = {
        message: error.message,
        type: error.name || "Error",
        stack: error.stack || "No stack trace",
        timestamp: new Date() || "No timestamp",
      };
      await api.post(`/errors`, errorData);
    } catch (error) {
      const errors = JSON.parse(localStorage.getItem("errors")) || [];
      errors.push(error);
      localStorage.setItem("errors", JSON.stringify(errors));
    }
  };

  return { logError };
}

export default useErrorLogger;
