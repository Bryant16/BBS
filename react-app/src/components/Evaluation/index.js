import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import PitcherForm from '../PitcherForm';
import NonPitcherForm from '../NonPitcherForm';
import Notes from '../Notes';
import {getAllNotes} from "../../store/note";

import './Evaluation.css';

const Evaluation = () => {
  const { playerid } = useParams();
  const dispatch = useDispatch();
  const [playerInfo, setPlayerInfo] = useState(false);
  const notes = useSelector(state => state.notes)
  const [gotNotes, setNotes] = useState(false);
    
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

  useEffect(()=>{
    dispatch(getAllNotes(playerid))
    // setNotes(true)
  },[dispatch])
  // console.log(notes)
  // setNotes(false)
  return (
      <div className='player_evaluation_and_player_notes_container'>
          {!playerInfo ? <h1>loading</h1>: null}
          {playerInfo && playerInfo.position === 'P' ?
          <PitcherForm playerId={playerid}/> :
          <NonPitcherForm playerId={playerid}/> }
          <Notes playerId={playerid}/>
          <div>
            {notes && notes.map(note => <h2>{note.title}</h2>)}
          </div>
      </div>
  );
};

export default Evaluation;
