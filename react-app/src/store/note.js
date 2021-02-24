const CREATE = "notes/CREATE";
const ALL = "notes/ALL";
const CLEARNOTES = "notes/CLEARNOTES";
const REMOVE = "notes/REMOVE";

const create = (note) => ({
  type: CREATE,
  note,
});

const grabAll = (all_note) => ({
  type: ALL,
  all_note,
});
const remove = (noteToDelete)=>({
  type: REMOVE,
  noteToDelete
})
export const clearNotes = ()=>({
  type: CLEARNOTES  
})

export const getAllNotes = (playerId) => async (dispatch) => {
  
  const res = await fetch(`/api/notes/${playerId}/`);
  if (res.ok) {
    const all_notes = await res.json();
    console.log(...all_notes,'all of them')
    dispatch(grabAll(all_notes));
  }
};

export const createNote = (newNote) => async (dispatch) => {
  const res = await fetch(`/api/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  if (res.ok) {
    const notes = await res.json();
    console.log(notes,'after updating')
    dispatch(create(notes.note));
  }
};
export const removeNote = (note, id)=> async(dispatch)=>{
  const res = await fetch(`/api/notes/players/${id}`,{
    headers: { 'Content-type': 'application/json' },
    method: 'DELETE',
    body: JSON.stringify({note})
  }) 
if(res.ok){
    const deleted = await res.json()
    dispatch(remove(deleted.remove))
}
}
const initialState = [];
const notesReducer = (state = initialState, action) => {
    switch (action.type) {
    case CREATE: {
      let new_notes = action.note;
      let title = new_notes.title
      let text = new_notes.text
      const oldState = {...state}
      oldState[title] = text
      return oldState;
    }
    case ALL: {
      const newNotes = {...state}
      action.all_note.forEach(note=>{
        if(note.title ==='Abilities'){
          newNotes['Abilities'] = note.text
        }else if(note.title === 'Weakness'){
          newNotes['Weakness'] = note.text
        }else if(note.title === 'Physical Description'){
          newNotes['Physical Description'] = note.text
        }else{
          newNotes['Summary'] = note.text
        }
      })
      return newNotes;
    }
    case REMOVE:{
      const removedNote = action.noteToDelete;
      const newState = state.filter(note => note.text !== removedNote.text && note.title !== removedNote.titled)
      return newState
    }
    case CLEARNOTES: {
      return []
    }
    default:
      return state;
  }
};

export default notesReducer;
