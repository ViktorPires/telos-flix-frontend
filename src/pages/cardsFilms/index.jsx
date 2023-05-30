import React, { useState, useContext } from 'react';
import './index.css';
import { ArrowForward } from '@mui/icons-material';
import Header from '../../components/header';
import { MovieContext } from '../../contexts/MovieContext';

export default function CardsFilms() {
  const [movies] = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log(movies)


  const genres = [];

  return (
    <>
      <Header />      <div className='cardsFilms-container'>
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
            {movies.map((movie, index) => (
              <div className="miniVideoCard" key={movie.id}>
                <img
                  style={{ marginTop: "1rem" }}
                  src={movie.image}
                  alt={movie.title}
                />
                <div style={{ margin: "0 auto" }}>
                  <h1 style={{ fontSize: "14px" }}>{movie.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}