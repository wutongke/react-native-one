import * as React from "react";
import Drawer from "./Component/NavigationDrawer"
import TabIcon from "./Component/TabIcon"
import ZhiHuPage from "./Component/ZhihuPage"
import StoryDetailPage from "./Component/StoryDetailPage"
import {
    Router,
    Scene,
} from 'react-native-router-flux'
import
{
    StyleSheet,
    Text
}from 'react-native'
/**
 * Created by erfli on 9/16/16.
 */
class Main extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="tabbar" component={Drawer}>
                    <Scene
                        key="main"
                        tabs
                        tabBarStyle={styles.tabBarStyle}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                        <Scene key="ZhiHuPage" component={ZhiHuPage} title="知乎日报" initial icon={TabIcon}/>
                        <Scene key='StoryDetail' component={StoryDetailPage} hideNavBar={false}
                               navigationBarStyle={styles.playerTab}/>
                    </Scene>
                </Scene>
            </Router>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});
export default Main;