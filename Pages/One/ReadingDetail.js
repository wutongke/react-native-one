/**
 * Created by erfli on 10/3/16.
 */
import * as React from "react";
import {
    Text,
    ScrollView,
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
        const content = this.state.essay.replace(/<br>/g," ");
        return (
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 15, marginBottom: 10, alignItems: 'center'}}>{this.state.title}</Text>
                <Text style={{fontSize: 10}}>{content}</Text>
            </ScrollView>
        );
    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
});
