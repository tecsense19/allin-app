import { Alert } from "react-native";


export const sendOtpApi = async (countryCode, phone, navigation,) => {
    try {
        const response = await fetch('https://allin.website4you.co.in/api/v1/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country_code: '+' + countryCode, mobile: phone })
        });

        const data = await response.json();

        if (data?.message === 'OTP Sent successfully') {
            navigation.navigate('verification', {
                mobile: phone,
                country_code: '+' + countryCode,
                device_token: 'lkjiawdf32rfrvr35yghtbthrnruygutlr'
            });
        } else {
            Alert.alert('User Already Exist');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
