/**
 * Created by erfli on 9/10/16.
 */
import * as React from "react";
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    Image,
    Text,
    Platform,
    InteractionManager
} from 'react-native';

import StoryCell from './StoryCell'
import DefaultStyle from '../Styles/ListStyle'
import * as Actions from "../Actions/zhihu"
import {connect} from "react-redux"
class ZhihuPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.fetchLatest();
    }

    fetchLatest = ()=> {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(Actions.startRefreshZhihu());
        });
    }

    fetchMore = ()=> {
        const {dispatch, zhihu} = this.props;
        if (zhihu.refreshing || zhihu.loadingMore) {
            return;
        }
        dispatch(Actions.startLoadMoreZhihu(zhihu.page));
    }


    renderFooter = ()=> {
        if (this.props.loadingMore) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        数据加载中……
                    </Text>
                </View>
            );
        }
        return <View />;
    }

    render() {
        const {zhihu} = this.props;
        if (zhihu === undefined || !zhihu.loaded || zhihu.db.length === 0) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={require('../Assets/Images/ring.gif')}
                        style={{width: 70, height: 70}}
                    />
                </View>
            );
        }
        return (
            <View style={DefaultStyle.corner_bg}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={zhihu.refreshing}
                            onRefresh={this.fetchLatest}
                        />
                    }
                    enableEmptySections={true}
                    style={DefaultStyle.list_view}
                    dataSource={zhihu.dataSource}
                    onEndReached={this.fetchMore}
                    onEndReachedThreshold={10}
                    renderFooter={this.renderFooter}
                    renderRow={(rowData, sectionID, rowID)=>
                        <StoryCell
                            story={rowData}
                        />
                    }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    footerText: {
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 10
    },
})
function mapStateToProps(state) {
    const {zhihu} = state;
    return {
        zhihu
    };
}

export default connect(mapStateToProps)(ZhihuPage);
