import { CardGiftcardOutlined, SignalCellularAltOutlined } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import MiniVideoCard from "../miniVideoCard";
import { MovieContext } from "../../contexts/MovieContext";
function EnjoyForFree() {
  const [list, setList] = useState([]);
  const [movies, setMovies] = useContext(MovieContext);
  
  useEffect(() => {
       setList(movies)
       console.log("list" + list)
  },[])
  


  return (
    <div className="enjoyForfreeSection">
      <div className="labelSection">
        <CardGiftcardOutlined /> Aproveite grátis
      </div>
      <div className="enjoyForfreeVideosGrid">
        {movies.map((movie) => (
          <div className="miniVideoCard">
           <iframe
              width="800"
              height="500"
              src={movie.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnjoyForFree;
