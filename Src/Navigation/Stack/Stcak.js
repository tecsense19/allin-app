import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplaseScreen from '../../Screen/SplaseScreen/SplaseScreen';
import FirstScreen from '../../Screen/FirstScreen/FirstScreen';
import LoginScreen from '../../Screen/LoginScreen/LoginScreen';
import VerificationScreen from '../../Screen/VerificationScreen/VerificationScreen';
import CreateAccount from '../../Screen/CreateAccount/CreateAccount';
import HomeScreen from '../BottomTab/HomeScreen';
import ChatInnerScreen from '../../Screen/ChatInnerScreen/ChatInnerScreen';
import SettingScreen from '../../Screen/SettingScreen/SettingScreen';
import EditProfileScreen from '../../Screen/EditProfileScreen/EditProfileScreen';
import TaskChatScreen from '../../Screen/TaskChatScreen/TaskChatScreen';
import LanguageScreen from '../../Screen/LanguageScreen/LanguageScreen';
import CreateNote from '../../Screen/ProjectManagement.js/CreateNote/CreateNote';
import WorkHours from '../../Screen/ProjectManagement.js/WorkHours/WorkHours';
import ChatProfileScreen from '../../Screen/ChatProfileScreen/ChatProfileScreen';
import CallScreen from '../../Screen/CallScreen/CallScreen';
import ForwordScreen from '../../Screen/ForwordScreen/ForwordScreen';
import ScanDocScreen from '../../Screen/ScanDocScreen/ScanDocScreen';
import MyTopTabs from '../TopTab/TopTabScreen';
import CreateEvent from '../../Screen/CreateEvent/CreateEvent';
import Files from '../../Screen/Files/Files';
import Calculator from '../../Screen/calculater';
import DocumentStore from '../../Screen/DocumentStore/DocumentStore';
import TmeScreen from '../../Screen/TmeScreen/TmeScreen';
import CreateGroup from '../../Screen/CreatGroup/CreateGroupFirst';
import CreateGroupFirstScreen from '../../Screen/CreatGroup/CreateGroupFirst';
import CreateGroupSecondScreen from '../../Screen/CreatGroup/CreateGroupSecondScreen';


const Stack = createNativeStackNavigator();

const StackScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="creategroup"
                screenOptions={{ headerShown: false, animation: 'fade_from_bottom', }}>
                {/* <Stack.Screen name="cals" component={Calculator} /> */}
                <Stack.Screen name="splase" component={SplaseScreen} />
                <Stack.Screen name="first" component={FirstScreen} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="verification" component={VerificationScreen} />
                <Stack.Screen name="createaccount" component={CreateAccount} />
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="chatinner" component={ChatInnerScreen} />
                <Stack.Screen name="setting" component={SettingScreen} />
                <Stack.Screen name="edit" component={EditProfileScreen} />
                <Stack.Screen name="task" component={TaskChatScreen} />
                <Stack.Screen name="note" component={CreateNote} />
                <Stack.Screen name="work" component={WorkHours} />
                <Stack.Screen name="profile" component={ChatProfileScreen} />
                <Stack.Screen name="call" component={CallScreen} />
                <Stack.Screen name="forword" component={ForwordScreen} />
                <Stack.Screen name="scandoc" component={ScanDocScreen} />
                <Stack.Screen name="summarize" component={MyTopTabs} />
                <Stack.Screen name="event" component={CreateEvent} />
                <Stack.Screen name="files" component={Files} />
                <Stack.Screen name="docstore" component={DocumentStore} />
                <Stack.Screen name="tme" component={TmeScreen} />
                <Stack.Screen name="creategroup" component={CreateGroupFirstScreen} />
                <Stack.Screen name="creategroupsecond" component={CreateGroupSecondScreen} />
                {/* <Stack.Screen name="language" component={LanguageScreen} /> */}


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackScreen;
