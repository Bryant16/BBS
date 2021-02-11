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
        <div className='note_input_container'> 
        <form> 
            <div>
            <select className="form-select" id="autoSizingSelect" onChange={(e)=> setTitle(e.target.value)}>
            <option value={'Abilities'} >Abilities</option>
            <option value={'Physical Description'} >Physical Description</option>
            <option value={'Weakness'}>Weakness</option>
            <option value={'Summary'}>Summary</option>
            </select>
            </div> 
        
        <TextareaAutosize  className="form-control" placeholder="Notes"
        type='text'
        value={note}
        rowsMin={1}
        onChange={(e)=> setNote(e.target.value)}/>
        {/* <div> */}
        <Button 
        color="primary"
        size="large"
        variant='contained'
        className={classes.button}
        // startIcon={<BiMessageAdd />}
        onClick={handleClickCreate}>Create</Button>
        {/* </div> */}
        </form>
        </div>
    )
}

export default Notes;
