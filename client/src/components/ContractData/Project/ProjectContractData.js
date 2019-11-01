import React, { useEffect, useState } from 'react';
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';
import { NavLink } from 'react-router-dom';

import ActionsOwner from './ActionsOwner';
import ActionsProvider from './ActionsProvider';

import './ProjectContractData.css';

const ProjectContractData = ({ projectId, drizzle, drizzleState, account }) => {
  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKey(
      ChainBizz.methods.getProject.cacheCall(projectId, {
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  // Retrieve project details only if the information is available
  let projectDetails = null;
  if (
    drizzleState.contracts.ChainBizz.getProject[dataKey] &&
    drizzleState.contracts.ChainBizz.getProject[dataKey].value
  ) {
    projectDetails = drizzleState.contracts.ChainBizz.getProject[dataKey].value;
  }

  // project not yet ready or not found
  if (projectDetails === null || typeof projectDetails === 'undefined') {
    return <span>Initializing...</span>;
  }

  const status = Number(projectDetails.status);

  return (
    <div className='col s12 m12'>
      <div className='card card-custom'>
        <div className='card-content'>
          <div>
            <div className='row'>
              <div className='col s6'>
                <h1 className='navlink-title'>
                  <NavLink
                    activeClassName='chosen'
                    to={`/project/${projectId}`}
                  >
                    {projectDetails.title}
                  </NavLink>
                </h1>
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
              <div className='col s3 project-additional'>
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
              <div className='col s3 project-additional'>
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
        <div className='card-action right-align project-card'>
          {projectDetails.issuer === account && (
            <ActionsOwner projectId={projectId} status={status} />
          )}

          {projectDetails.issuer !== account && (
            <ActionsProvider projectId={projectId} status={status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectContractData;
