import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { MovieContext } from "./MovieContext";
import { AuthenticateContext } from "./AuthenticateContext";
import { API_URL } from "../constants/ApiConstant";
import useApiError from "../hooks/useApiError";

export default function MovieProvider({ children }) {
  const { savedUser } = useContext(AuthenticateContext);
  const { handleApiError, dialogComponent } = useApiError();

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {};

  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError, error: moviesError } = useQuery(
    "movies",
    async () => {
      const response = await axios.get(`${API_URL}/movies`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  if (isMoviesError) {
    handleApiError(moviesError, {
      message: "An error occurred while getting the movies. Please try again later.",
    });
  }

  const { data: freeMovies, isLoading: isFreeMoviesLoading, isError: isFreeMoviesError, error: freeMoviesError } = useQuery(
    "freeMovies",
    async () => {
      const response = await axios.get(`${API_URL}/movies/free`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  if (isFreeMoviesError) {
    handleApiError(freeMoviesError, {
      message: "An error occurred while getting the free movies. Please try again later.",
    });
  }

  const { data: movieGenres, isLoading: isMovieGenresLoading, isError: isMovieGenresError, error: movieGenresError } = useQuery(
    "movieGenres",
    async () => {
      const response = await axios.get(`${API_URL}/movies/genres`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  if (isMovieGenresError) {
    handleApiError(movieGenresError, {
      message: "An error occurred while getting the movie genres. Please try again later.",
    });
  }

  const isLoading = isMoviesLoading || isFreeMoviesLoading || isMovieGenresLoading;
  
  const search = async (title, genre) => {
    try {
      const { data } = await axios.get(`${API_URL}/movies`, { params: { title, genres: genre }, headers: Authorization })
      return data
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while searching. Please try again later.",
      })
    }
  }

  const searchById = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/movies/${id}`, { headers: Authorization })
      return data
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while searching. Please try again later.",
      })
    }
  }

  const values = {
    search: search,
    movies: movies,
    freeMovies: freeMovies,
    movieGenres: movieGenres,
    searchById: searchById,
    isLoading: isLoading,
  }

  return (
    <MovieContext.Provider value={values}>
      {children}
      {dialogComponent}
    </MovieContext.Provider>
  );
}

