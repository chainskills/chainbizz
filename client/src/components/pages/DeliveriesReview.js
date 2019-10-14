import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const DeliveriesReview = ({ drizzle, drizzleState, account }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getDeliveries.cacheCall({
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  // Retrieve all projects IDs linked to the current owner

  // prepare projects cards
  let allDeliveries = [];
  let projectIds = null;
  if (dataKeys !== null) {
    if (
      drizzleState.contracts.ChainBizz.getDeliveries[dataKeys] &&
      drizzleState.contracts.ChainBizz.getDeliveries[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getDeliveries[dataKeys].value;
    }

    if (projectIds !== null) {
      for (let i = 0; i < projectIds.length; i++) {
        const projectId = projectIds[i];

        console.log('Project Id: ' + projectId);

        const projectDetail = (
          <ProjectContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            projectId={projectId}
            key={projectId}
            account={account}
          />
        );

        allDeliveries.push(projectDetail);
      }
    }
  }

  return (
    <div>
      <div className='row'>{allDeliveries}</div>
    </div>
  );
};

export default DeliveriesReview;
