import React from "react";

const DisplayNotes = ({notes})=>{
    return (
        <div>
            {notes.map((note)=>{
            <div>
                <h1>{note.title}</h1>
                <h2>{note.text}</h2>
            </div>
        })}
        </div>
    )
}

export default DisplayNotes;