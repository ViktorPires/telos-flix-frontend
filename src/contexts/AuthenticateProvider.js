import axios from "axios";
import React, { useState } from "react";
import { AuthenticateContext } from "./AuthenticateContext";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState([]);

  const createUser = async ({ name, email, password, age }) => {
    await axios.post("http://localhost:3333/users", { name, email, password, age })
  }

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post("http://localhost:3333/authenticate", { email, password })
      setAuthenticateData(data);
      localStorage.setItem("user", JSON.stringify(data));

      return data
    } catch (error) {
      return error
    };
  }
  const savedUser = localStorage.getItem("user");

  const values = {
    login: login,
    authenticateData: authenticateData,
    savedUser: JSON.parse(savedUser),
    createUser: createUser,
  }

  return <AuthenticateContext.Provider value={values}>{children}</AuthenticateContext.Provider>;
}