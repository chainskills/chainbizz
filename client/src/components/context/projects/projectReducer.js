import { ADD_PROJECT, PROJECT_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
