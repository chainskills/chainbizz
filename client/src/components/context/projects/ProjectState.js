import React, { useReducer } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';

import {
  ADD_PROJECT,
  ON_EDIT_PROJECT,
  ON_REMOVE_PROJECT,
  ON_PUBLISH_PROJECT,
  ON_UNPUBLISH_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
  PUBLISH_PROJECT,
  UNPUBLISH_PROJECT,
  CLEAR_CURRENT_SELECTION,
  GET_PROJECT,
  OFFER_SERVICES,
  ACCEPT_PROPOSAL,
  REJECT_PROPOSAL,
  VALIDATE_SERVICES,
  ACCEPT_SERVICES,
  REJECT_SERVICES,
  LEAVE_SERVICES,
  CANCEL_SERVICES,
  ON_OFFER_SERVICES,
  ON_ACCEPT_PROPOSAL,
  ON_REJECT_PROPOSAL,
  ON_VALIDATE_SERVICES,
  ON_ACCEPT_SERVICES,
  ON_REJECT_SERVICES,
  ON_LEAVE_SERVICES,
  ON_CANCEL_SERVICES,
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
    showOfferServices: false,
    showAcceptProposal: false,
    showRejectProposal: false,
    showValidateServices: false,
    showAcceptServices: false,
    showRejectServices: false,
    showLeaveServices: false,
    showCancelServices: false
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

  // Offer sercices to the project
  const offerServices = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // offer our services
    ChainBizz.methods
      .offerServices(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: OFFER_SERVICES, payload: receipt });
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

  // Validate sercices
  const validateServices = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // validate services of the provider
    ChainBizz.methods
      .validateServices(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: VALIDATE_SERVICES, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Accept sercices from the provider
  const acceptServices = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // accept services
    ChainBizz.methods
      .acceptServices(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: ACCEPT_SERVICES, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Reject sercices of the provider
  const rejectServices = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // reject services
    ChainBizz.methods
      .rejectServices(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: REJECT_SERVICES, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Leave services from the provider
  const leaveServices = (drizzle, drizzleState, projectId) => {
    const { ChainBizz } = drizzle.contracts;
    const account = drizzleState.accounts[0];

    // leave services
    ChainBizz.methods
      .leaveServices(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch({ type: LEAVE_SERVICES, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Cancel sercices from the provider
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

  // Prepare to offer services
  const onOfferServices = projectId => {
    dispatch({ type: ON_OFFER_SERVICES, payload: projectId });
  };

  // Prepare to accepts proposal
  const onAcceptProposal = projectId => {
    dispatch({ type: ON_ACCEPT_PROPOSAL, payload: projectId });
  };

  // Prepare to reject proposal
  const onRejectProposal = projectId => {
    dispatch({ type: ON_REJECT_PROPOSAL, payload: projectId });
  };

  // Prepare the validation of the services
  const onValidateServices = projectId => {
    dispatch({ type: ON_VALIDATE_SERVICES, payload: projectId });
  };

  // Prepare to accepts services
  const onAcceptServices = projectId => {
    dispatch({ type: ON_ACCEPT_SERVICES, payload: projectId });
  };

  // Prepare to reject services
  const onRejectServices = projectId => {
    dispatch({ type: ON_REJECT_SERVICES, payload: projectId });
  };

  // Leave services
  const onLeaveService = projectId => {
    dispatch({ type: ON_LEAVE_SERVICES, payload: projectId });
  };

  // Cancel services
  const onCanceService = projectId => {
    dispatch({ type: ON_CANCEL_SERVICES, payload: projectId });
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
        showOfferServices: state.showOfferServices,
        showAcceptProposal: state.showAcceptProposal,
        showRejectProposal: state.showRejectProposal,
        showValidateServices: state.showValidateServices,
        showAcceptServices: state.showAcceptServices,
        showRejectServices: state.showRejectServices,
        showLeaveServices: state.showLeaveServices,
        showCancelServices: state.showCancelServices,
        addProject,
        updateProject,
        removeProject,
        publishProject,
        unpublishProject,
        onEditProject,
        onRemoveProject,
        onPublishProject,
        onUnpublishProject,
        onOfferServices,
        onAcceptProposal,
        onRejectProposal,
        onValidateServices,
        onAcceptServices,
        onRejectServices,
        acceptServices,
        offerServices,
        rejectServices,
        acceptProposal,
        rejectProposal,
        leaveServices,
        cancelServices,
        getProject,
        clearCurrrentSelection
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
