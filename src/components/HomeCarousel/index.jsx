import React, { useContext } from "react";
import "keen-slider/keen-slider.min.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
import "./index.css";
import Slide from "react-reveal/Slide";

function HomeCarousel() {
  const { movies } = useContext(MovieContext);

  return (
    <div data-testid="home-carousel-component" className="slider">
      <div className="slideTrack">
        <Slide top>
          <div className="slide">
            {movies?.map((movie) => (
              <Link key={movie._id} to={`/films/${movie._id}`}>
                <img
                  style={{
                    width: "400px",
                    height: "500px",
                    objectFit: "contain",
                    borderRadius: "18px",
                  }}
                  src={movie.image}
                  alt={movie.title}
                />
              </Link>
            ))}
          </div>
        </Slide>
      </div>
    </div>
  );
}

export default HomeCarousel;
