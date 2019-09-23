import React, { useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import NavBar from './components/layout/NavBar';

const App = () => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <NavBar />
    </div>
  );
};

export default App;
