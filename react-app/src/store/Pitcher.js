const COLLECTPITCH = "pitcher/COLLECTPITCH"

const collect = pitcherForms => ({
    type: COLLECTPITCH,
    pitcherForms,
});

export const getPitcherForm = (playerId) => async dispatch => {
    const res = await fetch(`/api/players/${playerId}/pitcher/`)
    if (res.ok) {
        const pitcherForms = await res.json()
        console.log('json', pitcherForms)
        dispatch(collect(pitcherForms[0].pitcher_evaluations));
        // dispatch(collect(pitcherForms));
    }
};

const initialState = {
    pitcher: {}
}

const pitcherReducer = (state = initialState, action) => {
    switch(action.type) {
        case COLLECTPITCH: {
            return {...state, pitcher: [action.pitcherForms[0]]}
        }
        default:
        return state
    }
};

export default pitcherReducer;