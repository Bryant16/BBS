const COLLECT = "nonPitcher/COLLECT";
const CLEAR = "nonPitcher/CLEAR";

const collect = nonPitcherForms => ({
    type: COLLECT,
    nonPitcherForms,
});

export const clearNonPitcher = ()=>({
    type: CLEAR  
  });

export const getNonePitcherForm = (playerId) => async dispatch => {
    const res = await fetch(`/api/players/${playerId}/nonpitcher/`)
    if (res.ok) {
        const nonPitcherForms = await res.json()
        dispatch(collect(nonPitcherForms.non_pitcher_evaluations));
    }
};

const initialState = {
   
}

const nonPitcherReducer = (state = initialState, action) => {
    switch(action.type) {
        case COLLECT: {

            return {...action.nonPitcherForms }
        }
        case CLEAR: {
            return {}
        }
        default:
        return state
    }
};

export default nonPitcherReducer;