import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import PitcherForm from '../PitcherForm';
import NonPitcherForm from '../NonPitcherForm';
import Notes from '../Notes';
import {getAllNotes} from "../../store/note";
import DisplayNotes from '../DisplayNotes'
import {clearNotes} from '../../store/note';
import Button from '@material-ui/core/Button';
import {getPitcherForm} from '../../store/Pitcher';
import {getNonePitcherForm} from '../../store/nonPitcher';
import './Evaluation.css';

const Evaluation = () => {
  const { playerid } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [playerInfo, setPlayerInfo] = useState(false);
  const notes = useSelector(state => state.notes);
  const [gotNotes, setNotes] = useState(notes);
  const [toggle, setToggle] = useState('Eval');
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
     setToggle('Eval')
   }else{
     setToggle('Notes')
   }
 } 
 
  return (
      <div className='player_evaluation_and_player_notes_container'>
          <div className='eval_nav_buttons'>
        <Button className='eval_nav_buttons' variant="contained" color="primary" onClick={toggleNoteEvals}>{toggle}</Button>
        <Button className='eval_nav_buttons' variant="contained" color="primary" onClick={(e)=>history.push(`/players/${playerid}`)}>Player Profile</Button>
        </div>
        {toggle === 'Notes' ?(<div>
          {!playerInfo ? <h1>loading</h1>:null}
          {playerInfo && playerInfo.position === 'P' ?
          <PitcherForm playerId={playerid}/> :
          <NonPitcherForm playerId={playerid}/> }
          </div>):
          (<div>
            <Notes playerId={playerid}/>
            {gotNotes && <DisplayNotes playerid={playerid} notes={notes} />}
          </div>)}
        
      </div>
  );
};

export default Evaluation;
