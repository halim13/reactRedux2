// description: redux store configuration

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './rootReducer'; //import the root reducer

const enchancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enchancer);
