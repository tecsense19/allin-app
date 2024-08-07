import { View, StatusBar, Image, StyleSheet, Alert, } from 'react-native';
import React, { useCallback, useEffect, useState, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationsPermission } from '../../Service/Functions';
import TimeZone from 'react-native-timezone'
import { Refresh_Token, User_List } from '../../Service/actions';
import { useFocusEffect } from '@react-nav2igation/native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { ExpireToken } from '../../Service/Redux/Actions';

const SplaseScreen = props => {
    const timezone = { timezone: TimeZone.getTimeZone() };
    const dispetch = useDispatch()

    useEffect(() => {
        // getNotificationData()

        setTimeout(() => {
            getMyData()
            notificationsPermission()
        }, 2000);
    }, []);


    const getMyData = async () => {

        const jsonValue = await AsyncStorage.getItem('myData');
        const userData = JSON.parse(jsonValue);
        // console.log(jsonValue);

        if (jsonValue == null) {
            return props.navigation.reset({ routes: [{ name: 'first' }] });
        } else {
            return getuser(userData.data.token)
        }
    };
    const getuser = async (token) => {

        await User_List(timezone, token).then(async (data) => {
            if (data.message == 'Token Expired' && data.status_code == 401) {
                return (
                    // dispetch(ExpireToken()),
                    await Refresh_Token(token).then((res) => {
                        console.log(res, '--------------------------------');
                    }),
                    props.navigation.reset({ routes: [{ name: 'first' }] })
                )
            }
            if (data?.status_code === 200) {
                return props.navigation.reset({ routes: [{ name: 'home' }] });
            } else {
                return props.navigation.reset({ routes: [{ name: 'first' }] });
            }
        }).catch((e) => { console.log(token, '=======>>>>', e, 'userListApihome screen'); })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLOR.black} hidden={false} />
            <Image
                source={require('../../Assets/Image/allin_logo.png')}
                style={styles.logoimg}
            />
        </View>
    );
};
export default SplaseScreen;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.white },
    logoimg: {
        height: '15%',
        width: '30%',
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'center',
        top: '35%',
    }
})
