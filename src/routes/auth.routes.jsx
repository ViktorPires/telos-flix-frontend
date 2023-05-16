import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import MovieProvider from "../contexts/MovieProvider";
export default  function AuthRoutes() {
  return (

      <Routes>
        <Route element={<Home />} path="/" exact />
      </Routes>
  );
}
