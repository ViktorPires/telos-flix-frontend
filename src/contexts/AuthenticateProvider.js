import React, { useState, useEffect } from "react";
import { api } from '../server/api'
import useApiError from "../hooks/useApiError";
import { AuthenticateContext } from "./AuthenticateContext";
import { useNavigate } from "react-router-dom";

export default function AuthenticateProvider({ children }) {
  const [authenticateData, setAuthenticateData] = useState({});
  const [authorization, setAuthorization] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { handleApiError, dialogComponent } = useApiError();
  const navigate = useNavigate();

  useEffect(() => {
      const savedUser = localStorage.getItem("token");
      if (savedUser) {
        verifyToken({ headers: { Authorization: `Bearer ${savedUser}` } });
      }
      //eslint-disable-next-line
  }, []);

  const login = async ({ email, password }) => {
    try {
      console.log("Login: " + email +  " " + password);
      const { data } = await api.post('/authenticate', { email, password });
      localStorage.setItem("token", data.token);
      setAuthenticateData({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        cellphone: data.cellphone,
      });
      setIsAuthenticated(true);
      setAuthorization({ Authorization: `Bearer ${data.token}` });
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while logging in. Please try again later.",
      });
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticateData({});
    setIsAuthenticated(false);
    setAuthorization({});
    navigate("/", { replace: true });
  }

  const verifyToken = async ({headers}) => {
    try {
      const { data } = await api.get('/check-token', { headers });
      setAuthenticateData({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        cellphone: data.user.cellphone,
      })
      setIsAuthenticated(true);
      setAuthorization(headers);
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while verifying the token. Please try again later.",
      });
      logout();
    }
  }

  const values = {
    login,
    logout,
    authorization: authorization,
    authenticateData: authenticateData,
    isAuthenticated: isAuthenticated,
    setAuthenticateData,
  }

  return (
    <AuthenticateContext.Provider value={values}>
      {children}
      {dialogComponent}
    </AuthenticateContext.Provider>
  );
}