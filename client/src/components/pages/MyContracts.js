import React, { useState, useEffect} from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const MyContracts = ({ drizzle, drizzleState, account }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getMyContracts.cacheCall({
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  // Retrieve all projects IDs linked to the current owner

  // prepare projects cards
  let allContracts = [];
  let projectIds = null;
  if (dataKeys !== null) {
    if (
      drizzleState.contracts.ChainBizz.getMyContracts[dataKeys] &&
      drizzleState.contracts.ChainBizz.getMyContracts[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getMyContracts[dataKeys].value;
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

        allContracts.push(projectDetail);
      }
    }
  }

  return (
    <div>
      <div className='row'>{allContracts}</div>
    </div>
  );
};

export default MyContracts;
