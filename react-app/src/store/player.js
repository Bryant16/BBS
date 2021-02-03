const LOAD = "players/LOAD"

const load = players => ({
    type: LOAD,
    players,
});

export const getPlayers = () => async dispatch => {
    const res = await fetch(`/api/players/`)
    if (res.ok) {
        const players = await res.json()
        dispatch(load(players.players));
    }
};

const initialState = {
    players: {}
}
const playersReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            return {...state, players: action.players}
        }
        default:
        return state
    }
};

export default playersReducer;