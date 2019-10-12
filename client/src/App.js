import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import ProjectState from './components/context/projects/ProjectState';

import NavBar from './components/layout/NavBar';
import Project from './components/pages/Project';
import MyProjects from './components/pages/MyProjects';
import PublishedProjects from './components/pages/PublishedProjects';
import MyOffers from './components/pages/MyOffers';
import OffersReview from './components/pages/OffersReview';
import MyContracts from './components/pages/MyContracts';
import DeliveriesReview from './components/pages/DeliveriesReview';
import Completed from './components/pages/Completed';
import Canceled from './components/pages/Canceled';

const App = ({ drizzleContext }) => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  const { drizzleState, drizzle, initialized } = drizzleContext;

  return (
    <ProjectState>
      <Router>
        <Fragment>
          <NavBar drizzle={drizzle} drizzleState={drizzleState} />

          <Project drizzle={drizzle} drizzleState={drizzleState} />

          <div className='container'>
            {!initialized && (
              <div>
                <h2>Preparing the Dapp</h2>
                <div className='progress'>
                  <div className='indeterminate' />
                </div>
              </div>
            )}

            {initialized && (
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => (
                    <PublishedProjects
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                    />
                  )}
                />

                <Route
                  exact
                  path='/myprojects'
                  render={() => (
                    <MyProjects drizzle={drizzle} drizzleState={drizzleState} />
                  )}
                />

                <Route
                  exact
                  path='/myoffers'
                  render={() => (
                    <MyOffers drizzle={drizzle} drizzleState={drizzleState} />
                  )}
                />

                <Route
                  exact
                  path='/myreviews'
                  render={() => (
                    <OffersReview
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                    />
                  )}
                />

                <Route
                  exact
                  path='/mycontracts'
                  render={() => (
                    <MyContracts
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                    />
                  )}
                />

                <Route
                  exact
                  path='/deliveries'
                  render={() => (
                    <DeliveriesReview
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                    />
                  )}
                />

                <Route
                  exact
                  path='/completed'
                  render={() => (
                    <Completed drizzle={drizzle} drizzleState={drizzleState} />
                  )}
                />

                <Route
                  exact
                  path='/canceled'
                  render={() => (
                    <Canceled drizzle={drizzle} drizzleState={drizzleState} />
                  )}
                />

                <Route
                  exact
                  path='/home'
                  render={() => (
                    <PublishedProjects
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                    />
                  )}
                />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    </ProjectState>
  );
};

export default App;
