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


const Stack = createNativeStackNavigator();

const StackScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator

                // initialRouteName="group"
                screenOptions={{ headerShown: false, animation: 'fade_from_bottom', }}>
                <Stack.Screen name="splase" component={SplaseScreen} />
                <Stack.Screen name="first" component={FirstScreen} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="verification" component={VerificationScreen} />
                <Stack.Screen name="createaccount" component={CreateAccount} />
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="chatinner" component={ChatInnerScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackScreen;
