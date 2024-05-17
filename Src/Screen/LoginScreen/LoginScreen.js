import { View, Alert, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

import LoginTextInput from '../../Custom/TextInput/LoginTextInput';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../../Custom/Button/Button';
import styles from './LoginScreenStyle';
import VerificationCodeIcon from './VerificationCodeIcon';

const LoginScreen = props => {
    const [phoneNo, setphoneNo] = useState('');
    const [C_Code, setC_Code] = useState(91);


    const validatePhoneNumber = () => {
        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(phoneNo)) {
            Alert.alert('valid only 10-digit phone number not include spaces or special characters',);
        }
        else {
            props.navigation.navigate('verification', { phoneNo, C_Code });
        }
    };

    return (
        <View style={styles.detailsView}>
            <ScrollView bounces={false} style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.onBack}>
                    <Image source={require('../../Assets/Image/back.png')} style={styles.backimg} />
                </TouchableOpacity>
                <View style={{ marginTop: '30%' }}>
                    <VerificationCodeIcon />
                    <LoginTextInput marginTop={50} value={phoneNo} onChangeText={text => setphoneNo(text)} label={'Enter your mobile number'} placeholderTextColor={COLOR.placeholder} placeholder={'000-000-0000'} />
                    <Button bgColor={COLOR.green} title={'Submit'} color={COLOR.white} marginTop={40} marginBottom={100} onPress={validatePhoneNumber} />
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;
