import React, { useReducer } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';

import {
  ADD_PROJECT,
  ON_EDIT_PROJECT,
  ON_REMOVE_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
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
    showRemove: false
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

  // Prepare to edit a project
  const onEditProject = projectId => {
    dispatch({ type: ON_EDIT_PROJECT, payload: projectId });
  };

  // Prepare to remove a project
  const onRemoveProject = projectId => {
    dispatch({ type: ON_REMOVE_PROJECT, payload: projectId });
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
        addProject,
        updateProject,
        removeProject,
        onEditProject,
        onRemoveProject,
        getProject,
        clearCurrrentSelection
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
