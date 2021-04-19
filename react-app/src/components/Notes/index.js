import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {createNote} from '../../store/note';
import Button from '@material-ui/core/Button'; 
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {getAllNotes} from '../../store/note';
import './Notes.css';

const Notes = ({playerId})=>{
    const dispatch = useDispatch();
    const {notes} = useSelector(state=>state);
    const [abilitiesText, setAbilitiesText] = useState('');
    const [physicalText, setPhysicalText] = useState('');
    const [weaknessText, setWeaknessText] = useState('');
    const [habits, setHabits] = useState('');
    const [dedication, setDedication] = useState('');
    const [agility, setAgility] = useState('');
    const [apitude, setApitude] = useState('');
    const [pMaturity, setPMaturity] = useState('');
    const [eMaturity, setEMaturity] = useState('');
    const [date, setDate] = useState('');
    const [sumText, setSumText] = useState('');
    
    const handleClickCreate = (e, title, note)=>{
        e.preventDefault();
        const titleToSend = title
        const newNote = {
            title: titleToSend,
            note,
            playerId
        }
        dispatch(createNote(newNote))
    }
    const handleDate=(e)=>{
      e.preventDefault();
      setDate(e.target.value)
      const dateNote = {
        title: 'Date',
        note: e.target.value,
        playerId
      }
      dispatch(createNote(dateNote))
    }
    const handleCreateDescriptions = (e)=>{
        e.preventDefault();
        dispatch(createNote({title:`habits`,note:habits,playerId}))
        dispatch(createNote({title:`dedication`,note:dedication,playerId}))
        dispatch(createNote({title:`agility`,note:agility,playerId}))
        dispatch(createNote({title:`apitude`,note:apitude,playerId}))
        dispatch(createNote({title:`pMaturity`,note:pMaturity,playerId}))
        dispatch(createNote({title:`eMaturity`,note:eMaturity,playerId}))
       
    }
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    const classes = useStyles();
  useEffect(()=>{
      dispatch(getAllNotes(playerId))
      const getTheNotes = async()=>{
          const res = await fetch(`/api/notes/${playerId}/`)
          if(res.ok){
              const notesJson = await res.json()
              notesJson.forEach(note=>{
                if(note.title ==='Abilities'){
                  setAbilitiesText(note.text)
                }else if(note.title === 'Weakness'){
                 setWeaknessText(note.text) 
                }else if(note.title === 'Physical Description'){
                  setPhysicalText(note.text)
                }else if(note.title=== 'habits'){
                  setHabits(note.text)
                }else if(note.title=== 'dedication'){
                  setDedication(note.text)
                }else if(note.title=== 'agility'){
                  setAgility(note.text)
                }else if(note.title=== 'apitude'){
                  setApitude(note.text)
                }else if(note.title=== 'pMaturity'){
                  setPMaturity(note.text)
                }else if(note.title=== 'eMaturity'){
                  setEMaturity(note.text)
                }else if(note.title==='Date'){
                  setDate(note.text)
                }else{
                  setSumText(note.text)
                }
              })
          }
      }
      getTheNotes()
  },[dispatch])
    return (
        (notes  ? (<div className='note_input_container'> 
        <form>
        <input type='date' value={date} onChange={handleDate}placeholder='Date of Eval (01/01/2021)'></input>
        <h1>Abilities</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={abilitiesText}
        rowsMin={5}
        onChange={(e)=> setAbilitiesText(e.target.value)}/>
         <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Abilities',abilitiesText)}>Save</Button>
        <h1>Physical Description</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={physicalText}
        rowsMin={5}
        onChange={(e)=> setPhysicalText(e.target.value)}/>
         <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Physical Description',physicalText)}>Save</Button>
        <h1>Weakness</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={weaknessText}
        rowsMin={5}
        onChange={(e)=> setWeaknessText(e.target.value)}/>
         <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Weakness', weaknessText)}>Save</Button>
        <h1>Summary</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={sumText}
        rowsMin={5}
        onChange={(e)=> setSumText(e.target.value)}/>
        <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Summary', sumText)}>Save</Button>
        <h1>Word Descriptions</h1>
        <div className='word_descripitions_container'>
          <div>
            <input type='text' value={habits} onChange={(e)=>setHabits(e.target.value)}placeholder='Habits'></input>
            <input type='text' value={dedication} onChange={(e)=>setDedication(e.target.value)}placeholder='Dedication'></input>
            <input type='text' value={agility} onChange={(e)=>setAgility(e.target.value)}placeholder='Agility'></input>
          </div>
          <div>
            <input type='text' value={apitude} onChange={(e)=>setApitude(e.target.value)}placeholder='Apitude'></input>
            <input type='text' value={pMaturity} onChange={(e)=>setPMaturity(e.target.value)}placeholder='Phys. Maturity'></input>
            <input type='text' value={eMaturity} onChange={(e)=>setEMaturity(e.target.value)}placeholder='Emot. Maturity'></input>
          </div>
        </div>
          <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={handleCreateDescriptions}>Save</Button>
        </form>
        </div>):<h1>loading</h1>)
    )
}

export default Notes;
