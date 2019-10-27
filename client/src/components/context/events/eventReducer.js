import { SETUP_EVENT, UNSUBSCRIBED_ALL_EVENTS, NEW_EVENT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SETUP_EVENT:
      console.log('Setup events');
      return {
        ...state,
        events: null,
        currentEventId: null
      };
    case UNSUBSCRIBED_ALL_EVENTS:
      console.log('Unsubscribed to all events');
      return {
        ...state,
        events: null,
        currentEventId: null
      };
    case NEW_EVENT:
      return {
        ...state,
        events: action.payload,
        currentEventId: action.eventId
      };
    default:
      return state;
  }
};
