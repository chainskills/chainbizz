import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

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
      {(status === projectStatus.DRAFT ||
        status === projectStatus.REFUNDED) && (
        <span>
          <a
            href={'#!'}
            onClick={() => {
              onRemoveProject(projectId);
            }}
            title={'Remove'}
          >
            <i className='material-icons card-icon'>delete</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onEditProject(projectId);
            }}
            title={'Edit'}
          >
            <i className='material-icons card-icon'>edit</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onPublishProject(projectId);
            }}
            title={'Publish'}
          >
            <i className='material-icons card-icon'>publish</i>
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
          <i className='material-icons card-icon'>get_app</i>
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
            <i className='material-icons card-icon'>clear</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onAcceptProposal(projectId);
            }}
            title={'Accept the proposal'}
          >
            <i className='material-icons card-icon'>check</i>
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
          <i className='material-icons card-icon'>block</i>
        </a>
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
            <i className='material-icons card-icon'>clear</i>
          </a>
          <a
            href={'#!'}
            onClick={() => {
              onAcceptDelivery(projectId);
            }}
            title={'Accept the delivery'}
          >
            <i className='material-icons card-icon'>check</i>
          </a>
        </span>
      )}
    </div>
  );
};

export default ActionsOwner;
