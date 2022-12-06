import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import api from 'marvel-store-api';

import TopPanel from "./components/TopPanel";
import CharactersPage from './pages/characters';
import Comics from './pages/comics';
import SingleComic from './pages/SingleComic';


const App: FC = () => {
  useEffect(() => {
    api.restoreState();
  }, []);
  return (
    <>
      <TopPanel />

      <Routes>
        <Route path='/' element={<CharactersPage />} />
        <Route path='/characters' element={<Navigate to='/' />} />
        <Route path='/comics' element={<Comics />} />
        <Route path='/comics/:id' element={<SingleComic />} />
        <Route path='*' element={null} />
      </Routes>
    </>
  );
};

export default App;
