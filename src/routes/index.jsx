import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Films from "../pages/Films";
import MovieProvider from "../contexts/MovieProvider";
import CommentProvider from "../contexts/CommentProvider";
import UserProvider from "../contexts/UserProvider";
import Person from "../pages/Person";
import AuthenticateProvider from "../contexts/AuthenticateProvider";
import CardsFilms from "../pages/cardsFilms";
import Video from "../pages/video";

export default function AppRoutes() {
  return (
    <AuthenticateProvider>
      <UserProvider>
        <MovieProvider>
          <Routes>
            <Route element={<Home />} path="/" exact />
            <Route
              element={
                <CommentProvider>
                  <Films />
                </CommentProvider>
              }
              path="/films/:id"
              exact
            />
            <Route element={<Person />} path="/person" exact />
            <Route element={<CardsFilms />} path="/cardsFilms/:genre?" exact />
            <Route element={<Video />} path="/video/:id" exact />
          </Routes>
        </MovieProvider>
      </UserProvider>
    </AuthenticateProvider>
  );
}
