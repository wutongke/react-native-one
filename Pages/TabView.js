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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 2,
        borderColor: 'gray',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    }
});

const TabView = (props, context) => {
    const drawer = context.drawer;
    return (
        <View style={[styles.container, props.sceneStyle]}>
            <Button style={styles.button}
                    onPress={() => {
                        drawer.close();
                        Actions.ZhiHuPage();
                    }}>知乎日报</Button>
            <Button style={styles.button}
                    onPress={() => {
                        drawer.close();
                        Actions.Douban();
                    }}>豆瓣电影</Button>
            <Button style={styles.button}
                    onPress={() => {
                        drawer.close();
                        Actions.One();
                    }}>One一个</Button>
            <Button style={styles.button}
                    onPress={() => {
                        drawer.close();
                        Actions.About({targetUrl: "https://github.com/wutongke"});
                    }}>About</Button>
            <View style={{
                marginTop: 30,
                flexDirection: 'column',

            }}
            >
                <DatePicker
                    style={styles.button}
                    date={Store.date}
                    mode='date'
                    format='YYYYMMDD'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    iconSource={require('../Assets/Images/calendar.png')}
                    onDateChange={(date) => {
                        handleDateChange(date)
                    }}
                />
            </View>

        </View>
    );
};
const handleDateChange = (date)=> {
    Store.date = date
}
TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
