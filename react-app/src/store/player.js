const LOAD = "players/LOAD";
const EDIT = "players/EDIT";
const ADD = "players/ADD";
const CLEAR = "players/CLEAR";
const PDF = "players/PDF";

const load = (players) => ({
  type: LOAD,
  players,
});

const editPlayer = (updatedPlayer) => ({
  type: EDIT,
  updatedPlayer,
});

const addPlayer = (newPlayer) => ({
  type: ADD,
  newPlayer,
});

export const infoPDF = (player) => ({
  type: PDF,
  player,
});

export const clearPlayers = () => ({
  type: CLEAR,
});

export const getPlayers = () => async (dispatch) => {
  const res = await fetch(`/api/players/`);
  if (res.ok) {
    const players = await res.json();
    dispatch(load(players.players));
  }
};
export const editPlayerProfile = (playerid, newPlayer) => async (dispatch) => {
  const res = await fetch(`/api/players/${playerid}`, {
    headers: { "Content-type": "application/json" },
    method: "PUT",
    body: JSON.stringify(newPlayer),
  });
  if (res.ok) {
    const playerUpdated = await res.json();
    dispatch(editPlayer(playerUpdated.player));
  }
};

export const addPlayerProfile = (newPlayer) => async (dispatch) => {
  const response = await fetch("/api/players/", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(newPlayer),
  });
  if (response.ok) {
    const playerToAdd = await response.json();
    dispatch(addPlayer(playerToAdd.player));
    return playerToAdd.player.id;
  }
};

const initialState = {};
const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const playersArr = action.players;
      const newStates = {};
      playersArr.forEach((player) => (newStates[player.id] = player));
      return { ...state, ...newStates };
    }
    case EDIT: {
      const newState = {};
      const updatedPlayer = action.updatedPlayer;
      newState[updatedPlayer.id] = updatedPlayer;
      return { ...state, ...newState };
    }
    case ADD: {
      const currState = { ...state };
      const addPlayer = action.newPlayer;
      const id = addPlayer.id;
      currState[id] = addPlayer;
      return currState;
    }
    case PDF: {
      const curState = { ...state };
      curState["PDF"] = action.player;
      return curState;
    }
    case CLEAR: {
      return {};
    }
    default:
      return state;
  }
};

export default playersReducer;
