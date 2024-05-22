import { useRef } from "react";

export const handleEditNumber = (data, navigation) => {
    if (data?.type == 'login') {
        navigation.navigate('login')
    } else {
        navigation.navigate('createaccount')
    }
}


const handleClearOtp = () => {
    if (otpInputRef.current) {
        otpInputRef.current.clearOtp();
    }
};