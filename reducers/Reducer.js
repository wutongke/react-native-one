/**
 *
 * Created by erfli on 9/20/16.
 */
import * as ActionType from "../Constant/ActionType"
const initialState = {
    begin: false
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.Fetch_Story_Detail:
            return Object.assign({}, state, {
                begin: true
            });
        case ActionType.Fetch_Story_Detail_Done:
            return Object.assign({}, state, {
                begin: false
            });
        default:
            return state;
    }
}