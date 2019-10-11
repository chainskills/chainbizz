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
    onCancelModal,
    projectId
  } = projectContext;

  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
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
        onCancelModal();
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
        onCancelModal();
      }
    });
  };

  const handleRemove = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Remove Project');
    setModalDescription('Are you sure to remove this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        removeProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handlePublish = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Publish Project');
    setModalDescription('Are you sure to publish this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        publishProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleUnpublish = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Unpublish Project');
    setModalDescription('Are you sure to unpublish this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        unpublishProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleOfferServices = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Offer your services');
    setModalDescription(
      'Are you sure to offer your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        offerServices(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleLeaveServices = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Leave your services');
    setModalDescription(
      'Are you sure to leave your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        leaveServices(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleCancelServices = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel services');
    setModalDescription(
      'Are you sure to cancel the services offered by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelServices(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleAcceptProposal = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Accept the proposal');
    setModalDescription(
      'Are you sure to accept the proposal made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        acceptProposal(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleRejectProposal = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Reject the proposal');
    setModalDescription(
      'Are you sure to reject the proposal made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        rejectProposal(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  useEffect(() => {
    console.log('Into useEffect');
    console.log('showEdit: ' + showEdit);
    console.log('showRemove: ' + showRemove);

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
            className='waves-effect waves-light btn blue-grey lighten-1'
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
          onClose={() => setModalConfirmationOpen(false)}
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
