import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../Project/Modal/ProjectModal';

const Project = ({ drizzle, drizzleState }) => {
  const projectContext = useContext(ProjectContext);
  const { addProject } = projectContext;

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

  return (
    <div>
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
    </div>
  );
};

export default Project;
