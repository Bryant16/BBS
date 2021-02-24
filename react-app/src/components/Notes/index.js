import React, { useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import {createNote} from '../../store/note';
import Button from '@material-ui/core/Button'; 
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Notes = ({playerId})=>{
    const dispatch = useDispatch();
    // const [title, setTitle] = useState('Abilities');
    const [note, setNote] = useState('');

    const handleClickCreate = (e, title)=>{
        e.preventDefault();
        const titleToSend = title
        const newNote = {
            title: titleToSend,
            note,
            playerId
        }
        console.log(newNote)
        // setNote('')
        dispatch(createNote(newNote))
    }
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    const classes = useStyles();
  
    
    return (
        <div className='note_input_container'> 
        <form> 
        <h1>Abilities</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={note}
        rowsMin={3}
        onChange={(e)=> setNote(e.target.value)}/>
         <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Abilities')}>Save</Button>
        <h1>Physical Description</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={note}
        rowsMin={3}
        onChange={(e)=> setNote(e.target.value)}/>
         <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Physical Description')}>Save</Button>
        <h1>Weakness</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={note}
        rowsMin={3}
        onChange={(e)=> setNote(e.target.value)}/>
         <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Weakness')}>Save</Button>
        <h1>Summary</h1>
        <TextareaAutosize  className="form-control" 
        type='text'
        value={note}
        rowsMin={3}
        onChange={(e)=> setNote(e.target.value)}/>
  
        <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        onClick={e=>handleClickCreate(e,'Summary')}>Save</Button>
     
        </form>
        </div>
    )
}

export default Notes;
