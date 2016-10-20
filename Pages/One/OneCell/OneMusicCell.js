/**
 * Created by erfli on 10/16/16.
 */
import * as React from 'react'
import {View, Image, Text, InteractionManager, ScrollView, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import {DeviceWidth} from '../../../Utilities/DisplayUtil'
import * as RNFS from 'react-native-fs'
let Sound = require('react-native-sound');
let jobId = -1;
let [playing, loading,start]=[0, 1, 2];
let [beginLoad, loaded] = [1, 2];
let playStatusIcon = [require("../../../Assets/Images/playing.png"), require("../../../Assets/Images/loading.gif"), require("../../../Assets/Images/stop.png")];
let musicHandler = {};
export default class OneMusicCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            music: {},
            loadStatus: beginLoad,
            playStatus: start,
            loadProcess: ""
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // ...long-running synchronous task...
            const id = this.props.id;
            this.fetchMusicDetail(id);
        });
    }

    fetchMusicDetail = (id)=> {
        fetch("http://v3.wufazhuce.com:8000/api/music/detail/" + id)
            .then((response)=>response.json())
            .then((jsonResponse)=> {
                this.setState({
                    music: jsonResponse.data
                })
            }).catch((error)=> {
            if (error instanceof SyntaxError) {
                console.error(error);
            }
        });
    }

    render() {
        var music = this.state.music;
        if (isEmpty(music)) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={require('../../../Assets/Images/ring.gif')}
                        style={{width: 70, height: 70}}
                    />
                </View>
            );
        }
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <Image style={{width: DeviceWidth, height: DeviceWidth / 2}} source={{url: music.cover}}/>
                <View style={styles.music_author_content}>
                    <Image style={{width: 50, height: 50,}} source={{url: music.author.web_url}}/>
                    <View style={{flex: 1, flexDirection: 'column', marginLeft: 20}}>
                        <Text>{music.author.user_name}</Text>
                        <Text>{music.author.desc}</Text>
                    </View >
                    <TouchableWithoutFeedback style={{flex: 1, flexDirection: 'row', justifyContent: 'flex_end'}}
                                              onPress={()=>this.operationMusic(music.music_id)}>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={[styles.content, {fontSize: 15, marginRight: 8}]}>{this.state.loadProcess}</Text>
                            <Image style={{width: 40, height: 40}} source={playStatusIcon[this.state.playStatus]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={[styles.content, {fontSize: 15}]}>{music.title}</Text>
                <View View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={styles.subtitle}>"music story"</Text>
                    <Text style={styles.subtitle}>{'分享: ' + music.sharenum}</Text>
                    <Text style={styles.subtitle}>{'评论:' + music.commentnum}</Text>
                </View>
                <Text style={[styles.content, {fontSize: 15}]}>{music.story_title}</Text>
                <Text style={[styles.content, {fontSize: 12}]}>{music.story_author.user_name}</Text>
                <Text style={[styles.content, {fontSize: 10}]}>{music.story.replace(/<br>/g, " ")}</Text>
            </ScrollView>
        );
    }

    operationMusic(musicId) {
        if (this.state.playStatus == playing) {
            this.pauseSound();
        } else {
            if (this.state.loadStatus == loaded) {
                this.playSound();
            } else {
                this.getMp3UrlAndDownloadFile(musicId);
            }
        }
    }

    getMp3UrlAndDownloadFile(musicId) {
        fetch("https://api.lostg.com/music/xiami/songs/" + musicId)
            .then((response)=>response.json())
            .then((jsonResponse)=> {
                this.downloadFileTest(false, jsonResponse.location);
            })
            .catch((error)=> {
                if (error instanceof SyntaxError) {
                    console.error(error);
                }
            });
    }

    downloadFileTest(background, url) {
        if (jobId !== -1) {
            console.log('A download is already in progress');
            return;
        }

        var progress = data => {
            var percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
            var text = `Loading...${percentage}%`;
            this.setState({
                loadProcess: text
            })
            console.log(text);
        };

        var begin = ()=> {
            this.setState({
                playStatus: loading
            })
            console.log('Download has begun');
        };

        var progressDivider = 1;

        // Random file name needed to force refresh...
        const downloadDest = `${RNFS.DocumentDirectoryPath}/music.mp3`;

        const ret = RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest,
            begin,
            progress,
            background,
            progressDivider
        });

        jobId = ret.jobId;

        ret.promise.then(res => {
            this.initSound();
            this.setState({
                loadStatus: loaded
            });
            jobId = -1;
        }).catch((err) => {
            jobId = -1;
        });
    }

    playSound() {
        musicHandler.play((success) => {
            if (success) {
                this.setState({
                    playStatus: playing,
                });
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    }

    initSound() {
        musicHandler = new Sound("music.mp3", Sound.DOCUMENT, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else { // loaded successfully
                this.playSound();
            }
        });
    }

    pauseSound() {
        if (this.state.loadStatus == loaded) {
            this.setState({
                playSound: start
            });
            musicHandler.stop();
        }
    }
}
const styles = StyleSheet.create({
    music_author_content: {
        borderColor: "#a0a0a0",
        height: 65,
        flex: 1,
        borderWidth: 1,
        borderRadius: 3,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 15,
    },
    subtitle: {
        marginRight: 5,
        marginLeft: 5,
        fontSize: 10,
    }
})
var isEmpty = function (obj) {  //判断对象是否为空
    for (var name in obj) {
        return false;
    }
    return true;
};