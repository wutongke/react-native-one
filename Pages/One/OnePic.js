/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import {Actions} from 'react-native-router-flux';
import GridView from '../../Components/GridView'
import {
    View,
    Text,
    Image,
    BackAndroid,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
/**
 * Created by erfli on 9/10/16.
 */
class OnePic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        this.fetchDaily();
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }


    fetchDaily() {
        var DateUtil = require('../../Utilities/TimeUtil')
        var url = "http://v3.wufazhuce.com:8000/api/hp/bymonth/" + DateUtil.dateForm1;
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
            <View style={{marginLeft: 5, marginBottom: 5}}>
                <GridView
                    items={this.state.images}
                    itemsPerRow={2}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }

    renderItem(image) {
        return (
            <View>
                <TouchableOpacity key={image.hpcontent_id} style={styles.row} activeOpacity={0.5}
                                  onPress={()=>Actions.WebView({targetUrl: image.web_url})}
                >
                    <Image
                        style={styles.logo}
                        source={{url: image.hp_img_url}}
                    >
                    </Image>
                    <Text style={{
                        fontSize: 5,
                        color: "#000000"
                    }}>{image.hp_content}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    row: {
        height: 100,
        width: 60,
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
        flexDirection: 'column'
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row'
    },
    logo: {
        height: 80,
        width: 60,
        marginLeft: 10,
        marginBottom: 8,
        marginRight: 10,
    },

});

module.exports = OnePic;