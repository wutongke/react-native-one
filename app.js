/**
 *
 * Created by erfli on 9/20/16.
 */
import React from 'react';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider} from 'react-redux';
import reducer from './reducers/Reducer';
import Main from './Main';
const middlewares = [];
const rootReducer = combineReducers({reducer});
if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createDefaultStore(initialsState) {
    const defaultStore = createStoreWithMiddleware(rootReducer, initialsState);
    return defaultStore;
}
const store = createDefaultStore();
const Root = () => (
    <Provider store={store}>
        <Main />
    </Provider>
);
export default Root;