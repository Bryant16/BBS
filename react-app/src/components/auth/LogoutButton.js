import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import { LogOut } from '../../store/session';
import Button from '@material-ui/core/Button';
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
      <Button variant="contained" color="primary" onClick={onLogout}>
        Logout
      </Button>
      )
    : null;
}
