import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

import contractOpportunity from '../../../assets/images/contract-opportunity.svg';
import contractReview from '../../../assets/images/contract-review.svg';
import contractDeal from '../../../assets/images/contract-deal.svg';
import contractCancel from '../../../assets/images/contract-cancel.svg';

const ActionsOwner = ({ projectId, status }) => {
  const projectContext = useContext(ProjectContext);
  const {
    onEditProject,
    onRemoveProject,
    onPublishProject,
    onUnpublishProject,
    onAcceptProposal,
    onRejectProposal
  } = projectContext;

  console.log(status);
  return (
    <div>
      {status === projectStatus.DRAFT && (
        <a
          onClick={() => {
            onRemoveProject(projectId);
          }}
          title={'Remove'}
        >
          <i className='material-icons'>delete</i>
        </a>
      )}
      {status === projectStatus.DRAFT && (
        <a
          onClick={() => {
            onEditProject(projectId);
          }}
          title={'Edit'}
        >
          <i className='material-icons'>edit</i>
        </a>
      )}
      {status === projectStatus.DRAFT && (
        <a
          onClick={() => {
            onPublishProject(projectId);
          }}
          title={'Publish'}
        >
          <i className='material-icons'>publish</i>
        </a>
      )}

      {status === projectStatus.AVAILABLE && (
        <a
          onClick={() => {
            onUnpublishProject(projectId);
          }}
          title={'Unpublish'}
        >
          <i className='material-icons'>get_app</i>
        </a>
      )}

      {status === projectStatus.REVIEW && (
        <span>
          {' '}
          <a
            onClick={() => {
              onRejectProposal(projectId);
            }}
            title={'Reject the proposal'}
          >
            <img src={contractCancel} style={{ width: '25px' }} />
          </a>
          <a
            onClick={() => {
              onAcceptProposal(projectId);
            }}
            title={'Accept the proposal'}
          >
            <img src={contractReview} style={{ width: '25px' }} />
          </a>
        </span>
      )}

      {status === projectStatus.ONGOING && (
        <a
          onClick={() => {
            onUnpublishProject(projectId);
          }}
          title={'Unpublish'}
        >
          <img src={contractDeal} style={{ width: '25px' }} />
        </a>
      )}
    </div>
  );
};

export default ActionsOwner;
