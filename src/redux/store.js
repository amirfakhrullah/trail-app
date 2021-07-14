import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import ticketReducer from './reducers/ticketReducer';
import organizationReducer from './reducers/organizationReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    ticket: ticketReducer,
    organization: organizationReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunk, promiseMiddleware));

export default createStore(rootReducer, middleware);

