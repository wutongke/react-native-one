/**
 * Created by erfli on 10/3/16.
 */
/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import {
    Text,
    View,
    Image,
    ListView,
    BackAndroid,
    Dimensions,
    StyleSheet
} from 'react-native';
import  {apiURL} from "../../Utilities/UrlCons";
/**
 * Created by erfli on 9/10/16.
 */
export default class OneRead extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            essay: ""
        }
    }


    componentDidMount() {
        this.fetchDaily();
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }


    fetchDaily() {
        var detailUrl = apiURL.baseUrl + apiURL.essay + this.props.id;
        fetch(detailUrl)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["data"]) {
                    var essayResult = jsonResponse["data"];
                    this.setState({
                        title: essayResult.hp_title,
                        essay: essayResult.hp_content
                    });
                }
            }).catch((error) => {

            if (error instanceof SyntaxError) {
                alert("SyntaxError error");
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 15, marginBottom: 10, alignItems: 'center'}}>{this.state.title}</Text>
                <Text style={{fontSize: 10}}>{this.state.essay}</Text>
            </View>
        );
    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15
    },
});
