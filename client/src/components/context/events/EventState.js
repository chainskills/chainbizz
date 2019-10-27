import React, { useReducer, useState } from 'react';
import EventContext from './eventContext';
import eventReducer from './eventReducer';

import { SUBSCRIBED_EVENT, UNSUBSCRIBED_ALL_EVENTS, NEW_EVENT } from '../types';

const EventState = props => {
  const initialState = {
    events: null,
    lastEventId: null
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  const [eventNewProject, setEventNewProject] = useState(null);
  const [eventMap, setEventMap] = useState(new Map());

  // Subscribe to events
  const subscribeEvent = async drizzle => {
    if (eventNewProject !== null) {
      // event already registered
      return;
    }

    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .NewProject({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
        console.log(event.id);
        console.log(eventMap.get(event.id));

        if (typeof eventMap.get(event.id) === 'undefined') {
          eventMap.set(event.id, {
            id: event.returnValues.id,
            issuer: event.returnValues.issuer,
            title: event.returnValues.title,
            price: event.returnValues.price
          });
          setEventMap(eventMap);

          console.log('before dispatch new event');
          dispatch({ type: NEW_EVENT, payload: eventMap, eventId: event.id });
        }
      })
      .on('error', function(error) {
        console.error(error);
      });

    setEventNewProject(event);

    dispatch({ type: SUBSCRIBED_EVENT });
  };

  // Unsubscribe to events
  const unsubscribeAllEvents = () => {
    if (eventNewProject === null) {
      // event not registered
      return;
    }

    eventNewProject.unsubscribe();
    setEventNewProject(null);

    dispatch({ type: UNSUBSCRIBED_ALL_EVENTS });
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        lastEventId: state.lastEventId,
        subscribeEvent,
        unsubscribeAllEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
