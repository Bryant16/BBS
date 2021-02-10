import React, {useState, useEffect} from "react";
import {removeNote} from '../../store/note';
import {useDispatch} from 'react-redux';
import './DisplayNotes.css';

const DisplayNotes = ({playerid, notes})=>{
    const dispatch = useDispatch();
    const deleteNote= async(note, id)=>{
        dispatch(removeNote(note,id))    
    }

    return (
        <div className='notes_container'>
            <h3>Abilities</h3>
            {notes.filter(note=>note.title==="Abilities").map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault()
                deleteNote(note, playerid)
            }}>
                <li>{note.text}</li>
                <button type='submit'>Delete</button>
            </form>
            ))}
            <h3>Physical Description</h3>
            {notes.filter(note=>note.title==='Physical Description').map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault();
                deleteNote(note,playerid)
            }}>
                <li>{note.text}</li>
                <button type='submit'>Delete</button>
            </form>
            ))}
            <h3>Weakness</h3>
            {notes.filter(note=>note.title==="Weakness").map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault(
                    deleteNote(note,playerid)
                )
            }}>
                <li>{note.text}</li>
                <button type='submit'>Delete</button>
            </form>
            ))}
            <h3>Summary</h3>
            {notes.filter(note=>note.title==="Summary").map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault()
                deleteNote(note,playerid)
            }}>
                <li>{note.text}</li>
                <button type='submit'>Delete</button>
            </form>
            ))}
        </div>
    )
}

export default DisplayNotes;