import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createNote} from '../../store/note';
import {getAllNotes} from '../../store/note';
const Notes = ({playerId})=>{
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const handleClickCreate = (e)=>{
        e.preventDefault();
        const newNote = {
            title,
            note,
            playerId
        }
        dispatch(createNote(newNote))
        dispatch(getAllNotes(playerId))
    }
  
    return (
        <div>
        <h1>Notes</h1>
        <form>
        <label>Title</label>
        <input 
        type='text'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}/>
        <label>Note</label>
        <input 
        type='text'
        value={note}
        onChange={(e)=> setNote(e.target.value)}/>
        </form>
        <button onClick={handleClickCreate}>Create</button>
        </div>
    )
}

export default Notes;
