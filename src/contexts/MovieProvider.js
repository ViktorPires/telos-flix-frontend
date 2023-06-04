import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";
import { AuthenticateContext } from "./AuthenticateContext";

export default function MovieProvider({ children }) {

  const [movies, setMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([])
  const [movieComments, setMovieComments] = useState([])
  const { savedUser } = useContext(AuthenticateContext)

  const Authorization = savedUser ? {

    'Authorization': 'Bearer ' + savedUser.token

  } : {}
  const apiUrl = "http://localhost:3333"
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
  const search = (title, genre) => {
    try {
      axios.get("http://localhost:3333/movies", { params: { title, genres: genre }, headers: Authorization }).then((response) => { console.log(response.data); setMovies(response.data) })
    } catch (err) {
      return console.log(err)
    }
  }

  const searchById = async (id) => {
    try {
      return await axios.get(`http://localhost:3333/movies/${id}`, { headers: Authorization })
    } catch (err) {
      return console.log(err)
    }
  }

  useEffect(() => {
    try {
      axios.get("http://localhost:3333/movies/genres").then((response) => { setMovieGenres(response.data) })
    } catch (err) {
      return console.log(err)
    }
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:3333/movies", { headers: Authorization })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const values = {
    search: search,
    setMovies: setMovies,
    movies: movies,
    movieGenres: movieGenres,
    createComment: createComment,
    comments: movieComments,
    getComments: getComments,
    searchById: searchById,
  }

  return <MovieContext.Provider value={values}>{children}</MovieContext.Provider>;
}

