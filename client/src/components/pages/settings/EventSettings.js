import React, { useState, useEffect, useContext } from 'react';
import { createBrowserHistory } from 'history';

import EventContext from '../../context/events/eventContext';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const EventSettings = ({ drizzle }) => {
  const [settings, setSettings] = useState({
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
  });

  const eventContext = useContext(EventContext);
  const { setupEvents, unsubscribeAllEvents } = eventContext;

  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();

    // Read current settings
    try {
      const retrieveSettings = JSON.parse(
        localStorage.getItem('eventSettings')
      );
      if (
        retrieveSettings !== null &&
        typeof retrieveSettings !== 'undefined'
      ) {
        setSettings(retrieveSettings);
      }
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked
    });
  };

  const handleSaveSettings = () => {
    // save settings
    localStorage.setItem('eventSettings', JSON.stringify(settings));

    // then we subscribe/unsubscribe to all selected events
    setupEvents(drizzle);

    // go back to the previous page
    const history = createBrowserHistory();
    history.goBack();
  };

  return (
    <div>
      <h5>Subscribe to events you would like to listen</h5>
      <p>
        Select the events you want to listen. Each event is related to a journey
        that follows each project.
      </p>
      <div className='row'>
        <div className='col s8 m6'>A new project is created</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='newProject'
              checked={settings !== null ? settings.newProject : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>A project is updated</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='updateProject'
              checked={settings !== null ? settings.updateProject : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>A project is removed</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='removeProject'
              checked={settings !== null ? settings.removeProject : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>A project is published</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='publishedProject'
              checked={settings !== null ? settings.publishedProject : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>A project is unpublished</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='unpublishedProject'
              checked={settings !== null ? settings.unpublishedProject : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>An offer is submitted</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='offerSubmitted'
              checked={settings !== null ? settings.offerSubmitted : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>An offer is canceled</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='offerCanceled'
              checked={settings !== null ? settings.offerCanceled : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The proposal is accepted</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='acceptProposal'
              checked={settings !== null ? settings.acceptProposal : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The proposal is refused</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='rejectProposal'
              checked={settings !== null ? settings.rejectProposal : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The project is delivered</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='deliveryProject'
              checked={settings !== null ? settings.deliveryProject : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The services are canceled</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='servicesCanceled'
              checked={settings !== null ? settings.servicesCanceled : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The delivery is accepted</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='deliveryAccepted'
              checked={settings !== null ? settings.deliveryAccepted : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The delivery is rejected</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='deliveryRejected'
              checked={settings !== null ? settings.deliveryRejected : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col s8 m6'>The contract is canceled</div>

        <div className='col s4 m6 switch'>
          <label>
            Off
            <input
              type='checkbox'
              name='contractCanceled'
              checked={settings !== null ? settings.contractCanceled : false}
              onChange={onChange}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='col s6 offset-s6'>
          <a
            className='waves-effect waves-light btn blue-grey lighten-1 no-uppercase save-settings'
            onClick={() => handleSaveSettings()}
          >
            Save Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventSettings;
