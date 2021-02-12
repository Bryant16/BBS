import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
import logo from "./auth/new_logo_bbs.png";
import Button from '@material-ui/core/Button';
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
      {!user ? (
        <div></div>
      ) : (
        <div className='navbar_container'>
          <div>
            <NavLink to="/">
            <img src={logo} />
            </NavLink>
          </div>
          <div className='navbar_button_container'>
          <div>
            <NavLink to="/newPlayer">
              <Button variant="contained" color="primary">New Player</Button>
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
