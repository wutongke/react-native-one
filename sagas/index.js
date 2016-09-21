/**
 * Created by erfli on 9/21/16.
 */
import { fork } from 'redux-saga/effects';

import { watchRequestStory } from './story';

export default function* rootSaga() {
    yield [
        fork(watchRequestStory),
    ];
}