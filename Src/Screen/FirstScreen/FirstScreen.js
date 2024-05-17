import { View, Text, StatusBar, Image, ScrollView, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';
import styles from './FirstScreenStyle';
import Button from '../../Custom/Button/Button';
import CheckBox from '../../Custom/CheckBox/CheckBox';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const FirstScreen = props => {
    const [ischeck, setIsCheck] = useState(false);

    const HEIGHT = Dimensions.get('screen').height
    const onhandleLogIn = () => {
        if (ischeck == false) {
            Alert.alert('Please read and agree to the Terms and Conditions and Privacy Policy',);
        } else {
            props.navigation.navigate('login');
        }
    };
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle={'dark-content'} backgroundColor={COLOR.white} hidden={false} />

            <Image source={require('../../Assets/Image/allin_logo.png')} style={styles.logoImg} />
            <Text style={styles.intext}> all<Text style={{ color: COLOR.green }}>in</Text></Text>

            <ScrollView bounces={false}>
                <Button onPress={() => props.navigation.navigate('createaccount')} bgColor={COLOR.green} color={COLOR.white} marginTop={100} title={'Creacte an account'} />
                <Button onPress={onhandleLogIn} color={COLOR.black} marginTop={10} title={'Log in'} borderWidth={1} borderColor={COLOR.bordercolor} />
                <View style={styles.footerView}>
                    <CheckBox right={10} top={5} left={-2} ischeck={ischeck} onPress={() => setIsCheck(!ischeck)} boxtintcolor={COLOR.textcolor} checktintcolor={COLOR.black} />
                    <View>
                        <Text style={styles.byCreateing}>By Creating an account, you agree to our </Text>
                        <Text style={styles.termsandcondition}>
                            <Text onPress={() => props.navigation.navigate('termsconditions')} style={styles.underlineText}>Terms & Conditions </Text>
                            {'' + 'and agree to' + ' '}
                            <Text onPress={() => props.navigation.navigate('privacypolicy')} style={styles.underlineText}>
                                Privacy Policy.
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
};

export default FirstScreen;
