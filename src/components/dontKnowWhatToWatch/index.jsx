import { Button } from "@mui/material";
import React from "react";
import "./index.css";
import { ArrowForward } from "@mui/icons-material";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
function DontKnowWhatToWatch() {
  const { movieGenres } = useContext(MovieContext);

  return (
    <div
      data-testid="dont-know-what-to-watch-component"
      className="dontKnowWhatToWatchContainer"
    >
      <div className="dontKnowWhatToWatch">
        <div className="labelSection">
          <InsightsOutlinedIcon /> Find by genre
        </div>
        <div className="dontKnowWhatToWatchgrid">
          {movieGenres.map((genre) => (
            <Link
              to={`/cardsFilms/${genre}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button className="categoryButton">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "white",
                  }}
                >
                  {genre}
                </div>
                <ArrowForward className="arrowForward" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DontKnowWhatToWatch;
