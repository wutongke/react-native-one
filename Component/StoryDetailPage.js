import React, {PropTypes}from "react";
import {
    Text,
    View,
    StyleSheet,
    WebView
} from 'react-native';
import * as ActionType from "../Constant/ActionType"
import {connect} from "react-redux"
/**
 * Created by erfli on 9/11/16.
 */
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    begin: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(React.PropTypes.node).isRequired
};
class StoryDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailUrl: "",
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        if (this.props.targetUrl == null || this.props.targetUrl.length == 0) {
            this.fetchDaily();
            dispatch({
                type: ActionType.Fetch_Story_Detail,
                begin: true
            })
        } else {
            this.state.detailUrl = this.props.targetUrl;
        }
    }

    fetchDaily() {
        var url = "http://news-at.zhihu.com/api/4/news/" + this.props.id;
        fetch(url)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["share_url"]) {
                    var shareUrl = jsonResponse["share_url"];
                    this.setState({
                        detailUrl: shareUrl
                    })
                }
            }).catch((error) => {

            if (error instanceof SyntaxError) {
                this.setState({});
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView style={styles.webview_style}
                         url={this.state.detailUrl}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                >
                </WebView>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    webview_style: {
        backgroundColor: '#ffffff',
    }
});
function mapStateToProps(state) {
    const { begin } = state;
    return {
        begin
    };
}
StoryDetailPage.propTypes = propTypes;
export default connect(mapStateToProps)(StoryDetailPage);