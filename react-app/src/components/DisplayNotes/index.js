import React, {useState, useEffect} from "react";
import {removeNote} from '../../store/note';
import {useDispatch} from 'react-redux';
import {RiDeleteBin6Line} from 'react-icons/ri';

import './DisplayNotes.css';

const DisplayNotes = ({playerid, notes})=>{
    const dispatch = useDispatch();
    const deleteNote= async(note, id)=>{
        dispatch(removeNote(note,id))    
    }
const deleteButton = <button style={{'align-self':'flex-start'}}type='submit'><RiDeleteBin6Line style={{"color":'red'}}/></button>
    return (
        <div className='notes_container'>
            <div className='category_container'>
            <div className='notes_categories_containers'>
            <ul class="list-group list-group-item-primary">Abilities
            {notes.filter(note=>note.title==="Abilities").map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault()
                deleteNote(note, playerid)
            }}>
                <li class="list-group-item">{note.text}{deleteButton}</li>
            </form>
            ))}
            </ul>
            </div>
            <div className='notes_categories_containers'>
            <ul class="list-group list-group-item-primary">Physical Description
            {notes.filter(note=>note.title==='Physical Description').map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault();
                deleteNote(note,playerid)
            }}>
                <li class="list-group-item">{note.text}{deleteButton}</li>
            </form>
            ))}
            </ul>
            </div>
            <div className='notes_categories_containers'>
            <ul class="list-group list-group-item-primary">Weakness
            {notes.filter(note=>note.title==="Weakness").map((note)=>(
                <form onSubmit={(e)=>{
                    e.preventDefault()
                deleteNote(note,playerid)
                
            }}>
                <li class="list-group-item">{note.text}{deleteButton}</li>
            </form>
            ))}
            </ul>
            </div>
            <div className='notes_categories_containers'>
            <ul class="list-group list-group-item-primary">Summary
            {notes.filter(note=>note.title==="Summary").map((note)=>(
            <form onSubmit={(e)=>{
                e.preventDefault()
                deleteNote(note,playerid)
            }}>
                <li class="list-group-item">{note.text}{deleteButton}</li>
            </form>
            ))}
            </ul>
            </div>
            </div>
        </div>
    )
}

export default DisplayNotes;