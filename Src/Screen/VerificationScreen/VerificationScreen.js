import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
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
    const onhandleSubmit = async () => {
        if (data.otp == otp) { storeUserData(), props.navigation.reset({ routes: [{ name: 'bottomtab' }], }) }
        else { Alert.alert('Invalid OTP'); }
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
                    <Text style={styles.numberTxt}>{'+' + data?.C_Code + ' ' + data?.phoneNo}</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('login')}>
                        <Image source={require('../../Assets/Image/edit.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Button onPress={() => Alert.alert('send Again')} borderWidth={1} title={'Send Again'} color={COLOR.black} borderColor={COLOR.bordercolor} marginTop={40} />
                <Button onPress={onhandleSubmit} title={'Submit'} color={COLOR.white} bgColor={COLOR.green} marginTop={15} />
            </ScrollView>

        </View>
    );
};

export default VerificationScreen;
