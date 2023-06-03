import { CardGiftcardOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";

function EnjoyForFree() {
  const { movies } = useContext(MovieContext);

  return (
    <div className="enjoyForContainer">
      <div className="enjoyForfreeSection">
        <div className="labelSection">
          <CardGiftcardOutlined /> Aproveite grátis
        </div>

        <div className="enjoyForfreeVideosGrid">
          {movies.slice(6, 9).map((movie, index) => (
            <Link to={`/films/${movie._id}`}>
              <div className="miniFilmsCardEnjoyForFree" key={index}>
                <img style={{ width: "400px", height: "500px", objectFit: "contain", borderRadius: "18px" }} src={movie.image} alt="" />
              </div>
            </Link>
          ))}
          {movies.slice(6, 9).map((movie) => (
            <h1 style={{ fontSize: "14px", marginTop: "-3rem" }}>{movie.title}</h1>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnjoyForFree;