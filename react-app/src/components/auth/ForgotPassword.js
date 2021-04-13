import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";
import logo from "./new_logo_bbs.png";
import letters from "./BBScouting writing.png";
import Button from '@material-ui/core/Button';

const ForgotPassword = ()=>{
    const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");

  const passwordReset = async (e) => {
    e.preventDefault();
    let res = await fetch(`/passwordreset/${email}`)
       if(res.ok){
           const {user} = await res.json()
          if(!user){
            alert('There is no user with that Email Address. Email Addresses are case sensitive.')
          }else{
            alert('Check your email for password reset instructions')
            history.push('/')
          }
       }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

    return (
        <div className="login_container">
      <div className="login_form_container">
        <div>
          <a onClick={()=>history.push('/')} style={{cursor:'pointer'}}>
          <img id="bb_letters"alt='' src={letters} />
          </a>
        </div>
        <form className="form_for_login" onSubmit={passwordReset}>
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
            >Send Password Reset</Button>
        </form>
        <img alt='' src={logo} />
      </div>
    </div>
    )
}

export default ForgotPassword;
