import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../dialog/modal/project/ProjectModal';
import ConfirmModal from '../dialog/modal/confirm/ConfirmModal';

const Project = ({ drizzle, account }) => {
  const projectContext = useContext(ProjectContext);
  const {
    enabled,
    addProject,
    updateProject,
    removeProject,
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
    showDeliverProject,
    showCancelServices,
    showAcceptDelivery,
    showRejectDelivery,
    showCancelContract,
    clearCurrrentSelection,
    getProject,
    onCancelModal,
    isEnabled,
    projectId
  } = projectContext;

  const [contractEnable, setContractEnable] = useState(false);

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

  const handleNewProject = () => {
    setDataID(null);
    clearCurrrentSelection();
    setModalProjectOpen(true);
    setAction1({
      title: 'Save',
      visible: true,
      add: function(project) {
        setModalProjectOpen(false);
        addProject(drizzle, account, project);
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

  const handleDisableContract = () => {
    setDataID(null);
    setModalConfirmationOpen(true);

    setModalTitle('Disable the ChainBizz contract');
    setModalDescription(
      'If you disable your contract, all deposits of running contracts will be refunded to their owners and the contract will not more available until being re-enable. Are you sure to accept the delivery?'
    );

    setAction1({
      title: 'Disable',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        disableContract(drizzle, account);
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

  const handleEnableContract = () => {
    setDataID(null);
    setModalConfirmationOpen(true);

    setModalTitle('Enable the ChainBizz contract');
    setModalDescription(
      'If you (re)enable your contract, all users will be able to interact with and to deposit ethers in the wallet of the contract. Are you sure to accept the delivery?'
    );

    setAction1({
      title: 'Enable',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        enableContract(drizzle, account);
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

  const handleEditProject = id => {
    setDataID(id);
    clearCurrrentSelection();
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
        removeProject(drizzle, account, id);
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
        publishProject(drizzle, account, id);
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
        unpublishProject(drizzle, account, id);
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
        acceptProposal(drizzle, account, id);
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
        rejectProposal(drizzle, account, id);
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
      'Are you sure to cancel the services you offered to the customer?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelServices(drizzle, account, id);
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

  const handleAcceptDelivery = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Accept Delivery');
    setModalDescription(
      'If you accept the delivery, your deposit will be sent to the service provider. Are you sure to accept the delivery?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        acceptDelivery(drizzle, account, id);
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
    // retrieve the status of the contract
    isEnabled(drizzle);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setContractEnable(enabled);
  }, [enabled]);

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
      }
    }
    //eslint-disable-next-line
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
    showCancelContract
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
        <div className='col s12 m4'>
          {enabled === true && (
            <a
              className='waves-effect waves-light btn blue-grey lighten-1'
              onClick={() => handleDisableContract()}
            >
              <i className='material-icons left'>cancel</i>Disable
            </a>
          )}
          {enabled === false && (
            <a
              className='waves-effect waves-light btn blue-grey lighten-1'
              onClick={() => handleEnableContract()}
            >
              <i className='material-icons left'>cancel</i>Enable
            </a>
          )}
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
