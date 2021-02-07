import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from 'react-router-dom';
import PitcherForm from '../PitcherForm';
import NonPitcherForm from '../NonPitcherForm';
import Notes from '../Notes';
import {getAllNotes} from "../../store/note";
import DisplayNotes from '../DisplayNotes'
import {clearNotes} from '../../store/note';
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
  }, []);

  useEffect(()=>{
    dispatch(clearNotes())
    dispatch(getAllNotes(playerid))
    setNotes(true)
  },[])
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
        <div>
        <button onClick={toggleNoteEvals}>{toggle}</button>
        <button onClick={(e)=>history.push(`/players/${playerid}`)}>Player Profile</button>
        </div>
        {toggle === 'Eval' ?(<div>
          {!playerInfo ? <h1>loading</h1>:null}
          {playerInfo && playerInfo.position === 'P' ?
          <PitcherForm playerId={playerid}/> :
          <NonPitcherForm playerId={playerid}/> }
          </div>):
          (<div>
            <Notes playerId={playerid}/>
            {gotNotes && <DisplayNotes notes={notes} />}
          </div>)}
      </div>
  );
};

export default Evaluation;
