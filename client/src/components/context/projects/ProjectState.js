import React, { useReducer, useState, useEffect } from 'react';
import _ from 'lodash';

import ProjectContext from './projectContext';
import projectReducer from './projectReducer';
import ipfsClient from 'ipfs-http-client';

import {
  firebaseAuth,
  projectsRef,
  firebaseStorage
} from '../../../firebase/firebase';

import { projectStatus } from '../../ContractData/Project/ProjectStatus';

import {
  IS_ENABLED,
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
  RATINGS_ISSUER,
  RATINGS_FULFILLER,
  ON_DELIVER_PROJECT,
  ON_CANCEL_SERVICES,
  ON_ACCEPT_DELIVERY,
  ON_REJECT_DELIVERY,
  ON_CANCEL_CONTRACT,
  ON_RATINGS_ISSUER,
  ON_RATINGS_FULFILLER,
  ON_CANCEL_MODAL,
  CLEAR_CURRENT_SELECTION,
  GET_PROJECT,
  PROJECT_ERROR
} from '../types';

const ProjectState = props => {
  const initialState = {
    current: null,
    lastChanged: null,
    removed: false,
    enabled: true,
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
    showCancelContract: false,
    showRatingsIssuer: false,
    showRatingsFulfiller: false
  };

  const [ipfs, setIPFS] = useState(null);

  useEffect(() => {
    const _ipfs = ipfsClient('https://ipfs.infura.io:5001');
    setIPFS(_ipfs);
    // eslint-disable-next-line
  }, []);

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Check if contract is enabled
  const isEnabled = async drizzle => {
    const { ChainBizz } = drizzle.contracts;

    const enabled = await ChainBizz.methods.isEnabled().call();

    dispatch({ type: IS_ENABLED, payload: enabled });
  };

  // Disable the contract and payback all projects' owners
  const disableContract = async (drizzle, account) => {
    const { ChainBizz } = drizzle.contracts;

    const enabled = await ChainBizz.methods.isEnabled().call();
    if (enabled === false) {
      // alreay disabled
      return;
    }

    // disable the contract
    ChainBizz.methods
      .disableContract()
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        isEnabled(drizzle);
      })
      .on('error', err => {
        console.error(err);
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Enable the contract
  const enableContract = async (drizzle, account) => {
    const { ChainBizz } = drizzle.contracts;

    const enabled = await ChainBizz.methods.isEnabled().call();
    if (enabled === true) {
      // alreay enabled
      return;
    }

    // enable the contract
    ChainBizz.methods
      .enableContract()
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        isEnabled(drizzle);
      })
      .on('error', err => {
        console.error(err);
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Add a project
  const addProject = async (drizzle, account, project) => {
    const user = firebaseAuth.currentUser;
    if (user === null) {
      // Not connected
      // todo: send an error message
      return;
    }

    try {
      const { title, description, price } = project;

      // save the project
      const dataRef = await projectsRef
        .doc(user.uid)
        .collection('projects')
        .add({
          title,
          description,
          price: drizzle.web3.utils.toWei(price.toString(), 'ether'),
          issuer: account,
          owner: user.uid,
          creationDate: new Date()
        });

      dispatch({ type: ADD_PROJECT, payload: project });
    } catch (error) {
      console.error(error);
      dispatch({ type: PROJECT_ERROR, payload: error });
    }

    /*
    const { ChainBizz } = drizzle.contracts;

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
        console.error(err);
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
      */
  };

  // Update a project
  const updateProject = (drizzle, account, projectId, project) => {
    const { ChainBizz } = drizzle.contracts;

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

  // Update a draft project
  const updateDraftProject = async (drizzle, account, projectId, project) => {
    const user = firebaseAuth.currentUser;
    if (user === null) {
      // Not connected
      // todo: send an error message
      return;
    }

    try {
      const { title, description, price } = project;

      // save the project
      const ref = projectsRef
        .doc(user.uid)
        .collection('projects')
        .doc(projectId);

      await ref.update({
        title: title,
        description: description,
        price: drizzle.web3.utils.toWei(price.toString(), 'ether'),
        updateDate: new Date()
      });

      dispatch({ type: UPDATE_PROJECT, payload: project });
    } catch (err) {
      console.error(err);
      dispatch({ type: PROJECT_ERROR, payload: err });
    }
  };

  // Remove a project
  const removeProject = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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

  // Remove a draft project
  const removeDraftProject = async projectId => {
    const user = firebaseAuth.currentUser;
    if (user === null) {
      // Not connected
      // todo: send an error message
      return;
    }

    try {
      // delete the project
      await projectsRef
        .doc(user.uid)
        .collection('projects')
        .doc(projectId)
        .delete();

      dispatch({ type: REMOVE_PROJECT });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: PROJECT_ERROR, payload: err });
    }
  };

  // Publish a project
  const publishProject = async (drizzle, account, projectId) => {
    const user = firebaseAuth.currentUser;
    if (user === null) {
      // Not connected
      // todo: send an error message
      return;
    }

    const { ChainBizz } = drizzle.contracts;

    try {
      // retrieve the project
      const project = await projectsRef
        .doc(user.uid)
        .collection('projects')
        .doc(projectId)
        .get();

      if (project.exists) {
        if (ipfs !== null) {
          // publish the project in IPFS
          const doc = JSON.stringify(project.data());
          for await (const ipfsDoc of ipfs.add(doc)) {
            // save the project
            ChainBizz.methods
              .publishProject(
                project.data().title,
                project.data().price,
                ipfsDoc.path
              )
              .send({
                from: account,
                gas: 500000
              })
              .on('receipt', receipt => {
                // remove from firestore
                removeDraftProject(projectId);

                dispatch({ type: PUBLISH_PROJECT, payload: receipt });
              })
              .on('error', err => {
                console.error(err);
                dispatch({ type: PROJECT_ERROR, payload: err });
              });
          }
        }
      } else {
        console.log('Not exist');
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: PROJECT_ERROR, payload: err });
    }
  };

  // Unpublish the project from the contract (via IPFS) to firestore
  const unpublishProject = async (drizzle, account, projectId) => {
    const user = firebaseAuth.currentUser;
    if (user === null) {
      // Not connected
      // todo: send an error message
      return;
    }

    const { ChainBizz } = drizzle.contracts;

    // retrieve the ipfsHash of the contract
    const project = await ChainBizz.methods.getProject(projectId).call({
      from: account
    });

    if (project.ipfsHash.length === 0 || ipfs === null) {
      return;
    }

    // retrieve the published project from IPFS
    let data = '';
    for await (const doc of ipfs.cat(project.ipfsHash)) {
      data += doc;
      //console.log(JSON.parse(doc));
    }

    const projectData = JSON.parse(data);

    const { title, description, price, issuer, owner } = projectData;

    let creationDate = null;
    if (
      projectData.creationDate !== null &&
      typeof projectData.creationDate !== 'undefined'
    ) {
      creationDate = new Date(
        _.get(projectData, 'creationDate.seconds') * 1000
      );
    }

    let updateDate = null;
    if (
      projectData.updateDate !== null &&
      typeof projectData.updateDate !== 'undefined'
    ) {
      updateDate = new Date(_.get(projectData, 'updateDate.seconds') * 1000);
    }

    // unpublish the project from the contract
    ChainBizz.methods
      .removeProject(projectId)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', async receipt => {
        // restore the project to firestore
        await projectsRef
          .doc(user.uid)
          .collection('projects')
          .add({
            title,
            description,
            price: price,
            issuer: issuer,
            owner: owner,
            creationDate: creationDate,
            updateDate: updateDate
          });

        dispatch({ type: UNPUBLISH_PROJECT, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  /*
  // Unpublish a project
  const unpublishProject = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

    // First we read the ipfs hash from the contract
    

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
*/

  // Submit offer of sercices to the project
  const submitOffer = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const cancelOffer = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const acceptProposal = async (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

    // retrieve the price of the contract
    const project = await ChainBizz.methods.getProject(projectId).call({
      from: account
    });

    // accept services
    ChainBizz.methods
      .acceptProposal(projectId)
      .send({
        from: account,
        gas: 500000,
        value: project.price
      })
      .on('receipt', receipt => {
        dispatch({ type: ACCEPT_PROPOSAL, payload: receipt });
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Reject proposal of the provider
  const rejectProposal = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const deliverProject = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const cancelServices = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const acceptDelivery = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const rejectDelivery = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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
  const cancelContract = (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

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

  // Set the ratings to the issuer
  const setRatingsIssuer = (drizzle, account, projectId, ratings) => {
    const { ChainBizz } = drizzle.contracts;

    // set the ratings
    ChainBizz.methods
      .setRatingsIssuer(projectId, ratings)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch(getProject(drizzle, account, projectId));
      })
      .on('error', err => {
        dispatch({ type: PROJECT_ERROR, payload: err });
      });
  };

  // Set the ratings to the fulfiller
  const setRatingsFulfiller = (drizzle, account, projectId, ratings) => {
    const { ChainBizz } = drizzle.contracts;

    // set the ratings
    ChainBizz.methods
      .setRatingsFulfiller(projectId, ratings)
      .send({
        from: account,
        gas: 500000
      })
      .on('receipt', receipt => {
        dispatch(getProject(drizzle, account, projectId));
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
  const onDeliverProject = projectId => {
    dispatch({ type: ON_DELIVER_PROJECT, payload: projectId });
  };

  // Cancel services
  const onCancelServices = projectId => {
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

  // Prepare to ratings for the issuer
  const onRatingsIssuer = projectId => {
    dispatch({ type: ON_RATINGS_ISSUER, payload: projectId });
  };

  // Prepare to ratings for the fulfiller
  const onRatingsFulfiller = projectId => {
    dispatch({ type: ON_RATINGS_FULFILLER, payload: projectId });
  };

  // Cancel the modal form
  const onCancelModal = () => {
    dispatch({ type: ON_CANCEL_MODAL });
  };

  // Get a project published on Ethereum and IPFS
  const getProject = async (drizzle, account, projectId) => {
    const { ChainBizz } = drizzle.contracts;

    // retrieve the project from the contract
    let project = await ChainBizz.methods.getProject(projectId).call({
      from: account
    });

    project.price = drizzle.web3.utils.fromWei(
      project.price.toString(),
      'ether'
    );

    if (project.ipfsHash.length === 0 || ipfs === null) {
      return;
    }

    // retrieve the published project from IPFS
    let data = '';
    for await (const doc of ipfs.cat(project.ipfsHash)) {
      data += doc;
    }

    const projectData = JSON.parse(data);

    const { description, creationDate, updateDate } = projectData;

    // check of empty fulfiller address
    const emptyAddress = /^0x0+$/.test(project.fulfiller);

    const publishedProject = {
      ...project,
      id: projectId,
      description: description,
      creationDate: creationDate,
      updateDate: updateDate,
      fulfiller: emptyAddress ? null : project.fulfiller
    };


    dispatch({
      type: GET_PROJECT,
      payload: publishedProject
    });
  };

  // Get a draft project
  const getDraftProject = async (drizzle, account, projectId) => {
    const user = firebaseAuth.currentUser;
    if (user === null) {
      // Not connected
      // todo: send an error message
      return;
    }

    try {
      // retrieve the project
      const project = await projectsRef
        .doc(user.uid)
        .collection('projects')
        .doc(projectId)
        .get();

      if (project.exists) {
        const price = drizzle.web3.utils.fromWei(
          project.data().price.toString(),
          'ether'
        );

        dispatch({
          type: GET_PROJECT,
          id: projectId,
          payload: {
            ...project.data(),
            price: price,
            id: projectId,
            status: projectStatus.DRAFT
          }
        });
      } else {
        console.log('Not exist');
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: PROJECT_ERROR, payload: err });
    }
  };

  // Clear current selection
  const clearCurrentSelection = () => {
    dispatch({ type: CLEAR_CURRENT_SELECTION });
  };

  return (
    <ProjectContext.Provider
      value={{
        current: state.current,
        lastChanged: state.lastChanged,
        removed: state.removed,
        enabled: state.enabled,
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
        showDeliverProject: state.showDeliverProject,
        showCancelServices: state.showCancelServices,
        showAcceptDelivery: state.showAcceptDelivery,
        showRejectDelivery: state.showRejectDelivery,
        showCancelContract: state.showCancelContract,
        showRatingsIssuer: state.showRatingsIssuer,
        showRatingsFulfiller: state.showRatingsFulfiller,
        addProject,
        updateProject,
        updateDraftProject,
        removeProject,
        removeDraftProject,
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
        setRatingsIssuer,
        setRatingsFulfiller,
        onDeliverProject,
        onCancelServices,
        onAcceptDelivery,
        onRejectDelivery,
        onCancelContract,
        onRatingsIssuer,
        onRatingsFulfiller,
        onCancelModal,
        getProject,
        getDraftProject,
        clearCurrentSelection,
        isEnabled,
        disableContract,
        enableContract
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
