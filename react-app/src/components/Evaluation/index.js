import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import PitcherForm from '../PitcherForm';
import NonPitcherForm from '../NonPitcherForm';

const Evaluation = () => {
  const { playerid } = useParams();
  const [playerInfo, setPlayerInfo] = useState(false);
  
  useEffect(() => {
    const getPlayer = async () => {
      let res = await fetch(`/api/players/${playerid}`);
      if (res.ok) {
        let single_player = await res.json();
        setPlayerInfo(single_player.player);
      }
    };
    getPlayer();
  }, []);
  console.log(playerInfo)
  return (
      <div>
          {!playerInfo ? <h1>loading</h1>: null}
          {playerInfo && playerInfo.position === 'P' ?
          <PitcherForm playerId={playerid}/> :
          <NonPitcherForm playerId={playerid}/> }
      </div>
  );
};

export default Evaluation;
