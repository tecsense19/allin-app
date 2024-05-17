
import React, { useRef } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { View } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';


const OtpInput = ({ onChengeText }) => {
    let otpInput = useRef(null);

    return (
        <View>
            <OTPTextInput
                handleTextChange={onChengeText}
                ref={e => (otpInput = e)}
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
};

export default OtpInput;
