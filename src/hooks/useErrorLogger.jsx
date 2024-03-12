import axios from "axios";
import { API_URL } from "../constants/ApiConstant";

function useErrorLogger() {
  const logError = async (error) => {
    try {
      const errorData = {
        message: error.message,
        type: error.name,
        stack: error.stack,
        timestamp: new Date(),
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
