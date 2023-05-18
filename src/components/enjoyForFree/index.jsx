import { CardGiftcardOutlined, SignalCellularAltOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import MiniVideoCard from "../miniVideoCard";
import { MovieContext } from "../../contexts/MovieContext";
import { useParams } from "react-router-dom";
function EnjoyForFree() {
  const [movies, setMovies] = useContext(MovieContext);
  const { moviesId } = useParams();



  return (
    <div className="enjoyForfreeSection">
      <div className="labelSection">
        <CardGiftcardOutlined /> Aproveite grátis
      </div>
      <div className="enjoyForfreeVideosGrid">
        {movies.map((movie) => (
          <div className="miniVideoCard">
            <img style={{width: "200px"}} src={movie.posterImage} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnjoyForFree;
