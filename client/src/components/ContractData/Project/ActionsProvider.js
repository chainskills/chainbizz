import React, { useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from './ProjectStatus';

const ActionsProvider = ({ projectId, status, rated }) => {
  const projectContext = useContext(ProjectContext);
  const {
    onSubmitOffer,
    onCancelOffer,
    onDeliverProject,
    onCancelServices,
    onRatingsIssuer
  } = projectContext;

  return (
    <div>
      {status === projectStatus.AVAILABLE && (
        <a
          href={null}
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
          href={null}
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
            href={null}
            onClick={() => {
              onCancelServices(projectId);
            }}
            title={'Cancel your services'}
          >
            <i className='material-icons card-icon'>clear</i>
          </a>
          <a
            href={null}
            onClick={() => {
              onDeliverProject(projectId);
            }}
            title={'Deliver the project'}
          >
            <i className='material-icons card-icon'>send</i>
          </a>
        </span>
      )}

      {(status === projectStatus.COMPLETED ||
        status === projectStatus.CANCELED) &&
        rated == false && (
          <span>
            <a
              href={null}
              onClick={() => {
                onRatingsIssuer(projectId);
              }}
              title={'Set a rating to the issuer'}
            >
              <i className='material-icons card-icon'>star_half</i>
            </a>
          </span>
        )}
    </div>
  );
};

export default ActionsProvider;
