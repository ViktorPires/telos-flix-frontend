import React, { useContext } from "react";
import "keen-slider/keen-slider.min.css"
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
import "./index.css";


function MainBanner() {
  const { movies } = useContext(MovieContext);

  return (
    <div className="slider">
      <div className="slideTrack">
        <div className="slide">
          {movies.slice(1, 25).map((movie) => (
            <Link to={`/films/${movie._id}`}>
              <img style={{ width: "400px", height: "500px", objectFit: "contain", borderRadius: "18px" }} src={movie.image} alt="" />
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

export default MainBanner;
