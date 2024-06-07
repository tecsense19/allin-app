
import {
    View,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Image,
    LogBox,
    ScrollView,
    Text,
    FlatList,
    Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import styles from './SettingScreenStyle';
import { SettingData } from '../../StaticOBJ/OBJ';
import messaging from '@react-native-firebase/messaging';
import { User_Logout } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';
LogBox.ignoreAllLogs();

const SettingScreen = props => {
    const [Language, setLanguage] = useState('English(Us)');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState('');
    const [deviceToken, setDeviceToken] = useState('');
    const mydata = data?.userDetails
    const userName = mydata?.first_name + ' ' + mydata?.last_name
    const myNumber = mydata?.country_code + ' ' + mydata?.mobile
    const token = data?.token

    useEffect(() => { getData(); }, [data])

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('myData');
        // const language = await AsyncStorage.getItem('language');
        const userData = JSON.parse(jsonValue);
        setData(userData?.data)
        // setLanguage(JSON.parse(language))
    };
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
        setLoading(true)
        const d_token = { device_token: deviceToken }
        const data = await User_Logout(d_token, token)
        if (data?.status_code == 200) { onLogOut(), setLoading(false) }
        else { Alert.alert(data?.message), setLoading(false) }
    }
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
                { text: 'YES', onPress: () => logout(), style: 'destructive' },
            ],
        );
    const onLogOut = async () => {
        try {
            await AsyncStorage.clear();
            props?.navigation?.navigate('splase');
        } catch (e) { }
    };
    const list = ({ item }) => {

        const onNavigate = () => {
            if (item?.id == 6) {
                createTwoButtonAlert()
            } else {
                props?.navigation?.navigate(item?.navigation);
            }
        };
        return (
            <TouchableOpacity
                onPress={onNavigate}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 15, paddingHorizontal: 30
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item?.icon}
                        style={{
                            height: 20,
                            width: 20,
                            marginRight: 10,
                            tintColor: COLOR.titlecolor,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLOR.titlecolor,
                        }}>
                        {item?.name}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: COLOR.textcolor,
                            marginRight: 5,
                        }}>
                        {item?.id == 4 ? Language : ''}
                    </Text>
                    <Text
                        style={{
                            color: COLOR.black,
                            fontSize: 18,
                            fontWeight: '500',
                        }}>
                        {item.id == 6 ? '' : '>'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLOR.white }} bounces={false}>
            <View style={{ flex: 1, backgroundColor: COLOR.white, }}>
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={COLOR.black}
                        hidden={false}
                    />
                    <View style={styles.headerView}>
                        <ImageBackground
                            source={{ uri: mydata?.cover_image }}
                            style={styles.headerView}>
                            <View style={{ paddingHorizontal: 30 }}>
                                <NavigateHeader
                                    tintColor={COLOR.white}
                                    color={COLOR.white}
                                    // title={mydata?.cover_image ? '' : 'Setting'}
                                    onPress={() => props.navigation.goBack()}
                                />
                            </View>
                        </ImageBackground>

                    </View>
                    <View style={styles.detailsView}>
                        <ImageBackground
                            source={{ uri: mydata?.profile, }}
                            borderRadius={80}
                            style={styles.profileImage}>
                        </ImageBackground>
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLOR.titlecolor,
                            fontSize: 18,
                            fontWeight: '800', paddingHorizontal: 30
                        }}>
                        {userName}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLOR.textcolor,
                            fontSize: 14,
                            fontWeight: '600',
                            letterSpacing: 1,
                            marginTop: 10,
                        }}>
                        {myNumber}
                    </Text>

                    <View
                        style={{
                            borderBottomWidth: 1,
                            marginHorizontal: 30,
                            marginTop: 30,
                            borderColor: COLOR.placeholder,
                        }}></View>
                    <FlatList
                        style={{ marginBottom: 20, marginTop: 20 }}
                        data={SettingData}
                        renderItem={list}
                        bounces={false}
                    />
                </View>
            </View>
            <Loader visible={loading} />
        </ScrollView>
    );
};

export default SettingScreen;

