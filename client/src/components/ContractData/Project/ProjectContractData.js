import React, { useEffect, useState, useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';

const ProjectContractData = ({ projectId, drizzle, drizzleState }) => {
  // Project status
  const projectStatus = {
    DRAFT: 0,
    AVAILABLE: 1,
    INREVIEW: 2,
    ONGOING: 3,
    COMPLETED: 4,
    CANCELED: 5,
    UNKNOWN: 6
  };

  const projectContext = useContext(ProjectContext);
  const {
    onEditProject,
    onRemoveProject,
    onPublishProject,
    onUnpublishProject
  } = projectContext;

  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    const account = drizzleState.accounts[0];

    const { ChainBizz } = drizzle.contracts;
    setDataKey(
      ChainBizz.methods.getProject.cacheCall(projectId, {
        from: account
      })
    );

    //eslint-disable-next-line
  }, []);

  const account = drizzleState.accounts[0];
  // Retrieve project details only if the information is available
  let projectDetails = null;
  if (
    drizzleState.contracts.ChainBizz.getProject[dataKey] &&
    drizzleState.contracts.ChainBizz.getProject[dataKey].value
  ) {
    projectDetails = drizzleState.contracts.ChainBizz.getProject[dataKey].value;
  }

  // project not yet ready or not found
  if (projectDetails === null || typeof projectDetails === 'undefined') {
    return <span>Initializing...</span>;
  }

  const status = Number(projectDetails.status);

  return (
    <div className='col s12 m4'>
      <div className='card medium blue-grey'>
        <div className='card-content white-text'>
          <span className='card-title'>{projectDetails.title}</span>
          <p>
            <span className='badge blue white-text'>
              {drizzle.web3.utils.fromWei(
                projectDetails.price.toString(),
                'ether'
              )}
              {' ETH'}
            </span>
          </p>
          <p>{projectDetails.description}</p>
        </div>
        <div className='card-action'>
          {projectDetails.owner === account &&
            status !== projectStatus.AVAILABLE && (
              <a
                onClick={() => {
                  onRemoveProject(projectId);
                }}
                title={'Remove'}
              >
                <i className='material-icons'>delete</i>
              </a>
            )}
          {projectDetails.owner === account &&
            status !== projectStatus.AVAILABLE && (
              <a
                onClick={() => {
                  onEditProject(projectId);
                }}
                title={'Edit'}
              >
                <i className='material-icons'>edit</i>
              </a>
            )}
          {projectDetails.owner === account &&
            status !== projectStatus.AVAILABLE && (
              <a
                onClick={() => {
                  onPublishProject(projectId);
                }}
                title={'Publish'}
              >
                <i className='material-icons'>publish</i>
              </a>
            )}

          {projectDetails.owner === account &&
            status === projectStatus.AVAILABLE && (
              <a
                onClick={() => {
                  onUnpublishProject(projectId);
                }}
                title={'Unpublish'}
              >
                <i className='material-icons'>get_app</i>
              </a>
            )}

          {projectDetails.owner !== account &&
            status === projectStatus.AVAILABLE && (
              <a
                onClick={() => {
                  onUnpublishProject(projectId);
                }}
                title={'Unpublish'}
              >
                <i className='material-icons'>get_app</i>
              </a>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectContractData;
