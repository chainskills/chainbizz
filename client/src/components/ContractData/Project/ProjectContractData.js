import React, { useEffect, useState } from 'react';
import Blockies from 'react-blockies';

import ActionsOwner from './ActionsOwner';
import ActionsProvider from './ActionsProvider';

import './ProjectCard.css';

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

  /*

   <div className='col s12 m4'>
      <div className='card medium blue-grey darken-1'>
        <div className='card-content white-text'>
          <span className='card-title'>{projectDetails.title}</span>
          <p>
            <span className='badge blue white-text'>
              {drizzle.web3.utils.fromWei(
                projectDetails.price.toString(),
                'ether'
              )}
              {' ETH'}
            </span>
          </p>
          <p>{projectDetails.description}</p>
        </div>
        <div className='card-action'>
          {projectDetails.owner === account && (
            <ActionsOwner projectId={projectId} status={status} />
          )}

          {projectDetails.owner !== account && (
            <ActionsProvider projectId={projectId} status={status} />
          )}
        </div>
      </div>
    </div>

  */
  return (
    <div className='col s12 m12'>
      <div className='card card--custom'>
        <div className='card-content'>
          <div>
            <div className='row'>
              <div className='col s6'>
                <h1
                  style={{
                    fontSize: '18px',
                    margin: '0',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}
                >
                  <a href='#' style={{ color: '#676767' }}>
                    {projectDetails.title}
                  </a>
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
                <div style={{ marginTop: '20px' }}>
                  <Blockies
                    seed={account}
                    size={10}
                    scale={5}
                    className='circle left'
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '100%',
                      verticalAlign: 'top'
                    }}
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
                    {account}
                  </p>
                </div>
              </div>
              <div className='col s3'>
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
              <div className='col s3'>
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
      </div>
    </div>
  );
};

export default ProjectContractData;
