import React, { useState, useEffect, useContext } from 'react';

import EventContext from '../../context/events/eventContext';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const EventSettings = ({ drizzle }) => {
  const [settings, setSettings] = useState({
    newProject: false,
    publishedProject: false
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
