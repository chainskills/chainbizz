import React, { useState, useContext, useEffect } from 'react';

import { createBrowserHistory } from 'history';

import ProjectContext from '../../context/projects/projectContext';

import './ProjectDetail.css';

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
            <div className='single__header'>
              <div className='row'>
                <div className='col s2'>
                  <div className='single__meta'>
                    <span className='single__metaTitle'>Payout</span>
                    <span className='single__metaValue'>2 ETH</span>
                    <span className='single__metaSubvalue'>180€</span>

                    <span className='single__metaTitle'>Remaining Balance</span>
                    <span className='single__metaValue'>4 ETH</span>
                    <span className='single__metaSubvalue'>360€</span>
                  </div>
                </div>
                <div className='col s10'>
                  <h1
                    style={{
                      fontSize: '24px',
                      margin: '0',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}
                  >
                    <a href='#' style={{ color: '#676767' }}>
                      Streamix [STRX] - BitcoinTalk ANN thread Comment
                    </a>
                  </h1>
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
                  <code className=' language-markup'>flow-text</code>
                  <div style={{ marginTop: '20px' }}>
                    <img
                      src='https://www.abeautifulsite.net/uploads/2014/08/bit-face.png?width=600&key=c6d70b7b067981cded2d49fc8a5e3ca1dc9dc9fdaab2ac05db4cb96481a36a77'
                      className='left'
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '100%',
                        verticalAlign: 'top'
                      }}
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
                      0xe11e30dea3459deab3219ee32a14ec3400c89
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col s12 m12'>
          <div className='card card-custom'>
            <div className='card-content'>
              <div className='row'>
                <div className='single'>
                  <div className='single__content'>
                    <div className='row'>
                      <div className='col s9'>
                        <div>
                          <p>
                            Esta tarefa é para os alunos do curso de Blockchain
                            apoiados pelo Banco Mundial na vila olímpica de
                            Acari, com organização da Blockchain Academy e
                            patrocínio da Maker DAO.
                          </p>
                        </div>
                      </div>
                      <div className='col s3'>
                        <div className='project-additional'>
                          <ul style={{ margin: '-10px 0 0 0' }}>
                            <li style={{ fontWeight: '600' }}>
                              <i className='material-icons'>
                                perm_data_setting
                              </i>
                              Beginner <span>difficulty</span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s12 offset-s10'>
            <a
              className='waves-effect waves-light btn blue-grey lighten-1 no-uppercase'
              style={{ width: '150px' }}
              onClick={() => goBack()}
            >
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
