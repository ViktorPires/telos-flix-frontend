import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Films from "../pages/Films";
import MovieProvider from "../contexts/MovieProvider";
import Person from "../pages/Person";
import AuthenticateProvider from "../contexts/AuthenticateProvider";
import CardsFilms from "../pages/cardsFilms";
import Video from "../pages/video";




export default function AppRoutes() {
  return (

    <AuthenticateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={
            <MovieProvider>
              <Home />
            </MovieProvider>
          } path="/" exact />

          <Route element={
            <MovieProvider>
              <Films />
            </MovieProvider>
          } path="/films/:id" exact />

          <Route element={
            <Person />
          } path="/person" exact />

          <Route element={
            <MovieProvider>
              <CardsFilms />
            </MovieProvider>
          } path="/cardsFilms" exact />

          <Route element={
            <MovieProvider>
              <Video />
            </MovieProvider>
          } path="/video/:id" exact />

        </Routes>
      </BrowserRouter>
    </AuthenticateProvider>

  );
}
