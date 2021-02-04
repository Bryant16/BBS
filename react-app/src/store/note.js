const CREATE = "notes/CREATE";
const ALL = "notes/ALL";

const create = (note) => ({
  type: CREATE,
  note,
});

const grabAll = (all_note) => ({
  type: ALL,
  all_note,
});

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

const initialState = [];
const notesReducer = (state = initialState, action) => {
    switch (action.type) {
    case CREATE: {
      let new_notes = action.note;
      return [...state, { notes: new_notes }];
    }
    case ALL: {
      return [...state, ...action.all_note ];
    }
    default:
      return state;
  }
};

export default notesReducer;
