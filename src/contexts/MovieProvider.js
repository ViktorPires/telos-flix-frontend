import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { MovieContext } from "./MovieContext";
import { AuthenticateContext } from "./AuthenticateContext";
import { apiUrl } from "../constants/ApiConstant";

export default function MovieProvider({ children }) {
  const [movieComments, setMovieComments] = useState([])
  const { savedUser } = useContext(AuthenticateContext);

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {};

  const { data: movies, isLoading: isMoviesLoading } = useQuery(
    "movies",
    async () => {
      const response = await axios.get(`${apiUrl}/movies`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: freeMovies, isLoading: isFreeMoviesLoading } = useQuery(
    "freeMovies",
    async () => {
      const response = await axios.get(`${apiUrl}/movies/free`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: movieGenres, isLoading: isMovieGenresLoading } = useQuery(
    "movieGenres",
    async () => {
      const response = await axios.get(`${apiUrl}/movies/genres`, { headers: Authorization });
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const isLoading = isMoviesLoading || isFreeMoviesLoading || isMovieGenresLoading;
  const createComment = (content, rating, id) => {
    try {
      axios.post(`${apiUrl}/comments/movie/${id}`, { content, rating }, { headers: Authorization }).then((response) => {
        setMovieComments([...movieComments, response.data])
      })
    } catch (err) {
      return console.log(err)
    }
  }
  const getComments = (id) => {
    try {
      axios.get(`${apiUrl}/comments/movie/${id}`, { headers: Authorization }).then((response) => {
        setMovieComments(response.data)
        return response.data
      })
    } catch (err) {
      return console.log(err)
    }
  }
  const search = async (title, genre) => {
    try {
      const { data } = await axios.get(`${apiUrl}/movies`, { params: { title, genres: genre }, headers: Authorization })
      return data
    } catch (err) {
      return console.log(err)
    }
  }

  const searchById = async (id) => {
    try {
      return await axios.get(`${apiUrl}/movies/${id}`, { headers: Authorization })
    } catch (err) {
      return console.log(err)
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

  return <MovieContext.Provider value={values}>{children}</MovieContext.Provider>;
}

