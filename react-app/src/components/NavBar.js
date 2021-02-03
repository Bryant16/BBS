import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
       {!user
              ? (
                <>
                  <div>
                    <NavLink to='/sign-up'>
                      <button>Sign Up</button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to='/login'>
                      <button>Login</button>
                    </NavLink>
                  </div>
                </>
                )
              : (
                <>
                  <div>
                    <NavLink to='/'>
                      <button>Home</button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to='/newPlayer'>
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
}

export default NavBar;