import React, { useContext } from "react";
import { api } from '../server/api';
import { useQuery } from "react-query";
import { MovieContext } from "./MovieContext";
import { AuthenticateContext } from "./AuthenticateContext";
import useApiError from "../hooks/useApiError";

export default function MovieProvider({ children }) {
  const { authorization } = useContext(AuthenticateContext);
  const { handleApiError, dialogComponent } = useApiError();

  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError, error: moviesError } = useQuery(
    "movies",
    async () => {
      const response = await api.get(`/movies`, { headers: authorization });
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
      const response = await api.get(`/movies/free`, { headers: authorization });
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
      const response = await api.get(`/movies/genres`, { headers: authorization });
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
      const { data } = await api.get(`/movies`, { params: { title, genres: genre }, headers: authorization })
      return data
    } catch (error) {
      handleApiError(error, {
        message: "An error occurred while searching. Please try again later.",
      })
    }
  }

  const searchById = async (id) => {
    try {
      const { data } = await api.get(`/movies/${id}`, { headers: authorization })
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

