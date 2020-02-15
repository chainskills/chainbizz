import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import { firebaseAuth, projectsRef } from '../../firebase/firebase';
import DraftProjectContractData from '../ContractData/Project/DraftProjectContractData';
import AuthContext from '../context/auth/authContext';

const MyDraftProjects = ({ drizzle, drizzleState, account }) => {
  const [projects, setProjects] = useState([]);

  const [dataKeys, setDataKeys] = useState(null);

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getMyProjects.cacheCall({
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (firebaseAuth.currentUser !== null) {
        return projectsRef
          .doc(firebaseAuth.currentUser.uid)
          .collection('projects')
          .onSnapshot(
            query => {
              setProjects(
                query.docs.map(projectDetails => (
                  <DraftProjectContractData
                    projectDetails={projectDetails.data()}
                    projectId={projectDetails.id}
                    account={account}
                    drizzle={drizzle}
                    key={projectDetails.id}
                  />
                ))
              );
            },
            err => {
              console.error(`Encountered error: ${err}`);
            }
          );
      }
    }
    //eslint-disable-next-line
  }, [firebaseAuth, projectsRef, isAuthenticated]);

  /*
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
*/

  const nbProjects = projects !== null ? projects.length : 0;

  console.log(projects);

  return (
    <div>
      <div className='row'>
        <div className='col s12 m12'>
          <h5>
            <span className='number-projects'>{nbProjects}</span>
            <span>
              {' '}
              Owned {nbProjects > 1 ? ' draft projects' : ' draft project'}
            </span>
          </h5>
        </div>
      </div>
      <div className='row'>{projects}</div>
    </div>
  );
};

export default MyDraftProjects;
