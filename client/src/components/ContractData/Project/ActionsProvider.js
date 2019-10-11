import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

import contractOpportunity from '../../../assets/images/contract-opportunity.svg';
import contractValidate from '../../../assets/images/contract-validate.svg';
import contractCancel from '../../../assets/images/contract-cancel.svg';

const ActionsProvider = ({ projectId, status }) => {
  const projectContext = useContext(ProjectContext);
  const {
    onOfferServices,
    onValidateServices,
    onLeaveServices
  } = projectContext;

  console.log(status);

  return (
    <div>
      {status === projectStatus.AVAILABLE && (
        <a
          href={'#!'}
          onClick={() => {
            onOfferServices(projectId);
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
            onLeaveServices(projectId);
          }}
          title={'Leave your services'}
        >
          <img src={contractCancel} style={{ width: '35px' }} />
        </a>
      )}

      {status === projectStatus.ONGOING && (
        <span>
          <a
            href={'#!'}
            onClick={() => {
              onValidateServices(projectId);
            }}
            title={'Validate your services'}
          >
            <img src={contractValidate} style={{ width: '35px' }} />
          </a>

          <a
            href={'#!'}
            onClick={() => {
              onLeaveServices(projectId);
            }}
            title={'Cancel your services'}
          >
            <img src={contractCancel} style={{ width: '35px' }} />
          </a>
        </span>
      )}
    </div>
  );
};

export default ActionsProvider;
