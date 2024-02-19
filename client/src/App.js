import React from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path';
import { CategoryMovie, Home, Movie, MovieLeOrBo, NationMovie, Public, Year } from './pages/public/index';


function App() {
  return (
    <div className="font-main relative bg-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.MovieLeOrBo} element={<MovieLeOrBo/>}/>
          <Route path={path.Movie} element={<Movie/>}/>
          <Route path={path.Nation} element={<NationMovie/>}/>
          <Route path={path.Category} element={<CategoryMovie/>}/>
          <Route path={path.Year} element={<Year/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
