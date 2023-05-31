import { SignalCellularAltOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
function Trending() {
  const [movies, setMovies] = useContext(MovieContext);


  return (
    <div className="trendingSection">
      <div className="labelSection">
        <SignalCellularAltOutlined /> Em alta
      </div>
      <div className="trendingVideosGrid">
      {movies.slice(4, 7).map((movie, index) => (
          <Link to={`/films/${movie._id}`}>
            <div className="miniVideoCard" key={index}>
              <img style={{ width: "400px", height: "220px", objectFit: "cover", borderRadius: "18px" }} src={movie.image} alt="" />
            </div>
          </Link>
        ))}
        {movies.slice(4, 7).map((movie) => (
          <h1 style={{ fontSize: "14px" }}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default Trending;
