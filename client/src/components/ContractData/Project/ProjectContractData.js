import React, { useEffect, useState, useContext } from 'react';
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';
import { NavLink } from 'react-router-dom';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from '../../ContractData/Project/ProjectStatus';

import ActionsOwner from './ActionsOwner';
import ActionsProvider from './ActionsProvider';

import './ProjectContractData.css';

const ProjectContractData = ({
  projectId,
  drizzle,
  drizzleState,
  account,
  hideAction = false
}) => {
  const [project, setProject] = useState({
    id: null,
    title: '',
    description: '',
    price: 0
  });

  const projectContext = useContext(ProjectContext);
  const { getProject, current, lastChanged } = projectContext;

  useEffect(() => {
    getProject(drizzle, account, projectId);
  }, []);

  useEffect(() => {
    console.log(current);
    if (current !== null && current.id === projectId) {
      console.log('Into useEffect: ' + projectId);
      // get the status
      const statusNames = Object.keys(projectStatus);

      // apply the current project with its status in plain english
      setProject({
        ...current,
        status: Number(current.status),
        statusName: statusNames[current.status]
      });
    }
  }, [lastChanged]);

  // project not yet ready or not found
  if (project === null || typeof project === 'undefined') {
    return <span>Initializing...</span>;
  }

  return (
    <div className='col s12 m12'>
      <div className='card card-custom sticky-action'>
        <div className='card-content'>
          <div>
            <div className='row'>
              <div className='col s12 m12'>
                <span className='card-title activator grey-text text-darken-4'>
                  <NavLink
                    activeClassName='chosen'
                    to={`/project/${projectId}`}
                  >
                    {project.title}
                  </NavLink>
                  <i className='material-icons right'>more_vert</i>
                </span>
              </div>
              <div className='col s12 m6'>
                <div>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                </div>
                {project && project.issuer && (
                  <div style={{ marginTop: '20px' }} className='avatar'>
                    <JazzIcon
                      diameter={40}
                      seed={jsNumberForAddress(project.issuer)}
                    />
                    <p
                      className='truncate'
                      style={{
                        position: 'relative',
                        top: '7px',
                        width: '130px',
                        paddingLeft: '10px'
                      }}
                    >
                      {project.issuer}
                    </p>
                  </div>
                )}
              </div>
              <div className='col s12 m3 project-additional'>
                <ul style={{ margin: '-10px 0 0 0' }}>
                  <li style={{ fontWeight: '600' }}>
                    <i className='material-icons'>perm_data_setting</i>Beginner{' '}
                    <span>difficulty</span>
                  </li>
                  <li style={{ fontWeight: '600' }}>
                    <i className='material-icons'>history</i>5{' '}
                    <span>days remaining</span>
                  </li>
                  <li style={{ fontWeight: '600' }}>
                    <i className='material-icons'>thumb_up</i>0{' '}
                    <span>submissions</span>
                  </li>
                </ul>
              </div>
              <div className='col s12 m3 project-additional'>
                <p
                  className='right-align'
                  style={{ fontSize: '24px', color: '#546e7a' }}
                >
                  {project.price.toString()} ETH
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            <NavLink
              activeClassName='chosen'
              to={`/project/draft/${projectId}`}
            >
              {project.title}
            </NavLink>
            <i className='material-icons right'>close</i>
          </span>
          <p>{project.description}</p>
        </div>
        {hideAction === false && (
          <div className='card-action right-align project-card'>
            {project.issuer === account && (
              <ActionsOwner
                projectId={projectId}
                status={project.status}
                rated={project.ratingsFulfillerDone}
              />
            )}

            {project.issuer !== account && (
              <ActionsProvider
                projectId={projectId}
                status={project.status}
                rated={project.ratingsIssuerDone}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContractData;
