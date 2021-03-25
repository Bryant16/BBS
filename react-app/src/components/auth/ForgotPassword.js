import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { LogIn } from "../../store/session";
import "./LoginForm.css";
import logo from "./new_logo_bbs.png";
import ReactPlayer from 'react-player';
import letters from "./BBScouting writing.png";
import Button from '@material-ui/core/Button';

const ForgotPassword = ({ authenticated, setAuthenticated }) => {
  const { user } = useSelector((state) => state.session);
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
const resetPassword = async(e)=>{
    e.preventDefault()
    const res = await fetch(`/api/auth/reset_password`, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({email}),
      });
      if (res.ok) {
          console.log(res.email)
          history.push('/login')
      }
}
  if (authenticated) {
    return <Redirect to="/" />;
  }
  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="login_container">
      <div className="login_form_container">
        <div>
          <img id="bb_letters"alt='' src={letters} />
        </div>
        <form className="form_for_login" onSubmit={resetPassword}>
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
          <Button
              className='sub__button'
              type='submit'
            >Reset Password</Button>
        </form>
        <img alt='' src={logo} />
      </div>
    </div>
  );
};

export default ForgotPassword;