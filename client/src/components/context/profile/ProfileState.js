import React, { useReducer, useState, useEffect } from 'react';
import _ from 'lodash';

import ProfileContext from './profileContext';
import profileReducer from './profileReducer';

import { GET_AVG_RATINGS_FULFILLER, GET_AVG_RATINGS_ISSUER } from '../types';

const ProfileState = props => {
  const initialState = {
    nbProjectsIssuer: 0,
    nbProjectsFulfiller: 0,
    avgRatingsFulfiller: null,
    avgRatingsIssuer: null
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Retrieve all ratings received as issuer
  const getAvgRatingsIssuer = async (drizzle, account) => {
    const { ChainBizz } = drizzle.contracts;

    // retrieve the ratings
    const issuer = await ChainBizz.methods.getRatingsAsIssuer().call({
      from: account
    });

    let ratingsIssuer = Array.from(issuer.ratings, value => Number(value));
    for (let i = 0; i < issuer.nbProjects; i++) {
      ratingsIssuer[i] = ratingsIssuer[i] / issuer.nbProjects;
    }

    const avgRatingsIssuer = _.mean(ratingsIssuer).toFixed(1);

    dispatch({
      type: GET_AVG_RATINGS_ISSUER,
      avgRatingsIssuer: avgRatingsIssuer > 0 ? avgRatingsIssuer : null,
      nbProjectsIssuer: issuer.nbProjects
    });
  };

  // Retrieve all ratings received as fulfiller
  const getAvgRatingsFulfiller = async (drizzle, account) => {
    const { ChainBizz } = drizzle.contracts;

    // retrieve the ratings
    const fulfiller = await ChainBizz.methods.getRatingsAsFulfiller().call({
      from: account
    });

    let ratingsFulfiller = Array.from(fulfiller.ratings, value =>
      Number(value)
    );

    for (let i = 0; i < fulfiller.nbProjects; i++) {
      ratingsFulfiller[i] = ratingsFulfiller[i] / fulfiller.nbProjects;
    }

    const avgRatingsFulfiller = _.mean(ratingsFulfiller).toFixed(1);

    dispatch({
      type: GET_AVG_RATINGS_FULFILLER,
      avgRatingsFulfiller: avgRatingsFulfiller > 0 ? avgRatingsFulfiller : null,
      nbProjectsFulfiller: fulfiller.nbProjects
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        nbProjectsIssuer: state.nbProjectsIssuer,
        nbProjectsFulfiller: state.nbProjectsFulfiller,
        avgRatingsFulfiller: state.avgRatingsFulfiller,
        avgRatingsIssuer: state.avgRatingsIssuer,
        getAvgRatingsIssuer,
        getAvgRatingsFulfiller
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
