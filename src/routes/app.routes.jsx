import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieProvider from "../contexts/MovieProvider";
import Films from "../pages/Films";


export default  function AppRoutes() {
  return (
      <Routes>
        <Route element={
          <MovieProvider>
          <Films/>
        </MovieProvider>
        } path="/" exact />
      </Routes>
  );
}
