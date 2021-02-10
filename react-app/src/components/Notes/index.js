import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createNote} from '../../store/note';
import {getAllNotes} from '../../store/note';
import Button from '@material-ui/core/Button'; 
import {BiMessageAdd} from 'react-icons/bi';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Notes = ({playerId})=>{
    const dispatch = useDispatch();
    const [title, setTitle] = useState('Abilities');
    const [note, setNote] = useState('');

    const handleClickCreate = (e)=>{
        e.preventDefault();
        const newNote = {
            title,
            note,
            playerId
        }
        setNote('')
        dispatch(createNote(newNote))
    }
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    const classes = useStyles();
    return (
        <div>
        <form>
        <label>Title</label>
        <select onChange={(e)=> setTitle(e.target.value)}>
        <option value={'Abilities'} >Abilities</option>
        <option value={'Physical Description'} >Physical Description</option>
        <option value={'Weakness'}>Weakness</option>
        <option value={'Summary'}>Summary</option>
        </select> 
        <label>Note</label>
        <TextareaAutosize aria-label="empty textarea" placeholder="Empty"
        type='text'
        value={note}
        onChange={(e)=> setNote(e.target.value)}/>
        <Button 
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<BiMessageAdd />}
        onClick={handleClickCreate}></Button>
        </form>
        </div>
    )
}

export default Notes;
