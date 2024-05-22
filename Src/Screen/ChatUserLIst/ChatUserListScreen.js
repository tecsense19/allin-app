
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


const ChatUserListScreen = props => {
    const [visible, setVisible] = useState(false);
    const [openItemId, setOpenItemId] = useState(null);
    const [UserData, setUserData] = useState([]);
    const [myID, setMyId] = useState('');
    const swipeableRef = useRef(null);

    const closeModal = () => { setVisible(false); };
    useEffect(() => { ; getuser(); getMYData(), requestContactsPermission() }, [myID])


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
                        // onPress={() => props.navigation.navigate('chat', { data: item })}
                        >
                            <View style={styles.imgAndNameView}>
                                <Image source={item?.img == '' ? require('../../Assets/Image/userimg.png') : { uri: item?.img }} style={styles.chetImg} />
                                <View>
                                    <Text style={styles.name}>
                                        {item?.name?.length >= 16 || item?.data?.Group_name?.length >= 16
                                            ? item?.name?.slice(0, 16) + ' . . . ' || ''
                                            : item?.name || item?.data?.Group_name}
                                    </Text>
                                    <Text style={styles.bio}>
                                        {item.name?.length >= 20 ? item?.name.slice(0, 30) : item?.name || item?.data?.Group_name}
                                    </Text>
                                </View>
                            </View>
                            <View>

                                <View style={styles?.msgView}>
                                    <Text style={styles?.msgCount}>0</Text>
                                </View>
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



    const getMYData = async () => {
        try {
            const value = await AsyncStorage.getItem('myData');
            if (value !== null) {
                // console.log(value, '=====>myData');
            }
        } catch (e) {
            // error reading value
            console.error(e);
        }

    }
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
                    console.log(data);
                } else {
                    Alert.alert('not user')
                }
            })
            .catch(error =>
                console.error('Error:', error));
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
                    onLogout={() => LogoutTwoButtonAlert()}
                    onClose={() => setVisible(false)}
                    setting={() => { Alert.alert('summarize'), setVisible(false); }}
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
                <FlatList data={userData} renderItem={list} bounces={false} style={{ marginBottom: 85, borderTopRightRadius: 20, borderTopLeftRadius: 20, }} />
            </View>
        </View>
    );
};

export default ChatUserListScreen;









