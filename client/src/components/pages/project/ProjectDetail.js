import React, { useState, useContext, useEffect } from 'react';

import { createBrowserHistory } from 'history';

import ProjectContext from '../../context/projects/projectContext';

const ProjectDetail = ({ match, drizzle, drizzleState, account }) => {
  const projectContext = useContext(ProjectContext);
  const { getProject, current } = projectContext;

  const [project, setProject] = useState({
    id: null,
    title: '',
    description: '',
    price: 0
  });

  const goBack = () => {
    // go back to the previous page
    const history = createBrowserHistory();
    history.goBack();
  };

  let projectId = null;
  try {
    projectId = match.params.id;
  } catch (error) {
    // unable to process input argument
  }

  if (projectId === null) {
    goBack();
  }

  // fetch project
  getProject(drizzle, account, projectId);

  useEffect(() => {
    if (current !== null) {
      setProject(current);
    } else {
      setProject({
        title: '',
        description: '',
        price: 0
      });
    }
  }, [current]);

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col s12 m12'>
            <a
              href='#!'
              className='col s12 m2 waves-effect waves-light btn-small left secondary-content action'
              onClick={() => goBack()}
              style={{ margin: '5px' }}
            >
              Go back
            </a>
          </div>
        </div>
        <h5>{project.title}</h5>
        <p>{project.description}</p>
        <p>{project.price} ETH</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
