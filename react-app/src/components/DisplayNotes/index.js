import React from "react";
import './DisplayNotes.css';
const DisplayNotes = ({notes})=>{
    const deleteNote=(e)=>{
        e.preventDefault();
        console.log(e.target.value)
    }
    return (
        <div className='notes_container'>
            <h1>Abilities</h1>
            {notes.filter(note=>note.title==="Abilities").map((note)=>(
            <div>
                <h4>{note.text}</h4>
            </div>
            ))}
            <h1>Physical Description</h1>
            {notes.filter(note=>note.title==='Physical Description').map((note)=>(
            <div>
                <h4>{note.text}</h4>
                <button onClick={deleteNote}>Delete</button>
            </div>
            ))}
            <h1>Weakness</h1>
            {notes.filter(note=>note.title==="Weakness").map((note)=>(
            <div>
                <h4>{note.text}</h4>
                <button onClick={deleteNote}>Delete</button>
            </div>
            ))}
            <h1>Summary</h1>
            {notes.filter(note=>note.title==="Summary").map((note)=>(
            <div>
                <h4>{note.text}</h4>
                <button onClick={deleteNote}>Delete</button>
            </div>
            ))}
        </div>
    )
}

export default DisplayNotes;