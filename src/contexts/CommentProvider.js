import React, { useContext, useState } from "react";
import { api } from '../server/api'
import { CommentContext } from "./CommentContext";
import { AuthenticateContext } from "./AuthenticateContext";
import useApiError from "../hooks/useApiError";

export default function CommentProvider({ children }) {
    const [comments, setComments] = useState([])
    const { authorization } = useContext(AuthenticateContext);
    const { handleApiError, dialogComponent } = useApiError();

    const createComment = async (content, rating, id) => {
        try {
            const response = await api.post(`/comments/movie/${id}`, { content, rating }, { headers: authorization });
            setComments([...comments, response.data]);
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while creating the comment. Please try again later.",
            });
        }
    }

    const getComments = async (id) => {
        try {
            const response = await api.get(`/comments/movie/${id}`, { headers: authorization });
            setComments(response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, {
                message: "An error occurred while getting the comments. Please try again later.",
            });
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
