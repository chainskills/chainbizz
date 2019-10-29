import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

const ActionsProvider = ({ projectId, status }) => {
  const projectContext = useContext(ProjectContext);
  const {
    onSubmitOffer,
    onCancelOffer,
    onDeliverProject,
    onCancelServices
  } = projectContext;

  return (
    <div>
      {status === projectStatus.AVAILABLE && (
        <a
          href={'#!'}
          onClick={() => {
            onSubmitOffer(projectId);
          }}
          title={'Offer your services'}
        >
          <i className='material-icons card-icon'>check</i>
        </a>
      )}

      {(status === projectStatus.REVIEW ||
        status === projectStatus.VALIDATE) && (
        <a
          href={'#!'}
          onClick={() => {
            onCancelOffer(projectId);
          }}
          title={'Cancel your offer of services'}
        >
          <i className='material-icons card-icon'>close</i>
        </a>
      )}

      {status === projectStatus.ONGOING && (
        <span>
          <a
            href={'#!'}
            onClick={() => {
              onCancelServices(projectId);
            }}
            title={'Cancel your services'}
          >
            <i className='material-icons card-icon'>clear</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onDeliverProject(projectId);
            }}
            title={'Deliver the project'}
          >
            <i className='material-icons card-icon'>send</i>
          </a>
        </span>
      )}
    </div>
  );
};

export default ActionsProvider;
