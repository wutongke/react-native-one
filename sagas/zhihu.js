/**
 * Created by erfli on 10/15/16.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import {toastShort} from "../Utils/ToastUtil";
import * as ActionType from "../Constant/ActionType"
import * as ZhihuAction from "../Actions/zhihu";
import {request} from "../Utils/RequestUtil";
import moment from 'moment'
export function* startRefreshZhihu() {
    try {
        yield put(ZhihuAction.fetchZhihu());
        let b = moment();
        let url = "http://news.at.zhihu.com/api/4/news/before/" + b.format("YYYYMMDD");
        const stories = yield call(request, url);
        yield put(ZhihuAction.refreshZhihuDone(stories));
    } catch (error) {
        toastShort('网络故障'+error);
    }
}

export function* startLoadMoreZhihu(page) {
    try {
        yield put(ZhihuAction.loadMoreZhihu());
        let b = moment().subtract(page, 'd');
        let url = "http://news.at.zhihu.com/api/4/news/before/" + b.format("YYYYMMDD");
        const stories = yield call(request, url);
        yield put(ZhihuAction.loadMoreZhihuDone(stories));
    } catch (error) {
        toastShort('网络故障'+error);
    }
}

export function* watchRefreshZhihu() {
    while (true) {
        yield take(ActionType.Start_Refresh_Zhihu);
        yield fork(startRefreshZhihu);
    }
}

export function* watchLoadMoreZhihu() {
    while (true) {
        const {
            page
        } = yield take(ActionType.Start_Zhihu_More);
        yield fork(startLoadMoreZhihu, page);
    }
}