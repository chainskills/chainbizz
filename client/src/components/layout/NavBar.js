import React from 'react';

import Blockies from 'react-blockies';

const NavBar = ({ drizzleState }) => {
  let account = '';
  if (drizzleState !== null) {
    account = drizzleState.accounts[0];
  }

  return (
    <div>
      <nav className='z-depth-0'>
        <div className='nav-wrapper white'>
          <a
            href='#!'
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
                <Blockies
                  seed={account}
                  size={10}
                  scale={5}
                  className='circle'
                />
              </div>
              <div className='col s9'>
                <span className='name truncate'>{account}</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a href='#!'>
            <i className='material-icons'>cloud</i>Main Network
          </a>
        </li>
        <li>
          <a href='#!'>My projects</a>
        </li>
        <li>
          <a href='#!'>My contracts</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>

        <li>
          <a className='waves-effect' href='#!'>
            Preferences
          </a>
        </li>
      </ul>
      <a href='#!' data-target='slide-out' className='sidenav-trigger'>
        <i className='material-icons'>menu</i>
      </a>
    </div>
  );
};

export default NavBar;
