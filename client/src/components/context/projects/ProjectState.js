import React, { useReducer } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';

import { ADD_PROJECT, PROJECT_ERROR } from '../types';

const ProjectState = props => {
  const initialState = {
    current: null,
    projects: null,
    error: null
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

  return (
    <ProjectContext.Provider
      value={{
        current: state.current,
        project: state.project,
        error: state.error,
        addProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
