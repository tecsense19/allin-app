
import {
    View,
    StatusBar,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    BackHandler,
    Alert,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import { COLOR } from '../../Assets/AllFactors/AllFactors';
import MyAlert from '../../Custom/Alert/PermissionAlert';
import styles from './ChatUserListScreenStyle';
import MainMenu from '../../Custom/Modal/MainMenu';
import ChatHeader from './ChatHeader';
import { userData } from '../../StaticOBJ/OBJ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


const ChatUserListScreen = props => {
    const [visible, setVisible] = useState(false);
    const [openItemId, setOpenItemId] = useState(null);
    const [allUserData, setAllUserData] = useState([]);
    const [token, setToken] = useState('');
    const [deviceToken, setDeviceToken] = useState('');
    const swipeableRef = useRef(null);

    const closeModal = () => { setVisible(false); };
    useEffect(() => {
        getuser();
        getMyData()
        requestContactsPermission()
    }, [token])
    const handleSwipeableOpen = id => {
        if (
            openItemId !== null &&
            swipeableRef?.current &&
            swipeableRef?.current[id]
        ) {
            swipeableRef.current[openItemId].close();
        }
        setOpenItemId(id);
    };
    const ClearAlert = (id) => {
        Alert.alert(
            'Clear Chat', 'You are about to Erase,Are you sure you want to proceed ?',
            [
                { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'Cancel', },
                { text: 'Clear', onPress: () => { clearMessages(id) }, style: 'destructive' },
            ],)
    }
    const ContactPermissionAlert = () => {
        const title = 'Permission Request';
        const Descriptions =
            'This app would like to view your contacts';
        const Deny = () => console.log('Deny');
        const Allow = () => openSettings();
        MyAlert(title, Descriptions, Allow, Deny);
    };
    const requestContactsPermission = async () => {
        const result = await request(PERMISSIONS.IOS.CONTACTS);
        if (!result === 'granted') {
            Contacts.getAll().then(contacts => {
                ContactPermissionAlert();
            })
        }
    };
    const list = ({ item }) => {
        const getTime = () => {
            const time = new Date(item?.last_message_date);
            const now = new Date();
            const currDate = now.getDate();
            const notiDate = time.getDate();
            const currMon = now.getMonth() + 1;
            const notiMon = time.getMonth() + 1;

            const timeDiffInMilliseconds = now - time;
            const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));

            if (currMon === notiMon) {
                if (currDate === notiDate) {
                    if (timeDiffInMinutes < 1) {
                        return "just now";
                    } else if (timeDiffInMinutes < 60) {
                        return `${timeDiffInMinutes} mins`;
                    } else {
                        const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
                        return `${timeDiffInHours} hrs`;
                    }
                } else if (currDate - 1 === notiDate) {
                    return "Yesterday";
                } else {
                    return `${currDate - notiDate} days`;
                }
            } else {
                return `${time.toDateString().split(" ")[2]} ${time.toDateString().split(" ")[1]}`;
            }
        };

        const userName = item?.first_name + ' ' + item.last_name
        const swipeRightSide = () => {
            return (
                <View style={styles.swipeView}>
                    <TouchableOpacity
                        style={styles.onbin}
                        onPress={() => Alert.alert('Delete User')}>
                        <Image
                            source={require('../../Assets/Image/bin.png')}
                            style={styles.swipeicon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { ClearAlert(item.id) }}
                        style={[styles.onbin, { backgroundColor: COLOR.slateblue }]}>
                        <Image
                            source={require('../../Assets/Image/eraser.png')}
                            style={styles.swipeicon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Alert.alert('Mute User')}
                        style={[styles.onbin, { backgroundColor: COLOR.green }]}>
                        <Image
                            source={require('../../Assets/Image/mute.png')}
                            style={styles.swipeicon}
                        />
                    </TouchableOpacity>
                </View>
            );
        };
        return (
            <GestureHandlerRootView>
                <Swipeable
                    renderLeftActions={() => null}
                    renderRightActions={swipeRightSide}
                    onSwipeableOpen={() => {
                        handleSwipeableOpen(item.id);
                    }}
                    ref={ref => {
                        if (ref && !swipeableRef.current) {
                            swipeableRef.current = {};
                        }
                        swipeableRef.current[item.id] = ref;
                    }}>
                    <View style={{ backgroundColor: COLOR.white, paddingHorizontal: 20, marginTop: 5 }}>
                        <TouchableOpacity
                            style={styles.listcontainer}
                            onPress={() => props.navigation.navigate('chatinner', { token, item })}
                        >
                            <View style={styles.imgAndNameView}>
                                <Image source={{ uri: item?.profile }} style={styles.chetImg} />
                                <View style={{}}>
                                    <Text style={styles.name}>
                                        {userName?.length >= 16
                                            ? userName?.slice(0, 16) + ' . . . ' || ''
                                            : userName}
                                    </Text>
                                    <Text style={styles.bio}>
                                        {item?.last_message?.length >= 30 ? item?.last_message?.slice(0, 30) : item?.last_message}
                                    </Text>
                                </View>
                            </View>
                            <View style={{}}>
                                {item?.last_message_date == null ? '' : <Text style={{ marginTop: 5, fontWeight: '500' }}>{getTime()}</Text>}

                                {item?.unread_message_count !== 0 ? <View style={styles?.msgView}>
                                    <Text style={styles?.msgCount}>{item?.unread_message_count}</Text>
                                </View> : ''}
                            </View>
                        </TouchableOpacity>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };
    const LogoutTwoButtonAlert = () =>
        Alert.alert(
            'LOGOUT', 'You are about to logout,Are you sure you want to proceed ?',
            [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'No', },
            { text: 'YES', onPress: () => onLogOut(), style: 'destructive' },
            ],
        );
    const onLogOut = async () => {
        try {
            await AsyncStorage.clear();
            props.navigation.navigate('splase');
            setVisible(false);
        } catch (e) { }
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [visible]);

    const getMyData = async () => {
        const jsonValue = await AsyncStorage.getItem('myData');
        const userData = JSON.parse(jsonValue);
        // console.log('===========>', userData.data.token);
        setToken(userData?.data?.token)
        // Alert.alert(userData)

    };
    const getuser = async () => {
        await fetch('https://allin.website4you.co.in/api/v1/user-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response?.json())
            .then(data => {
                if (data) {
                    // console.log(data.data.userList);
                    setAllUserData(data?.data?.userList)
                } else {
                    Alert.alert('not user')
                }
            })
            .catch(error =>
                console.error('Error:', error));
    }
    useEffect(() => {
        getFcmToken()
    }, [])
    const getFcmToken = async () => {
        try {
            const D_token = await messaging().getToken();
            setDeviceToken(D_token)
        } catch (error) {
            console.error('Error getting FCM token:', error)
        }
    }
    const logout = async () => {
        try {
            const url = 'https://allin.website4you.co.in/api/v1/logout'; // Ensure the full URL is specified
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ device_token: deviceToken }) // Stringify the body
            });

            const data = await response.json();
            if (data?.message == 'Logout Successfully.') {
                LogoutTwoButtonAlert()
            }
        } catch (error) {
            console.error('Error during logout', error);
        }

    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.headerView}>
                <MainMenu
                    QR={() => { Alert.alert('Website QR'), setVisible(false) }}
                    onRequestClose={closeModal}
                    title={'Summarize'}
                    visible={visible}
                    onLogout={() => logout()}
                    onClose={() => setVisible(false)}
                    setting={() => { props.navigation.navigate('setting'); setVisible(false); }}
                    onPress={() => { Alert.alert('summarize'), setVisible(false) }}
                // props.navigation.navigate('summarize'), setVisible(false);
                />
                <ChatHeader
                    onCall={() => Alert.alert('call')}
                    tintColor={COLOR.white}
                    onMenu={() => setVisible(true)}
                    onInvite={() => Alert.alert('Group')}
                    onSearch={() => Alert.alert('search')} />
            </View>
            <View style={styles.detailsview}>
                <FlatList data={allUserData} renderItem={list} bounces={false} style={{ marginBottom: 85, borderTopRightRadius: 20, borderTopLeftRadius: 20, }} />
            </View>
        </View>
    );
};

export default ChatUserListScreen;









