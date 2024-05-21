import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './VerificationScreenStyle';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import VerificationCodeIcon from '../LoginScreen/VerificationCodeIcon';
import OtpInput from './OtpInput';
import Button from '../../Custom/Button/Button';

const VerificationScreen = props => {
    const data = props?.route?.params
    const [otp, setOtp] = useState('');
    console.log(JSON.stringify(data));
    // const storeUserData = async () => {
    //     try {
    //         const jsonValue = JSON.stringify(data);
    //         await AsyncStorage.setItem('userData', jsonValue);
    //         console.log('User data stored successfully!');
    //     } catch (error) {
    //         console.error('Error storing user data:', error);
    //     }
    // };
    const CreateAccount = async () => {
        const formData = new FormData();
        formData.append('mobile', data?.mobile);
        formData.append('country_code', data?.country_code);
        formData.append('first_name', data?.first_name);
        formData.append('last_name', data?.last_name);
        formData.append('otp', otp);
        formData.append('device_token', data?.device_token);
        formData.append('profile', data?.profile[0]);
        formData.append('cover_image', data?.cover_image[0]);


        console.log(formData);
        try {
            const response = await fetch('https://allin.website4you.co.in/api/v1/user-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // You may need to add authorization headers or other headers if required
                },
                body: formData,
            });

            const responseData = await response.json();
            console.log('Response:', responseData);
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error:', error.message);
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={COLOR.black} hidden={false} />
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.onback}>
                <Image source={require('../../Assets/Image/back.png')} style={styles.backimg} />
            </TouchableOpacity>
            <ScrollView style={{}} bounces={false}>
                <View style={{ marginTop: '20%' }}>
                    <VerificationCodeIcon />
                </View>
                <Text style={[styles.VerificationCodeTxt]}>Verification Code</Text>
                <Text style={styles.DownSmallTxt}>We have sent SMS verification code</Text>
                <OtpInput onChengeText={i => setOtp(i)} />
                <View style={styles.numberView}>
                    <Text style={styles.numberTxt}>{data?.country_code + ' ' + data?.mobile}</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('login')}>
                        <Image source={require('../../Assets/Image/edit.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Button onPress={() => Alert.alert('send Again')} borderWidth={1} title={'Send Again'} color={COLOR.black} borderColor={COLOR.bordercolor} marginTop={40} />
                <Button onPress={CreateAccount} title={'Submit'} color={COLOR.white} bgColor={COLOR.green} marginTop={15} />
            </ScrollView>

        </View>
    );
};

export default VerificationScreen;
