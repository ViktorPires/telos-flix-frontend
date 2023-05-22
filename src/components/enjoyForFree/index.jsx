import { CardGiftcardOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";

function EnjoyForFree() {
  const [movies, setMovies] = useContext(MovieContext);

  const videoIds = movies.slice(3, 6).map((movie) => movie.video.split("v=")[1]);

  return (
    <div className="enjoyForfreeSection">
      <div className="labelSection">
        <CardGiftcardOutlined /> Aproveite grátis
      </div>
      <div className="enjoyForfreeVideosGrid">
        {videoIds.map((videoId) => (
          <div className="miniVideoCard" key={videoId}>
            <iframe
              width="300"
              height="220"
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
            <div style={{ position: "absolute", zIndex: "1", width: "300px", height: "220px", border: "1px solid red" }}><Link to="/films"><div style={{width: "300px", height: "220px",}}></div></Link></div>
          </div>
        ))}
        {movies.slice(3, 6).map((movie) => (
          <h1 style={{ fontSize: "16px" }}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default EnjoyForFree;