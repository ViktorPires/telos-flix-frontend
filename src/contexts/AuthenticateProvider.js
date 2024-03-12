import axios from "axios";
import React, { useState } from "react";
import { useDialog }  from "../hooks/DialogProvider";
import useErrorLogger from "../hooks/useErrorLogger";
import { AuthenticateContext } from "./AuthenticateContext";
import { apiUrl } from "../constants/ApiConstant";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState([]);
  const { handleOpenDialog } = useDialog();
  const { logError } = useErrorLogger();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {}

  const createUser = async ({ name, email, password, age }) => {
    try {
      await axios.post(`${apiUrl}/users`, { name, email, password, age })
    } catch (error) {
      handleOpenDialog({
        message: "An error occurred while creating the user. Please try again later.",
        title: "Error",
        ariaLabelledBy: "error-dialog-title",
        buttonColor: "error",
        buttonText: "OK",
        severity: "error",
        titleStyle: { backgroundColor: "red", color: "white" },
      });
      logError(error);
    }
  }

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/authenticate`, { email, password })
      setAuthenticateData(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data
    } catch (error) {
      handleOpenDialog({
        message: "An error occurred while logging in. Please try again later.",
        title: "Error",
        ariaLabelledBy: "error-dialog-title",
        buttonColor: "error",
        buttonText: "Close",
        severity: "error",
        titleStyle: { backgroundColor: "red", color: "white" },
      })
      logError(error);
    };
  }

  async function updateProfile({ id, name, email, cellphone }) {
    try {
      await axios.put(`${apiUrl}/users/${id}`, { name, email, cellphone, password: null }, { headers: Authorization }).then(response => {
        const { token } = JSON.parse(localStorage.getItem("user"));
        response.data.token = token
        localStorage.setItem("user", JSON.stringify(response.data))
      })
    } catch (error) {
      handleOpenDialog({
        message: "An error occurred while updating the profile. Please try again later.",
        title: "Error",
        ariaLabelledBy: "error-dialog-title",
        buttonColor: "error",
        buttonText: "OK",
        severity: "error",
        titleStyle: { backgroundColor: "red", color: "white" },
      })
      logError(error);
    }
  }

  async function updateProfilePassword({ id, password, confirmPassword }) {
    try {
      await axios.put(`${apiUrl}/users/${id}`, { password, confirmPassword }, { headers: Authorization });
    } catch (error) {
      handleOpenDialog({
        message: "An error occurred while updating the password. Please try again later.",
        title: "Error",
        ariaLabelledBy: "error-dialog-title",
        buttonColor: "error",
        buttonText: "OK",
        severity: "error",
        titleStyle: { backgroundColor: "red", color: "white" },
      })
      logError(error);
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

  return <AuthenticateContext.Provider value={values}>{children}</AuthenticateContext.Provider>;
}