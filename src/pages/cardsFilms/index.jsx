import React, { useState, useContext } from 'react';
import './index.css';
import { ArrowForward } from '@mui/icons-material';
import HeaderLogin from '../../components/headerLogin';
import { MovieContext } from '../../contexts/MovieContext';

export default function CardsFilms() {
  const [movies] = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const videoIds = movies.slice(0, 20).map((movie) => movie.video.split("v=")[1]);
  const titles = movies.slice(0, 20).map((movie) => movie.title);
  const categories = movies.slice(0, 20).map((movie) => movie.category);

  const filteredMovies = videoIds.filter((videoId, index) => {
    const movieTitle = titles[index];
    const movieCategory = categories[index];
    const isMatch = movieTitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === '') {
      return isMatch;
    } else {
      return isMatch && movieCategory === selectedCategory;
    }
  });

  const genres = [];

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });

  return (
    <>
      <HeaderLogin />
      <div className='cardsFilms-container'>
        <div className='cardsFilms-content'>
          <div className='input-content-cardsFilms'>
            <form action="#" method="get" autoComplete='off'>
              <input
                className='input-name-cardsFilm'
                type="text"
                name='nameFilm'
                id='inameFilm'
                placeholder='Nome'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className='select-category-cardsFilm'
                name="category"
                id="icategory"
                placeholder='Categoria'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>Categoria <ArrowForward /></option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </form>
          </div>
          <div className='grid-cardsFilms'>
            {filteredMovies.map((videoId, index) => (
              <div className="miniVideoCard" key={videoId}>
                <iframe
                  style={{ marginTop: "1rem" }}
                  width="300"
                  height="220"
                  src={`https://www.youtube.com/embed/${videoId}`}
                ></iframe>
                <div style={{margin: "0 auto"}}> 
                <p style={{fontSize: "14px"}}>{titles[index]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}