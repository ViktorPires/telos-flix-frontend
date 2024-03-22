import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import Header from "../../components/header";

function Video() {
  const { searchById } = useContext(MovieContext);
  const { id } = useParams();
  const { savedUser } = useContext(AuthenticateContext);
  const [movieVideo, setMovieVideo] = useState("");
  const [isFreeMovie, setIsFreeMovie] = useState(false);

  useEffect(() => {
    async function FindMovieVideo() {
      const { data } = await searchById(id);
      const movieVideo = data.video ? data.video.split("v=")[1] : "";
      setMovieVideo(movieVideo);
      setIsFreeMovie(data.isFree);
    }
    FindMovieVideo();
  }, [id]);

  return (
    <>
      <Header />
      {savedUser || isFreeMovie ? (
        <div data-testid="video-component" className="videoPage">
          <div className="videoGrid">
            <iframe
              style={{
                display: "block",
                height: "80vh",
                width: "95%",
                border: "none",
              }}
              width="100vw"
              height="100vh"
              src={`https://www.youtube.com/embed/${movieVideo}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <h1  data-testid="video-component">You need to be logged in to watch the movie</h1>
      )}
    </>
  );
}

export default Video;
