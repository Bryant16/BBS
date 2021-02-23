
const USER = 'session/USER';
const LOGOUT = 'session/Logout'
const FIRST = 'session/FIRST'
const constructSession = user => ({ type: USER, user });

const deconstructSession = () => ({ type: LOGOUT });

export const firstTime = () =>({type:FIRST, nums:0})

export const LogIn = (email, password) => async dispatch => {
  const loginResponse = await window.fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const { user } = await loginResponse.json();
  if (!user.errors) return dispatch(constructSession(user));
  const outErr = new Error();
  outErr.errors = [...user.errors];
  throw outErr;
};

export const LogOut = () => async dispatch => {
  const logoutResponse = await window.fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (logoutResponse.ok) return dispatch(deconstructSession());
};

export const Restore = () => async dispatch => {
  const restoreResponse = await window.fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const { user } = await restoreResponse.json();
  if (!user.errors) return dispatch(constructSession(user));
  return dispatch(constructSession(null));
};

export const SignUp = (username, email, password) => async dispatch => {
  const signupResponse = await window.fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });
  const { user } = await signupResponse.json();
  if (!user.errors) return dispatch(constructSession(user));
  const outErr = new Error();
  outErr.errors = [...user.errors];
  throw outErr;
};

const sessionReducer = (state = { user: null}, action)=> {
  switch(action.type) {
    case USER:{
      return {...state, user: action.user}
    }
    case FIRST: 
    const newState = {...state}
    if(newState['FIRST']){
      let val = newState['FIRST']
      newState['FIRST'] = val +1
    }else{
      newState['FIRST'] = 1
    }
   
      return newState 
    case LOGOUT:
      return {user:null}
    default:
      return state
    }
}

export default sessionReducer;