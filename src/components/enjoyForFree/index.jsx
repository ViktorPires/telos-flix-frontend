import { CardGiftcardOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";

function EnjoyForFree() {
  const { freeMovies } = useContext(MovieContext);

  return (
    <div data-testid="enjoy-for-free-component" className="enjoyForContainer">
      <div className="enjoyForfreeSection">
        <div className="labelSection">
          <CardGiftcardOutlined /> Enjoy For Free
        </div>

        <div className="enjoyForfreeVideosGrid">
          {freeMovies.map((movie, index) => (
            <Link to={`/films/${movie._id}`}>
              <div className="miniFilmsCardEnjoyForFree" key={index}>
                {console.log(index)}
                <img style={{ width: "400px", height: "500px", objectFit: "contain", borderRadius: "18px" }} src={movie.image} alt="" />
              </div>
              <h1 style={{ fontSize: "14px", marginTop: "-3rem" }}>{movie.title}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnjoyForFree;