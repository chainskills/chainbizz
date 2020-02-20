import React, { useEffect, useState } from 'react';
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';
import { NavLink } from 'react-router-dom';

import ActionsOwner from './ActionsOwner';
import ActionsProvider from './ActionsProvider';

import { projectStatus } from './ProjectStatus';

import './ProjectContractData.css';

const DraftProjectContractData = ({
  projectId,
  drizzle,
  projectDetails,
  account,
  hideAction = false
}) => {
  // project not yet ready or not found
  if (projectDetails === null || typeof projectDetails === 'undefined') {
    return <span>Initializing...</span>;
  }

  return (
    <div className='col s12 m12'>
      <div className='card card-custom sticky-action'>
        <div className='card-content'>
          <div>
            <div className='row'>
              <div className='col s12 m12'>
                <span className='card-title activator grey-text text-darken-4'>
                  <NavLink
                    activeClassName='chosen'
                    to={`/project/draft/${projectId}`}
                  >
                    {projectDetails.title}
                  </NavLink>
                  <i className='material-icons right'>more_vert</i>
                </span>
              </div>
              <div className='col s12 m6'>
                <div>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                </div>
                <div style={{ marginTop: '20px' }} className='avatar'>
                  <JazzIcon
                    diameter={40}
                    seed={jsNumberForAddress(projectDetails.issuer)}
                  />
                  <p
                    className='truncate'
                    style={{
                      position: 'relative',
                      top: '7px',
                      width: '130px',
                      paddingLeft: '10px'
                    }}
                  >
                    {projectDetails.issuer}
                  </p>
                </div>
              </div>
              <div className='col s12 m3 project-additional'>
                <ul style={{ margin: '-10px 0 0 0' }}>
                  <li style={{ fontWeight: '600' }}>
                    <i className='material-icons'>perm_data_setting</i>Beginner{' '}
                    <span>difficulty</span>
                  </li>
                  <li style={{ fontWeight: '600' }}>
                    <i className='material-icons'>history</i>5{' '}
                    <span>days remaining</span>
                  </li>
                  <li style={{ fontWeight: '600' }}>
                    <i className='material-icons'>thumb_up</i>0{' '}
                    <span>submissions</span>
                  </li>
                </ul>
              </div>
              <div className='col s12 m3 project-additional'>
                <p
                  className='right-align'
                  style={{ fontSize: '24px', color: '#546e7a' }}
                >
                  {drizzle.web3.utils.fromWei(
                    projectDetails.price.toString(),
                    'ether'
                  )}{' '}
                  ETH
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            Card Title<i className='material-icons right'>close</i>
          </span>
          <p>{projectDetails.description}</p>
        </div>
        {hideAction === false && (
          <div className='card-action right-align project-card'>
            {projectDetails.issuer === account && (
              <ActionsOwner
                projectId={projectId}
                status={projectStatus.DRAFT}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftProjectContractData;
