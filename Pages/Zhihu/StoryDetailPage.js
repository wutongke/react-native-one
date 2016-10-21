import React, {PropTypes}from "react";
import {
    Text,
    View,
    StyleSheet,
    BackAndroid,
    WebView,
    Image
} from 'react-native';
import * as Actions from "../../Actions/story"
import {connect} from "react-redux"
/**
 * Created by erfli on 9/11/16.
 */
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    story: PropTypes.object.isRequired,
};
class StoryDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.targetUrl == null || this.props.targetUrl.length == 0) {
            dispatch(Actions.fetchStoryBegin(this.props.id))
        }
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    render() {
        if (this.props.refreshing) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={require('../../Assets/Images/ring.gif')}
                        style={{width: 70, height: 70}}
                    />
                </View>
            );
        }

        var targetUrl = "";
        if (!this.props.targetUrl) {
            const {story} = this.props;
            targetUrl = story.story["share_url"];
        } else {
            targetUrl = this.props.targetUrl;
        }
        return (
            <View style={{flex: 1}}>
                <WebView style={styles.webview_style}
                         source={{url: targetUrl}}
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
    const {story} = state;
    return {
        story
    };
}
StoryDetailPage.propTypes = propTypes;
export default connect(mapStateToProps)(StoryDetailPage);