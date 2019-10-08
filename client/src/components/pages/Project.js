import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../dialog/modal/project/ProjectModal';
import ConfirmModal from '../dialog/modal/confirm/ConfirmModal';

const Project = ({ drizzle, drizzleState }) => {
  const projectContext = useContext(ProjectContext);
  const {
    addProject,
    updateProject,
    removeProject,
    publishProject,
    getProject,
    showEdit,
    showRemove,
    showPublish,
    clearCurrrentSelection,
    projectId
  } = projectContext;

  const [modalConfirmationOpen, setmodalConfirmationOpen] = useState(false);
  const [modalProjectOpen, setModalProjectOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState(null);
  const [modalDescription, setModalDescription] = useState(null);

  const [action1, setAction1] = useState({
    title: '',
    visible: false,
    handle: null
  });
  const [action2, setAction2] = useState({
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
    setAction1({
      title: 'Save',
      visible: true,
      update: function(project) {
        setModalProjectOpen(false);
        updateProject(drizzle, drizzleState, id, project);
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
      }
    });
  };

  const handleNewProject = () => {
    setDataID(null);
    clearCurrrentSelection();
    setModalProjectOpen(true);
    setAction1({
      title: 'Save',
      visible: true,
      add: function(project) {
        setModalProjectOpen(false);
        addProject(drizzle, drizzleState, project);
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
      }
    });
  };

  const handleRemove = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Remove Project');
    setModalDescription('Are you sure to remove this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        removeProject(drizzle, drizzleState, id);
      }
    });
  };

  const handlePublish = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Publish Project');
    setModalDescription('Are you sure to publish this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        publishProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setmodalConfirmationOpen(false);
      }
    });
  };

  useEffect(() => {
    if (showEdit === true && projectId !== null) {
      handleEditProject(projectId);
    } else if (showRemove === true && projectId !== null) {
      handleRemove(projectId);
    } else if (showPublish === true && projectId !== null) {
      handlePublish(projectId);
    }

    //eslint-disable-next-line
  }, [showEdit, showRemove, showPublish, projectId]);

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

      {modalConfirmationOpen && (
        <ConfirmModal
          title={modalTitle}
          content={modalDescription}
          dataID={dataID}
          onClose={() => setmodalConfirmationOpen(false)}
          action1={action1}
          action2={action2}
        />
      )}

      {modalProjectOpen && (
        <ProjectModal
          dataID={dataID}
          onClose={() => setModalProjectOpen(false)}
          action1={action1}
          action2={action2}
        />
      )}
    </div>
  );
};

export default Project;
