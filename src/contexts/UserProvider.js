import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { AuthenticateContext } from "./AuthenticateContext";
import { API_URL } from "../constants/ApiConstant";
import useApiError from "../hooks/useApiError";

export default function UserProvider({ children }) {
    const { savedUser } = useContext(AuthenticateContext);
    const { handleApiError, dialogComponent } = useApiError();

    const Authorization = savedUser ? {
        'Authorization': 'Bearer ' + savedUser.token
    } : {};

    const createUser = async ({ name, email, password, age }) => {
        try {
            const response = await axios.post(`${API_URL}/users`, { name, email, password, age })
            return response.status
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while creating the user. Please try again later.",
            })
        }
    }

    const updateProfile = async ({ id, name, email, cellphone }) => {
        try {
            const response = await axios.put(`${API_URL}/users/${id}`, { name, email, cellphone }, { headers: Authorization });
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
            const response = await axios.put(`${API_URL}/users/${id}`, { password }, { headers: Authorization });
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