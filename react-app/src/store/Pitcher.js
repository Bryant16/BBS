const COLLECTPITCH = "pitcher/COLLECTPITCH";
const CLEAR = "pitcher/CLEAR";

const collect = (pitcherForms) => ({
  type: COLLECTPITCH,
  pitcherForms,
});

export const clearPitcher = () => ({
  type: CLEAR,
});

export const getPitcherForm = (playerId) => async (dispatch) => {
  const res = await fetch(`/api/players/${playerId}/pitcher/`);
  if (res.ok) {
    const pitcherForms = await res.json();
    dispatch(collect(pitcherForms.pitcher_evaluations));
  }
};

const initialState = {};

const pitcherReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTPITCH: {
      return { ...action.pitcherForms };
    }
    case CLEAR: {
      return {};
    }
    default:
      return state;
  }
};

export default pitcherReducer;
