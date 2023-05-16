import React from 'react'
import './index.css'
import { ArrowForward } from '@mui/icons-material'

export default function CreateFilms() {
  return (
    <div className='crateFilms-container'>
       <div className='crateFilms-content'>
            <div className='createFilmsTitle'>Cadastrar filme</div>
            <form action="#" method="post" autoComplete='off'>
              <div className='input-nameFilm'>
                <label htmlFor="inameFilm">Nome do filme</label>
                <input type="text" name='namefilm'id='inameFilm' placeholder='Até 30 caracteres'/>
                <a>Esse nome será exibido em todos os locais da plataforma</a>
              </div>

              <div className='input-descriptionFilm'>
                <label htmlFor="idescriptionFilm">Descrição</label>
                <textarea name="descriptionFilm" id="idescriptionFilm" maxLength='200' placeholder='Até 200 caracteres'></textarea>
              </div>

              <div className='input-genderDate-content'>
                <div className='input-dateFilm'>
                  <label htmlFor="idateFilm">Ano</label>
                  <select className='selectDate' name="dateFilm" id="idateFilm">
                    <option value="2023">2010</option>
                    <option value="2023">2011</option>
                    <option value="2023">2012</option>
                    <option value="2023">2013</option>
                    <option value="2023">2014</option>
                    <option value="2023">2015</option>
                    <option value="2023">2016</option>
                    <option value="2023">2017</option>
                    <option value="2023">2018</option>
                    <option value="2023">2019</option>
                    <option value="2023">2020</option>
                    <option value="2023">2021</option>
                    <option value="2023">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className='input-genderFilm'>
                  <label htmlFor="igenderFilm">Gênero</label>
                  <select className='selectGender' name="genderFilm" id="igenderFilm">
                    <option value="Ação">Ação</option>
                    <option value="Comédia">Comédia</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasia">Fantasia</option>
                    <option value="FicçãoCiêntifica">Ficção Ciêntifica</option>
                    <option value="Romance">Romance</option>
                    <option value="Suspense">Suspense</option>
                    <option value="Clássico">Clássico</option>
                  </select>
                </div>
              </div>

              <div className='input-urlContent'>
                <div className='input-urlBanner'>
                  <label htmlFor="iurlBanner">Url do banner</label>
                  <input type="url" name="urlBanner" id="iurlBanner" />
                </div>  
                <div className='input-urlVideo'>
                  <label htmlFor="iurlVideo">Url do vídeo</label>
                  <input type="url" name="urlVideo" id="iurlVideo" />
                </div>
              </div>
            </form>

            <div className='button-container-createFilms'>
              <button className='cancel-and-return-createFilms'>Cancelar e voltar</button>
              <button className='register-createFilms'>
                <span>Cadastrar</span> 
                <ArrowForward style={
                  {
                    color: '#212121',
                    opacity: '0.5'
                  }}
                /> 
              </button>
            </div>

        </div>
    </div>
  )
}