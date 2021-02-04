const CREATE = "notes/CREATE"

const create = note => ({
    type: CREATE,
    note,
});

export const createNote = (newNote) => async dispatch => {
    const res = await fetch(`/api/notes/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });

    if (res.ok) {
        const notes = await res.json()
        console.log(notes)
        dispatch(create(notes.note));
    }
};

const initialState = {
    notes: {}
}
const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE: {
            return {...state, notes: action.note}
        }
        default:
        return state
    }
};

export default notesReducer;