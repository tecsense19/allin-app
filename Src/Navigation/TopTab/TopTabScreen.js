import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    BackHandler,
    ScrollViw,
    Alert,
} from 'react-native';
import MenuModal from '../../Custom/Modal/MainMenu'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import ChatHeader from '../../Screen/ChatUserLIst/ChatHeader';
import ReceivedTask from '../../Screen/ReceivedTask/ReceivedTask';
import GivenTasks from '../../Screen/GivenTasks/GivenTasks';
import AllTasks from '../../Screen/AllTasks/AllTasks';
import { User_Logout } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import messaging from '@react-native-firebase/messaging';
import Loader from '../../Custom/Loader/loader';
import { load } from 'react-native-track-player/lib/src/trackPlayer';

const Tab = createMaterialTopTabNavigator();

const MyTopTabs = props => {
    const [visible, setVisible] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);


    const closeModal = () => {
        setVisible(false);
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            closeModal,
        );
        return () => backHandler.remove();
    }, [visible, showSearch]);
    const createTwoButtonAlert = () =>
        Alert.alert(
            'LOGOUT',
            'You are about to logout,Are you sure you want to proceed ?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'No',
                },
                { text: 'YES', onPress: () => onLogOut(), style: 'destructive' },
            ],
        );

    const onLogOut = async () => {
        setLoading(true)
        setVisible(false);
        const D_token = await messaging().getToken();
        const Token = await getToken()
        const d_token = { device_token: D_token }
        const data = await User_Logout(d_token, Token)
        if (data?.status_code == 200) {
            onLogOut(),
                await AsyncStorage.clear();
            setLoading(false)
            props.navigation.navigate('splase');
        }
        else { Alert.alert(data?.message, 'weds'), setLoading(false) }
        // try {
        //     await AsyncStorage.clear();
        //     props.navigation.navigate('splase1');
        //     setVisible(false);
        // } catch (e) { }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={COLOR.black}
                barStyle={'dark-content'}
                hidden={false}
            />
            <View style={{ backgroundColor: COLOR.black }}>

                <MenuModal
                    onRequestClose={closeModal}
                    visible={visible}
                    setting={() => {
                        props.navigation.navigate('setting'), setVisible(false);
                    }}
                    QR={() => {
                        Alert.alert('Website QR'), setVisible(false);
                    }}
                    onClose={() => setVisible(false)}
                    title={'Received'}
                    onLogout={createTwoButtonAlert}
                    onPress={() => {
                        props.navigation.goBack(), setVisible(false);
                    }}
                />
                {showSearch ? (
                    <View style={styles.headerView}>
                        <TextInput
                            onSubmitEditing={() => setShowSearch(false)}
                            autoFocus
                            style={styles.TextInput}
                            placeholder="WHO TO SEND"
                            value={search}
                            onChangeText={(txt) => { setSearch(txt) }}
                            placeholderTextColor={COLOR.textcolor}
                        />
                        <TouchableOpacity onPress={() => setShowSearch(false)}>
                            <Image
                                source={require('../../Assets/Image/search.png')}
                                style={styles.inputinicon}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ChatHeader
                        tintColor={COLOR.white}
                        onMenu={() => setVisible(true)}
                        title={'Summerize'}
                        onSearch={() => setShowSearch(true)}
                        value={true}
                        onBack={() => { props.navigation.goBack() }}
                        hide={true}

                    />
                )}
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    indicatorStyle: { backgroundColor: COLOR.green, height: 4, width: 100, marginLeft: 15 },
                    inactiveTintColor: COLOR.black,
                }}
                screenOptions={{
                    tabBarLabelStyle: { color: COLOR.white },
                    // tabBarItemStyle: { width: 90,marginLeft:5},
                    tabBarStyle: { backgroundColor: COLOR.black },
                }}
                initialRouteName="received"
                style={{}}>
                <Tab.Screen
                    name="received"
                    component={ReceivedTask}
                    // component={() => ReceivedTask({search:search})}
                    // initialParams={{ searchText: search }}
                    key={1}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? COLOR.green : COLOR.white,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                Received
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="given"
                    component={GivenTasks}
                    // initialParams={{ searchText: search }}

                    key={2}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? COLOR.green : COLOR.white,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                Given
                            </Text>
                        ),
                    }}
                />
                {/* <Tab.Screen
                    name="mytasks"
                    component={MyTasks}
                    key={3}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? COLOR.green : COLOR.white,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                My Tasks
                            </Text>
                        ),
                    }}
                /> */}
                <Tab.Screen
                    name="alltasks"
                    component={AllTasks}
                    // initialParams={{ searchText: search }}
                    key={4}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? COLOR.green : COLOR.white,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                All Tasks
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
            {/* <View style={{paddingBottom:30,backgroundColor:COLOR.white}}>
                <ChatInputToolBar hidePlus={true} source={require('../../Assets/Image/send.png')} onChangeText={text => { setEmailSummary(text) }} onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)} value={EmailSummary} onsend={'SendEmail'}
                />
            </View> */}
            <Loader visible={loading} />
        </View>
    );
};
export default MyTopTabs;
const styles = StyleSheet.create({
    headerView: {
        margin: 7,
        backgroundColor: COLOR.white,
        height: 45,
        marginHorizontal: 15,
        borderRadius: 10,
        marginTop: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    TextInput: {
        height: 45,
        fontWeight: '500',
        flex: 1,
        fontSize: 15,
        color: COLOR.black,
    },
    inputinicon: {
        tintColor: COLOR.green,
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
});
