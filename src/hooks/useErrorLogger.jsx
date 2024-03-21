import axios from "axios";
import { API_URL } from "../constants/ApiConstant";

const useErrorLogger = () => {
  const logError = async (error) => {
    try {
      const errorData = {
        message: error.message,
        type: error.name || "Error",
        stack: error.stack || "No stack trace",
        timestamp: new Date() || "No timestamp",
      };
      await axios.post(`${API_URL}/errors`, errorData);
    } catch (error) {
      const errors = JSON.parse(localStorage.getItem("errors")) || [];
      errors.push(error);
      localStorage.setItem("errors", JSON.stringify(errors));
    }
  };

  return { logError };
}

export default useErrorLogger;
