import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import { firebaseAuth } from '../../firebase/firebase';

import ProjectContext from '../context/projects/projectContext';
import AuthContext from '../context/auth/authContext';

import EventContext from '../context/events/eventContext';

import ProjectModal from '../dialog/modal/project/ProjectModal';
import ConfirmModal from '../dialog/modal/confirm/ConfirmModal';
import AcceptModal from '../dialog/modal/accept/AcceptModal';
import RatingsFulfillerModal from '../dialog/modal/ratings/RatingsFulfillerModal';
import RatingsIssuerModal from '../dialog/modal/ratings/RatingsIssuerModal';

const Project = ({ drizzle, account }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const projectContext = useContext(ProjectContext);
  const {
    enabled,
    addProject,
    updateProject,
    updateDraftProject,
    removeProject,
    removeDraftProject,
    publishProject,
    unpublishProject,
    showEdit,
    showRemove,
    showPublish,
    showUnpublish,
    submitOffer,
    cancelOffer,
    acceptProposal,
    rejectProposal,
    showSubmitOffer,
    showCancelOffer,
    showAcceptProposal,
    showRejectProposal,
    deliverProject,
    cancelServices,
    acceptDelivery,
    rejectDelivery,
    cancelContract,
    disableContract,
    enableContract,
    setRatingsIssuer,
    setRatingsFulfiller,
    showDeliverProject,
    showCancelServices,
    showAcceptDelivery,
    showRejectDelivery,
    showCancelContract,
    showRatingsIssuer,
    showRatingsFulfiller,
    clearCurrentSelection,
    getProject,
    getDraftProject,
    isEnabled,
    projectId
  } = projectContext;

  const eventContext = useContext(EventContext);
  const {
    events,
    lastEventId,
    setupEvents,
    unsubscribeAllEvents
  } = eventContext;

  const [contractEnable, setContractEnable] = useState(false);

  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const [modalProjectOpen, setModalProjectOpen] = useState(false);
  const [modalAcceptOpen, setModalAcceptOpen] = useState(false);
  const [modalRatingsIssuerOpen, setModalRatingsIssuerOpen] = useState(false);
  const [modalRatingsFulfillerOpen, setModalRatingsFulfillerOpen] = useState(
    false
  );

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

  const handleNewProject = () => {
    setDataID(null);
    clearCurrentSelection();
    setModalProjectOpen(true);
    setAction1({
      title: 'Save',
      visible: true,
      add: function(project) {
        setModalProjectOpen(false);
        addProject(drizzle, account, project);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleDisableContract = () => {
    setDataID(null);
    setModalTitle('Disable the ChainBizz contract');
    setModalDescription(
      'If you disable your contract, all deposits of running contracts will be refunded to their owners and the contract will not more available until being re-enable. Are you sure to accept the delivery?'
    );
    setModalConfirmationOpen(true);
    setAction1({
      title: 'Disable',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        disableContract(drizzle, account);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleEnableContract = () => {
    setDataID(null);
    setModalTitle('Enable the ChainBizz contract');
    setModalDescription(
      'If you (re)enable your contract, all users will be able to interact with and to deposit ethers in the wallet of the contract. Are you sure to accept the delivery?'
    );

    setModalConfirmationOpen(true);
    setAction1({
      title: 'Enable',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        enableContract(drizzle, account);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleEditProject = id => {
    setDataID(id);
    clearCurrentSelection();
    if (id !== null) {
      getProject(drizzle, account, id);
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
        updateProject(drizzle, account, id, project);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleEditDraftProject = id => {
    setDataID(id);
    clearCurrentSelection();
    if (id !== null) {
      getDraftProject(drizzle, account, id);
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
        updateDraftProject(drizzle, account, id, project);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: () => hideModalDialog()
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
        removeProject(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleDraftRemove = id => {
    setDataID(id);
    setModalTitle('Remove Project');
    setModalDescription('Are you sure to remove this project?');

    setModalConfirmationOpen(true);
    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        removeDraftProject(id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
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
        publishProject(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        clearCurrentSelection();
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
        unpublishProject(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleSubmitOffer = id => {
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
        submitOffer(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleCancelOffer = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel your services');
    setModalDescription(
      'Are you sure to cancel the offer of your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelOffer(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
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
        acceptProposal(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
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
        rejectProposal(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleDeliverProject = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Deliver the project');
    setModalDescription(
      'Are you sure to delivery the project to the customer?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        deliverProject(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleCancelServices = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel services');
    setModalDescription(
      'Are you sure to cancel the services you offered to the customer?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelServices(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleAcceptDelivery = id => {
    setDataID(id);
    setModalAcceptOpen(true);

    setModalTitle('Accept Delivery');
    setModalDescription(
      'If you accept the delivery, your deposit will be sent to the service provider. Are you sure to accept the delivery?'
    );

    setAction1({
      title: 'Accept',
      visible: true,
      handle: function(id) {
        setModalAcceptOpen(false);
        acceptDelivery(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleRejectDelivery = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Reject Delivery');
    setModalDescription(
      'If you reject the delivery, the service provider will have to review the project and to submit it again. Are you sure to reject the delivery?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        rejectDelivery(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleCancelContract = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel contract');
    setModalDescription(
      'If you cancel the contract, you will get back your deposit and your project will be set to cancel. Are you sure to cancel the contract?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelContract(drizzle, account, id);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleRatingsFulfiller = id => {
    setDataID(id);
    setModalRatingsFulfillerOpen(true);

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id, ratings) {
        setModalRatingsFulfillerOpen(false);
        setRatingsFulfiller(drizzle, account, id, ratings);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const handleRatingsIssuer = id => {
    setDataID(id);
    setModalRatingsIssuerOpen(true);

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id, ratings) {
        setModalRatingsIssuerOpen(false);
        setRatingsIssuer(drizzle, account, id, ratings);
        clearCurrentSelection();
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: () => hideModalDialog()
    });
  };

  const hideModalDialog = () => {
    setModalProjectOpen(false);
    setModalConfirmationOpen(false);
    setModalAcceptOpen(false);
    setModalRatingsIssuerOpen(false);
    setModalRatingsFulfillerOpen(false);
    clearCurrentSelection();
  };

  useEffect(() => {
    // retrieve the status of the contract
    isEnabled(drizzle);

    // listen for events
    setupEvents(drizzle, account);

    return () => {
      unsubscribeAllEvents();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setContractEnable(enabled);
  }, [enabled, account]);

  useEffect(() => {
    if (projectId !== null) {
      if (showEdit === true) {
        handleEditDraftProject(projectId);
      } else if (showRemove === true) {
        handleDraftRemove(projectId);
      } else if (showPublish === true) {
        handlePublish(projectId);
      } else if (showUnpublish === true) {
        handleUnpublish(projectId);
      } else if (showSubmitOffer === true) {
        handleSubmitOffer(projectId);
      } else if (showCancelOffer === true) {
        handleCancelOffer(projectId);
      } else if (showAcceptProposal === true) {
        handleAcceptProposal(projectId);
      } else if (showRejectProposal === true) {
        handleRejectProposal(projectId);
      } else if (showDeliverProject === true) {
        handleDeliverProject(projectId);
      } else if (showCancelServices === true) {
        handleCancelServices(projectId);
      } else if (showAcceptDelivery === true) {
        handleAcceptDelivery(projectId);
      } else if (showRejectDelivery === true) {
        handleRejectDelivery(projectId);
      } else if (showCancelContract === true) {
        handleCancelContract(projectId);
      } else if (showRatingsIssuer === true) {
        handleRatingsIssuer(projectId);
      } else if (showRatingsFulfiller === true) {
        handleRatingsFulfiller(projectId);
      }
    }
  }, [
    projectId,
    showEdit,
    showRemove,
    showPublish,
    showUnpublish,
    showSubmitOffer,
    showCancelOffer,
    showAcceptProposal,
    showRejectProposal,
    showDeliverProject,
    showCancelServices,
    showAcceptDelivery,
    showRejectDelivery,
    showCancelContract,
    showRatingsIssuer,
    showRatingsFulfiller
  ]);

  return (
    <div>
      {isAuthenticated != null && isAuthenticated && (
        <div className='row container'>
          <div className='col s12 m4'>
            <a
              className='waves-effect waves-light btn blue-grey lighten-1 new-project no-uppercase'
              onClick={() => handleNewProject()}
            >
              <i className='material-icons left'>add</i>New Project
            </a>
          </div>
        </div>
      )}

      {modalConfirmationOpen && (
        <ConfirmModal
          title={modalTitle}
          content={modalDescription}
          dataID={dataID}
          onClose={() => hideModalDialog()}
          action1={action1}
          action2={action2}
        />
      )}

      {modalAcceptOpen && (
        <AcceptModal
          title={modalTitle}
          content={modalDescription}
          dataID={dataID}
          onClose={() => hideModalDialog()}
          action1={action1}
          action2={action2}
        />
      )}
      {modalRatingsIssuerOpen && (
        <RatingsIssuerModal
          title={modalTitle}
          content={modalDescription}
          dataID={dataID}
          onClose={() => hideModalDialog()}
          action1={action1}
          action2={action2}
        />
      )}
      {modalRatingsFulfillerOpen && (
        <RatingsFulfillerModal
          title={modalTitle}
          content={modalDescription}
          dataID={dataID}
          onClose={() => hideModalDialog()}
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
