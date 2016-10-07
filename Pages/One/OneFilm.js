/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import {
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    BackAndroid,
    InteractionManager,
    StyleSheet
} from 'react-native';
import {apiURL} from "../../Utilities/UrlCons"
/**
 * Created by erfli on 9/10/16.
 */
var deviceWidth = Dimensions.get('window').width;
export default class OneFilm extends React.Component {

    constructor(props) {
        super(props);
        var list = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> r1 !== r2
        })
        this.state = {
            movies: list.cloneWithRows([])
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // ...long-running synchronous task...
            this.fetchDaily();
            BackAndroid.addEventListener('hardwareBackPress', this.goBack);
        });
    }


    fetchDaily() {
        var bannerUrl = apiURL.baseUrl + apiURL.movieList + '0';
        fetch(bannerUrl)
            .then((response)=>response.json())
            .then((jsonResponse) => {
                if (jsonResponse["data"]) {
                    var movies = jsonResponse["data"];
                    this.setState({
                        movies: this.state.movies.cloneWithRows(movies)
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
            <View style={{flex: 1}}>
                <ListView
                    style={styles.listview}
                    dataSource={this.state.movies}
                    renderRow={this.renderItem}
                />
            </View>
        )
    }

    renderItem(rowData, sectionID, rowID) {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Image style={{
                    flex: 1,
                    width: deviceWidth,
                    height: 140,
                }} source={{url: rowData.cover}}>
                    <View style={styles.row}>
                        <Text style={{
                            fontSize: 28,
                            color: '#DC143C'
                        }}>{rowData.score}</Text>
                    </View>
                </Image>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    listview: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    row: {
        height: 140,
        width: deviceWidth,
        flexDirection: 'row',
        backgroundColor: '#00000000',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingBottom: 20,
    },
});
