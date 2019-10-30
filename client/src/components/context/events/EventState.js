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
  const [eventUpdateProject, setEventUpdateProject] = useState(null);
  const [eventRemoveProject, setEventRemoveProject] = useState(null);
  const [eventPublishedProject, setEventPublishedProject] = useState(null);
  const [eventUnpublishedProject, setEventUnpublishedProject] = useState(null);
  const [eventOfferSubmitted, setEventOfferSubmitted] = useState(null);
  const [eventOfferCanceled, setEventOfferCanceled] = useState(null);
  const [eventAcceptProposal, setEventAcceptProposal] = useState(null);
  const [eventRejectProposal, setEventRejectProposal] = useState(null);
  const [eventDeliveredProject, setEventDeliveredProject] = useState(null);
  const [eventServicesCanceled, setEventServicesCanceled] = useState(null);
  const [eventDeliveryAccepted, setEventDeliveryAccepted] = useState(null);
  const [eventDeliveryRejected, setEventDeliveryRejected] = useState(null);
  const [eventContractCanceled, setEventContractCanceled] = useState(null);

  const [eventMap, setEventMap] = useState(new Map());

  // set-up events
  const setupEvents = async drizzle => {
    // default values
    let eventSettings = {
      newProject: false,
      updateProject: false,
      removeProject: false,
      publishedProject: false,
      unpublishedProject: false,
      offerSubmitted: false,
      offerCanceled: false,
      acceptProposal: false,
      rejectProposal: false,
      deliveryProject: false,
      servicesCanceled: false,
      deliveryAccepted: false,
      deliveryRejected: false,
      contractCanceled: false
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
        eventSettings = retrievedSettings;
      }
    } catch (error) {
      // unable to read settings
      console.error(error);
    }

    // first we unsubscribe to all running events
    unsubscribeAllEvents();

    // New project event
    if (eventSettings.newProject === true) {
      subscribeNewProjectEvent(drizzle);
    }

    // Updated project event
    if (eventSettings.updateProject === true) {
      subscribeUpdateProjectEvent(drizzle);
    }

    // Removed project event
    if (eventSettings.removeProject === true) {
      subscribeRemoveProjectEvent(drizzle);
    }

    // Published project event
    if (eventSettings.publishedProject === true) {
      subscribePublishedProjectEvent(drizzle);
    }

    // Unpublished project event
    if (eventSettings.unpublishedProject === true) {
      subscribeUnpublishedProjectEvent(drizzle);
    }

    // Offer submitted event
    if (eventSettings.offerSubmitted === true) {
      subscribeOfferSubmittedEvent(drizzle);
    }

    // Offer canceled event
    if (eventSettings.offerCanceled === true) {
      subscribeOfferCanceledEvent(drizzle);
    }

    // Accept proposal event
    if (eventSettings.acceptProposal === true) {
      subscribeAcceptProposalEvent(drizzle);
    }

    // Reject proposal event
    if (eventSettings.rejectProposal === true) {
      subscribeRejectProposalEvent(drizzle);
    }

    // Delivered event
    if (eventSettings.deliveryAccepted === true) {
      subscribeDeliveredProjectEvent(drizzle);
    }

    // Services canceled event
    if (eventSettings.servicesCanceled === true) {
      subscribeServicesCanceledEvent(drizzle);
    }

    // Delivery accepted event
    if (eventSettings.deliveryAccepted === true) {
      subscribeDeliveryAcceptedEvent(drizzle);
    }

    // Delivery rejected event
    if (eventSettings.deliveryRejected === true) {
      subscribeDeliveryRejectedEvent(drizzle);
    }

    // Contract canceled event
    if (eventSettings.contractCanceled === true) {
      subscribeContractCanceledEvent(drizzle);
    }

    dispatch({ type: SETUP_EVENT });
  };

  // subscribe to the new project event
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

  // subscribe to the update project event
  const subscribeUpdateProjectEvent = drizzle => {
    if (eventUpdateProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .UpdateProject({ fromBlock: 'latest', toBlock: 'latest' })
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

    setEventUpdateProject(event);
  };

  // subscribe to the remove project event
  const subscribeRemoveProjectEvent = drizzle => {
    if (eventNewProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .RemoveProject({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
        console.log(event);
        if (typeof eventMap.get(event.id) === 'undefined') {
          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            id: event.returnValues.id,
            issuer: event.returnValues.issuer,
            title: event.returnValues.title
          });
          setEventMap(eventMap);

          dispatch({ type: NEW_EVENT, payload: eventMap, eventId: event.id });
        }
      })
      .on('error', function(error) {
        console.error(error);
      });

    setEventRemoveProject(event);
  };

  // subscribe to the published project event
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

  // subscribe to the unpublished project event
  const subscribeUnpublishedProjectEvent = drizzle => {
    if (eventUnpublishedProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .UnpublishedProject({ fromBlock: 'latest', toBlock: 'latest' })
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

    setEventUnpublishedProject(event);
  };

  // subscribe to the offer submitted project event
  const subscribeOfferSubmittedEvent = drizzle => {
    if (eventOfferSubmitted !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .OfferSubmitted({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventOfferSubmitted(event);
  };

  // subscribe to the offer canceled project event
  const subscribeOfferCanceledEvent = drizzle => {
    if (eventOfferCanceled !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .OfferCanceled({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventOfferCanceled(event);
  };

  // subscribe to the accept proposal project event
  const subscribeAcceptProposalEvent = drizzle => {
    if (eventAcceptProposal !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .AcceptProposal({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventAcceptProposal(event);
  };

  // subscribe to the offer rejected project event
  const subscribeRejectProposalEvent = drizzle => {
    if (eventRejectProposal !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .RejectProposal({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventRejectProposal(event);
  };

  // subscribe to the project delivered event
  const subscribeDeliveredProjectEvent = drizzle => {
    if (eventDeliveredProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .ProjectDelivered({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventDeliveredProject(event);
  };

  // subscribe to the services canceled event
  const subscribeServicesCanceledEvent = drizzle => {
    if (eventServicesCanceled !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .ServicesCanceled({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventServicesCanceled(event);
  };

  // subscribe to the delivery accepted event
  const subscribeDeliveryAcceptedEvent = drizzle => {
    if (eventDeliveryAccepted !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .DeliveryAccepted({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventDeliveryAccepted(event);
  };

  // subscribe to the delivery rejected event
  const subscribeDeliveryRejectedEvent = drizzle => {
    if (eventDeliveryRejected !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .DeliveryRejected({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventDeliveryRejected(event);
  };

  // subscribe to the contract canceled event
  const subscribeContractCanceledEvent = drizzle => {
    if (eventContractCanceled !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .ContractCanceled({ fromBlock: 'latest', toBlock: 'latest' })
      .on('data', function(event) {
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

    setEventContractCanceled(event);
  };

  // Unsubscribe to events
  const unsubscribeAllEvents = () => {
    if (eventNewProject !== null) {
      eventNewProject.unsubscribe();
      setEventNewProject(null);
    }

    if (eventUpdateProject !== null) {
      eventPublishedProject.unsubscribe();
      setEventUpdateProject(null);
    }

    if (eventRemoveProject !== null) {
      eventRemoveProject.unsubscribe();
      setEventRemoveProject(null);
    }

    if (eventPublishedProject !== null) {
      eventPublishedProject.unsubscribe();
      setEventPublishedProject(null);
    }

    if (eventUnpublishedProject !== null) {
      eventUnpublishedProject.unsubscribe();
      setEventUnpublishedProject(null);
    }

    if (eventOfferSubmitted !== null) {
      eventOfferSubmitted.unsubscribe();
      setEventOfferSubmitted(null);
    }

    if (eventOfferCanceled !== null) {
      eventOfferCanceled.unsubscribe();
      setEventOfferCanceled(null);
    }

    if (eventAcceptProposal !== null) {
      eventAcceptProposal.unsubscribe();
      setEventAcceptProposal(null);
    }

    if (eventRejectProposal !== null) {
      eventRejectProposal.unsubscribe();
      setEventRejectProposal(null);
    }

    if (eventDeliveredProject !== null) {
      eventDeliveredProject.unsubscribe();
      setEventDeliveredProject(null);
    }

    if (eventServicesCanceled !== null) {
      eventServicesCanceled.unsubscribe();
      setEventServicesCanceled(null);
    }

    if (eventDeliveryAccepted !== null) {
      eventDeliveryAccepted.unsubscribe();
      setEventDeliveryAccepted(null);
    }

    if (eventDeliveryRejected !== null) {
      eventDeliveryRejected.unsubscribe();
      setEventDeliveryRejected(null);
    }

    if (eventContractCanceled !== null) {
      eventContractCanceled.unsubscribe();
      setEventContractCanceled(null);
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
