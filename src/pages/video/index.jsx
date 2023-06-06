import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import Header from "../../components/header";

function Video() {
  const { searchById } = useContext(MovieContext);
  const { id } = useParams();
  const { savedUser } = useContext(AuthenticateContext);
  const [movieVideo, setMovieVideo] = useState("")

  useEffect(() => {
    async function FindMovieVideo() {
      const { data } = await searchById(id)
      const movieVideo = data.video ? data.video.split("v=")[1] : "";
      setMovieVideo(movieVideo)
    }
    FindMovieVideo()

  }, [])

  return (
    <>
      <Header />
      {savedUser ? <div className="videoPage">
        <div className="videoGrid">
          <iframe style={{
            display: "block",
            height: "80vh",
            width: "95%",
            border: "none",
          }} width="100vw" height="100vh" src={`https://www.youtube.com/embed/${movieVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div> : <h1>You need to be logged in to watch the movie</h1>}

    </>
  );
}

export default Video;