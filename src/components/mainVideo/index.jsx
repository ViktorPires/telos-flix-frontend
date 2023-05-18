import React, { useContext } from "react";
import image from "./Hero.png";
import { MovieContext } from "../../contexts/MovieContext";
import { useParams } from "react-router-dom";
function MainVideo() {
  const [movies, setMovies] = useContext(MovieContext);
  const { moviesId } = useParams();

  const filteredMovie = movies.find(movie => movie.id === moviesId);

  return (
    <div style={{ marginTop: "284px", position: "relative" }}>
        <img  src={image} alt="Hero" />
        {filteredMovie && (
          <div style={{position: "absolute", top: "10%", left: "18%"}}>
            <iframe
              width="800"
              height="500"
              src={filteredMovie.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
  );
}

export default MainVideo;
