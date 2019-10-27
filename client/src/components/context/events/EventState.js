import React, { useReducer, useState } from 'react';
import EventContext from './eventContext';
import eventReducer from './eventReducer';

import { SETUP_EVENT, UNSUBSCRIBED_ALL_EVENTS, NEW_EVENT } from '../types';

const EventState = props => {
  const initialState = {
    events: null,
    currentEventId: null
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  const [eventNewProject, setEventNewProject] = useState(null);
  const [eventPublishedProject, setEventPublishedProject] = useState(null);
  const [eventMap, setEventMap] = useState(new Map());

  // set-up events
  const setupEvents = async drizzle => {
    // default values
    let eventSettings = {
      newProject: false,
      publishedProject: false
    };
    // Read current settings
    try {
      const retrievedSettings = JSON.parse(
        localStorage.getItem('eventSettings')
      );
      if (
        retrievedSettings !== null &&
        typeof retrievedSettings !== 'undefined'
      ) {
        eventSettings = retrievedSettings   ;
      }
    } catch (error) {
      // unable to read settings
      console.error(error);
    }

    // new project event
    if (eventSettings.newProject === true) {
      subscribeNewProjectEvent(drizzle);
    } else if (eventNewProject !== null) {
      console.log('unsubscribe to new project event');
      eventNewProject.unsubscribe();
      setEventNewProject(null);
    }

    // published event
    if (eventSettings.publishedProject === true) {
      subscribePublishedProjectEvent(drizzle);
    } else if (eventPublishedProject !== null) {
      console.log('unsubscribe to published project event');
      eventPublishedProject.unsubscribe();
      setEventPublishedProject(null);
    }

    dispatch({ type: SETUP_EVENT });
  };

  // subscribe to new project event
  const subscribeNewProjectEvent = drizzle => {
    if (eventNewProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .NewProject({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
        console.log(event);
        if (typeof eventMap.get(event.id) === 'undefined') {
          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            id: event.returnValues.id,
            issuer: event.returnValues.issuer,
            title: event.returnValues.title,
            price: event.returnValues.price
          });
          setEventMap(eventMap);

          dispatch({ type: NEW_EVENT, payload: eventMap, eventId: event.id });
        }
      })
      .on('error', function(error) {
        console.error(error);
      });

    setEventNewProject(event);
  };

  // subscribe to published project event
  const subscribePublishedProjectEvent = drizzle => {
    if (eventPublishedProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .PublishedProject({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
        console.log(event);
        if (typeof eventMap.get(event.id) === 'undefined') {
          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            id: event.returnValues.id,
            issuer: event.returnValues.issuer,
            title: event.returnValues.title,
            price: event.returnValues.price
          });
          setEventMap(eventMap);

          dispatch({ type: NEW_EVENT, payload: eventMap, eventId: event.id });
        }
      })
      .on('error', function(error) {
        console.error(error);
      });

    setEventPublishedProject(event);
  };

  // Unsubscribe to events
  const unsubscribeAllEvents = () => {
    if (eventNewProject !== null) {
      eventNewProject.unsubscribe();
      setEventNewProject(null);
    }

    if (eventPublishedProject !== null) {
      eventPublishedProject.unsubscribe();
      setEventPublishedProject(null);
    }

    dispatch({ type: UNSUBSCRIBED_ALL_EVENTS });
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        currentEventId: state.currentEventId,
        setupEvents,
        unsubscribeAllEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
