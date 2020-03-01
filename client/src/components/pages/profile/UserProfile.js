import React, { useState, useEffect, useContext } from 'react';
import { createBrowserHistory } from 'history';

import _ from 'lodash';

import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import 'materialize-css/dist/css/materialize.min.css';

import './UserProfile.css';

const UserProfile = ({ drizzle, account }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getBalance() {
      const accountBalance = await drizzle.web3.eth.getBalance(account);
      console.log(accountBalance);
      setBalance(Number(drizzle.web3.utils.fromWei(accountBalance)));
    }
    getBalance();
  }, [account]);

  return (
    <div>
      <div className='row'>
        <div className='col s12 center-align'>
          <JazzIcon diameter={60} seed={jsNumberForAddress(account)} />
        </div>
        <div className='col s12 center-align'>{account}</div>
        <div className='col s12 center-align'>{balance.toFixed(2)} ETH</div>
      </div>
    </div>
  );
};

export default UserProfile;
