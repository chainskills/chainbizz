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
  const setupEvents = async (drizzle, account) => {
    // default values
    let eventSettings = {
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

    // Published project event
    if (eventSettings.publishedProject === true) {
      subscribePublishedProjectEvent(drizzle, account);
    }

    // Unpublished project event
    if (eventSettings.unpublishedProject === true) {
      subscribeUnpublishedProjectEvent(drizzle, account);
    }

    // Offer submitted event
    if (eventSettings.offerSubmitted === true) {
      subscribeOfferSubmittedEvent(drizzle, account);
    }

    // Offer canceled event
    if (eventSettings.offerCanceled === true) {
      subscribeOfferCanceledEvent(drizzle, account);
    }

    // Accept proposal event
    if (eventSettings.acceptProposal === true) {
      subscribeAcceptProposalEvent(drizzle, account);
    }

    // Reject proposal event
    if (eventSettings.rejectProposal === true) {
      subscribeRejectProposalEvent(drizzle, account);
    }

    // Delivered event
    if (eventSettings.deliveryAccepted === true) {
      subscribeDeliveredProjectEvent(drizzle, account);
    }

    // Services canceled event
    if (eventSettings.servicesCanceled === true) {
      subscribeServicesCanceledEvent(drizzle, account);
    }

    // Delivery accepted event
    if (eventSettings.deliveryAccepted === true) {
      subscribeDeliveryAcceptedEvent(drizzle, account);
    }

    // Delivery rejected event
    if (eventSettings.deliveryRejected === true) {
      subscribeDeliveryRejectedEvent(drizzle, account);
    }

    // Contract canceled event
    if (eventSettings.contractCanceled === true) {
      subscribeContractCanceledEvent(drizzle, account);
    }

    dispatch({ type: SETUP_EVENT });
  };

  // subscribe to the published project event
  const subscribePublishedProjectEvent = (drizzle, account) => {
    if (eventPublishedProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .PublishedProject({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { issuer: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeUnpublishedProjectEvent = (drizzle, account) => {
    if (eventUnpublishedProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .UnpublishedProject({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { issuer: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeOfferSubmittedEvent = (drizzle, account) => {
    if (eventOfferSubmitted !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .OfferSubmitted({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { issuer: account }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeOfferCanceledEvent = (drizzle, account) => {
    if (eventOfferCanceled !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .OfferCanceled({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { issuer: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeAcceptProposalEvent = (drizzle, account) => {
    if (eventAcceptProposal !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .AcceptProposal({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { fulfiller: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeRejectProposalEvent = (drizzle, account) => {
    if (eventRejectProposal !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .RejectProposal({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { fulfiller: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeDeliveredProjectEvent = (drizzle, account) => {
    if (eventDeliveredProject !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .ProjectDelivered({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { issuer: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeServicesCanceledEvent = (drizzle, account) => {
    if (eventServicesCanceled !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .ServicesCanceled({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { issuer: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeDeliveryAcceptedEvent = (drizzle, account) => {
    if (eventDeliveryAccepted !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .DeliveryAccepted({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { fulfiller: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeDeliveryRejectedEvent = (drizzle, account) => {
    if (eventDeliveryRejected !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .DeliveryRejected({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { fulfiller: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
  const subscribeContractCanceledEvent = (drizzle, account) => {
    if (eventContractCanceled !== null) {
      // event already registered
      return;
    }
    const { ChainBizz } = drizzle.contracts;

    const event = ChainBizz.events
      .ContractCanceled({
        fromBlock: 'latest',
        toBlock: 'latest',
        filter: { fulfiller: [account] }
      })
      .on('data', function(event) {
        if (typeof eventMap.get(event.id) === 'undefined') {
          const eventMessage =
            'id: ' +
            event.returnValues.id +
            ', issuer: ' +
            event.returnValues.issuer +
            ', fulfiller: ' +
            event.returnValues.fulfiller +
            ', title: ' +
            event.returnValues.title +
            ', price: ' +
            event.returnValues.price;

          eventMap.set(event.id, {
            key: event.id,
            name: event.event,
            message: eventMessage
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
