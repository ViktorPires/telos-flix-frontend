import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import HomeLogin from "../pages/homeLogin";
import Films from "../pages/Films";
import MovieProvider from "../contexts/MovieProvider";
import Person from "../pages/Person";
import { AuthProvider } from "../hooks/auth";
import CreateFilms from "../pages/createFilms";
import CardsFilms from "../pages/cardsFilms";




export default function () {
  return (

    <AuthProvider> 
    <BrowserRouter>
      <Routes>
        <Route element={
          <MovieProvider>
            <Home />
          </MovieProvider>
        } path="/" exact />

        <Route element={
          <MovieProvider>
            <HomeLogin />
          </MovieProvider>
        } path="/homeLogin" exact />

        <Route element={
          <MovieProvider>
        <Films />
        </MovieProvider>
        } path="/films" exact />
        <Route element={
          <Person />
        } path="/person" exact />

         <Route element={
          <MovieProvider>
            <CreateFilms />
          </MovieProvider>
        } path="/createFilms" exact />

       <Route element={
          <MovieProvider>
            <CardsFilms />
          </MovieProvider>
        } path="/cardsFilms" exact />

      </Routes>
    </BrowserRouter>
    </AuthProvider>

  );
}
