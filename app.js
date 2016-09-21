/**
 *
 * Created by erfli on 9/20/16.
 */
import React from 'react';
import createLogger from 'redux-logger';
import saga from 'redux-saga';
import sagaRoot from './sagas/index'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import story from './reducers/Reducer';
import Main from './Main';
const middlewares = [];
const rootReducer = combineReducers({story});
if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}
const sagaMiddleware = saga();
middlewares.push(sagaMiddleware)

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createDefaultStore(initialsState) {
    const defaultStore = createStoreWithMiddleware(rootReducer, initialsState);
    return defaultStore;
}
const store = createDefaultStore();
sagaMiddleware.run(sagaRoot)
const Root = () => (
    <Provider store={store}>
        <Main />
    </Provider>
);
export default Root;