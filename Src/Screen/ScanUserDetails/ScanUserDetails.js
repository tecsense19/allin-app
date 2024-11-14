import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../../Custom/Button/Button';

const ScanUserDetails = (props) => {
    const [hideScanner, setHideScanner] = useState(false);

    const onSuccess = e => {
        console.log(e);
        if (e.data) {
            setHideScanner(true)
            console.log(e.data);

        }
    };
    const onBackHandler = () => {
        if (hideScanner) {
            setHideScanner(false)
        } else {
            props.navigation.goBack()
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.black }}>
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader onPress={onBackHandler} title={''} color={COLOR.white} />
            </View>

            <View style={{ flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 30, marginTop: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                {hideScanner ?
                    <View style={{ height: 300, width: '100%', borderRadius: 10, backgroundColor: COLOR.white, justifyContent: 'center', flex: 0.8 }}>

                        <Image
                            style={{ height: 63, width: 63, resizeMode: 'contain', borderRadius: 40, alignSelf: 'center', }}
                            source={{ uri: 'https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center', color: COLOR.black }}>Nitin Kanazariya</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 10, textAlign: 'center', color: COLOR.gray }}>Founder</Text>
                        <Text style={{ paddingHorizontal: 20, fontSize: 14, fontWeight: '500', marginTop: 10, textAlign: 'center', color: COLOR.gray }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button bgColor={COLOR.green} color={COLOR.white} title={'Start Chat'} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Button onPress={() => { setHideScanner(false) }} borderWidth={1} color={COLOR.black} title={'Decline'} />
                            </View>

                        </View>
                    </View>
                    :
                    <QRCodeScanner
                        containerStyle={{ position: 'absolute', top: '10%', left: 20, right: 20, }}
                        cameraContainerStyle={{ height: 400, }}
                        cameraStyle={{ height: '100%', width: '100%', }}
                        markerStyle={{ borderColor: COLOR.green, }}
                        showMarker={true}
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode}
                    // topContent={
                    //     <Text style={{ fontSize: 0, textAlign: 'center' }}>
                    //         your computer and scan the QR code.
                    //     </Text>
                    // }
                    />}
            </View>
        </View>
    );
};

export default ScanUserDetails;