import { View, StatusBar, Image, StyleSheet, } from 'react-native';
import React, { useEffect, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationsPermission } from '../../Service/Functions';

const SplaseScreen = props => {
    useEffect(() => {
        setTimeout(() => {
            getMyData()
            notificationsPermission()
        }, 3000);
    }, []);

    const getMyData = async () => {
        const jsonValue = await AsyncStorage.getItem('myData');
        const userData = JSON.parse(jsonValue);
        // console.log(userData);
        if (jsonValue == null) {
            props.navigation.reset({
                routes: [{ name: 'first' }],
            });
        } else {
            props.navigation.reset({
                routes: [{ name: 'home' }],
            });
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
