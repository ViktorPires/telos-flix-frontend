import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import Header from "../../components/header";

function Video() {
  const { movies } = useContext(MovieContext);
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthenticateContext);

  const movie = movies.find((movie) => movie._id === id);

  if (!movie) {
    return null;
  }

  const videoId = movie.video ? movie.video.split("v=")[1] : "";
  console.log(videoId)

  return (
    <>
      <Header />
      <div className="videoPage">
        <div className="videoGrid">
          <iframe style={{
            display: "block",
            height: "80vh",
            width: "100%",
            border: "none",
          }} width="100vw" height="100vh" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
}

export default Video;