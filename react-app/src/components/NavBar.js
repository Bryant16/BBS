import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
import logo from "./auth/new_logo_bbs.png";
import letters from "./auth/BBScouting writing.png";

import Button from '@material-ui/core/Button';
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav >
      {!user ? (
        <div></div>
      ) : (
        <div className='navbar_container'>
            <NavLink to="/"><img src={logo} /><img id="bb_letters"alt='' src={letters} class="header_brand"/></NavLink>
          <div className='navbar_button_container'>
            <div>
              <NavLink to="/">
              <Button variant="contained" color="primary">Home</Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/newPlayer">
                <Button variant="contained" color="primary">New Player</Button>
              </NavLink>
            </div>
          </div>
          <div className='navbar_button_container'>
            <div>
              <NavLink to="/help">
                <Button variant="contained" color="primary">Help</Button>
              </NavLink>
            </div>
            <div>
              <LogoutButton />
            </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

