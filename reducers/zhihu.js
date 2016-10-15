/**
 * Created by erfli on 10/15/16.
 */
import * as ActionType from "../Constant/ActionType"
import {ListView} from 'react-native'
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) =>r1 !== r2
});
const initProps = {
    load: false,
    refreshing: false,
    loadingMore: false,
    db: [],
    dataSource: ds.cloneWithRows([]),
    page: 1
}

export function zhihu(state = initProps, action) {
    switch (action.type) {
        case ActionType.Start_Refresh_Zhihu:
            return Object.assign({}, state, {
                refreshing: true,
                db: [],
                page: 0
            });
        case ActionType.Fetch_Zhihu:
            return Object.assign({}, state, {});
        case ActionType.Fetch_Zhihu_Done:
            return Object.assign({}, state, {
                db: action.stories.stories,
                dataSource: state.dataSource.cloneWithRows(action.stories.stories),
                loaded: true,
                refreshing: false,
                loadingMore: false,
                page: 1
            })


        case ActionType.Start_Zhihu_More:
            return Object.assign({}, state, {
                loadingMore: true,
            });
        case ActionType.Fetch_Zhihu_More:
            return state;
        case ActionType.Fetch_Zhihu_More_Done:
            return Object.assign({}, state, {
                db: state.db.concat(action.stories.stories),
                dataSource: state.dataSource.cloneWithRows(state.db.concat(action.stories.stories)),
                loaded: true,
                refreshing: false,
                loadingMore: false,
                page: state.page + 1
            })
        default:
            return state;
    }
}