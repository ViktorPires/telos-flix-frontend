import { SignalCellularAltOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
function Trending() {
  const [movies, setMovies] = useContext(MovieContext);


  return (
    <div className="trendingSection">
      <div className="labelSection">
        <SignalCellularAltOutlined /> Em alta
      </div>
      <div className="trendingVideosGrid">
        {movies.slice(6, 9).map((movie, index) => (
          <div className="miniVideoCard" key={index}>
            <img style={{ width: "350px", height: "220px", objectFit: "cover", borderRadius: "18px" }} src={movie.posterImage} alt="" />
          </div>
        ))}
        {movies.slice(6, 9).map((movie) => (
          <h1 style={{ fontSize: "14px" }}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default Trending;
