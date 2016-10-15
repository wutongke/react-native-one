/**
 * Created by erfli on 10/15/16.
 */
import * as ActionType from "../Constant/ActionType"
export function startRefreshZhihu() {
    return {
        type: ActionType.Start_Refresh_Zhihu,
    }
}

export function fetchZhihu() {
    return {
        type: ActionType.Fetch_Zhihu,
    }
}

export function refreshZhihuDone(stories) {
    return {
        type: ActionType.Fetch_Zhihu_Done,
        stories: stories
    }
}

export function startLoadMoreZhihu(page = 1) {
    return {
        type: ActionType.Start_Zhihu_More,
        page: page
    }
}

export function loadMoreZhihu() {
    return {
        type: ActionType.Fetch_Zhihu_More
    }
}

export function loadMoreZhihuDone(stories) {
    return {
        type: ActionType.Fetch_Zhihu_More_Done,
        stories: stories
    }
}