import * as React from "react";
import Drawer from "./Pages/NavigationDrawer"
import ZhiHuPage from "./Pages/ZhihuPage"
import StoryDetailPage from "./Pages/StoryDetailPage"
import {
    Router,
    Scene,
    ActionConst
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
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene key="tabbar" component={Drawer}>
                        <Scene
                            key="main"
                            tabs
                            tabBarStyle={styles.tabBarStyle}
                            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="ZhiHuPage" component={ZhiHuPage} title="知乎日报" initial/>
                            <Scene key="About" component={StoryDetailPage} duration={0}/>
                        </Scene>
                    </Scene>
                    <Scene key="StoryDetail" component={StoryDetailPage} duration={0}/>
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

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};
export default Main;