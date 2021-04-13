import React, {  useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Button from '@material-ui/core/Button';
import { PassReset } from '../../store/session';

import './SignupForm.css';
import logo from './new_logo_bbs.png';
import letters from './BBScouting writing.png';

const PasswordReset = () => {
  const dispatch = useDispatch();
  const {token} = useParams();
  const { user } = useSelector(state => state.session);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onPassReset = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(PassReset(email, password,token))
        .catch(err => setErrors(err.errors || []));
    } else setErrors(['Passwords must match.']);
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
        <a href='/login'><img alt='' id="bb_letters" src={letters}/></a>
      </div>
        <form className="form_for_login" onSubmit={onPassReset}>
          <div>
            {errors.map((error) => (
              <div key={nanoid()}>
                {error}
              </div>
            ))}
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
              Reset Password
            </Button>
          </div>
        </form>
        <img alt='' src={logo} />
        </div>
      </div>
      );
};

export default PasswordReset;
