/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
export default class Film extends React.Component {
    onPress(url) {
        Actions.FilmDetail({targetUrl: url});
    }

    render() {
        const film = this.props.film;
        const url = "https://movie.douban.com/subject/" + String(film.id);
        return (
            <View>
                <TouchableHighlight
                    onPress={this.onPress.bind(this, url)}
                    underlayouColor="#33FFFFFF"
                >
                    <View style={styles.row}>
                        <View style={styles.rowContent}>
                            <Image
                                style={styles.logo}
                                source={{uri: film.images.large}}
                            />
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{flex: 1}}>{"电影名称" + film.title}</Text>
                                <Text style={{flex: 1}}>{"电影评分" + film.rating.average}</Text>
                                <Text style={{flex: 1}}>{"上映时间" + film.year}</Text>
                            </View>

                        </View>
                        <View style={styles.divider}></View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

}
var styles = StyleSheet.create({
    row: {
        flex: 1,
        height: 200,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row'
    },
    logo: {
        height: 180,
        width: 100,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    divider: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 8,
        marginBottom: 8,
        height: 1,
        backgroundColor: '#000'
    }
});
