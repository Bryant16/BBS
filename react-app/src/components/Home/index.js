import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {getPlayers} from '../../store/player';
import DataTable from '../HomePageTable';
import HelpModal from './HelpModal';
import {firstTime} from '../../store/session'
import './home.css';

const Home = () => {
  const { user, FIRST } = useSelector((state) => state.session);
  const players  = useSelector((state) => state.players);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(firstTime())
    dispatch(getPlayers())
  }, [dispatch]);


  return user ? (
    <div className='players_library_container'>
      {(players && FIRST>0) ? (
        <>
        <HelpModal firstTimes={FIRST} />
        <DataTable />
        </>
      ) : (
        <>
        <h1>loading</h1>
        </>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
