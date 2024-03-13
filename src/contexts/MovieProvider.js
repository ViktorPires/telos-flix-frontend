import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { MovieContext } from "./MovieContext";
import { AuthenticateContext } from "./AuthenticateContext";
import { API_URL } from "../constants/ApiConstant";
import useDialog from "../hooks/useDialog";

export default function MovieProvider({ children }) {
  const [movieComments, setMovieComments] = useState([])
  const { savedUser } = useContext(AuthenticateContext);
  const { dialog } = useDialog();

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {};

  const { data: movies, isLoading: isMoviesLoading } = useQuery(
    "movies",
    async () => {
      const response = await axios.get(`${API_URL}/movies`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: freeMovies, isLoading: isFreeMoviesLoading } = useQuery(
    "freeMovies",
    async () => {
      const response = await axios.get(`${API_URL}/movies/free`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: movieGenres, isLoading: isMovieGenresLoading } = useQuery(
    "movieGenres",
    async () => {
      const response = await axios.get(`${API_URL}/movies/genres`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const isLoading = isMoviesLoading || isFreeMoviesLoading || isMovieGenresLoading;
  const createComment = (content, rating, id) => {
    try {
      axios.post(`${API_URL}/comments/movie/${id}`, { content, rating }, { headers: Authorization }).then((response) => {
        setMovieComments([...movieComments, response.data])
      })
    } catch (error) {
      dialog.handleApiError(error, {
        message: "An error occurred while creating the comment. Please try again later.",
      })
    }
  }
  const getComments = (id) => {
    try {
      axios.get(`${API_URL}/comments/movie/${id}`, { headers: Authorization }).then((response) => {
        setMovieComments(response.data)
        return response.data
      })
    } catch (error) {
      dialog.handleApiError(error, {
        message: "An error occurred while getting the comments. Please try again later.",
      })
    }
  }
  const search = async (title, genre) => {
    try {
      const { data } = await axios.get(`${API_URL}/movies`, { params: { title, genres: genre }, headers: Authorization })
      return data
    } catch (error) {
      dialog.handleApiError(error, {
        message: "An error occurred while searching. Please try again later.",
      })
    }
  }

  const searchById = async (id) => {
    try {
      return await axios.get(`${API_URL}/movies/${id}`, { headers: Authorization })
    } catch (error) {
      dialog.handleApiError(error, {
        message: "An error occurred while searching. Please try again later.",
      })
    }
  }

  const values = {
    search: search,
    movies: movies,
    freeMovies: freeMovies,
    movieGenres: movieGenres,
    createComment: createComment,
    comments: movieComments,
    getComments: getComments,
    searchById: searchById,
    isLoading: isLoading,
  }

  return (
    <MovieContext.Provider value={values}>
      {children}
      {dialog.dialogComponent}
    </MovieContext.Provider>
  );
}

