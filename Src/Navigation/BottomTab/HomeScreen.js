import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './customBotton';

import Board from '../../screens/Board/Board';
import Tme from '../../screens/BottomTme/Tme';
import Chats from '../../screens/BottomChats/Chats';
import Feed from '../../screens/BottomFeed/Feed';
import { StatusBar, View } from 'react-native';
import Note from '../../screens/Note/Landing';
import FeedScreen from '../../Screen/FeedScreen/FeedScreen';
import TmeScreen from '../../Screen/TmeScreen/TmeScreen';
import ProjectManagementScreen from '../../Screen/ProjectManagement.js/ProjectManagementScreen';
import ChatUserListScreen from '../../Screen/ChatUserLIst/ChatUserListScreen';
import BoardScreen from '../../Screen/BoardScreen/BoardScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Tab.Navigator
                initialRouteName="notes"
                tabBar={props => <MyTabBar {...props} />}
                screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
                <Tab.Screen name="feed" component={FeedScreen} />
                <Tab.Screen name="tme" component={TmeScreen} />
                <Tab.Screen name="projectmanagement" component={ProjectManagementScreen} />
                <Tab.Screen name="chats" component={ChatUserListScreen} />
                <Tab.Screen name="board" component={BoardScreen} />
            </Tab.Navigator>
        </View>
    );
};

export default BottomTab;
