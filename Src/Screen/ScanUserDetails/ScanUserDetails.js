import React, { useCallback, useEffect, useState, } from 'react';
import { View, Text, Image, Linking, Alert } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../../Custom/Button/Button';
import { Get_All_Messages } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import Timezone from 'react-native-timezone'
import Loader from '../../Custom/Loader/loader';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';
import MyAlert from '../../Custom/Alert/PermissionAlert';



const ScanUserDetails = (props) => {
    const [hideScanner, setHideScanner] = useState(false);
    const [UserData, setUserData] = useState('')
    const [loading, setLoding] = useState(false);
    const [isGranted, setIsGranted] = useState()

    const requestCameraPermission = async () => {
        try {
            const granted = await request(PERMISSIONS.IOS.CAMERA);
            if (granted === RESULTS.GRANTED) {
                setIsGranted(true)
            } else {
                setIsGranted(false)
                const title = 'Permission Request';
                const Descriptions = 'This app would like to view your Camera';
                const Deny = () => console.log('Deny');
                const Allow = () => Linking.openSettings();
                MyAlert(title, Descriptions, Allow, Deny);
            }
        } catch (error) {
            console.error('Error requesting Camera permission:', error);
        }
    };

    useFocusEffect(useCallback(() => {
        requestCameraPermission()
    }, []));
    const onSuccess = async (e) => {
        if (e.data) {
            if (e.data.includes('ThisIsAllinTaskManagemantApp')) {
                setLoding(true)
                const id = e.data
                const numbersOnly = id.replace(/\D/g, '');
                const ConvertNumbers = parseInt(numbersOnly)
                const Token = await getToken()
                const bodyData = { id: ConvertNumbers, start: 0, limit: 1000, timezone: Timezone.getTimeZone(), filter: 'filter', startchat: 'Yes' }
                const data = await Get_All_Messages(bodyData, Token)

                if (data?.status_code == 200) {
                    setUserData(data.data.userData)
                    setLoding(false);
                    setHideScanner(true)
                }
            } else {
                Alert.alert('Invalid QR Code')
                props.navigation.goBack()
            }

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
                            source={{ uri: UserData.profile }} />
                        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center', color: COLOR.black, marginHorizontal: 20 }}>{UserData.first_name + ' ' + UserData.last_name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 10, textAlign: 'center', color: COLOR.gray }}>{UserData.title}</Text>
                        <Text numberOfLines={3} style={{ paddingHorizontal: 20, fontSize: 14, fontWeight: '500', marginTop: 10, textAlign: 'center', color: COLOR.gray }}>{UserData.description} </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button onPress={() => { props.navigation.navigate('chatinner', UserData.id) }} bgColor={COLOR.green} color={COLOR.white} title={'Start Chat'} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Button onPress={() => { setHideScanner(false) }} borderWidth={1} color={COLOR.black} title={'Decline'} />
                            </View>
                        </View>
                    </View>
                    :
                    <>
                        {isGranted ? <QRCodeScanner
                            containerStyle={{ position: 'absolute', top: '10%', left: 20, right: 20, }}
                            cameraContainerStyle={{ height: 400, }}
                            cameraStyle={{ height: '100%', width: '100%', }}
                            markerStyle={{ borderColor: COLOR.green, }}
                            showMarker={true}
                            onRead={onSuccess}
                            flashMode={RNCamera.Constants.FlashMode.off}
                        /> : null}
                    </>
                }
            </View>
            <Loader visible={loading} Retry={() => setHideScanner(false)} />
        </View>
    );
};

export default ScanUserDetails;