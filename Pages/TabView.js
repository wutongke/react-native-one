import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import Store from "../Utilities/TimeUtil"
import DatePicker from 'react-native-datepicker';

const contextTypes = {
    drawer: React.PropTypes.object,
};

const propTypes = {
    name: PropTypes.string,
    sceneStyle: View.propTypes.style,
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 2,
        borderColor: 'gray',
    },
});

const TabView = (props, context) => {
    const drawer = context.drawer;
    return (
        <View style={[styles.container, props.sceneStyle]}>
            <Button style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        drawer.close();
                        Actions.ZhiHuPage();
                    }}>知乎日报</Button>
            <Button style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}
                    onPress={() => {
                        drawer.close();
                        Actions.Douban();
                    }}>豆瓣电影</Button>
            <Button style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}
                    onPress={() => {
                        drawer.close();
                        Actions.One();
                    }}>One一个</Button>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                <DatePicker
                    date={Store.date}
                    mode='date'
                    format='YYYYMMDD'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    iconSource={require('../Assets/Images/calendar.png')}
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                            opacity: 0
                        },
                        dateTouchBody: {
                            flexDirection: 'column'
                        },
                        dateIcon: {
                            width: 50,
                            height: 50
                        }
                    }}
                    onDateChange={(date) => {
                        handleDateChange(date)
                    }}
                />
            </View>
            <Button style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}
                    onPress={() => {
                        drawer.close();
                        Actions.About({targetUrl: "https://github.com/wutongke"});
                    }}>About</Button>
        </View>
    );
};
const handleDateChange = (date)=> {
    Store.date = date
}
TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
