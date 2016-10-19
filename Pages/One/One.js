/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import ScrollableTabView, {ScrollableTabBar}from 'react-native-scrollable-tab-view';
import OneRead from './OneRead';
import OneFilm from './OneFilm';
import OneHome from './OneHome'
import OneMusic from './OneMusic'
import FacebookTabBar from '../../Components/TabBar'
export default class One extends React.Component {
    tabIcons = [require("../../Assets/Images/essay.png"), require("../../Assets/Images/home.png"), require("../../Assets/Images/film.png"), require("../../Assets/Images/music.png")];

    render() {
        return (
            <ScrollableTabView initialPage={1} locked={true} prerenderingSiblingsNumber={1} tabBarPosition="bottom"
                               renderTabBar={()=><FacebookTabBar tabIcons={this.tabIcons}/>}>
                <OneRead tabLabel="阅读"/>
                <OneHome tabLabel="首页"/>
                <OneFilm tabLabel="电影"/>
                <OneMusic tabLabel="音乐"/>
            </ScrollableTabView>
        )
    }

};