import { Button } from "@mui/material";
import React from "react";
import "./index.css";
import { ArrowForward, QuestionMarkRounded, Settings } from "@mui/icons-material";
import { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
function DontKnowWhatToWatch() {
  const [movies, setMovies] = useContext(MovieContext);

  const genres = [];

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });

  return (
    <div className="dontKnowWhatToWatch">
      <div className="labelSection">
        <QuestionMarkRounded /> Aproveite grátis
      </div>
      <div className="dontKnowWhatToWatchgrid">
        {genres.map((genre) => (
          <Button className="categoryButton">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Settings />
              <Link to="/cardsFilms" style={{ textDecoration: "none", color: "white" }}>{genre}</Link>
            </div>
            <ArrowForward />
          </Button>
        ))}
      </div>
    </div>
  );
}


export default DontKnowWhatToWatch;
