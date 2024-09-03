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
import { Check_Mobile_Exists, Send_Otp } from '../../Service/actions';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = props => {
    const [phoneNo, setphoneNo] = useState('');
    const [C_Code, setC_Code] = useState(91);
    const [visible, setVisible] = useState(false);
    const [maskNumber, setMaskNumber] = useState('');
    const [devicetoken, setDevicetoken] = useState('');
    // console.log(devicetoken);
    useEffect(() => { getFcmToken }, [])

    const getFcmToken = async () => {
        try {
            const D_token = await messaging().getToken();
            console.log(D_token);
            // setDevicetoken(D_token)
        } catch (error) {
            console.error('Error getting FCM token:', error)
        }
    }
    const sendOtp = async () => {
        setVisible(true)
        const data = { country_code: C_Code, mobile: phoneNo, type: 'Login' }
        await Send_Otp(data)
            .then((res) => {
                if (res?.status_code == 200) {
                    setVisible(false), props.navigation.navigate('verification', { mobile: phoneNo, country_code: C_Code, device_token: devicetoken, type: 'login', maskNumber: maskNumber });
                } else { setVisible(false), Alert.alert(res?.message,) }
            })
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
                        <Button bgColor={COLOR.green} title={'Submit'} color={COLOR.white} marginTop={40} marginBottom={100} onPress={sendOtp} />
                    </View>
                </ScrollView>
            </View>
            <Loader visible={visible} Retry={sendOtp} />

        </KeyboardAvoidingView>
    );
};
export default LoginScreen;
