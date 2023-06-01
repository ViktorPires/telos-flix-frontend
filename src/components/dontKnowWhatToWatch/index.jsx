import { Button } from "@mui/material";
import React from "react";
import "./index.css";
import { ArrowForward, QuestionMarkRounded, Settings } from "@mui/icons-material";
import { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
function DontKnowWhatToWatch() {
  const { movieGenres } = useContext(MovieContext);


  return (
    <div className="dontKnowWhatToWatch">
      <div className="labelSection">
        <QuestionMarkRounded /> Aproveite grátis
      </div>
      <div className="dontKnowWhatToWatchgrid">
        {movieGenres.map((genre) => (
          <Link to={`/cardsFilms/${genre}`} style={{ textDecoration: "none", color: "white" }}>
            <Button className="categoryButton">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {genre}
              </div>
              <ArrowForward />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default DontKnowWhatToWatch;
