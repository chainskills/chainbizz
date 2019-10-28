import React, { useState, useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const MyOffers = ({ drizzle, drizzleState, account }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getMyOffers.cacheCall({
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  // Retrieve all projects IDs for which the owner has offer his/her services

  // prepare projects cards
  let allProjects = [];
  let projectIds = null;
  if (dataKeys !== null) {
    if (
      drizzleState.contracts.ChainBizz.getMyOffers[dataKeys] &&
      drizzleState.contracts.ChainBizz.getMyOffers[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getMyOffers[dataKeys].value;
    }

    if (projectIds !== null) {
      for (let i = projectIds.length - 1; i >= 0; i--) {
        const projectId = projectIds[i];

        const projectDetail = (
          <ProjectContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            projectId={projectId}
            key={projectId}
            account={account}
          />
        );

        allProjects.push(projectDetail);
      }
    }
  }

  const nbProjects = projectIds !== null ? projectIds.length : 0;

  return (
    <div>
      <div className='row'>
        <div className='col s12 m12'>
          <h5>
          <span className='number-projects'>{nbProjects}</span>
          <span> {nbProjects > 1 ? ' Projects' : ' Project'} fulfilled</span>
          </h5>
        </div>
      </div>
      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default MyOffers;
