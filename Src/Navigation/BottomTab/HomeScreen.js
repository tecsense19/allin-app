import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View } from 'react-native';
import FeedScreen from '../../Screen/FeedScreen/FeedScreen';
import TmeScreen from '../../Screen/TmeScreen/TmeScreen';
import ProjectManagementScreen from '../../Screen/ProjectManagement.js/ProjectManagementScreen';
import ChatUserListScreen from '../../Screen/ChatUserLIst/ChatUserListScreen';
import BoardScreen from '../../Screen/BoardScreen/BoardScreen';
import MyTabBar from './MyTabBar';


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={"projectmanagement"}
                tabBar={props => <MyTabBar {...props} />}
                screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
                {/* <Tab.Screen name="feed" component={FeedScreen} /> */}
                {/* <Tab.Screen name="tme" component={TmeScreen} /> */}
                <Tab.Screen name="projectmanagement" component={ProjectManagementScreen} />
                <Tab.Screen name="chats" component={ChatUserListScreen} />
                <Tab.Screen name="board" component={BoardScreen} />
            </Tab.Navigator>
        </View>
    );
};

export default HomeScreen;
