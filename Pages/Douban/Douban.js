/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    Image,
    Platform
} from 'react-native';
import Film from "./Film"
import DefaultStyle from '../../Styles/ListStyle'

export default class Douban extends React.Component {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>r1 !== r2
        });
        this.state = {
            refreshing: false,
            db: [],
            dataSource: ds.cloneWithRows([]),
            loaded: false
        }
    }

    componentWillMount() {
        this.fetchDaily();
    }

    fetchDaily() {
        var url = "https://api.douban.com/v2/movie/top250";
        fetch(url)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["subjects"]) {
                    var films = jsonResponse["subjects"];
                    this.setState({
                        db: films,
                        dataSource: this.state.dataSource.cloneWithRows(films),
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
                        source={require('../../Assets/Images/ring.gif')}
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
                            onRefresh={this.fetchDaily.bind(this)}
                        />
                    }
                    style={DefaultStyle.list_view}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID)=>
                        <Film
                            film={rowData}
                        />
                    }
                />
            </View>
        )
    }
}