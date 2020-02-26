import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NotificationContext from '../context/notifications/notificationContext';
import AuthContext from '../context/auth/authContext';

import 'materialize-css/dist/css/materialize.min.css';

const Login = props => {
  const notificationContext = useContext(NotificationContext);
  const { setAlert, clearNotifications } = notificationContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, login } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    //eslint-disable-next-line
  }, [
    Object.values(notificationContext),
    Object.values(authContext),
    props.history
  ]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    clearNotifications();

    if (email === '' || password === '') {
      setAlert('Please enter all fields');
    } else {
      login(email, password);
    }
  };

  return (
    <div className='row'>
      <div className='col s12 m6 offset-m3'>
        <h4 className='center-align light'>
          Please login to manage your draft projects on ChainBizz
        </h4>
        <div className='row'>
          <form className='col s12' onSubmit={onSubmit}>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  required
                  minLength='6'
                />
                <label htmlFor='pass'>Password</label>
              </div>
            </div>
            <div className='row'>
              <div className='col s12'>
                <Link to={`/reset`}>
                  <span>Forgot Password?</span>
                </Link>
              </div>
            </div>
            <div className='row'>
              <div className='col s12'>
                <p className='right-align'>
                  <button
                    className='btn btn-large waves-effect waves-light'
                    type='submit'
                    name='action'
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col s12 center-align'>
                Don't have an account?{' '}
                <Link to={`/register`}>
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
