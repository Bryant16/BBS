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
        </form>
        </div>):<h1>loading</h1>)
    )
}

export default Notes;
