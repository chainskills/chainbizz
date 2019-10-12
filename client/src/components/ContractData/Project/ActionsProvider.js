import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

import contractOpportunity from '../../../assets/images/contract-opportunity.svg';
import projectCompleted from '../../../assets/images/project-completed.svg';
import contractCancel from '../../../assets/images/contract-cancel.svg';

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
          <img src={contractOpportunity} style={{ width: '35px' }} />
        </a>
      )}

      {status === projectStatus.REVIEW && (
        <a
          href={'#!'}
          onClick={() => {
            onCancelOffer(projectId);
          }}
          title={'Cancel your offer of services'}
        >
          <img src={contractCancel} style={{ width: '35px' }} />
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
            <img src={contractCancel} style={{ width: '35px' }} />
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onDeliverProject(projectId);
            }}
            title={'Deliver the project'}
          >
            <img src={projectCompleted} style={{ width: '35px' }} />
          </a>
        </span>
      )}
    </div>
  );
};

export default ActionsProvider;
