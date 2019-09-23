import React from 'react';

import Blockies from 'react-blockies';

const NavBar = () => {
  return (
    <div>
      <nav>
        <div className='nav-wrapper blue-grey'>
          <a
            href='#!'
            className='brand-logo'
            style={{ textDecoration: 'none' }}
          >
            ChainBizz
          </a>
          <form class=' hide-on-med-and-down' id='formSearch'>
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
      <ul id='slide-out' className='sidenav sidenav-fixed blue-grey lighten-4'>
        <li>
          <div className='user-view' style={{ height: '122px' }}>
            <div className='background'>
              <img
                src='https://source.unsplash.com/Q1p7bh3SHj8/300x176'
                alt=''
              />
            </div>
            <div className='row'>
              <div className='col s3'>
                <Blockies
                  seed='0xe5b780aE69BCE4f9473B4D5869B9e4771A5aaAEa'
                  size={10}
                  scale={5}
                  className='circle'
                />
              </div>
              <div className='col s9'>
                <a href='#!'>
                  <span className='white-text name truncate'>
                    0xe5b780aE69BCE4f9473B4D5869B9e4771A5aaAEa
                  </span>
                </a>
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
