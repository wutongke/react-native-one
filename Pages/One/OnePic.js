/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import {Actions} from 'react-native-router-flux';
import GridView from '../../Components/GridView'
import {apiURL} from '../../Utilities/UrlCons'
import {
    View,
    Text,
    Image,
    BackAndroid,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    StyleSheet
} from 'react-native';
/**
 * Created by erfli on 9/10/16.
 */
var deviceWidth = Dimensions.get('window').width;
class OnePic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
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
                        images: sentences
                    })

                }
            }).catch((error) => {

            if (error instanceof SyntaxError) {
                this.setState({
                    db: [],
                    loaded: true,
                });
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <GridView
                    style={styles.row}
                    items={this.state.images}
                    itemsPerRow={2}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }

    renderItem(image) {
        return (
            <TouchableOpacity key={image.hpcontent_id} style={styles.imageContent} activeOpacity={0.5}
                              onPress={()=>Actions.WebView({targetUrl: image.web_url})}
            >
                <Image
                    style={styles.logo}
                    source={{url: image.hp_img_url}}
                >
                </Image>
                <Text style={styles.text}>{image.hp_content}</Text>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    row: {
        flex: 1,
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
        flexDirection: 'row'
    },
    imageContent: {
        flex: 1,
        width: deviceWidth / 2,
        flexDirection: 'column',
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        width: deviceWidth / 2 - 40,
        marginBottom: 8,
    },
    text: {
        width: deviceWidth / 2 - 20,
        fontSize: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#000000",
        marginBottom: 8,
    }
});

module.exports = OnePic;