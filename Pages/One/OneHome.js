/**
 * Created by erfli on 10/7/16.
 */
import * as React from "react";
import {apiURL} from '../../Utilities/UrlCons';
import ViewPager from 'react-native-viewpager';
import PicCell from './OneCell/PicCell'
import {DeviceWidth} from '../../Utilities/DisplayUtil'
import {
    View,
    BackAndroid,
    InteractionManager,
    StyleSheet
} from 'react-native';
export default class OnePic extends React.Component {

    constructor(props) {
        super(props);
        var data = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            images: data.cloneWithPages([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // ...long-running synchronous task...
            this.fetchDaily();
            BackAndroid.addEventListener('hardwareBackPress', this.goBack);
        });
    }


    fetchDaily() {
        var DateUtil = require('../../Utilities/TimeUtil')
        // var url = "http://v3.wufazhuce.com:8000/api/hp/bymonth/2016-08";
        var url = apiURL.baseUrl + apiURL.homePage + DateUtil.dateForm1;
        fetch(url)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["data"]) {
                    var sentences = jsonResponse["data"];
                    this.setState({
                        images: this.state.images.cloneWithPages(sentences)
                    })

                }
            }).catch((error) => {

            if (error instanceof SyntaxError) {
                alert("SyntaxError:" + error)
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', width: DeviceWidth, overflow: 'hidden'}}>
                <ViewPager
                    style={styles.row}
                    isLoop={false}
                    autoPlay={false}
                    dataSource={this.state.images}
                    renderPage={(data, pageID)=><PicCell picInfo={data}/>}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row'
    },
});