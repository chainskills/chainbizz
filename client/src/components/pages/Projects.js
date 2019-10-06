import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../Project/Modal/ProjectModal';
import ProjectContractData from '../ContractData/Project/ProjectContractData';

const Projects = ({ drizzle, drizzleState, initialized }) => {
  const projectContect = useContext(ProjectContext);
  const { addProject } = projectContect;

  const [account, setAccount] = useState('');
  const [dataKeys, setDataKeys] = useState(null);

  const [modalProjectOpen, setModalProjectOpen] = useState(false);
  const [actionProject1, setActionProject1] = useState({
    title: '',
    visible: false,
    handle: null
  });
  const [actionProject2, setActionProject2] = useState({
    title: '',
    visible: false,
    handle: null
  });

  useEffect(() => {
    if (initialized) {
      const { ChainBizz } = drizzle.contracts;
      setDataKeys(
        ChainBizz.methods.getAllProjects.cacheCall({
          from: drizzleState.accounts[0]
        })
      );
    }

    //eslint-disable-next-line
  }, [initialized]);

  const handleNewProject = id => {
    setModalProjectOpen(true);
    setActionProject1({
      title: 'Save',
      visible: true,
      add: function(project) {
        setModalProjectOpen(false);
        addProject(drizzle, drizzleState, project);
      },
      update: function(project) {
        setModalProjectOpen(false);
        //updateProject(project);
      }
    });

    setActionProject2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
      }
    });
  };

  // Retrieve all projects IDs linked to the current owner

  // prepare projects cards
  let allProjects = [];
  let projectIds = null;
  if (initialized === true && dataKeys !== null) {
    if (
      drizzleState.contracts.ChainBizz.getAllProjects[dataKeys] &&
      drizzleState.contracts.ChainBizz.getAllProjects[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getAllProjects[dataKeys].value;
    }

    // no certifications
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
    <div className='container'>
      <div className='right-align new-project'>
        <a
          className='waves-effect waves-light btn blue-grey'
          onClick={() => handleNewProject(null)}
        >
          <i className='material-icons left'>add</i>New
        </a>
      </div>

      {modalProjectOpen && (
        <ProjectModal
          dataID={1}
          onClose={() => setModalProjectOpen(false)}
          action1={actionProject1}
          action2={actionProject2}
        />
      )}

      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default Projects;
