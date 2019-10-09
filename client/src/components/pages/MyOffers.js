import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const MyOffers = ({ drizzle, drizzleState }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getMyOffers.cacheCall({
        from: drizzleState.accounts[0]
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
      for (let i = 0; i < projectIds.length; i++) {
        const projectId = projectIds[i];

        const projectDetail = (
          <ProjectContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
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

export default MyOffers;
