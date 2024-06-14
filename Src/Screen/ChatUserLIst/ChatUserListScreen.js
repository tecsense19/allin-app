
import {
    View,
    StatusBar,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    BackHandler,
    Alert,
    TextInput,
    Linking,
} from 'react-native';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import { COLOR } from '../../Assets/AllFactors/AllFactors';
import MyAlert from '../../Custom/Alert/PermissionAlert';
import styles from './ChatUserListScreenStyle';
import MainMenu from '../../Custom/Modal/MainMenu';
import ChatHeader from './ChatHeader';
import { userData } from '../../StaticOBJ/OBJ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Timezone from 'react-native-timezone'
import { useFocusEffect } from '@react-navigation/native';
import { Clear_Chat, Delete_Chat_User, User_List, User_Logout } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';
import { getToken } from '../../Service/AsyncStorage';

const ChatUserListScreen = props => {
    const [visible, setVisible] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openItemId, setOpenItemId] = useState(null);
    const [allUserData, setAllUserData] = useState([]);
    const [token, setToken] = useState('');
    const [deviceToken, setDeviceToken] = useState('');
    const [search, setSearch] = useState('');
    const swipeableRef = useRef(null);
    const closeModal = () => { setVisible(false); };
    useEffect(() => { getFcmToken() }, [])
    const memoizedUsers = useMemo(() => allUserData, [allUserData]);

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
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'Cancel', },
                { text: 'Clear', onPress: () => { ClearChat(id), swipeableRef.current[openItemId].close(); setOpenItemId(null) }, style: 'destructive' },
            ],)
    }
    const DeleteAlert = (id) => {
        Alert.alert(
            'Delete User', 'You are about to delete user,Are you sure you want to proceed ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'Cancel', },
                { text: 'Delete', onPress: () => { DeleteUser(id) }, style: 'destructive' },
            ],)
    }

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
                        onPress={() => DeleteAlert(item.id)}>
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
                                    {item?.last_message ? <Text style={styles.bio}>
                                        {item?.last_message?.length >= 30 ? item?.last_message?.slice(0, 30) : item?.last_message}
                                    </Text> : ''}
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
            { text: 'YES', onPress: () => logout(), style: 'destructive' },
            ],
        );
    const onLogOut = async () => {
        try {
            await AsyncStorage.clear();
            props.navigation.navigate('splase');
            setVisible(false);
        } catch (e) { }
    };
    const getuser = async () => {
        const Token = await getToken();
        setToken(Token)
        const bodydata = { timezone: Timezone.getTimeZone(), search: search }

        await User_List(bodydata, Token).then((res) => {
            if (res.status_code == 200) {
                setAllUserData(res?.data?.userList)
                setLoading(false)
                // console.log(res?.data?.userList);
            }
        }).catch((e) => { console.log(e, 'userList screen'); })
    }
    useFocusEffect(useCallback(() => {
        getuser();
    }, []));
    const ClearChat = (id) => {
        setLoading(true)
        Clear_Chat(id, token)
            .then((res) => {
                if (res?.status_code == 200) { setLoading(false) }
                else { Alert.alert(res?.message) }

            }).catch(() => {
                setLoading(false)
            })
    }
    const DeleteUser = (id) => {
        setLoading(true)
        Delete_Chat_User(id, token)
            .then((res) => {
                if (res?.status_code == 200) { setLoading(false), getuser(), setOpenItemId(null) }
                else { Alert.alert(res?.message) }
            }).catch(() => {
                setLoading(false)
            })
    }
    const getFcmToken = async () => {
        try {
            const D_token = await messaging().getToken();
            setDeviceToken(D_token)
        } catch (error) {
            console.error('Error getting FCM token:', error)
        }
    }
    const logout = async () => {
        setLoading(true)
        const d_token = { device_token: deviceToken }
        const data = await User_Logout(d_token, token)
        if (data?.status_code == 200) { onLogOut(), setLoading(false) }
        else { Alert.alert(data?.message), setLoading(false) }


    }
    const requestLocationPermission = async () => {
        try {
            const granted = await request(
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
            if (granted === RESULTS.GRANTED) {
                console.log('Location permission granted', Geolocation.watchPosition((r) => {
                    console.log('====================================');
                    console.log(r);
                    console.log('====================================');
                }));
            } else {
                Linking.openSettings()
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerView}>
                <MainMenu
                    QR={() => { Alert.alert('Website QR'), setVisible(false) }}
                    onRequestClose={closeModal}
                    title={'Summarize'}
                    visible={visible}
                    onLogout={() => LogoutTwoButtonAlert()}
                    onClose={() => setVisible(false)}
                    setting={() => { props.navigation.navigate('setting'); setVisible(false); }}
                    onPress={() => { Alert.alert('summarize'), setVisible(false) }}
                // props.navigation.navigate('summarize'), setVisible(false);
                />
                {!showSearch ? <ChatHeader
                    onCall={() => props.navigation.navigate('call', allUserData)}
                    tintColor={COLOR.white}
                    onMenu={() => setVisible(true)}
                    onInvite={() => Alert.alert('Group')}
                    onSearch={() => setShowSearch(true)} /> :
                    <View style={{ backgroundColor: COLOR.white, marginTop: 65, height: 45, marginHorizontal: 25, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput onSubmitEditing={() => setShowSearch(false)} autoFocus value={search} onChangeText={(res) => { setSearch(res); getuser() }} placeholder='Search User...' style={{ backgroundColor: COLOR.white, height: 45, flex: 1, borderRadius: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }} />
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { setShowSearch(false), setSearch(''), getuser() }}>
                            <Image source={require('../../Assets/Image/search.png')} style={{ tintColor: COLOR.green, height: 30, width: 30, marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    </View>}
            </View>
            <View style={styles.detailsview}>
                <FlatList data={memoizedUsers} renderItem={list} bounces={false} style={{ marginBottom: 85, borderTopRightRadius: 20, borderTopLeftRadius: 20, }} />
            </View>
            <Loader visible={loading} />
        </View>
    );
};

export default ChatUserListScreen;









