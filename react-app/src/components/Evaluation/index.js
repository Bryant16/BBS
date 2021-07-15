import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from 'react-router-dom';
import PitcherForm from '../PitcherForm';
import NonPitcherForm from '../NonPitcherForm';
import Notes from '../Notes';
import {getAllNotes} from "../../store/note";
import {clearNotes} from '../../store/note';
import Button from '@material-ui/core/Button';
import {getPitcherForm} from '../../store/Pitcher';
import {getNonePitcherForm} from '../../store/nonPitcher';
import './Evaluation.css';
import { Tooltip } from "@chakra-ui/react";

const Evaluation = () => {
  const { playerid } = useParams();
  const dispatch = useDispatch();
  const players = useSelector(state=> state.players);
  const history = useHistory();
  const [playerInfo, setPlayerInfo] = useState(false);
  const notes = useSelector(state => state.notes);
  const [gotNotes, setNotes] = useState(notes);
  const [toggle, setToggle] = useState('Tools');
  
  useEffect(() => {
    const getPlayer = async () => {
      let res = await fetch(`/api/players/${playerid}`);
      if (res.ok) {
        let single_player = await res.json();
        setPlayerInfo(single_player.player);
      }
    };
    getPlayer();
  }, [playerid]);

  useEffect(()=>{
    dispatch(clearNotes())
    dispatch(getNonePitcherForm(playerid))
    dispatch(getPitcherForm(playerid))
    dispatch(getAllNotes(playerid))
    setNotes(true)
  },[dispatch,playerid])
 const toggleNoteEvals = (e)=>{
   e.preventDefault()
   if(toggle === 'Notes'){
     setToggle('Tools')
   }else{
     setToggle('Notes')
   }
 } 
 
  return (
     players[playerid]? (<div className='player_evaluation_and_player_notes_container'>
          <div className='eval_nav_buttons'>
        <Button className='eval_nav_buttons' variant="contained" color='primary' onClick={toggleNoteEvals}>{toggle}</Button>
        <Button className='eval_nav_buttons' variant="contained" color="primary" onClick={(e)=>history.push(`/players/${playerid}`)}>Player Profile</Button>
        </div>
        {toggle === 'Notes' ?(<div>
          {!playerInfo ? <h1>loading</h1>:null}
          {playerInfo && playerInfo.position.includes('P')?
          <>
          <PitcherForm playerId={playerid}/> 
          <NonPitcherForm playerId={playerid}/>
          </>
          :
          <NonPitcherForm playerId={playerid}/>}
          </div>):
          (<div>
            <Notes playerId={playerid}/>
          </div>)}
        
      </div>):<Redirect to='/' />
  );
};

export default Evaluation;
