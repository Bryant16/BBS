import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {clearPlayers} from '../../store/player'
import {clearNotes} from '../../store/note'
import {clearNonPitcher} from '../../store/nonPitcher';
import {clearPitcher} from '../../store/Pitcher';
import { LogOut } from '../../store/session';
import Button from '@material-ui/core/Button';
export default function LogoutButton () {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.session);

  const onLogout = (e) => {
    e.preventDefault()
    console.log('hi')
    dispatch(clearPlayers())
    dispatch(clearNotes())
    dispatch(clearNonPitcher())
    dispatch(clearPitcher())
    dispatch(LogOut())
    .then(()=>history.push('/login'))
    
  };

  return user
    ? (
      <Button variant="contained" color="primary" onClick={onLogout}>
        Logout
      </Button>
      )
    : null;
}
