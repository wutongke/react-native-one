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
    Platform
} from 'react-native';

import StoryCell from './StoryCell'
import DefaultStyle from '../Styles/ListStyle'
import moment from 'moment';
let page = 0;
let today = moment();
export default class ZhihuPage extends React.Component {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>r1 !== r2
        });
        this.state = {
            refreshing: false,
            loadingMore: false,
            db: [],
            dataSource: ds.cloneWithRows([]),
            loaded: false
        }
    }

    componentWillMount() {
        this.fetchDaily();
    }

    fetchLatest = ()=> {
        page = 0;
        this.setState({
            refreshing: true,
            db:[]
        });
        this.fetchDaily();
    }

    fetchMore = ()=> {
        this.setState({
            loadingMore: true
        });
        this.fetchDaily();
    }

    fetchDaily = ()=> {
        if (this.state.refreshing || this.state.loadingMore) {
            return;
        }
        let b = moment(today).subtract(page, 'd');
        var url = "http://news.at.zhihu.com/api/4/news/before/" + b.format("YYYYMMDD");
        fetch(url)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["stories"]) {
                    var stories = jsonResponse["stories"];
                    page += 1;
                    this.setState({
                        db: this.state.db.concat(stories),
                        dataSource: this.state.dataSource.cloneWithRows(this.state.db.concat(stories)),
                        loaded: true,
                        refreshing: false,
                        loadingMore: false,
                    })

                }
            }).catch((error) => {

            if (error instanceof SyntaxError) {
                this.setState({
                    db: [],
                    loaded: true,
                    refreshing: false,
                    loadingMore: false,
                });
            }
        })
    }

    renderFooter = ()=> {
        if (this.state.loadingMore) {
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
        if (!this.state.loaded && this.state.db.length === 0) {
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
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchLatest}
                        />
                    }
                    enableEmptySections={true}
                    style={DefaultStyle.list_view}
                    dataSource={this.state.dataSource}
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
