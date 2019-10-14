import React, { useEffect, useState, useContext } from 'react';

import ActionsOwner from './ActionsOwner';
import ActionsProvider from './ActionsProvider';

const ProjectContractData = ({ projectId, drizzle, drizzleState, account }) => {
  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    const account = drizzleState.accounts[0];

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
    <div className='col s12 m4'>
      <div className='card medium blue-grey lighten-1'>
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
  );
};

export default ProjectContractData;
