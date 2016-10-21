import * as React from "react";
import Drawer from "./Pages/NavigationDrawer"
import ZhiHuPage from "./Pages/ZhihuPage"
import StoryDetailPage from "./Pages/StoryDetailPage"
import Douban from "./Pages/Douban"
import One from "./Pages/One/One"
import ReadingDetail from "./Pages/One/ReadingDetail"
import {Platform} from 'react-native'
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
                            <Scene key="ZhiHuPage" component={ZhiHuPage} title="知乎日报"/>
                            <Scene key="Douban" component={Douban} title="豆瓣电影"/>
                            <Scene key="About" component={StoryDetailPage} duration={0}/>
                            <Scene key="One" component={One} title="[one]一个" initial/>
                        </Scene>
                    </Scene>
                    <Scene key="StoryDetail" title="知乎日报" component={StoryDetailPage} duration={0}/>
                    <Scene key="FilmDetail" title="豆瓣电影" component={StoryDetailPage} duration={0}/>
                    <Scene key="WebView" component={StoryDetailPage} duration={0}/>
                    <Scene key="ReadingDetail" title="短篇" component={ReadingDetail} duration={0}/>
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
        style.marginTop = computedProps.hideNavBar ? 0 : (Platform.OS === 'ios' ? 64 : 54);
    }
    return style;
};
export default Main;