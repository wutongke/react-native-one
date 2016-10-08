/**
 * Created by erfli on 10/6/16.
 */
import * as React from 'react'
import{
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import {DeviceWidth} from '../../../Utilities/DisplayUtil'
import DefaultStyle from '../../../Styles/ListStyle'
export default class PicCell extends React.Component {
    render() {
        const picInfo = this.props.picInfo;
        return (
            <View style={DefaultStyle.column_container}>
                <View style={styles.content}>
                    <Image style={styles.image} source={{url: picInfo.hp_img_url}}/>
                    <View style={styles.row}>
                        <Text style={styles.des_text}>{picInfo.hp_title}</Text>
                        <Text style={styles.des_right_text}>{picInfo.hp_author}</Text>
                    </View>
                    <Text style={styles.content_text}>{picInfo.hp_content}</Text>
                    <Text style={styles.des_right_text}>{picInfo.hp_makettime}</Text>
                </View>
                <View style={{
                    flex: 1,
                    width: DeviceWidth,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    <View style={styles.bottom_view}>
                        <Text style={styles.bottom_text}>转发: </Text>
                        <Text style={styles.bottom_text}>{picInfo.sharenum}</Text>
                    </View>
                    <View style={styles.bottom_view}>
                        <Text style={styles.bottom_text}>点赞: </Text>
                        <Text style={styles.bottom_text}>{picInfo.praisenum}</Text>
                    </View>
                    <View style={styles.bottom_view}>
                        <Text style={styles.bottom_text}>评论: </Text>
                        <Text style={styles.bottom_text}>{picInfo.commentnum}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        borderColor: "#a0a0a0",
        borderWidth: 1,
        borderRadius: 3,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        padding: 5,
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        paddingBottom: 5,
    },
    image: {
        width: DeviceWidth - 20,
        height: (DeviceWidth - 20) * 3 / 4,
    },
    des_text: {
        fontSize: 10,
        color: "#a0a0a0",
        paddingTop: 2,
        paddingBottom: 2,
    },
    des_right_text: {
        fontSize: 10,
        color: "#a0a0a0",
        paddingTop: 2,
        paddingBottom: 2,
        flex: 1,
        textAlign: 'right'
    },
    content_text: {
        fontSize: 14,
        color: "#000000",
    },
    bottom_view: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 40
    },
    bottom_text: {
        fontSize: 13,
        color: "#a0a0a0",
    }
})