import axios from "axios";
import React, { useState } from "react";
import { AuthenticateContext } from "./AuthenticateContext";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {}

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

  async function updateProfile({ id, name, email, cellphone }) {
    try {
      await axios.put(`http://localhost:3333/users/${id}`, { name, email, cellphone, password: null }, { headers: Authorization }).then(response => {
        const { token } = JSON.parse(localStorage.getItem("user"));
        response.data.token = token

        localStorage.setItem("user", JSON.stringify(response.data))
      })
    } catch (error) {
      console.log(Authorization)
    }
  }

  async function updateProfilePassword({ id, password, confirmPassword }) {
    try {
      await axios.put(`http://localhost:3333/users/${id}`, { password, confirmPassword }, { headers: Authorization });

    } catch (err) {
      console.log(err)
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