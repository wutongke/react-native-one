/**
 * Created by erfli on 9/21/16.
 */
import {fork} from 'redux-saga/effects';

import {watchRequestStory} from './story';
import {watchRefreshZhihu,watchLoadMoreZhihu} from './zhihu'

export default function* rootSaga() {
    yield [
        fork(watchRequestStory),
        fork(watchRefreshZhihu),
        fork(watchLoadMoreZhihu)
    ];
}