import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../Project/Modal/ProjectModal';

const Projects = ({ drizzle, drizzleState }) => {
  const projectContect = useContext(ProjectContext);
  const { addProject } = projectContect;

  const [modalProjectOpen, setModalProjectOpen] = useState(false);
  const [actionProject1, setActionProject1] = useState({
    title: '',
    visible: false,
    handle: null
  });
  const [actionProject2, setActionProject2] = useState({
    title: '',
    visible: false,
    handle: null
  });

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleNewProject = id => {
    setModalProjectOpen(true);
    setActionProject1({
      title: 'Save',
      visible: true,
      add: function(project) {
        console.log('Add ');
        console.log(project);

        setModalProjectOpen(false);
        console.log(drizzle);
        console.log(drizzleState);

        addProject(drizzle, drizzleState, project);
      },
      update: function(project) {
        console.log('Update ' + id);
        setModalProjectOpen(false);
        //updateProject(project);
      }
    });

    setActionProject2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
      }
    });
  };

  return (
    <div className='container'>
      <div className='right-align new-project'>
        <a
          className='waves-effect waves-light btn blue-grey'
          onClick={() => handleNewProject(null)}
        >
          <i className='material-icons left'>add</i>New
        </a>
      </div>

      {modalProjectOpen && (
        <ProjectModal
          dataID={1}
          onClose={() => setModalProjectOpen(false)}
          action1={actionProject1}
          action2={actionProject2}
        />
      )}

      <div className='row'>
        <div className='col s12 m4'>
          <div className='card medium blue-grey'>
            <div className='card-content white-text'>
              <span className='card-title'>Project name</span>
              <p>
                <span className='badge blue white-text'>10 ETH</span>
              </p>
              <p>
                This is the description of the projects. This is the description
                of the projects.{' '}
              </p>
            </div>
            <div className='card-action'>
              <a href='#'>More ...</a>
            </div>
          </div>
        </div>
        <div className='col s12 m4'>
          <div className='card medium blue-grey'>
            <div className='card-content white-text'>
              <span className='card-title'>Project name</span>
              <p>
                <span className='badge blue white-text'>10 ETH</span>
              </p>
              <p>
                This is the description of the projects. This is the description
                of the projects.{' '}
              </p>
            </div>
            <div className='card-action'>
              <a href='#'>More ...</a>
            </div>
          </div>
        </div>
        <div className='col s12 m4'>
          <div className='card medium blue-grey'>
            <div className='card-content white-text'>
              <span className='card-title'>Project name</span>
              <p>
                <span className='badge blue white-text'>10 ETH</span>
              </p>
              <p>
                This is the description of the projects. This is the description
                of the projects.{' '}
              </p>
            </div>
            <div className='card-action'>
              <a href='#'>More ...</a>
            </div>
          </div>
        </div>
        <div className='col s12 m4'>
          <div className='card medium blue-grey'>
            <div className='card-content white-text'>
              <span className='card-title'>Project name</span>
              <p>
                <span className='badge blue white-text'>10 ETH</span>
              </p>
              <p>
                This is the description of the projects. This is the description
                of the projects.
              </p>
            </div>
            <div className='card-action'>
              <a href='#'>More ...</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
