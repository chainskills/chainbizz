import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Blockies from 'react-blockies';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import blockchain from '../../assets/images/blockchain.svg';

const NavBar = ({ account }) => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  let networkName = '';
  switch (window.ethereum.networkVersion) {
    case 1:
      networkName = 'Main Network';
      break;

    case 3:
      networkName = 'Ropsten Test Network';
      break;

    case 4:
      networkName = 'Rinkeby Test Network';
      break;

    case 5:
      networkName = 'Göerli Test Network';
      break;

    case 42:
      networkName = 'Kovan Test Network';
      break;

    default:
      networkName = 'Private Network';
      break;
  }

  return (
    <div>
      <nav className='z-depth-0'>
        <div className='nav-wrapper white'>
          <a
            href='/'
            className='brand-logo black-text'
            style={{ textDecoration: 'none' }}
          >
            ChainBizz
          </a>
          <form className=' hide-on-med-and-down' id='formSearch'>
            <div className='input-field'>
              <input
                id='search'
                type='search'
                placeholder='Search for projects'
              />
              <label className='label-icon' htmlFor='search'>
                <i className='material-icons'>search</i>
              </label>
              <i className='material-icons'>close</i>
            </div>
          </form>
        </div>
      </nav>

      <ul
        id='slide-out'
        className='sidenav sidenav-fixed blue-grey lighten-5 z-depth-0'
      >
        <li>
          <div className='user-view' style={{ height: '122px' }}>
            <div className='row'>
              <div className='col s3'>
                {account !== null && (
                  <Blockies
                    seed={account}
                    size={10}
                    scale={5}
                    className='circle'
                  />
                )}
              </div>
              <div className='col s9'>
                <span className='name truncate'>{account}</span>
              </div>
            </div>
          </div>
        </li>
        <li style={{ 
        marginBottom: '30px' }}>
          <a href={null}>
            <img src={blockchain} style={{ width: '35px',position: 'relative',top: '11px',marginRight: '8px' }} alt={''} />
            {networkName}
          </a>
        </li>
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
