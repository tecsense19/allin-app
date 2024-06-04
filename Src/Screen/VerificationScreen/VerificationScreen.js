import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, Alert, } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './VerificationScreenStyle';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import VerificationCodeIcon from '../LoginScreen/VerificationCodeIcon';
import OtpInput from './OtpInput';
import Button from '../../Custom/Button/Button';
import { handleEditNumber } from './Functions';
import Loader from '../../Custom/Loader/loader';
import messaging from '@react-native-firebase/messaging';
import { Send_Otp, User_Registration, Verify_Otp } from '../../Service/actions';

const VerificationScreen = props => {
    const data = props?.route?.params
    const [otp, setOtp] = useState('');
    const [myData, setMyData] = useState('')
    const [deviceToken, setDeviceToken] = useState('')
    const [visible, setVisible] = useState(false)

    const otpInputRef = useRef(null);
    useEffect(() => { getFcmToken() }, [])

    const getFcmToken = async () => {
        try {
            const D_token = await messaging().getToken();
            setDeviceToken(D_token)
        } catch (error) { console.error('Error getting FCM token:', error) }
    }
    const registrationAccount = async () => {
        setVisible(true);
        const responseData = await User_Registration(data, otp, deviceToken)
        if (responseData?.data?.token) {
            await AsyncStorage.setItem('myData', JSON.stringify(responseData));
            setVisible(false);
            await props.navigation.reset({
                routes: [{ name: 'home' }],
            });
        } else { setVisible(false); Alert.alert(responseData.message); }

    };
    const loginAccount = async () => {
        const dataa = { country_code: data?.country_code, mobile: data?.mobile, otp: otp, device_token: deviceToken }
        console.log(dataa);
        setVisible(true)
        await Verify_Otp(dataa)
            .then(async res => {
                if (res.status_code == 200) {
                    await AsyncStorage.setItem('myData', JSON.stringify(res));
                    await props.navigation.reset({ routes: [{ name: 'home' }], });
                    setVisible(false)
                } else { setVisible(false), Alert.alert(res?.message) }
            })
            .catch(error => setVisible(false), console.error('Error:', error));
    }
    const handleSubmit = () => {
        if (data?.type == 'ragister') {
            registrationAccount()
        } else (
            loginAccount()
        )
    }
    const sendAgainOtp = async () => {
        setVisible(true)
        if (otpInputRef.current) { otpInputRef.current.clearOtp(); }
        const dataa = { country_code: data.country_code, mobile: data.mobile, device_token: deviceToken, type: 'Login' }
        await Send_Otp(dataa)
            .then((res) => {
                if (res?.status_code == 200) { console.log(res); setVisible(false) }
                else { setVisible(false), Alert.alert(res?.message,) }
            })
            .catch((e) => { console.log(e); })
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
                    <Text style={styles.numberTxt}>{data?.country_code + ' ' + data?.maskNumber}</Text>
                    <TouchableOpacity
                        onPress={() => handleEditNumber(data, props.navigation)}>
                        <Image source={require('../../Assets/Image/edit.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Button onPress={sendAgainOtp} borderWidth={1} title={'Send Again'} color={COLOR.black} borderColor={COLOR.bordercolor} marginTop={40} />
                <Button onPress={handleSubmit} title={'Submit'} color={COLOR.white} bgColor={COLOR.green} marginTop={15} />
            </ScrollView>
            <Loader visible={visible} />
        </View>
    );
};

export default VerificationScreen;
