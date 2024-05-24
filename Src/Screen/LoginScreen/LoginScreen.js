import { View, Alert, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

// import LoginTextInput from '../../Custom/TextInput/LoginTextInput';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../../Custom/Button/Button';
import styles from './LoginScreenStyle';
import VerificationCodeIcon from './VerificationCodeIcon';
import Loader from '../../Custom/Loader/loader';
import LoginTextInput from '../../Custom/TextInput/LoginTextInput';
import IntlPhoneInput from 'react-native-intl-phone-input'

const LoginScreen = props => {
    const [phoneNo, setphoneNo] = useState('');
    const [C_Code, setC_Code] = useState(91);
    const [visible, setVisible] = useState(false);
    const [maskNumber, setMaskNumber] = useState(false);


    const validatePhoneNumber = () => {

        setVisible(true)
        CheckMobailNumberExists()



    };

    const sendOtp = async () => {
        await fetch('https://allin.website4you.co.in/api/v1/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country_code: C_Code, mobile: phoneNo, })
        })
            .then(response => response?.json())
            .then(data => {
                if (data?.message == 'OTP Sent successfully') {
                    setVisible(false)
                    props.navigation.navigate('verification', { mobile: phoneNo, country_code: C_Code, device_token: 'lkjiawdf32rfrvr35yghtbthrnruygutlr', type: 'login', maskNumber: maskNumber });
                } else {
                    setVisible(false)
                    Alert.alert(data?.message)
                }
            })
            .catch(error =>
                setVisible(false), console.error('Error:', error));
    }
    const CheckMobailNumberExists = async () => {
        await fetch('https://allin.website4you.co.in/api/v1/check-mobile-exists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country_code: C_Code, mobile: phoneNo, })
        })
            .then(response => response.json())
            .then(async (data) => {
                if (data?.message == 'User Not Found!') {
                    setVisible(false)
                    Alert.alert('User not found please create account')
                } else {
                    await sendOtp()
                }
            })
            .catch(error =>
                setVisible(false),
                console.error('Error:', error));
    }
    const onChangeText = ({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) => {
        // console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
        setC_Code(dialCode)
        setphoneNo(unmaskedPhoneNumber)

        setMaskNumber(phoneNumber)
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.detailsView}>

                <ScrollView bounces={false} style={{
                    flex: 1, padding: 20,
                    paddingHorizontal: 30
                }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.onBack}>
                        <Image source={require('../../Assets/Image/back.png')} style={styles.backimg} />
                    </TouchableOpacity>
                    <View style={{ marginTop: '30%' }}>
                        <VerificationCodeIcon />
                        <Text style={{
                            color: COLOR.gray,
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: '500', marginTop: 40,
                        }}>Enter your mobile number</Text>
                        <View style={{ marginTop: 25, width: '80%', alignSelf: 'center' }}>
                            <IntlPhoneInput onChangeText={onChangeText} defaultCountry="IN" phoneInputStyle={{
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                                containerStyle={{ borderWidth: 0, borderBottomWidth: 2, borderRadius: 0, borderColor: COLOR.black }}
                                dialCodeTextStyle={{ fontSize: 18, fontWeight: 'bold', }} />
                        </View>
                        {/* <LoginTextInput marginTop={50} value={phoneNo} onChangeText={text => setphoneNo(text)} label={'Enter your mobile number'} placeholderTextColor={COLOR.placeholder} placeholder={'000-000-0000'} selectedValue={(a) => setC_Code(a)} /> */}
                        <Button bgColor={COLOR.green} title={'Submit'} color={COLOR.white} marginTop={40} marginBottom={100} onPress={validatePhoneNumber} />
                    </View>
                </ScrollView>
            </View>
            <Loader visible={visible} />

        </KeyboardAvoidingView>
    );
};
export default LoginScreen;
