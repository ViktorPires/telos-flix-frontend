import React, { useContext } from "react";
import { api } from '../server/api'
import { UserContext } from "./UserContext";
import { AuthenticateContext } from "./AuthenticateContext";
import useApiError from "../hooks/useApiError";

export default function UserProvider({ children }) {
    const { authorization } = useContext(AuthenticateContext);
    const { handleApiError, dialogComponent } = useApiError();

    const createUser = async ({ name, email, password, cellphone }) => {
        try {
            const response = await api.post(`/users`, { name, email, password, cellphone })
            return response.status
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while creating the user. Please try again later.",
            })
        }
    }

    const updateProfile = async ({ id, name, email, cellphone }) => {
        try {
            const response = await api.put(`/users/${id}`, { name, email, cellphone }, { headers: authorization });
            const { token } = JSON.parse(localStorage.getItem("user"));
            response.data.token = token;
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.status
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while updating the profile. Please try again later.",
            });
        }
    }

    const updatePassword = async ({ id, password }) => {
        try {
            const response = await api.put(`/users/${id}`, { password }, { headers: authorization });
            return response.status
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while updating the password. Please try again later.",
            })
        }
    }

    const values = {
        createUser: createUser,
        updateProfile: updateProfile,
        updatePassword: updatePassword,
    }

    return (
        <UserContext.Provider value={values}>
            {children}
            {dialogComponent}
        </UserContext.Provider>
    );
}