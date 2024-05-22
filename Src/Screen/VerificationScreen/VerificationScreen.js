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
import React, { useState, useEffect, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './VerificationScreenStyle';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import VerificationCodeIcon from '../LoginScreen/VerificationCodeIcon';
import OtpInput from './OtpInput';
import Button from '../../Custom/Button/Button';
import { handleEditNumber } from './Functions';
import Loader from '../../Custom/Loader/loader';

const VerificationScreen = props => {
    const data = props?.route?.params
    const [otp, setOtp] = useState('');
    const [myData, setMyData] = useState('')
    const [visible, setVisible] = useState(false)
    // console.log(myData);

    const otpInputRef = useRef(null);
    const number = data?.mobile?.replace(/\D/g, ''); // Remove non-digit characters
    const mobileInt = parseInt(number);
    const Otp = otp?.replace(/\D/g, ''); // Remove non-digit characters
    const otpinit = parseInt(Otp);

    const storeUserData = async () => {
        try {
            const jsonValue = JSON.stringify(myData);
            console.log('==========>', jsonValue);
            await AsyncStorage.setItem('myData', jsonValue);
            setVisible(false)
            await props.navigation.reset({
                routes: [{ name: 'home' }],
            });
        } catch (error) {
            setVisible(false),
                console.error('Error storing user data:', error);
        }
    };
    const handleClearOtp = () => {
        if (otpInputRef.current) {
            otpInputRef.current.clearOtp();
        }
    };
    const registrationAccount = async () => {

        setVisible(true)
        const formData = new FormData();
        formData.append('mobile', mobileInt);
        formData.append('country_code', data?.country_code);
        formData.append('first_name', data?.first_name);
        formData.append('last_name', data?.last_name);
        formData.append('otp', otpinit);
        formData.append('device_token', data?.device_token);

        const profileImageUri = data?.profile[0]?.uri;
        const profileimageName = profileImageUri ? profileImageUri.split('/').pop() : ''; // Extract image name from URI
        if (profileimageName) {
            formData.append('profile', {
                uri: profileImageUri,
                name: profileimageName,
                type: data.profile[0].type
            });
        }
        const coverImageUri = data?.profile[0]?.uri;
        const coverimageName = coverImageUri ? coverImageUri.split('/').pop() : ''; // Extract image name from URI
        if (coverimageName) {
            formData.append('cover_image', {
                uri: coverImageUri,
                name: coverimageName,
                type: data.cover_image[0].type
            });
        }

        try {
            const response = await fetch('https://allin.website4you.co.in/api/v1/user-registration', {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            const responseData = await response.json();
            if (response.ok) {
                setMyData(responseData)
                // console.log(responseData);
                storeUserData()
            } else {
                setVisible(false)
                // console.error('Server Error:', responseData);
                Alert.alert('Server Error:', responseData.message || 'Something went wrong');
            }
        } catch (error) {
            setVisible(false)
            console.error('Error:', error);
            Alert.alert('Error:', error.message);
        }
    };
    const loginAccount = async () => {
        setVisible(true)
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

                    setMyData(data)
                    storeUserData()
                } else {
                    setVisible(false)
                    Alert.alert(data?.message)
                }
            })
            .catch(error =>
                setVisible(false), console.error('Error:', error));

    }
    const handleSubmit = () => {
        if (data.type == 'ragister') {
            // console.log(data.type);
            registrationAccount()
        } else (
            loginAccount()
        )
    }
    const sendAgainOtp = async () => {
        handleClearOtp()
        await fetch('https://allin.website4you.co.in/api/v1/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country_code: data.country_code, mobile: data.mobile, device_token: data.device_token })
        })
            .then(response => response?.json())
            .then(data => {
                if (data?.message == 'OTP Sent successfully') {
                    // console.log(data?.message);
                    // setVisible(false)

                } else {
                    // setVisible(false)
                    Alert.alert('User Alrady Exist')
                }
            })
            .catch(error =>
                // setVisible(false),
                console.error('Error:', error));
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
                <OtpInput onChengeText={i => setOtp(i)} ref={otpInputRef} />
                <View style={styles.numberView}>
                    <Text style={styles.numberTxt}>{data?.country_code + ' ' + data?.mobile}</Text>
                    <TouchableOpacity
                        onPress={() => handleEditNumber(data, props.navigation)}>
                        <Image source={require('../../Assets/Image/edit.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Button onPress={sendAgainOtp} borderWidth={1} title={'Send Again'} color={COLOR.black} borderColor={COLOR.bordercolor} marginTop={40} />
                <Button onPress={handleSubmit} title={'Submit'} color={COLOR.white} bgColor={COLOR.green} marginTop={15} />
            </ScrollView>
            {/* <Loader visible={visible} /> */}
        </View>
    );
};

export default VerificationScreen;
