import React from 'react';
import "./LoginForm.css";
import logo from "./new_logo_bbs.png";
import letters from "./BBScouting writing.png";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const SplashPage = ()=>{
    const history = useHistory();
    const login = (e)=>{
        e.preventDefault()
        history.push('/login')
    }
    const signup = (e)=>{
        e.preventDefault()
        history.push('/sign-up')
    }
    return (
        <div className='splash_container'>
        <div className="login_form_container">
        <a href='/login'><img alt='' src={letters} /></a>
              <h6>A modernized approch to Baseball Scouting</h6>
          <a href='/login'><img alt='' src={logo} /></a>
          <div>
              <p>Create and update player Profiles</p>
              <p>Upload videos and pictures to athlete profile pages.</p>
              <p>Generate new notes and keep track of player evaluation forms</p>
              <p>Organized table linking to each player profile of current and past athletes you have created</p>
                <div className='splash_buttons'>
                <Button variant="contained" color="primary"onClick={login}>Login</Button>  
                <Button variant="contained" color="primary"onClick={signup}>SignUp</Button>
                </div>
          </div>
        </div>
        </div>
    )
}

export default SplashPage;