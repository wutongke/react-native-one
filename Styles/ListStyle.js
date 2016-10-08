/**
 * Created by erfli on 10/8/16.
 */
import {StyleSheet} from "react-native"
export default StyleSheet.create({
    column_container: {
        flex: 1,
        flexDirection: 'column'
    },
    row_container: {
        flex: 1,
        flexDirection: 'column'
    },
    corner_bg: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#a0a0a0',
        borderRadius: 3,
        borderWidth: 0.5,
        margin: 5
    },
    list_view: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        marginTop: 5
    },
    divider: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        marginBottom: 8,
        height: 1,
        backgroundColor: '#a0a0a0'
    }
});