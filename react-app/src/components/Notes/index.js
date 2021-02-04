import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createNote} from '../../store/note';
import {getAllNotes} from '../../store/note';

const Notes = ({playerId})=>{
    const dispatch = useDispatch();
    const [title, setTitle] = useState('Abilities');
    const [note, setNote] = useState('');

    const handleClickCreate = (e)=>{
        e.preventDefault();
        console.log(title)
        const newNote = {
            title,
            note,
            playerId
        }
        setNote('')
        dispatch(createNote(newNote))
    }

    return (
        <div>
        <h1>Notes</h1>
        <form>
        <label>Title</label>
        <select onChange={(e)=> setTitle(e.target.value)}>
        <option value={'Abilities'} >Abilities</option>
        <option value={'Physical Description'} >Physical Description</option>
        <option value={'Weakness'}>Weakness</option>
        <option value={'Summary'}>Summary</option>
        </select> 
        <label>Note</label>
        <textarea 
        type='text'
        value={note}
        onChange={(e)=> setNote(e.target.value)}/>
        </form>
        <button onClick={handleClickCreate}>Create</button>
        </div>
    )
}

export default Notes;
