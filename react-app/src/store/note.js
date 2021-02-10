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
    console.log("inside ress");
  const res = await fetch(`/api/notes/${playerId}/`);
  if (res.ok) {
    const all_notes = await res.json();
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
      return [...state, {text,title} ];
    }
    case ALL: {
      return [...state, ...action.all_note];
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
