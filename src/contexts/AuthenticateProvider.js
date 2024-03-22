import axios from "axios";
import React, { useState } from "react";
import useApiError from "../hooks/useApiError";
import { AuthenticateContext } from "./AuthenticateContext";
import { API_URL } from "../constants/ApiConstant";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState([]);
  const { handleApiError, dialogComponent } = useApiError();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/authenticate`, { email, password })
      setAuthenticateData(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while logging in. Please try again later.",
      });
    };
  }

  const values = {
    login: login,
    authenticateData: authenticateData,
    savedUser: savedUser,
  }

  return (
    <AuthenticateContext.Provider value={values}>
      {children}
      {dialogComponent}
    </AuthenticateContext.Provider>
  );
}