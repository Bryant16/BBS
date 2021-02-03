import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';

import { LogOut } from '../../store/session';
export default function LogoutButton () {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.session);

  const onLogout = () => {
    dispatch(LogOut())
    history.push('/login')
  };

  return user
    ? (
      <button onClick={onLogout}>
        Logout
      </button>
      )
    : null;
}
