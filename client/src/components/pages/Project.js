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
    unpublishProject,
    offerServices,
    leaveServices,
    cancelServices,
    acceptProposal,
    rejectProposal,
    getProject,
    showEdit,
    showRemove,
    showPublish,
    showUnpublish,
    showOfferServices,
    showLeaveServices,
    showCancelServices,
    showAcceptProposal,
    showRejectProposal,
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

  const handleUnpublish = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Unpublish Project');
    setModalDescription('Are you sure to unpublish this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        unpublishProject(drizzle, drizzleState, id);
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

  const handleOfferServices = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Offer your services');
    setModalDescription(
      'Are you sure to offer your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        offerServices(drizzle, drizzleState, id);
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

  const handleLeaveServices = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Leave your services');
    setModalDescription(
      'Are you sure to leave your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        leaveServices(drizzle, drizzleState, id);
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

  const handleCancelServices = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Cancel services');
    setModalDescription(
      'Are you sure to cancel the services offered by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        cancelServices(drizzle, drizzleState, id);
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

  const handleAcceptProposal = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Accept the proposal');
    setModalDescription(
      'Are you sure to accept the proposal made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        acceptProposal(drizzle, drizzleState, id);
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

  const handleRejectProposal = id => {
    setDataID(id);
    setmodalConfirmationOpen(true);

    setModalTitle('Reject the proposal');
    setModalDescription(
      'Are you sure to reject the proposal made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setmodalConfirmationOpen(false);
        rejectProposal(drizzle, drizzleState, id);
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
    if (projectId !== null) {
      if (showEdit === true) {
        handleEditProject(projectId);
      } else if (showRemove === true) {
        handleRemove(projectId);
      } else if (showPublish === true) {
        handlePublish(projectId);
      } else if (showUnpublish === true) {
        handleUnpublish(projectId);
      } else if (showOfferServices === true) {
        handleOfferServices(projectId);
      } else if (showLeaveServices === true) {
        handleLeaveServices(projectId);
      } else if (showCancelServices === true) {
        handleCancelServices(projectId);
      } else if (showAcceptProposal === true) {
        handleAcceptProposal(projectId);
      } else if (showRejectProposal === true) {
        handleRejectProposal(projectId);
      }
    }

    //eslint-disable-next-line
  }, [
    projectId,
    showEdit,
    showRemove,
    showPublish,
    showUnpublish,
    showOfferServices,
    showLeaveServices,
    showCancelServices
  ]);

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
