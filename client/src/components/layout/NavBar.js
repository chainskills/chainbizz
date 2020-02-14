import React, { useEffect, useContext, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import EventContext from '../context/events/eventContext';

import AuthContext from '../context/auth/authContext';

import history from '../../components/pages/route/history';

import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import logo from '../../assets/images/chainskills-logo.png';

const NavBar = ({ account }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const onLogout = async () => {
    await logout();
    history.push('/');
  };

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
    let allEvents = [];
    if (events !== null && typeof events !== 'undefined') {
      // received a new event
      const eventsList = Array.from(events.values());
      eventsList.reverse().forEach(evt => {
        const currentEvent = (
          <p key={evt.key}>
            [<span className='notifications-item'>{evt.name}</span>] ->{' '}
            <span>{evt.message}</span>
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

              {(isAuthenticated == null || !isAuthenticated) && (
                <div>
                  <li class='divider'></li>
                  <li>
                    <a href='/login'>Login</a>
                  </li>
                </div>
              )}

              {isAuthenticated !== null && isAuthenticated && (
                <div>
                  <li class='divider'></li>
                  <li>
                    <a href='#!' onClick={onLogout}>
                      Logout
                    </a>
                  </li>
                </div>
              )}
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

      <ul id='slide-out' className='sidenav sidenav-fixed left-nav'>
        <li
          style={{
            marginBottom: '120px'
          }}
        ></li>
        <li>
          <NavLink to='/' className='sidenav-close'>
            Available projects
          </NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/myprojects' className='sidenav-close'>
            My projects
          </NavLink>
        </li>
        <li>
          <NavLink to='/mycontracts' className='sidenav-close'>
            My ongoing contracts
          </NavLink>
        </li>
        <li>
          <NavLink to='/myoffers' className='sidenav-close'>
            My offers
          </NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/myreviews' className='sidenav-close'>
            Offers to review
          </NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/deliveries' className='sidenav-close'>
            Deliveries to review
          </NavLink>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <NavLink to='/completed' className='sidenav-close'>
            Contracts completed
          </NavLink>
        </li>
        <li>
          <NavLink to='/canceled' className='sidenav-close'>
            Contracts canceled
          </NavLink>
        </li>
      </ul>
      <a href='#' data-target='slide-out' className='sidenav-trigger'>
        <i className='material-icons'>menu</i>
      </a>
    </div>
  );
};

export default withRouter(NavBar);
