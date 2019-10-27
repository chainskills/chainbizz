import React, { useState, useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const EventSettings = () => {
  const [settings, setSettings] = useState({
    newProject: false
  });

  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();

    // Read current settings
    try {
      const retrieveSettings = JSON.parse(
        localStorage.getItem('eventSettings')
      );
      setSettings(retrieveSettings);
    } catch (error) {}

    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked
    });
  };

  const handleSaveSettings = () => {
    console.log(settings);
    localStorage.setItem('eventSettings', JSON.stringify(settings));
  };

  return (
    <div>
      <h5>Subscribe to events you would like to listen</h5>
      <p>
        Select the events you want to listen. Each event is related to a journey
        that follows each project.
      </p>
      <div className='row'>
        <div className='col s8 m6'>
          Listen events when a new project is created
        </div>

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
