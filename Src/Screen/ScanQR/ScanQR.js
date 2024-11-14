import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import QRCode from 'react-native-qrcode-svg';
import { AccountId } from '../../Service/AsyncStorage';

const ScanQR = (props) => {
    const [accountId, setAccountId] = useState('');

    const getAccountId = async () => {
        const AccId = await AccountId();
        if (typeof (AccId) == 'number') {
            setAccountId(AccId.toString());
        } else {
            setAccountId('');
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
                        source={{ uri: 'https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' }} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>Nitin Kanazariya</Text>
                    <View style={{ alignSelf: 'center', marginTop: 30 }}>
                        {accountId ? (
                            <QRCode
                                size={160}
                                value={accountId}
                                logo={require('../../Assets/Image/allin_logo.png')}
                                logoSize={40}
                            />
                        ) : (
                            <Text style={{ color: COLOR.orange, textAlign: 'center', marginTop: '20%', }}>No Account ID found</Text>
                        )}
                    </View>
                </View>
                <Text style={{ paddingHorizontal: 20, textAlign: 'center', marginTop: 20, fontSize: 15, color: COLOR.gray, fontWeight: '400' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate('startchat') }} style={{ padding: 20, alignSelf: 'center', }}>
                    <Text style={{ color: COLOR.slateblue, fontWeight: '500', fontSize: 16, textAlign: 'center' }}>Scan QR Code</Text>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 30, paddingHorizontal: 30, right: 0, left: 0 }}>
                    <Button onPress={() => { props.navigation.navigate('startchat') }} title={'Scan'} bgColor={COLOR.green} color={COLOR.white} />
                </View>
            </View>
        </View>
    );
};

export default ScanQR;
