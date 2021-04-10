import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { LogIn } from "../../store/session";
import "./LoginForm.css";
import logo from "./new_logo_bbs.png";
import ReactPlayer from 'react-player';
import letters from "./BBScouting writing.png";
import Button from '@material-ui/core/Button';

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.session);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(LogIn(email, password)).catch((err) =>
      setErrors(err.errors || [])
    );
    // <Redirect to="/" />
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(LogIn("demo@aa.io", "password"));
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }
  const handleSignup = (e) => {
    e.preventDefault();
    history.push("/sign-up");
  };
  const handleForgotPassword = (e)=>{
    history.push("/forgot-password")
  }
  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="login_container">
      <div className="login_form_container">
        <div>
          <img id="bb_letters"alt='' src={letters} />
        </div>
        <form className="form_for_login" onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          {/* <label htmlFor="password">Password</label> */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <a className='forgot_password' onClick={handleForgotPassword}>Forgot Password?</a>
          <Button
              className='sub__button'
              type='submit'
            >Login</Button>
          <Button
              className='sub__button'
              type='submit'
              onClick={handleSignup}
            >Sign Up</Button>
          <Button
              className='sub__button'
              onClick={demoLogin}
            >Demo User</Button>
        </form>
        <img alt='' src={logo} />
      </div>
    </div>
  );
};

export default LoginForm;
