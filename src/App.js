import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import SingleMovie from './components/SingleMovie';
import Error from './components/Error';
import Footer from './components/Footer';

import './App.css'

function App() {
  return (
    <>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='movie/:id' element={<SingleMovie/>}/>
  <Route path='*' element={<Error/>}/>
</Routes>

<Footer/>
    </>
    
  );
}

export default App;
