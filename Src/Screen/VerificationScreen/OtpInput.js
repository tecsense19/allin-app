import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { View } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const OtpInput = forwardRef(({ onChengeText }, ref) => {
    const otpInput = useRef(null);

    useImperativeHandle(ref, () => ({
        clearOtp() {
            if (otpInput.current) {
                otpInput.current.clear();
            }
        }
    }));

    return (
        <View>
            <OTPTextInput
                handleTextChange={onChengeText}
                ref={otpInput}
                inputCount={6}
                keyboardType="numeric"
                tintColor={COLOR.bordercolor}
                autoFocus={true}
                textInputStyle={{
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    borderRadius: 8,
                    height: 45,
                    width: 45,
                    marginTop: 35,
                }}
                containerStyle={{ alignSelf: 'center' }}
                offTintColor={COLOR.bordercolor}
            />
        </View>
    );
});

export default OtpInput;
