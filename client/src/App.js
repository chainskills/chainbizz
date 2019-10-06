import React, { Fragment, useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import ProjectState from './components/context/projects/ProjectState';

import NavBar from './components/layout/NavBar';
import Projects from './components/pages/Projects';

const App = ({ drizzleContext }) => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  const { drizzleState, drizzle, initialized } = drizzleContext;
  console.log(drizzleContext);

  return (
    <ProjectState>
      <Fragment>
        <NavBar drizzleState={drizzleState} />

        <Projects drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>
      </Fragment>
    </ProjectState>
  );
};

export default App;
