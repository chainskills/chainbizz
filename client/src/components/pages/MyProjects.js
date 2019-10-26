import React, { useState, useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const MyProjects = ({ drizzle, drizzleState, account }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getMyProjects.cacheCall({
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
      drizzleState.contracts.ChainBizz.getMyProjects[dataKeys] &&
      drizzleState.contracts.ChainBizz.getMyProjects[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getMyProjects[dataKeys].value;
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

        allProjects.push(projectDetail);
      }
    }
  }

  const nbProjects = projectIds !== null ? projectIds.length : 0;

  return (
    <div>
      <div className='row'>
        <div className='col s12 m12'>
          <span className='number-projects'>{nbProjects}</span>
          <span> {nbProjects > 0 ? ' Projects' : ' Project'}</span>
        </div>
      </div>
      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default MyProjects;
