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
// 创建reducer
const rootReducer = combineReducers({story});
// 创建中间件saga
const sagaMiddleware = saga();

middlewares.push(sagaMiddleware)
if (process.env.NODE_ENV === 'development') {
    //创建中间件logger
    const logger = createLogger();
    middlewares.push(logger);
}
//applymiddleware配置中间件
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createDefaultStore(initialsState) {
    //通过reducer 获取stare
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