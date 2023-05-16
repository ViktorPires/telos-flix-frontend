import React from 'react'
import './index.css'
import { ArrowForward } from '@mui/icons-material'

export default function CardsFilms() {
  return (
    <div className='cardsFilms-container'>
       <div className='cardsFilms-content'>
            <div className='input-content-cardsFilms'>
                <form action="#" method="get" autoComplete='off'>
                    <input className='input-name-cardsFilm' type="text" name='nameFilm' id='inameFilm' placeholder='Nome'/>
                    <select className='select-category-cardsFilm' name="category" id="icategory" placeholder='Categoria'>
                        <option selected disabled>Categoria <ArrowForward/></option>
                    </select>
                </form>
            </div>


            <div className='grid-cardsFilms'>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
                <div>Title</div>
            </div>
        </div>
    </div>
  )
}