import { SignalCellularAltOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import "./index.css";
import { MovieContext } from "../../contexts/MovieContext";
import { Link } from "react-router-dom";
function Trending() {
  const { movies } = useContext(MovieContext);

  return (
    <div data-testid="trending-component" className="trendingSection">
      <div className="labelSection">
        <SignalCellularAltOutlined /> Trending
      </div>
      <div className="trendingVideosGrid">
        {movies.slice(10, 13).map((movie, index) => (
          <Link to={`/films/${movie._id}`}>
            <div className="miniFilmsCardTrending" key={index}>
              <img
                style={{
                  width: "400px",
                  height: "500px",
                  objectFit: "contain",
                  borderRadius: "18px",
                  marginTop: "2.5rem",
                }}
                src={movie.image}
                alt=""
              />
            </div>
          </Link>
        ))}
        {movies.slice(10, 13).map((movie) => (
          <h1 style={{ fontSize: "14px", marginTop: "-3rem" }}>
            {movie.title}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default Trending;
