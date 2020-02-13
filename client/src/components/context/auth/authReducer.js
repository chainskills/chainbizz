import {
  CURRENT_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  RESET_SUCCESS,
  RESET_FAIL,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CURRENT_USER:
      console.log('action.payload: ' + action.payload);
      return {
        ...state,
        isAuthenticated: action.payload ? true : false,
        name: action.payload ? action.payload.displayName : null,
        email: action.payload ? action.payload.email : null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        reset: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        reset: false
      };
    case REGISTER_FAIL:
    case RESET_FAIL:
      return {
        ...state,
        reset: false,
        isAuthenticated: false,
        error: action.payload
      };
    case RESET_SUCCESS:
      return {
        ...state,
        reset: true,
        isAuthenticated: false
      };
    case LOGOUT:
      console.log('Into logout');
      return {
        ...state,
        isAuthenticated: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
