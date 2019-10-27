import { SUBSCRIBED_EVENT, UNSUBSCRIBED_ALL_EVENTS, NEW_EVENT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SUBSCRIBED_EVENT:
      console.log('Subscribed to event');
      return {
        ...state,
        events: null
      };
    case UNSUBSCRIBED_ALL_EVENTS:
      console.log('Unsubscribed to all events');
      return {
        ...state,
        events: null,
        lastEventId: null
      };
    case NEW_EVENT:
      return {
        ...state,
        events: action.payload,
        lastEventId: action.eventId
      };
    default:
      return state;
  }
};
