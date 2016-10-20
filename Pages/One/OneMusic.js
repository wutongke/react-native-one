/**
 * Created by erfli on 10/18/16.
 */
import * as React from 'react'
import {Image, View, Text, InteractionManager, StyleSheet} from 'react-native'
import ViewPager from 'react-native-viewpager';
import OneMusicCell from './OneCell/OneMusicCell'
export default class OneMusic extends React.Component {
    constructor(props) {
        super(props);
        var musicDataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });

        this.state = {
            musicList: musicDataSource.cloneWithPages([]),
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // ...long-running synchronous task...
            this.fetchMusicList();
        });
    }

    fetchMusicList() {
        fetch("http://v3.wufazhuce.com:8000/api/music/idlist/0")
            .then((response)=>response.json())
            .then((jsonResponse)=> {
                var musics = jsonResponse["data"];
                this.setState({
                    musicList: this.state.musicList.cloneWithPages(musics)
                })
            }).catch((error)=> {
            if (error instanceof SyntaxError) {
                console.error(error);
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <ViewPager style={styles.row}
                           dataSource={this.state.musicList}
                           renderPage={(data, pageId)=>(
                               <View style={{flex: 1}}>
                                   <OneMusicCell id={data}/>
                               </View>
                           )}
                           isLoop={false}
                           autoPlay={false}
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