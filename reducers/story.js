/**
 *
 * Created by erfli on 9/20/16.
 */
import * as ActionType from "../Constant/ActionType"
const initialState = {
    id: "",
    refreshing: true,
    loaded: false,
    story: new Object()
};
export default function story(state = initialState, action) {
    switch (action.type) {
        case ActionType.Fetch_Story_Detail:
            return Object.assign({}, state, {
                id: action.id,
                refreshing: true,
                loaded: false
            });
        case ActionType.Fetch_Story_Detail_Done:
            return Object.assign({}, state, {
                id: action.id,
                refreshing: false,
                load: true,
                story: action.story
            });
        default:
            return state;
    }
}