// description: root reducer

import {combineReducers} from 'redux';

import {reducer as dataReducer} from '../modules/home';

// combine all the reducers
const rootReducer = combineReducers({dataReducer});

export default rootReducer;
