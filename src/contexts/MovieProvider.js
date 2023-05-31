import axios from "axios";
import React, { useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";

export default function MovieProvider({ children }) {

  const [movies, setMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([])

  const search = (title, genre) => {
    console.log(genre)
    try {
      axios.get("http://localhost:3333/movies", { params: { title, genres: genre } }).then((response) => { setMovies(response.data) })
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
      .get("http://localhost:3333/movies")
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
  }

  return <MovieContext.Provider value={values}>{children}</MovieContext.Provider>;
}

