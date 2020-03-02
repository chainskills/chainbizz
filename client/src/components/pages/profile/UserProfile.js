import React, { useState, useEffect, useContext } from 'react';

import _ from 'lodash';

import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import Rating from 'react-rating';

import ProfileContext from '../../context/profile/profileContext';

import 'materialize-css/dist/css/materialize.min.css';

import starfull from '../../../assets/images/starfull.png';
import starempty from '../../../assets/images/starempty.png';

import './UserProfile.css';

const UserProfile = ({ drizzle, account }) => {
  const [balance, setBalance] = useState(0);

  const profileContext = useContext(ProfileContext);
  const {
    nbProjectsIssuer,
    nbProjectsFulfiller,
    avgRatingsFulfiller,
    avgRatingsIssuer,
    getAvgRatingsIssuer,
    getAvgRatingsFulfiller
  } = profileContext;

  useEffect(() => {
    getAvgRatingsIssuer(drizzle, account);
    getAvgRatingsFulfiller(drizzle, account);
  }, []);

  useEffect(() => {
    async function getBalance() {
      const accountBalance = await drizzle.web3.eth.getBalance(account);
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
      <div className='col s12 m12'>
        <div className='card card-custom'>
          <div className='card-content'>
            <div>
              <div className='row'>
                <div className='col s12 m12 l6 xl6'>
                  {nbProjectsIssuer > 0 && (
                    <div>
                      <span className='card-title activator grey-text text-darken-4'>
                        Review as issuer on {nbProjectsIssuer} project
                        {nbProjectsIssuer > 1 ? 's' : ''}
                      </span>
                      <Rating
                        emptySymbol={
                          <img src={starempty} className='icon ratingsIcon' />
                        }
                        fullSymbol={
                          <img src={starfull} className='icon ratingsIcon' />
                        }
                        readonly
                        initialRating={avgRatingsIssuer}
                      />
                    </div>
                  )}
                </div>
                <div className='col s12 m12 l6 xl6'>
                  {nbProjectsFulfiller > 0 && (
                    <div>
                      <span className='card-title activator grey-text text-darken-4'>
                        Review as fulfiller on {nbProjectsFulfiller} project
                        {nbProjectsFulfiller > 1 ? 's' : ''}
                      </span>
                      <Rating
                        emptySymbol={
                          <img src={starempty} className='icon ratingsIcon' />
                        }
                        fullSymbol={
                          <img src={starfull} className='icon ratingsIcon' />
                        }
                        readonly
                        initialRating={avgRatingsFulfiller}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
