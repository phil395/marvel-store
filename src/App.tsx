import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import api from 'marvel-store-api';

import TopPanel from "./components/TopPanel";
import CharactersPage from './pages/Characters';
import ComicsPage from './pages/Comics';
import SingleComicPage from './pages/SingleComic';
import NotFoundPage from './pages/404';


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
        <Route path='/characters/:id' element={<NotFoundPage message='Sorry, page not implemented yet' />} />
        <Route path='/comics' element={<ComicsPage />} />
        <Route path='/comics/:id' element={<SingleComicPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
