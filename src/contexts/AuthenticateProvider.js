import axios from "axios";
import React, { useState } from "react";
import { AuthenticateContext } from "./AuthenticateContext";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState([]);

  const login = async ({ email, password }) => {
    await axios
      .post("http://localhost:3333/authenticate", { email, password })
      .then((response) => {
        setAuthenticateData(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));

      })
      .catch((error) => {
        console.error(error);
      });
  }
  const savedUser = localStorage.getItem("user");

  const values = {
    login: login,
    authenticateData: authenticateData,
    savedUser: JSON.parse(savedUser)
  }

  return <AuthenticateContext.Provider value={values}>{children}</AuthenticateContext.Provider>;
}