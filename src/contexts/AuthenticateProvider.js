import axios from "axios";
import React, { useState } from "react";
import useApiError from "../hooks/useApiError";
import { AuthenticateContext } from "./AuthenticateContext";
import { API_URL } from "../constants/ApiConstant";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState([]);
  const { handleApiError, dialogComponent } = useApiError();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {}

  const createUser = async ({ name, email, password, age }) => {
    try {
      await axios.post(`${API_URL}/users`, { name, email, password, age })
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while creating the user. Please try again later.",
      })
    }
  }

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

  async function updateProfile({ id, name, email, cellphone }) {
    try {
      await axios.put(`${API_URL}/users/${id}`, { name, email, cellphone, password: null }, { headers: Authorization }).then(response => {
        const { token } = JSON.parse(localStorage.getItem("user"));
        response.data.token = token
        localStorage.setItem("user", JSON.stringify(response.data))
      })
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while updating the profile. Please try again later.",
      })
    }
  }

  async function updateProfilePassword({ id, password, confirmPassword }) {
    try {
      await axios.put(`${API_URL}/users/${id}`, { password, confirmPassword }, { headers: Authorization });
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while updating the password. Please try again later.",
      })
    }
  }

  const values = {
    login: login,
    authenticateData: authenticateData,
    savedUser: savedUser,
    createUser: createUser,
    updateProfile: updateProfile,
    updateProfilePassword: updateProfilePassword,
  }

  return (
    <AuthenticateContext.Provider value={values}>
      {children}
      {dialogComponent}
    </AuthenticateContext.Provider>
  );
}