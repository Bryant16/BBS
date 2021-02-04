import React from "react";

const DisplayNotes = ({notes})=>{
    return (
        <div>
            <h1>Abilities</h1>
            {notes.filter(note=>note.title==="Abilities").map((note)=>(
            <div>
                <h2>{note.text}</h2>
            </div>
            ))}
        </div>
    )
}

export default DisplayNotes;