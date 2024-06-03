import { View, StatusBar, Image, StyleSheet, Alert, } from 'react-native';
import React, { useEffect, useState, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationsPermission } from '../../Service/Functions';
import TimeZone from 'react-native-timezone'

const SplaseScreen = props => {
    useEffect(() => {
        setTimeout(() => {
            getMyData()
            notificationsPermission()
        }, 3000);
    }, []);

    const getuser = async (token) => {
        await fetch('https://allin.website4you.co.in/api/v1/user-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ timezone: TimeZone.getTimeZone() })
        })
            .then(response => response?.json())
            .then(data => {
                if (data.status_code == 401) {
                    props.navigation.reset({
                        routes: [{ name: 'first' }],
                    });
                } else {
                    props.navigation.reset({
                        routes: [{ name: 'home' }],
                    });
                }
            })
            .catch(error =>
                console.error('Error:', error));
    }
    const getMyData = async () => {
        const jsonValue = await AsyncStorage.getItem('myData');
        const userData = JSON.parse(jsonValue);

        if (jsonValue == null) {
            props.navigation.reset({
                routes: [{ name: 'first' }],
            });
        } else {
            await getuser(userData?.data?.token)


        }
    };

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
