import React, { useContext } from "react";
import { CardGiftcardOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";

function Video() {
  const [movies] = useContext(MovieContext);
  const { id } = useParams(); 

  const movie = movies.find((movie) => movie._id === id);

  if (!movie) {
    return null;
  }

  const videoId = movie.video ? movie.video.split("v=")[1] : "";

  return (
    <div className="videoPage">
      <div className="videoGrid">
        {videoId ? (
          <div className="videoCard">
            <iframe
              width="300"
              height="220"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <Link to={`/films/${movie._id}`}>
              <div className="videoOverlay"></div>
            </Link>
          </div>
        ) : (
          <div className="videoPlaceholder"></div>
        )}
        <h1 style={{ fontSize: "16px" }}>{movie.title}</h1>
      </div>
    </div>
  );
}

export default Video;