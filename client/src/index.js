import React from 'react';
import ReactDOM from 'react-dom';

import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle, generateStore } from '@drizzle/store';

import drizzleOptions from './store/drizzle/drizzleOptions';

import App from './App';

// configure drizzle
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

/*
  // disable auto-refresh page when network is changed
  window.ethereum.autoRefreshOnNetworkChange = false;

  // detect account changes using Metamask
  window.ethereum.on('accountsChanged', function(accounts) {
    console.log('New account is: ' + accounts[0]);
    //console.log(drizzleState);
  });

  // detect network changes using Metamask
  window.ethereum.on('networkChanged', function(network) {
    console.log('New network ID is: ' + network);
  });
  */

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
      {drizzleContext => {
        return <App drizzleContext={drizzleContext} />;
      }}
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>,
  document.getElementById('root')
);
