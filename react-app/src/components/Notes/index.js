import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {createNote} from '../../store/note';

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
        console.log(newNote)
        dispatch(createNote(newNote))
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
