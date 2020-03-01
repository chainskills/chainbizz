import React, { Fragment, useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import ProjectState from './components/context/projects/ProjectState';
import EventState from './components/context/events/EventState';
import AuthState from './components/context/auth/AuthState';
import NotificationState from './components/context/notifications/NotificationState';

import NavBar from './components/layout/NavBar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ProjectDetail from './components/pages/project/ProjectDetail';
import EventSettings from './components/pages/settings/EventSettings';
import Project from './components/pages/Project';
import MyDraftProjects from './components/pages/MyDraftProjects';
import MyProjects from './components/pages/MyProjects';
import PublishedProjects from './components/pages/PublishedProjects';
import MyOffers from './components/pages/MyOffers';
import OffersReview from './components/pages/OffersReview';
import MyContracts from './components/pages/MyContracts';
import DeliveriesReview from './components/pages/DeliveriesReview';
import Completed from './components/pages/Completed';
import Canceled from './components/pages/Canceled';

import history from './components/pages/route/history';
import UserProfile from './components/pages/profile/UserProfile';

const App = ({ drizzleContext }) => {
  const { drizzleState, drizzle, initialized } = drizzleContext;
  const [account, setAccount] = useState(null);
  const [eventNewProject, setEventNewProject] = useState(null);

  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (initialized === true) {
      setAccount(drizzleState.accounts[0]);
    }
  }, [initialized, drizzleState]);

  if (initialized === false || account === null) {
    return (
      <NotificationState>
        <AuthState>
          <EventState>
            <Router history={history}>
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
          </EventState>
        </AuthState>
      </NotificationState>
    );
  }

  // enable auto-refresh page when network is changed
  window.ethereum.autoRefreshOnNetworkChange = true;

  // detect account changes using Metamask
  window.ethereum.on('accountsChanged', function(accounts) {
    // reload the app when the account changes to ensure that all context and caches are properly cleaned
    window.location.reload();
  });

  return (
    <NotificationState>
      <AuthState>
        <EventState>
          <ProjectState>
            <Router history={history}>
              <Fragment>
                <NavBar account={account} />

                <Project drizzle={drizzle} account={account} />

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

                      <Route exact path='/login' component={Login} />

                      <Route exact path='/register' component={Register} />

                      <Route
                        exact
                        path='/profile'
                        render={() => (
                          <UserProfile drizzle={drizzle} account={account} />
                        )}
                      />

                      <Route
                        exact
                        path='/events'
                        render={() => <EventSettings drizzle={drizzle} />}
                      />

                      <Route
                        exact
                        path='/project/:id'
                        render={({ match }) => (
                          <ProjectDetail
                            drizzle={drizzle}
                            account={account}
                            match={match}
                            draft={false}
                          />
                        )}
                      />

                      <Route
                        exact
                        path='/project/draft/:id'
                        render={({ match }) => (
                          <ProjectDetail
                            drizzle={drizzle}
                            account={account}
                            match={match}
                            draft={true}
                          />
                        )}
                      />

                      <Route
                        exact
                        path='/myprojects'
                        render={() => (
                          <MyDraftProjects
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            account={account}
                          />
                        )}
                      />

                      <Route
                        exact
                        path='/myoffers'
                        render={() => (
                          <MyOffers
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            account={account}
                          />
                        )}
                      />

                      <Route
                        exact
                        path='/myreviews'
                        render={() => (
                          <OffersReview
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            account={account}
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
                            account={account}
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
                            account={account}
                          />
                        )}
                      />

                      <Route
                        exact
                        path='/completed'
                        render={() => (
                          <Completed
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            account={account}
                          />
                        )}
                      />

                      <Route
                        exact
                        path='/canceled'
                        render={() => (
                          <Canceled
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            account={account}
                          />
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
        </EventState>
      </AuthState>
    </NotificationState>
  );
};

export default App;
