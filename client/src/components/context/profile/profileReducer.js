import { GET_AVG_RATINGS_ISSUER, GET_AVG_RATINGS_FULFILLER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_AVG_RATINGS_ISSUER:
      return {
        ...state,
        avgRatingsIssuer: action.avgRatingsIssuer,
        nbProjectsIssuer: action.nbProjectsIssuer,
        loading: false
      };

    case GET_AVG_RATINGS_FULFILLER:
      return {
        ...state,
        avgRatingsFulfiller: action.avgRatingsFulfiller,
        nbProjectsFulfiller: action.nbProjectsFulfiller,
        loading: false
      };

    default:
      return state;
  }
};
