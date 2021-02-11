import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Button from '@material-ui/core/Button';
import { SignUp, LogIn } from '../../store/session';

import './SignupForm.css';
import logo from './new_logo_bbs.png';
import letters from './BBScouting writing.png';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.session);
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSignUp = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(SignUp(username, email, password))
        .catch(err => setErrors(err.errors || []));
    } else setErrors(['Passwords must match.']);
  };

  const updateUsername = ({ target: { value } }) => {
    setUsername(value);
  };

  const updateEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const updatePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const updateRepeatPassword = ({ target: { value } }) => {
    setRepeatPassword(value);
  };
  
  
  return user
    ? <Redirect to='/' />
    : (
      <div className='div__container_form'>
        <div className="login_form_container">
        <div>
        <a href='/login'><img src={letters}/></a>
      </div>
        <form className="form_for_login" onSubmit={onSignUp}>
          <div>
            {errors.map((error) => (
              <div key={nanoid()}>
                {error}
              </div>
            ))}
          </div>
          <div className='userName__container'>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
            />
          </div>
          <div className='email__container'>
            <input
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div className='password_container'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            />
          </div>
          <div className='password_container'>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required
            />
          </div>
          <div className='signup__btn'>
            <Button
              className='sub__button'
              type='submit'
            >
              Sign Up
            </Button>
          </div>
        </form>
        </div>
      </div>
      );
};

export default SignUpForm;
