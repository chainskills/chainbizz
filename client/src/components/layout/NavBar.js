import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, NavLink, withRouter } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import EventContext from '../context/events/eventContext';

import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import logo from '../../assets/images/chainskills-logo.png';

const NavBar = ({ account }) => {
  const eventContext = useContext(EventContext);
  const { events, currentEventId, onClearEvents } = eventContext;
  const [eventsList, setEventsList] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('New effect');
    console.log('CurrentEventId: ' + currentEventId);
    console.log(events);
    let allEvents = [];
    if (events !== null && typeof events !== 'undefined') {
      // received a new event
      events.forEach(evt => {
        const currentEvent = (
          <p key={evt.key}>
            Received <span className='notifications-item'>{evt.name}</span> from{' '}
            <span className='notifications-item'>{evt.issuer}</span>. Title is{' '}
            <span className='notifications-item'>{evt.title}</span> Price is{' '}
            <span className='notifications-item'>{evt.price}</span>
          </p>
        );

        allEvents.push(currentEvent);
      });

      if (showNotifications === false) {
        setNewNotification(true);
      }
    }
    setEventsList(allEvents);
  }, [currentEventId]);

  const displayNotifications = isVisible => {
    if (isVisible) {
      setNewNotification(false);
    }
    setShowNotifications(isVisible);
  };

  let networkName = '';
  let networkFlag = 'grey';
  switch (window.ethereum.networkVersion) {
    case 1:
      networkName = 'Main Network';
      networkFlag = 'network-status--green';
      break;

    case 3:
      networkName = 'Ropsten Test Network';
      networkFlag = 'network-status--orange';
      break;

    case 4:
      networkName = 'Rinkeby Test Network';
      networkFlag = 'network-status--orange';
      break;

    case 5:
      networkName = 'Göerli Test Network';
      networkFlag = 'network-status--orange';
      break;

    case 42:
      networkName = 'Kovan Test Network';
      networkFlag = 'network-status--orange';
      break;

    default:
      networkName = 'Private Network';
      networkFlag = 'network-status--blue';
      break;
  }

  return (
    <div>
      <nav className='top-navbar'>
        <div className='nav-wrapper white'>
          <NavLink
            to='/'
            className='brand-logo black-text'
            style={{ textDecoration: 'none', marginLeft: '20px' }}
          >
            <img
              src={logo}
              style={{
                width: '40px',
                position: 'relative',
                top: '11px',
                marginRight: '8px'
              }}
              alt={''}
            />
            <span style={{ color: '#4fa6da' }}>ChainBizz</span>
          </NavLink>
          <button
            href={null}
            style={{ position: 'relative', left: '310px', color: 'grey' }}
            className={'network-status ' + networkFlag}
          >
            {networkName}
          </button>
          <button
            className={'notifications btn-flat'}
            onClick={() => displayNotifications(!showNotifications)}
          >
            {newNotification === true && (
              <i className='material-icons left'>notifications_active</i>
            )}
            {newNotification !== true && (
              <i className='material-icons left'>notifications_none</i>
            )}
          </button>
          <div className='user-view'>
            <ul id='menu-dropdown' className='dropdown-content'>
              <li>
                <NavLink to='#!'>Profile</NavLink>
              </li>

              <li>
                <NavLink to='/events'>Events</NavLink>
              </li>
            </ul>
            {account !== null && (
              <a
                className='dropdown-trigger'
                href='#!'
                data-target='menu-dropdown'
              >
                <JazzIcon diameter={40} seed={jsNumberForAddress(account)} />
              </a>
            )}
          </div>
          {showNotifications === true && (
            <div
              className='notifications-background'
              onClick={() => displayNotifications(false)}
            >
              <div className='notifications-list'>
                <div>
                  <h5>Notifications</h5>
                </div>

                <div> {eventsList}</div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ul
        id='slide-out'
        className='sidenav sidenav-fixed blue-grey lighten-5 left-nav'
      >
        <li
          style={{
            marginBottom: '120px'
          }}
        ></li>
        <li>
          <NavLink to='/'>Available projects</NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/myprojects'>My projects</NavLink>
        </li>
        <li>
          <NavLink to='/mycontracts'>My ongoing contracts</NavLink>
        </li>
        <li>
          <NavLink to='/myoffers'>My offers</NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/myreviews'>Offers to review</NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/deliveries'>Deliveries to review</NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/completed'>Contracts completed</NavLink>
        </li>
        <li>
          <NavLink to='/canceled'>Contracts canceled</NavLink>
        </li>
      </ul>
      <a href='#' data-target='slide-out' className='sidenav-trigger'>
        <i className='material-icons'>menu</i>
      </a>
    </div>
  );
};

export default withRouter(NavBar);
