// store/index.js

import { createStore, combineReducers } from 'redux';
import booleanReducer from './Reducers';
// import booleanReducer from '../reducers/booleanReducer';
booleanReducer
const rootReducer = combineReducers({
    boolean: booleanReducer,
});

const store = createStore(rootReducer);

export default store;
