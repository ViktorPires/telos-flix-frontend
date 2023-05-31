import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";

function Video() {
  const [movies] = useContext(MovieContext);
  const { id } = useParams(); 
  const { isAuthenticated } = useContext(AuthenticateContext);

  const movie = movies.find((movie) => movie._id === id);

  if (!movie) {
    return null;
  }

  const videoId = movie.video ? movie.video.split("v=")[1] : "";

  return (
    <div className="videoPage">
      <div className="videoGrid">
        {isAuthenticated ? (
          videoId ? (
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
          )
        ) : (
          <img
            src={movie.image}
            alt=""
            style={{ height: "300px", width: "400px", objectFit: "cover" }}
          />
        )}
        <h1 style={{ fontSize: "16px" }}>{movie.title}</h1>
      </div>
    </div>
  );
}

export default Video;