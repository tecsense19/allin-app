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
    const [myData, setMyData] = useState('')


    const number = data?.mobile.replace(/\D/g, ''); // Remove non-digit characters
    const mobileInt = parseInt(number);

    const Otp = otp.replace(/\D/g, ''); // Remove non-digit characters
    const otpinit = parseInt(Otp);
    const storeUserData = async () => {
        try {
            const jsonValue = JSON.stringify(myData);
            await AsyncStorage.setItem('myData', jsonValue);

            await props.navigation.reset({
                routes: [{ name: 'home' }],
            });
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    };
    const registrationAccount = async () => {
        const formData = new FormData();
        formData.append('mobile', mobileInt);
        formData.append('country_code', data?.country_code);
        formData.append('first_name', data?.first_name);
        formData.append('last_name', data?.last_name);
        formData.append('otp', otpinit);
        formData.append('device_token', data?.device_token);
        formData.append('profile', {
            uri: data.profile[0].uri,
            name: data.profile[0].fileName,
            type: data.profile[0].type
        });
        formData.append('cover_image', {
            uri: data.cover_image[0].uri,
            name: data.cover_image[0].fileName,
            type: data.cover_image[0].type
        });
        try {
            const response = await fetch('https://allin.website4you.co.in/api/v1/user-registration', {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            console.log(formData);
            const responseData = await response.json();
            console.log('Response:', responseData);
            if (response.ok) {
                setMyData(responseData?.data)
                // storeUserData()
            } else {
                console.error('Server Error:', responseData);
                Alert.alert('Server Error:', responseData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error:', error.message);
        }
    };
    const loginAccount = async () => {
        await fetch('https://allin.website4you.co.in/api/v1/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country_code: data?.country_code,
                mobile: data?.mobile,
                otp: Otp,
                device_token: 'test' + data?.mobile
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data?.message == 'OTP Verified Successfully!') {
                    // Alert.alert(data?.message)
                    setMyData(data?.data)
                    storeUserData()
                } else {
                    Alert.alert(data.message)
                }
            })
            .catch(error => console.error('Error:', error));

    }
    const handleSubmit = () => {
        if (data.type == 'ragister') {
            registrationAccount()
        } else (
            loginAccount()
        )
    }
    const SendAgainOTP = () => {

    }
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
                <Button onPress={() => SendAgainOTP()} borderWidth={1} title={'Send Again'} color={COLOR.black} borderColor={COLOR.bordercolor} marginTop={40} />
                <Button onPress={handleSubmit} title={'Submit'} color={COLOR.white} bgColor={COLOR.green} marginTop={15} />
            </ScrollView>

        </View>
    );
};

export default VerificationScreen;
