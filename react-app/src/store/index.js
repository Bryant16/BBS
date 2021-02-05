import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import playersReducer from './player';
import notesReducer from './note';
import nonPitcherReducer from './nonPitcher';
import pitcherReducer from './Pitcher';

const rootReducer = combineReducers({
    session: sessionReducer,
    players: playersReducer,
    notes: notesReducer,
    nonPitcher: nonPitcherReducer,
    pitcher: pitcherReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') enhancer = applyMiddleware(thunk);
else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
