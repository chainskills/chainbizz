import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Blockies from 'react-blockies';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import logo from '../../assets/images/chainskills-logo.png';

const NavBar = ({ account }) => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

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
          <a
            href='/'
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
          </a>
          <button
            href={null}
            style={{ position: 'relative', left: '310px', color: 'grey' }}
            className={'network-status ' + networkFlag}
          >
            {networkName}
          </button>
          <button className={'notifications btn-flat'}>
            <i className='material-icons left'>notifications_none</i>
          </button>
          <div className='user-view'>
            <ul id='dropdown1' class='dropdown-content'>
              <li>
                <a href='#!'>Profile</a>
              </li>

              <li>
                <a href='#!'>Events</a>
              </li>
            </ul>
            {account !== null && (
              <a class='dropdown-trigger' href='#!' data-target='dropdown1'>
                <Blockies
                  seed={account}
                  size={8}
                  scale={5}
                  className='circle'
                />
              </a>
            )}
          </div>
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
          <a href='/'>Available projects</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <a href='/myprojects'>My projects</a>
        </li>
        <li>
          <a href='/mycontracts'>My ongoing contracts</a>
        </li>
        <li>
          <a href='/myoffers'>My offers</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <a href='/myreviews'>Offers to review</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <a href='/deliveries'>Deliveries to review</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <a href='/completed'>Contracts completed</a>
        </li>
        <li>
          <a href='/canceled'>Contracts canceled</a>
        </li>
      </ul>
      <a href='#' data-target='slide-out' className='sidenav-trigger'>
        <i className='material-icons'>menu</i>
      </a>
    </div>
  );
};

export default withRouter(NavBar);
