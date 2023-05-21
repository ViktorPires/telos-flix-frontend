import { CardGiftcardOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";

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
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
        {movies.slice(3, 6).map((movie) => (
          <h1 style={{fontSize: "16px"}}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default EnjoyForFree;