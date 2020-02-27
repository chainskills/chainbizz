import React, { useState, useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const Completed = ({ drizzle, drizzleState, account }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getCompleted.cacheCall({
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
      drizzleState.contracts.ChainBizz.getCompleted[dataKeys] &&
      drizzleState.contracts.ChainBizz.getCompleted[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getCompleted[dataKeys].value;
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
            hideAction={false}
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
            <span> {nbProjects > 1 ? ' Projects' : ' Project'} completed</span>
          </h5>
        </div>
      </div>
      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default Completed;
