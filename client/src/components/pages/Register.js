import React, {useState, useContext, useEffect} from 'react';

import {Link} from 'react-router-dom';

import NotificationContext from '../context/notifications/notificationContext';
import AuthContext from '../context/auth/authContext';

import 'materialize-css/dist/css/materialize.min.css';

const Register = props => {
  const notificationContext = useContext(NotificationContext);
  const {setAlert, clearNotifications} = notificationContext;

  const authContext = useContext(AuthContext);
  const {register, isAuthenticated} = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    //eslint-disable-next-line
  }, [
    Object.values(notificationContext),
    Object.values(authContext),
    props.history,
  ]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const {name, email, password, password2} = user;

  const onChange = e =>
    setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    clearNotifications();

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register(user);
    }
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <h4 className="center-align light">
          An account is required to manage and publish examination
          programs
        </h4>
        <div className="row">
          <form className="col s12" onSubmit={onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  minLength="6"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                  minLength="6"
                />
                <label htmlFor="password2">
                  Retype your password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <p className="right-align">
                  <button
                    className="btn btn-large waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center-align">
                You already have an account?{' '}
                <Link to={`/login`}>
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
