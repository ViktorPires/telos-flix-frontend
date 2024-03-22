import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { ArrowForward } from "@mui/icons-material";
import Header from "../../components/header";
import { MovieContext } from "../../contexts/MovieContext";
import { Link, useParams } from "react-router-dom";
import { Zoom } from "react-reveal";
import PageLoading from "../../components/pageLoading";
import ContentLoading from "../../components/contentLoading";

export default function CardsFilms() {
  const { genre } = useParams();

  const { search, movieGenres, isLoading } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(genre);
  const [movies, setMovies] = useState([]);
  const [isSearchLoading, setSearchIsLoading] = useState(true);

  async function handleMovies() {
    setSearchIsLoading(true);
    const movies = await search(searchTerm, selectedCategory);
    setMovies(movies);
    setSearchIsLoading(false);
  }

  useEffect(() => {
    handleMovies();
  }, [searchTerm, selectedCategory]);

  return isLoading ? (
    <PageLoading />
  ) : (
    <>
      <Header />
      <div data-testid="cards-films-component" className="cardsFilms-container">
        <div className="cardsFilms-content" >
          <div className="input-content-cardsFilms">
            <form action="#" method="get" autoComplete="off">
              <input
                className="input-name-cardsFilm"
                type="text"
                name="nameFilm"
                id="inameFilm"
                placeholder="Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="select-category-cardsFilm"
                name="category"
                id="icategory"
                placeholder="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Category <ArrowForward />
                </option>
                {movieGenres && movieGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="grid-cardsFilms">
            {isSearchLoading ? (
              <ContentLoading text="Searching..." />
            ) : (
              <>
                {movies && movies.length === 0 ? (
                  <h1>No movies were found</h1>
                ) : (
                  movies && movies.map((movie) => (
                    <Zoom key={movie._id} top distance="30%" duraction={1500}>
                      <Link
                        to={`/films/${movie._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="miniVideoCard">
                          <img
                            style={{
                              marginTop: "1rem",
                              objectFit: "cover",
                              height: "100%",
                              borderRadius: 12,
                            }}
                            src={movie.image}
                            alt={movie.title}
                          />
                          <div style={{ margin: "0 auto" }}>
                            <h1 style={{ fontSize: "14px" }}>{movie.title}</h1>
                          </div>
                        </div>
                      </Link>
                    </Zoom>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
