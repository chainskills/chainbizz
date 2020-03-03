import React, { useState, useEffect, useContext } from 'react';

import { createBrowserHistory } from 'history';

import _ from 'lodash';

import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import Rating from 'react-rating';

import ProfileContext from '../../context/profile/profileContext';

import 'materialize-css/dist/css/materialize.min.css';

import starfull from '../../../assets/images/starfull.png';
import starempty from '../../../assets/images/starempty.png';

import PublishedProjects from '../PublishedProjects';
import Completed from '../Completed';
import Canceled from '../Canceled';

import './UserProfile.css';

const UserProfile = ({ match, drizzleState, drizzle }) => {
  let account = null;
  try {
    account = match.params.account;
  } catch (error) {
    // unable to process input argument
  }

  const goBack = () => {
    // go back to the previous page
    const history = createBrowserHistory();
    history.goBack();
  };

  if (account === null) {
    goBack();
  }

  const [balance, setBalance] = useState(0);
  const [listProjects, setListProjects] = useState("published");
  
  const profileContext = useContext(ProfileContext);
  const {
    nbProjectsIssuer,
    nbProjectsFulfiller,
    avgRatingsFulfiller,
    avgRatingsIssuer,
    getAvgRatingsIssuer,
    getAvgRatingsFulfiller,
  } = profileContext;

  useEffect(() => {
    getAvgRatingsIssuer(drizzle, account);
    getAvgRatingsFulfiller(drizzle, account);
  }, []);

  useEffect(() => {
    async function getBalance() {
      const accountBalance = await drizzle.web3.eth.getBalance(
        account,
      );
      setBalance(Number(drizzle.web3.utils.fromWei(accountBalance)));
    }
    getBalance();
  }, [account]);

  const onSelectPublished = e => {
    setListProjects("published");
  };

  const onSelectCompleted = e => {
    setListProjects("completed");
  };

  const onSelectCanceled = e => {
    setListProjects("canceled");
  };

  return (
    <div>
      <div className="row">
        <div className="col s12 m12">
          <div className="single__header">
            <a
              className="btn-flat waves-effect waves-light no-uppercase back-button"
              style={{ width: '150px' }}
              onClick={() => goBack()}
            >
              <i className="material-icons">arrow_back</i>
              <span>Back</span>
            </a>
          </div>
        </div>
        <div className="col s12 center-align">
          <JazzIcon
            diameter={60}
            seed={jsNumberForAddress(account)}
          />
        </div>
        <div className="col s12 center-align">{account}</div>
        <div className="col s12 center-align">
          {balance.toFixed(2)} ETH
        </div>
      </div>
      <div className="col s12 m12">
        <div className="card card-custom">
          <div className="card-content">
            <div>
              <div className="row">
                <div className="col s12 m12 l6 xl6">
                  {nbProjectsIssuer > 0 && (
                    <div>
                      <span className="card-title activator grey-text text-darken-4">
                        Review as issuer on {nbProjectsIssuer} project
                        {nbProjectsIssuer > 1 ? 's' : ''}
                      </span>
                      <Rating
                        emptySymbol={
                          <img
                            src={starempty}
                            className="icon ratingsIcon"
                          />
                        }
                        fullSymbol={
                          <img
                            src={starfull}
                            className="icon ratingsIcon"
                          />
                        }
                        readonly
                        initialRating={avgRatingsIssuer}
                      />
                    </div>
                  )}
                </div>
                <div className="col s12 m12 l6 xl6">
                  {nbProjectsFulfiller > 0 && (
                    <div>
                      <span className="card-title activator grey-text text-darken-4">
                        Review as fulfiller on {nbProjectsFulfiller}{' '}
                        project
                        {nbProjectsFulfiller > 1 ? 's' : ''}
                      </span>
                      <Rating
                        emptySymbol={
                          <img
                            src={starempty}
                            className="icon ratingsIcon"
                          />
                        }
                        fullSymbol={
                          <img
                            src={starfull}
                            className="icon ratingsIcon"
                          />
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

        <div className="row">
          <div className="col s12 m12 l8 xl8">
            <label id="published">
              <input
                className="with-gap"
                name="group1"
                type="radio"
                label="published"
                defaultChecked
                htmlFor="published"
                onClick={onSelectPublished}
              />
              <span style={{ marginRight: '30px' }}>Published</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="group1"
                type="radio"
                onClick={onSelectCompleted}
              />
              <span style={{ marginRight: '30px' }}>Completed</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="group1"
                type="radio"
                onClick={onSelectCanceled}
              />
              <span>Canceled</span>
            </label>
          </div>

          {/* <div className="col s12 m12 l4 xl4">
            <label>
              <input
                className="with-gap"
                name="group2"
                type="radio"
              />
              <span style={{ marginRight: '30px' }}>Issuer</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="group2"
                type="radio"
              />
              <span>Fulfiller</span>
            </label>
          </div> */}
        </div>
        {listProjects === "published" && (
          <PublishedProjects
            drizzle={drizzle}
            drizzleState={drizzleState}
            account={account}
          />
        )}

        {listProjects === "completed" && (
          <Completed
            drizzle={drizzle}
            drizzleState={drizzleState}
            account={account}
          />
        )}

        {listProjects === "canceled" && (
          <Canceled
            drizzle={drizzle}
            drizzleState={drizzleState}
            account={account}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
