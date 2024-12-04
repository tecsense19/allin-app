import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import QRCode from 'react-native-qrcode-svg';
import { MyData, MyID } from '../../Service/AsyncStorage';

const ScanQR = (props) => {
    const [loginUserId, setLoginUserId] = useState('');
    const [qrData, setQrData] = useState('');

    const getAccountId = async () => {
        const LoginUserId = await MyID();
        const myData = await MyData();

        if (typeof (LoginUserId) == 'number') {
            setLoginUserId(LoginUserId.toString());
            setQrData(myData.userDetails)
        } else {
            setLoginUserId('');
        }
    };

    useEffect(() => {
        getAccountId();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.black }}>
            <View style={{ paddingHorizontal: 30 }}>
                <NavigateHeader onPress={() => { props.navigation.goBack() }} title={'Scan QR'} color={COLOR.white} />
            </View>

            <View style={{ flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 30, marginTop: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                <View style={{ height: 300, width: '100%', borderRadius: 10, backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowOffset: { height: 1, width: 1 }, marginTop: '25%', shadowRadius: 7 }}>
                    <Image
                        style={{ height: 63, width: 63, resizeMode: 'contain', borderRadius: 40, alignSelf: 'center', marginTop: -30 }}
                        source={{ uri: qrData?.profile }} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>{qrData?.first_name + ' ' + qrData?.last_name}</Text>
                    <View style={{ alignSelf: 'center', marginTop: 30 }}>
                        {loginUserId ? (
                            <QRCode
                                size={160}
                                value={loginUserId + 'ThisIsAllinTaskManagemantApp'}
                                logo={require('../../Assets/Image/allin_logo.png')}
                                logoSize={40}
                            />
                        ) : (
                            <Text style={{ color: COLOR.orange, textAlign: 'center', marginTop: '20%', }}>No Account ID found</Text>
                        )}
                    </View>
                </View>
                <Text style={{ paddingHorizontal: 20, textAlign: 'center', marginTop: 20, fontSize: 15, color: COLOR.gray, fontWeight: '400' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>

                <View style={{ position: 'absolute', bottom: 30, paddingHorizontal: 30, right: 0, left: 0 }}>
                    <Button onPress={() => { props.navigation.navigate('startchat') }} title={'Scan'} bgColor={COLOR.green} color={COLOR.white} />
                </View>
            </View>
        </View>
    );
};

export default ScanQR;
