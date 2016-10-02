/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import OnePic from './OnePic';
import OneRead from './OneRead';
import OneFilm from './OneFilm';
class One extends React.Component {
    render() {
        return (
            <ScrollableTabView>
                <OnePic tabLabel="首页"/>
                <OneRead tabLabel="阅读"/>
                <OneFilm tabLabel="电影"/>
            </ScrollableTabView>
        )
    }
};
module.exports = One;