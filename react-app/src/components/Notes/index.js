import React, {useState} from 'react';

const Notes = ()=>{
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

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
        <button>Create</button>
        </div>
    )
}

export default Notes;
