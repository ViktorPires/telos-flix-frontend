import axios from "axios";
import React, { useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";

export  default  function MovieProvider({ children })  {
  
  const [movies, setMovies] = useState([]);
  console.log(movies)

  useEffect(() => {
   axios
      .get("http://localhost:3333/movies")
      .then((response) => {
        setMovies(response.data.docs);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);
  return <MovieContext.Provider value={[movies, setMovies]}>{children}</MovieContext.Provider>;
}
