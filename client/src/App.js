import React, { Fragment, useEffect, useState } from 'react';
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
  const { drizzleState, drizzle, initialized } = drizzleContext;
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (initialized === true) {
      //console.log('Effect -> Initialized: ' + initialized);
      //console.log('Effect -> Account: ' + drizzleState.accounts[0]);
      setAccount(drizzleState.accounts[0]);
    }
  }, [initialized, drizzleState]);

  if (initialized === false || account === null) {
    return (
      <Router>
        <Fragment>
          <NavBar account={account} />

          <div className='container'>
            {!initialized && (
              <div>
                <h2>Preparing the Dapp</h2>
                <div className='progress'>
                  <div className='indeterminate' />
                </div>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }

  // disable auto-refresh page when network is changed
  window.ethereum.autoRefreshOnNetworkChange = false;

  // detect account changes using Metamask
  window.ethereum.on('accountsChanged', function(accounts) {
    console.log('Meta-mask: ' + accounts[0]);
    if (initialized) {
      //console.log(drizzleContext);
      console.log('Drizzle: ' + drizzleState.accounts[0]);
      setAccount(accounts[0]);
    }
  });

  /*
  // detect network changes using Metamask
  window.ethereum.on('networkChanged', function(network) {
    console.log('New network ID is: ' + network);
  });
  */

  //setAccount(drizzleState.accounts[0]);
  console.log('Account: ' + account);
  //console.log('Initialized: ' + initialized);
  return (
    <ProjectState>
      <Router>
        <Fragment>
          <NavBar account={account} />

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
                      account={account}
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
