import React, { useReducer } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';

import {
  ADD_PROJECT,
  EDIT_PROJECT,
  UPDATE_PROJECT,
  CLEAR_CURRENT_SELECTION,
  GET_PROJECT,
  PROJECT_ERROR
} from '../types';

const ProjectState = props => {
  const initialState = {
    current: null,
    projects: null,
    error: null,
    projectId: null
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

  // Edit a project
  const editProject = projectId => {
    console.log(projectId);
    dispatch({ type: EDIT_PROJECT, payload: projectId });
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
        addProject,
        updateProject,
        editProject,
        getProject,
        clearCurrrentSelection
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
