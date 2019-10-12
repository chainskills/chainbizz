import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

import contractReview from '../../../assets/images/contract-review.svg';
import contractCancel from '../../../assets/images/contract-cancel.svg';
import thumbUp from '../../../assets/images/thumb-up.svg';
import thumbDown from '../../../assets/images/thumb-down.svg';

const ActionsOwner = ({ projectId, status }) => {
  const projectContext = useContext(ProjectContext);
  const {
    onEditProject,
    onRemoveProject,
    onPublishProject,
    onUnpublishProject,
    onAcceptProposal,
    onRejectProposal,
    onAcceptDelivery,
    onRejectDelivery,
    onCancelContract
  } = projectContext;

  return (
    <div>
      {status === projectStatus.DRAFT && (
        <span>
          <a
            href={'#!'}
            onClick={() => {
              onRemoveProject(projectId);
            }}
            title={'Remove'}
          >
            <i className='material-icons'>delete</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onEditProject(projectId);
            }}
            title={'Edit'}
          >
            <i className='material-icons'>edit</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onPublishProject(projectId);
            }}
            title={'Publish'}
          >
            <i className='material-icons'>publish</i>
          </a>
        </span>
      )}

      {status === projectStatus.AVAILABLE && (
        <a
          href={'#!'}
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
          <a
            href={'#!'}
            onClick={() => {
              onRejectProposal(projectId);
            }}
            title={'Reject the proposal'}
          >
            <img src={contractCancel} style={{ width: '35px' }} />
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onAcceptProposal(projectId);
            }}
            title={'Accept the proposal'}
          >
            <img src={contractReview} style={{ width: '35px' }} />
          </a>
        </span>
      )}

      {status === projectStatus.VALIDATE && (
        <span>
          <a
            href={'#!'}
            onClick={() => {
              onRejectDelivery(projectId);
            }}
            title={'Reject the delivery'}
          >
            <img src={thumbDown} style={{ width: '35px' }} />
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onAcceptDelivery(projectId);
            }}
            title={'Accept the delivery'}
          >
            <img src={thumbUp} style={{ width: '35px' }} />
          </a>
        </span>
      )}

      {(status === projectStatus.ONGOING ||
        status === projectStatus.VALIDATE) && (
        <a
          href={'#!'}
          onClick={() => {
            onCancelContract(projectId);
          }}
          title={'Cancel the contract'}
        >
          <img src={contractCancel} style={{ width: '35px' }} />
        </a>
      )}
    </div>
  );
};

export default ActionsOwner;
