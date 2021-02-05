import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
      {!user ? (
        <div className="my_page_links">
          <p>Bryant Klein</p>
          <p>
          <a href="https://github.com/Bryant16">
            <i class="fab fa-github" />
          </a>
          </p>
          <p>
          <a href="https://www.linkedin.com/in/bryant-klein-927915134/">
            <i class="fab fa-linkedin-in" />
          </a>
          </p>
          <p>
          <a href='mailto:kleinb1616@gmail.com'>
              <i class='far fa-envelope' />
            </a>
          </p>
        </div>
      ) : (
        <>
          <div>
            <NavLink to="/">
              <button>Home</button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/newPlayer">
              <button>New Player</button>
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
