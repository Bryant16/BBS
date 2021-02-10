import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Restore } from "../../store/session";
import HomePagePlayerCard from "../HomePagePlayerCard";
import {getPlayers} from '../../store/player';
import DataTable from '../HomePageTable';
import './home.css';

const Home = () => {
  const { user } = useSelector((state) => state.session);
  const players  = useSelector((state) => state.players);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlayers())
  }, [dispatch]);
 
  return user ? (
    <div className='players_library_container'>
      {players ? (
        // <h1>hi</h1>
        <DataTable />
        // players.map((player) => 
        // <HomePagePlayerCard player={player} />
        // )
      ) : (
        <h1>loading</h1>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
