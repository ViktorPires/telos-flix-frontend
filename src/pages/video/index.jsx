import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/MovieContext";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";
import Header from "../../components/header";
import PageLoading from "../../components/pageLoading";
import ContentLoading from "../../components/contentLoading";

function Video() {
  const { searchById, isLoading } = useContext(MovieContext);
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthenticateContext);
  const [movieVideo, setMovieVideo] = useState("");
  const [isFreeMovie, setIsFreeMovie] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  async function FindMovieVideo() {
    setIsLoadingVideo(true);
    const data = await searchById(id);
    const movieVideo = data.video ? data.video.split("v=")[1] : "";
    setMovieVideo(movieVideo);
    setIsFreeMovie(data.isFree);
    setIsLoadingVideo(false);
  }

  useEffect(() => {
    FindMovieVideo();
  }, [id]);

  return isLoading ? (
    <PageLoading />
  ) : (
    <>
      <Header />
      {isAuthenticated || isFreeMovie ? (
        isLoadingVideo ? (
          <ContentLoading />
        ) : (
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
        )
      ) : (
        <h1 data-testid="video-component">You need to be logged in to watch the movie</h1>
      )}
    </>
  );
}

export default Video;
