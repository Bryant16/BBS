import React from 'react';
import "./LoginForm.css";
import logo from "./new_logo_bbs.png";
import letters from "./BBScouting writing.png";
const SplashPage = ()=>{
    return (
        <div className='splash_container'>
        <div className="login_form_container">
          <img alt='' src={letters} />
          <img alt='' src={logo} />
          <div>
              <h2>A modernized approch to Baseball Scouting</h2>
              <p>Create New Players to track</p>
              <p>Upload videos of players to display on their profile page</p>
              <p>For Each Player generate notes and an evaluation</p>
              <p>Each logged in user has an organized table to help organize information on present and past players</p>
                <button>Login</button>
                <button>SignUp</button>
          </div>
        </div>
        </div>
    )
}

export default SplashPage;