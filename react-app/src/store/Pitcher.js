const COLLECTPITCH = "pitcher/COLLECTPITCH"

const collect = pitcherForms => ({
    type: COLLECTPITCH,
    pitcherForms,
});

export const getPitcherForm = (playerId) => async dispatch => {
    const res = await fetch(`/api/players/${playerId}/pitcher/`)
    if (res.ok) {
        const pitcherForms = await res.json()
        dispatch(collect(pitcherForms.pitcher_evaluations));
        // dispatch(collect(pitcherForms));
    }
};

const initialState = {
   
}

const pitcherReducer = (state = initialState, action) => {
    switch(action.type) {
        case COLLECTPITCH: {
            return { ...action.pitcherForms}
        }
        default:
        return state
    }
};

export default pitcherReducer;