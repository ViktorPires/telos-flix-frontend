import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import HomeLogin from "../pages/homeLogin";
import Films from "../pages/Films";
import Video from "../pages/video";
import MovieProvider from "../contexts/MovieProvider";




export default function () {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={
          <MovieProvider>
        <Home />
        </MovieProvider>
        } path="/" exact />
        <Route element={<HomeLogin />} path="/homeLogin" exact />
        <Route element={<Films />} path="/films" exact />

        <Route element={
          <MovieProvider>
            <Video />
          </MovieProvider>
        } path="/video" exact />

      </Routes>
    </BrowserRouter>
  );
}
