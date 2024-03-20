import axios from "axios";
import React, { useContext, useState } from "react";
import {CommentContext } from "./CommentContext";
import { AuthenticateContext } from "./AuthenticateContext";
import { API_URL } from "../constants/ApiConstant";
import useApiError from "../hooks/useApiError";

export default function CommentProvider({ children }) {
    const [comments, setComments] = useState([])
    const { savedUser } = useContext(AuthenticateContext);
    const { handleApiError, dialogComponent } = useApiError();

    const Authorization = savedUser ? {
        'Authorization': 'Bearer ' + savedUser.token
    } : {};

    const createComment = (content, rating, id) => {
        try {
            axios.post(`${API_URL}/comments/movie/${id}`, { content, rating }, { headers: Authorization }).then((response) => {
                setComments([...comments, response.data])
            })
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while creating the comment. Please try again later.",
            })
        }
    }
    const getComments = (id) => {
        try {
            axios.get(`${API_URL}/comments/movie/${id}`, { headers: Authorization }).then((response) => {
                setComments(response.data)
                return response.data
            })
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while getting the comments. Please try again later.",
            })
        }
    }

    const values = {
        getComments: getComments,
        createComment: createComment,
        comments: comments
    }

    return (
        <CommentContext.Provider value={values}>
            {children}
            {dialogComponent}
        </CommentContext.Provider>
    );
}
