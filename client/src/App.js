import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path';
import { AddMovie, Admin, AdminMovieEpisode, AdminMovieSeries, AdminMovieSingle } from './pages/admin/index'
import { CategoryMovie, Home, MovieEpisode, MovieSeries, MovieSingle, MovieSingleOrSeries, NationMovie, Public, Year} from './pages/public/index';



function App() {

  return (
    <div className="font-main relative bg-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.SearchPage} element={<Home/>}/>
          <Route path={path.MovieSingleOrSeries} element={<MovieSingleOrSeries/>}/>
          <Route path={path.MovieSingleOrSeriesPage} element={<MovieSingleOrSeries/>}/>
          <Route path={path.MovieSingle} element={<MovieSingle/>}/>
          <Route path={path.MovieSeries} element={<MovieSeries/>}/>
          <Route path={path.MovieEpisode} element={<MovieEpisode/>}/>
          <Route path={path.Nation} element={<NationMovie/>}/>
          <Route path={path.NationPage} element={<NationMovie/>}/>
          <Route path={path.Category} element={<CategoryMovie/>}/>
          <Route path={path.CategoryPage} element={<CategoryMovie/>}/>
          <Route path={path.Year} element={<Year/>}/>
          <Route path={path.YearPage} element={<Year/>}/>
        </Route>
        <Route path={path.Admin} element={<Admin/>}>
          <Route path={path.AdminMovieSingle} element={<AdminMovieSingle/>}/>
          <Route path={path.AdminMovieSeries} element={<AdminMovieSeries/>}/>
          <Route path={path.AdminMovieSinglePage} element={<AdminMovieSingle/>}/>
          <Route path={path.AdminMovieSeriesPage} element={<AdminMovieSeries/>}/>
          <Route path={path.AddMovie} element={<AddMovie/>}/>
          <Route path={path.AdminMovieEpisode} element={<AdminMovieEpisode/>}/>
          <Route path={path.AdminMovieEpisodePage} element={<AdminMovieEpisode/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
