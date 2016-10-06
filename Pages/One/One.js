/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import OnePic from './OnePic';
import OneRead from './OneRead';
import OneFilm from './OneFilm';
export default class One extends React.Component {
    render() {
        return (
            <ScrollableTabView initialPage={1} locked={true}>
                <OneRead tabLabel="阅读"/>
                <OnePic tabLabel="首页"/>
                <OneFilm tabLabel="电影"/>
            </ScrollableTabView>
        )
    }
};