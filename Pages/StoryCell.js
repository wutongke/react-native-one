import * as React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
/**
 * Created by erfli on 9/10/16.
 */
class StoryCell extends React.Component {
    goToStoryDetailPage(id) {
        Actions.StoryDetail({id: id});
    }

    constructor(props) {
        super(props);
    }

    render() {
        var image = this.props.story.images[0];
        var id = this.props.story.id;
        var content = this.props.story.title;
        return (
            <View>
                <TouchableHighlight
                    onPress={this.goToStoryDetailPage.bind(this, id)}
                    underlayColor='#FFFFFF'
                >
                    <View style={styles.row}>
                        <View style={styles.rowContent}>
                            <Image
                                style={styles.logo}
                                source={{uri: image}}
                            />
                            <Text style={{flex: 1}}>{content}</Text>
                        </View>
                        <View style={styles.divider}></View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    row: {
        flex: 1,
        height: 50,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row'
    },
    logo: {
        height: 40,
        width: 40,
        marginLeft: 10,
        marginBottom: 8,
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
        height: 1,
        backgroundColor: '#000'
    }
});

module.exports = StoryCell;