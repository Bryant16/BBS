import React from "react";

const DisplayNotes = ({notes})=>{
    return (
        <div>
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
            </div>
            ))}
            <h1>Weakness</h1>
            {notes.filter(note=>note.title==="Weakness").map((note)=>(
            <div>
                <h4>{note.text}</h4>
            </div>
            ))}
            <h1>Summary</h1>
            {notes.filter(note=>note.title==="Summary").map((note)=>(
            <div>
                <h4>{note.text}</h4>
            </div>
            ))}
        </div>
    )
}

export default DisplayNotes;