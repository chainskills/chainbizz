import React, { useReducer } from 'react';
import NotificationContext from './notificationContext';
import notificationReducer from './notificationReducer';
import {
  NOTIFICATION_ERROR,
  NOTIFICATION_EVENT,
  NOTIFICATION_CLEAR_ERRORS,
  NOTIFICATION_CLEAR_EVENTS,
  NOTIFICATION_CLEAR_ALL
} from '../types';

const NotificationState = props => {
  const initialState = {
    error: null,
    event: null
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // dispatch errors
  const setAlert = async error => {
    dispatch({ type: NOTIFICATION_ERROR, payload: error });
  };

  // dispatch events
  const setEvent = async event => {
    dispatch({ type: NOTIFICATION_EVENT, payload: event });
  };

  // clear all notifications
  const clearNotifications = () => {
    dispatch({ type: NOTIFICATION_CLEAR_ALL });
  };

  // clear all events
  const clearEvents = () => {
    dispatch({ type: NOTIFICATION_CLEAR_EVENTS });
  };

  // clear all errors
  const clearErrors = () => {
    dispatch({ type: NOTIFICATION_CLEAR_ERRORS });
  };

  return (
    <NotificationContext.Provider
      value={{
        error: state.error,
        event: state.event,
        setAlert,
        setEvent,
        clearErrors,
        clearEvents,
        clearNotifications
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
