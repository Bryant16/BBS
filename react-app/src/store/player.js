import { Editable } from "@chakra-ui/react";

const LOAD = "players/LOAD"
const EDIT = "players/EDIT"

const load = players => ({
    type: LOAD,
    players,
});
const editPlayer = updatedPlayer =>({
    type:EDIT,
    updatedPlayer
})
export const getPlayers = () => async dispatch => {
    const res = await fetch(`/api/players/`)
    if (res.ok) {
        const players = await res.json()
        dispatch(load(players.players));
    }
};
export const editPlayerProfile=(playerid, newPlayer)=>async dispatch=>{
    const res = await fetch(`/api/players/${playerid}`,{
            headers:{'Content-type': 'application/json'},
            method: 'PUT',
            body:JSON.stringify(newPlayer)
           });
        if(res.ok){
            const playerUpdated = await res.json();
            console.log(playerUpdated.player,'updatedddddd')
            dispatch(editPlayer(playerUpdated.player))
        }
}
const initialState = {
    players: {}
}
const playersReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            return {...state, ...action.players}
        }
        case EDIT:{
            const newState = {...state}
            const updatedPlayer = action.updatedPlayer
            newState[updatedPlayer.id] = updatedPlayer
            return newState
        }
        default:
        return state
    }
};

export default playersReducer;