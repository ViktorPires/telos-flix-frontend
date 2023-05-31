import { CardGiftcardOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";

function EnjoyForFree({ moviesId }) {
  const [movies, setMovies] = useContext(MovieContext);
  console.log(movies)

  return (
    <div className="enjoyForfreeSection">
      <div className="labelSection">
        <CardGiftcardOutlined /> Aproveite grátis
      </div>
      <div className="enjoyForfreeVideosGrid">
        {movies.slice(6, 9).map((movie, index) => (
          <Link to={`/films/${movie._id}`}>
            <div className="miniVideoCard" key={index}>
              <img style={{ width: "400px", height: "220px", objectFit: "cover", borderRadius: "18px" }} src={movie.image} alt="" />
            </div>
          </Link>
        ))}
        {movies.slice(6, 9).map((movie) => (
          <h1 style={{ fontSize: "14px" }}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default EnjoyForFree;