import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Restore } from "../../store/session";
import Library from "../Library";
import HomePagePlayerCard from "../HomePagePlayerCard";
import {getPlayers} from '../../store/player';

const Home = () => {
  const { user } = useSelector((state) => state.session);
  const { players } = useSelector((state) => state.players);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlayers())
  }, [dispatch]);
  return user ? (
    <div>
      {players.length ? (
        players.map((player) => <HomePagePlayerCard player={player} />)
      ) : (
        <h1>loading</h1>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
