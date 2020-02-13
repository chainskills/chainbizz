import {
  NOTIFICATION_ERROR,
  NOTIFICATION_EVENT,
  NOTIFICATION_CLEAR_ERRORS,
  NOTIFICATION_CLEAR_EVENTS,
  NOTIFICATION_CLEAR_ALL
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case NOTIFICATION_EVENT:
      return {
        ...state,
        event: action.payload
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case NOTIFICATION_CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case NOTIFICATION_CLEAR_EVENTS:
      return {
        ...state,
        event: null
      };
    case NOTIFICATION_CLEAR_ALL:
      console.log('Into clearNotifications');
      return {
        ...state,
        error: null,
        event: null
      };
    default:
      return state;
  }
};
