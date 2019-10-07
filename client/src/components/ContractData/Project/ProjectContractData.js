import React, { useEffect, useState } from 'react';

const ProjectContractData = ({ projectId, drizzle, drizzleState }) => {
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

  const account = drizzleState.accounts[0];
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

  return (
    <div className='col s12 m4'>
      <div className='card medium blue-grey'>
        <div className='card-content white-text'>
          <span className='card-title'>{projectDetails._title}</span>
          <p>
            <span className='badge blue white-text'>
              {drizzle.web3.utils.fromWei(
                projectDetails._price.toString(),
                'ether'
              )}
              {' ETH'}
            </span>
          </p>
          <p>{projectDetails._description}</p>
        </div>
        <div className='card-action'>
          {projectDetails._owner === account && (
            <a href='#!'>
              <i className='material-icons'>delete</i>
            </a>
          )}
          {projectDetails._owner === account && (
            <a href='#!'>
              <i className='material-icons'>edit</i>
            </a>
          )}
          {projectDetails._owner === account && (
            <a href='#!'>
              <i className='material-icons'>publish</i>
            </a>
          )}
          <a href='#!'>
            <i className='material-icons'>more_horiz</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectContractData;
