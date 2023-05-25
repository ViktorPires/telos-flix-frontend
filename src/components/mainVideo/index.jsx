import React, { useContext } from "react";
import image from "./Hero.png";
import { MovieContext } from "../../contexts/MovieContext";
function MainVideo() {
  const [movies, setMovies] = useContext(MovieContext);


  const videoIds = movies.slice(1, 1).map((movie) => movie.video?.split("v=")[1]);

  return (
    <div style={{ marginTop: "284px", position: "relative" }}>
        <img  src={image} alt="Hero" />
        {videoIds.map((videoId) => (
         <div style={{position: "absolute", top: "0%", left: "3%"}}>
            <iframe
              width="1150"
              height="645"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
  );
}

export default MainVideo;
