import React, { useState, useEffect, useContext } from 'react';

import ProjectContext from '../../../context/projects/projectContext';

import { useKeyPress, useLockBodyScroll } from '../../../../hooks/Hooks';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import '../Modal.css';

const ProjectModal = ({ action1, action2, onClose }) => {
  const escPress = useKeyPress('Escape');

  const projectContext = useContext(ProjectContext);
  const { current } = projectContext;

  const [project, setProject] = useState({
    id: null,
    title: '',
    description: '',
    price: 0
  });

  useEffect(() => {
    M.CharacterCounter.init(
      document.querySelectorAll('.has-character-counter')
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (escPress) {
      onClose();
    }
    // eslint-disable-next-line
  }, [escPress]);

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
  }, [projectContext, current]);

  const { title, description, price } = project;

  const onChange = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  // Hook to lock scrolling
  useLockBodyScroll();

  const onSubmit = () => {
    let errorMessage = '';
    if (title === '') {
      errorMessage = 'A title is required<br/>';
    }
    if (description === '') {
      errorMessage += 'A description is required<br/>';
    }

    if (errorMessage !== '') {
      M.toast({
        html: errorMessage,
        classes: 'red darken-1 rounded'
      });
      return;
    }

    if (current === null) {
      action1.add(project);
    } else {
      action1.update(project);
    }
  };

  return (
    <div className='container'>
      {' '}
      <div className='modalEx-overlay'>
        <div className='modalEx'>
          <div className='modal-content'>
            <h4>{current ? 'Edit your project' : 'Create a new project'}</h4>
            <div className='row'>
              <div className='file-field input-field col s12'>
                <div className='input-field col s12'>
                  <textarea
                    className='materialize-textarea has-character-counter'
                    type='text'
                    name='title'
                    value={title}
                    data-length={80}
                    onChange={onChange}
                    style={{ height: '4rem' }}
                  />

                  <label htmlFor='title' className='active'>
                    Title
                  </label>
                </div>

                <div className='input-field col s12'>
                  <textarea
                    className='materialize-textarea has-character-counter'
                    type='text'
                    name='description'
                    value={description}
                    data-length={120}
                    onChange={onChange}
                    style={{ height: '4rem' }}
                  />
                  <label htmlFor='description' className='active'>
                    Description
                  </label>
                </div>

                <div className='input-field col s12 m4'>
                  <input
                    type='number'
                    name='price'
                    value={price}
                    min={0}
                    onChange={onChange}
                    step={'.01'}
                  />
                  <label htmlFor='price' className='active'>
                    Price in ETH
                  </label>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              {action1.visible && (
                <a
                  href='#!'
                  className='col s12 m2 waves-effect blue btn-small right'
                  onClick={() => onSubmit()}
                  style={{ margin: '5px' }}
                >
                  Save
                </a>
              )}

              {action2.visible && (
                <a
                  href='#!'
                  className='col s12 m2 waves-effect blue btn-small right'
                  onClick={() => action2.handle()}
                  style={{ margin: '5px' }}
                >
                  Cancel
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
