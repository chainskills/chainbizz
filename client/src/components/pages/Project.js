import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../Project/Modal/ProjectModal';

const Project = ({ drizzle, drizzleState }) => {
  const projectContext = useContext(ProjectContext);
  const {
    addProject,
    updateProject,
    getProject,
    clearCurrrentSelection,
    projectId
  } = projectContext;

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
  const [dataID, setDataID] = useState(null);

  const handleEditProject = id => {
    setDataID(id);
    clearCurrrentSelection();
    if (id !== null) {
      getProject(drizzle, drizzleState, id);
    } else {
      // todo display error notification message
      return;
    }

    setModalProjectOpen(true);
    setActionProject1({
      title: 'Save',
      visible: true,
      update: function(project) {
        setModalProjectOpen(false);
        updateProject(drizzle, drizzleState, id, project);
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

  const handleNewProject = () => {
    setModalProjectOpen(true);
    setActionProject1({
      title: 'Save',
      visible: true,
      add: function(project) {
        setModalProjectOpen(false);
        addProject(drizzle, drizzleState, project);
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

  useEffect(() => {
    if (projectId !== null) {
      handleEditProject(projectId);
    }

    //eslint-disable-next-line
  }, [projectId]);

  return (
    <div>
      <div className='row container'>
        <div className='col s12 m4'>
          <a
            className='waves-effect waves-light btn blue-grey'
            onClick={() => handleNewProject()}
          >
            <i className='material-icons left'>add</i>New
          </a>
        </div>
      </div>

      {modalProjectOpen && (
        <ProjectModal
          dataID={dataID}
          onClose={() => setModalProjectOpen(false)}
          action1={actionProject1}
          action2={actionProject2}
        />
      )}
    </div>
  );
};

export default Project;
