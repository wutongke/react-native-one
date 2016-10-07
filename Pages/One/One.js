/**
 * Created by erfli on 10/2/16.
 */
import * as React from "react";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import OneRead from './OneRead';
import OneFilm from './OneFilm';
import OneHome from './OneHome'
export default class One extends React.Component {
    render() {
        return (
            <ScrollableTabView initialPage={1} locked={true} prerenderingSiblingsNumber={1}>
                <OneRead tabLabel="阅读"/>
                <OneHome tabLabel="首页"/>
                <OneFilm tabLabel="电影"/>
            </ScrollableTabView>
        )
    }
};