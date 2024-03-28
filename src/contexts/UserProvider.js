import React, { useContext } from "react";
import { api } from '../server/api'
import { UserContext } from "./UserContext";
import { AuthenticateContext } from "./AuthenticateContext";
import useApiError from "../hooks/useApiError";

export default function UserProvider({ children }) {
    const { authorization, setAuthenticateData } = useContext(AuthenticateContext);
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
            localStorage.setItem("token", response.data.token);
            setAuthenticateData({
                id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
                cellphone:response.data.cellphone,
            });
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