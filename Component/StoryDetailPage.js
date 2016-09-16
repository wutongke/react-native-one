import * as React from "react";
import {
    Text,
    View,
    StyleSheet,
    WebView
} from 'react-native';
/**
 * Created by erfli on 9/11/16.
 */
class StoryDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailUrl: "",
        }
    }

    componentWillMount() {
        if (this.props.targetUrl == null || this.props.targetUrl.length == 0) {
            this.fetchDaily();
        }else{
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

module.exports = StoryDetailPage;