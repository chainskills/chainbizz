import React, { useState, useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const PublishedProjects = ({ drizzle, drizzleState, account }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getPublishedProjects.cacheCall({
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  // Retrieve all projects IDs linked to the current owner

  // prepare projects cards
  let allProjects = [];
  let projectIds = null;
  if (dataKeys !== null) {
    if (
      drizzleState.contracts.ChainBizz.getPublishedProjects[dataKeys] &&
      drizzleState.contracts.ChainBizz.getPublishedProjects[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getPublishedProjects[dataKeys].value;
    }

    if (projectIds !== null) {
      for (let i = 0; i < projectIds.length; i++) {
        const projectId = projectIds[i];

        const projectDetail = (
          <ProjectContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            account={account}
            projectId={projectId}
            key={projectId}
          />
        );

        allProjects.push(projectDetail);
      }
    }
  }

  return (
    <div>
      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default PublishedProjects;
