/**
 * Created by erfli on 9/10/16.
 */
var STORE = require('../Utilities/TimeUtil')
import * as React from "react";
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    Image,
    Platform
} from 'react-native';

import StoryCell from './StoryCell'
export default class ZhihuPage extends React.Component {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>r1 !== r2
        });
        this.state = {
            date: STORE.date,
            refreshing: false,
            db: [],
            dataSource: ds.cloneWithRows([]),
            loaded: false
        }
    }

    componentWillMount() {
        this.fetchDaily();
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.date.toString() !== STORE.date) {
                this.fetchDaily()
            }
        }, 1000)
    }

    fetchDaily() {
        this.state.date = STORE.date;
        var url = "http://news.at.zhihu.com/api/4/news/before/" + STORE.date;
        fetch(url)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["stories"]) {
                    var stories = jsonResponse["stories"];
                    this.setState({
                        db: stories,
                        dataSource: this.state.dataSource.cloneWithRows(stories),
                        loaded: true,
                    })

                }
            }).catch((error) => {

            if (error instanceof SyntaxError) {
                this.setState({
                    db: [],
                    loaded: true,
                });
            }
        })
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
            <View style={{flex: 1}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchDaily.bind(this)}
                        />
                    }
                    style={styles.listview}
                    dataSource={this.state.dataSource}
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
var styles = StyleSheet.create({
    listview: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        marginTop: 5
    }
});