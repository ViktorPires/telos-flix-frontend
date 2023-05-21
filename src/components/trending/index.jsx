import { SignalCellularAltOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import MiniVideoCard from "../miniVideoCard";
import { MovieContext } from "../../contexts/MovieContext";
function Trending() {
  const [movies, setMovies] = useContext(MovieContext);

  const videoIds = movies.slice(0, 3).map((movie) => movie.video.split("v=")[1]);
 
  return (
    <div className="trendingSection">
      <div className="labelSection">
        <SignalCellularAltOutlined /> Em alta
      </div>
      <div className="trendingVideosGrid">
        {videoIds.map((videoId, movie) => (
          <div className="miniVideoCard" key={videoId}>
            <iframe
              width="300"
              height="220"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
        {movies.slice(0, 3).map((movie) => (
          <h1 style={{fontSize: "16px"}}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default Trending;
