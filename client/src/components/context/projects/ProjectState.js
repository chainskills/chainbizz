import React, { useReducer } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';

import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
  PUBLISH_PROJECT,
  UNPUBLISH_PROJECT,
  ON_EDIT_PROJECT,
  ON_REMOVE_PROJECT,
  ON_PUBLISH_PROJECT,
  ON_UNPUBLISH_PROJECT,
  SUBMIT_OFFER,
  CANCEL_OFFER,
  ACCEPT_PROPOSAL,
  REJECT_PROPOSAL,
  ON_SUBMIT_OFFER,
  ON_CANCEL_OFFER,
  ON_ACCEPT_PROPOSAL,
  ON_REJECT_PROPOSAL,
  DELIVER_PROJECT,
  CANCEL_SERVICES,
  ACCEPT_DELIVERY,
  REJECT_DELIVERY,
  CANCEL_CONTRACT,
  ON_DELIVER_PROJECT,
  ON_CANCEL_SERVICES,
  ON_ACCEPT_DELIVERY,
  ON_REJECT_DELIVERY,
  ON_CANCEL_CONTRACT,
  ON_CANCEL_MODAL,
  CLEAR_CURRENT_SELECTION,
  GET_PROJECT,
  PROJECT_ERROR
} from '../types';

const ProjectState = props => {
  const initialState = {
    current: null,
    projects: null,
    error: null,
    projectId: null,
    showEdit: false,
    showRemove: false,
    showPublish: false,
    showUnpublish: false,
    showSubmitOffer: false,
    showCancelOffer: false,
    showAcceptProposal: false,
    showRejectProposal: false,
    showDeliverProject: false,
    showCancelServices: false,
    showAcceptDelivery: false,
    showRejectDelivery: false,
    showCancelContract: false
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Add a project
  const addProject = (drizzle, drizzleState, project) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];
    const { title, description, price } = project;

    // save the project
    ChainBizz.methods
      .addProject(
        title,
        description,
        drizzle.web3.utils.toWei(price.toString(), 'ether')
      )
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: ADD_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Update a project
  const updateProject = (drizzle, drizzleState, projectId, project) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];
    const { title, description, price } = project;

    // save the project
    ChainBizz.methods
      .updateProject(
        projectId,
        title,
        description,
        drizzle.web3.utils.toWei(price.toString(), 'ether')
      )
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: UPDATE_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Remove a project
  const removeProject = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // remove the project
    ChainBizz.methods
      .removeProject(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: REMOVE_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Publish a project
  const publishProject = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // publish the project
    ChainBizz.methods
      .publishProject(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: PUBLISH_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Unpublish a project
  const unpublishProject = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // unpublish the project
    ChainBizz.methods
      .unpublishProject(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: UNPUBLISH_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Submit offer of sercices to the project
  const submitOffer = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // offer our services
    ChainBizz.methods
      .submitOffer(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: SUBMIT_OFFER, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Cancel offer of sercices to the project
  const cancelOffer = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // offer our services
    ChainBizz.methods
      .cancelOffer(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: CANCEL_OFFER, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };
  // Accept proposal to our project
  const acceptProposal = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // accept services
    ChainBizz.methods
      .acceptProposal(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: ACCEPT_PROPOSAL, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Reject proposal of the provider
  const rejectProposal = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // reject services
    ChainBizz.methods
      .rejectProposal(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: REJECT_PROPOSAL, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Deliver the project to the owner
  const deliverProject = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // validate services of the provider
    ChainBizz.methods
      .deliverProject(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: DELIVER_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Cancel services to deliver to the owner
  const cancelServices = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // cancel services
    ChainBizz.methods
      .cancelServices(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: CANCEL_SERVICES, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Accept delivery sent by the provider
  const acceptDelivery = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // accept delivery
    ChainBizz.methods
      .acceptDelivery(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: ACCEPT_DELIVERY, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Reject delivery sent by the provider
  const rejectDelivery = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // reject the delivery
    ChainBizz.methods
      .rejectDelivery(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: REJECT_DELIVERY, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Cancel the contract with the provider
  const cancelContract = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // cancel contract
    ChainBizz.methods
      .cancelContract(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: CANCEL_CONTRACT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Prepare to edit a project
  const onEditProject = projectId => {
    dispatch({ type: ON_EDIT_PROJECT, payload: projectId });
  };

  // Prepare to remove a project
  const onRemoveProject = projectId => {
    dispatch({ type: ON_REMOVE_PROJECT, payload: projectId });
  };

  // Prepare to publish a project
  const onPublishProject = projectId => {
    dispatch({ type: ON_PUBLISH_PROJECT, payload: projectId });
  };

  // Prepare to unpublish a project
  const onUnpublishProject = projectId => {
    dispatch({ type: ON_UNPUBLISH_PROJECT, payload: projectId });
  };

  // Prepare to submit offer of services
  const onSubmitOffer = projectId => {
    dispatch({ type: ON_SUBMIT_OFFER, payload: projectId });
  };

  // Prepare to cancel offer of services
  const onCancelOffer = projectId => {
    dispatch({ type: ON_CANCEL_OFFER, payload: projectId });
  };

  // Prepare to accepts proposal
  const onAcceptProposal = projectId => {
    dispatch({ type: ON_ACCEPT_PROPOSAL, payload: projectId });
  };

  // Prepare to reject proposal
  const onRejectProposal = projectId => {
    dispatch({ type: ON_REJECT_PROPOSAL, payload: projectId });
  };

  // Prepare the delivery of the project
  const onDeliveryProject = projectId => {
    dispatch({ type: ON_DELIVER_PROJECT, payload: projectId });
  };

  // Cancel services
  const onCancelService = projectId => {
    dispatch({ type: ON_CANCEL_SERVICES, payload: projectId });
  };

  // Prepare to accepts the delivery
  const onAcceptDelivery = projectId => {
    dispatch({ type: ON_ACCEPT_DELIVERY, payload: projectId });
  };

  // Prepare to reject the delivery
  const onRejectDelivery = projectId => {
    dispatch({ type: ON_REJECT_DELIVERY, payload: projectId });
  };

  // Prepare to cancel the contract
  const onCancelContract = projectId => {
    dispatch({ type: ON_CANCEL_CONTRACT, payload: projectId });
  };

  // Cancel the modal form
  const onCancelModal = () => {
    dispatch({ type: ON_CANCEL_MODAL });
  };

  // Get a project
  const getProject = async (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    let project = await ChainBizz.methods.getProject(projectId).call({
      from: account
    });

    project.price = drizzle.web3.utils.fromWei(
      project.price.toString(),
      'ether'
    );

    dispatch({
      type: GET_PROJECT,
      payload: project
    });
  };

  // Clear current selection
  const clearCurrrentSelection = () => {
    dispatch({ type: CLEAR_CURRENT_SELECTION });
  };

  return (
    <ProjectContext.Provider
      value={{
        current: state.current,
        project: state.project,
        error: state.error,
        projectId: state.projectId,
        showEdit: state.showEdit,
        showRemove: state.showRemove,
        showPublish: state.showPublish,
        showUnpublish: state.showUnpublish,
        showSubmitOffer: state.showSubmitOffer,
        showCancelOffer: state.showCancelOffer,
        showAcceptProposal: state.showAcceptProposal,
        showRejectProposal: state.showRejectProposal,
        showDeliverProject: state.showValidateServices,
        showCancelServices: state.showCancelServices,
        showAcceptDelivery: state.showAcceptDelivery,
        showRejectDelivery: state.showRejectDelivery,
        showCancelContract: state.showCancelContract,
        addProject,
        updateProject,
        removeProject,
        publishProject,
        unpublishProject,
        onEditProject,
        onRemoveProject,
        onPublishProject,
        onUnpublishProject,
        submitOffer,
        cancelOffer,
        acceptProposal,
        rejectProposal,
        onSubmitOffer,
        onCancelOffer,
        onAcceptProposal,
        onRejectProposal,
        deliverProject,
        cancelServices,
        acceptDelivery,
        rejectDelivery,
        cancelContract,
        onDeliveryProject,
        onCancelService,
        onAcceptDelivery,
        onRejectDelivery,
        onCancelContract,
        onCancelModal,
        getProject,
        clearCurrrentSelection
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
