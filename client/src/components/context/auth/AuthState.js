import React, { useReducer, useContext, useEffect } from 'react';

import { firebaseAuth } from '../../../firebase/firebase';

import AuthContext from './authContext';
import authReducer from './authReducer';
import NotificationContext from '../notifications/notificationContext';

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

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    email: null,
    name: null,
    error: null,
    reset: null
  };

  useEffect(() => {
    console.log('Into useEffect');
    firebaseAuth.onAuthStateChanged(function(user) {
      console.log('Into useEffect 2');
      console.log(user);
      if (user) {
        dispatch({
          type: CURRENT_USER,
          payload: user
        });
      }
    });
  }, []);

  const notificationContext = useContext(NotificationContext);
  const { setAlert, setEvent } = notificationContext;

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Register User
  const register = async ({ name, email, password }) => {
    try {
      // register the user
      await firebaseAuth.createUserWithEmailAndPassword(email, password);

      // store the name
      await firebaseAuth.currentUser.updateProfile({
        displayName: name
      });

      setEvent('Registration success!');
      dispatch({
        type: REGISTER_SUCCESS
      });
    } catch (err) {
      setAlert(err.message);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.message
      });
    }
  };

  // Login User
  const login = async (email, password) => {
    try {
      // login the user
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      dispatch({
        type: LOGIN_SUCCESS
      });
    } catch (err) {
      setAlert(err.message);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message
      });
    }
  };

  // Reset password
  const resetPassword = async email => {
    try {
      /*
      // reset the user's password
      await firebaseAuth.sendPasswordResetEmail(email);

      // force a logout
      if (firebaseAuth.currentUser !== null) {
        logout();
      }
      */

      dispatch({
        type: RESET_SUCCESS
      });
    } catch (err) {
      setAlert(err.message);
      dispatch({
        type: RESET_FAIL,
        payload: err.message
      });
    }
  };

  // Logout
  const logout = async () => {
    try {
      // logout the user
      await firebaseAuth.signOut();

      dispatch({
        type: LOGOUT
      });
    } catch (err) {
      setAlert(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email: state.email,
        name: state.name,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        reset: state.reset,
        register,
        resetPassword,
        clearErrors,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
