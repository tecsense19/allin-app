import { View, TouchableOpacity, StatusBar, ImageBackground, Image, Alert, LogBox, ScrollView, BackHandler, Text, TextInput, ActivityIndicator, Modal, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request, openSettings, } from 'react-native-permissions';
import CountryPicker from 'rn-country-picker';
import uuid from 'react-native-uuid'
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../../Custom/Button/Button';
import styles from './CreateAccountStyle';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import RoundPlus from '../../Custom/RoundPlus/RoundPlus';
import Textinput from '../../Custom/TextInput/SimpaleTextInput';
import ProfileModal from '../../Custom/Modal/ProfileModal';
import MyAlert from '../../Custom/Alert/PermissionAlert';
LogBox.ignoreAllLogs();
const CreateAccount = props => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [img, setImg] = useState('');
    const [bgimg, setBgImg] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [visible, setVisible] = useState(false);
    const [loding, setLoding] = useState(false);
    const [diviceToken, setDeviceToken] = useState('');

    const closeModal = () => {
        setVisible(false);
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            closeModal,
        );
        return () => backHandler.remove();
    }, [visible]);
    // const notificationsPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         // console.log('Authorization status:', authStatus);
    //     }
    // }
    // const getFcmToken = async () => {
    //     try {
    //         const token = await messaging().getToken();
    //         setDeviceToken(token)
    //     } catch (error) {
    //         console.error('Error getting FCM token:', error)
    //     }
    // }
    // useEffect(() => {
    //     notificationsPermission()
    //     getFcmToken()
    // }, [])
    const storeData = () => {
        props.navigation.navigate('login')
    }
    const BgImageCemera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            const url = result?.assets[0]?.uri
            setBgImg(url)
        }
    };
    const BgImageGallery = async () => {
        const result = await launchImageLibrary();
        setVisible(false)
        if (result?.assets[0]?.uri) {
            const url = result?.assets[0]?.uri
            setBgImg(url)
        }
    };
    const profileImgCemera = async () => {
        const result = await launchCamera();
        setVisible(false);
        if (result?.assets[0]?.uri) {
            const url = result.assets[0].uri
            setImg(url)
        }
    };
    const profileImgGallery = async () => {
        const result = await launchImageLibrary();
        setVisible(false)
        if (result?.assets[0]?.uri) {
            const url = result.assets[0].uri
            setImg(url)
        }
    };
    const customAlert = () => {
        const title = 'Permission Request';
        const Descriptions =
            'This app requires camera access. Please allow camera access to continue';
        const Deny = () => console.log('Deny');
        const Allow = () => openSettings();
        MyAlert(title, Descriptions, Allow, Deny);
    };
    const requestCameraPermission = async () => {
        try {
            const photo = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            const result = await request(PERMISSIONS.IOS.CAMERA);
            if (result === 'granted') {
            } else {
                customAlert();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} bounces={false}>
                <StatusBar barStyle="light-content" backgroundColor={COLOR.DeepSkyBlue} hidden={false} />
                <ImageBackground style={styles.headerView} source={{ uri: bgimg }}>
                    <View style={{ paddingHorizontal: 30 }}>
                        <NavigateHeader title={'Create account '} color={COLOR.white} onPress={() => props.navigation.goBack()} />
                    </View>
                    <View style={styles.caneraIconView}>
                        <TouchableOpacity
                            onPress={() => { requestCameraPermission(); BgImageCemera(); }}
                            style={{ marginRight: 10 }}
                        >
                            <Image source={require('../../Assets/Image/camera.png')} style={styles.cameraIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={BgImageGallery}
                            style={{ marginRight: 10 }}>
                            <RoundPlus height={22} width={22} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.detailsView}>
                    <ImageBackground source={{ uri: img, }} borderRadius={80} style={styles.profileImage}>
                        <TouchableOpacity style={styles.plusIcon} onPress={() => setVisible(true)}>
                            <RoundPlus height={27} width={27} />
                        </TouchableOpacity>
                        {!img ? (<Image style={{ height: 25, width: 25 }} source={require('../../Assets/Image/camera.png')} />) : ('')}
                    </ImageBackground>
                    <Textinput marginTop={20} value={fname} onChangeText={txt => setFname(txt)} label={'First Name'} placeholder={'Enter Your First Name'} />
                    <Textinput value={lname} onChangeText={txt => setLname(txt)} label={'Last Name'} marginTop={20} placeholder={'Enter Your Last Name'} />
                    <Text style={styles.phonenumber}> Phone Number </Text>
                    <View style={styles.countryPickerView}>
                        <CountryPicker visible={true} pickerTitle="Select yourCountry" animationType={'none'} pickerTitleStyle={styles.pickertitle} language="en" selectedCountryTextStyle={styles.selectedcountrytext} containerStyle={{ height: 100 }} countryNameTextStyle={styles.countrynametext} searchBarPlaceHolder={'Search here......'} countryFlagStyle={styles.countryflag} hideCountryCode={false} countryCode={'91'} selectedValue={res => setCountryCode(res)} />
                        <TextInput placeholder="Enter Phone Number" placeholderTextColor={COLOR.lightgray} keyboardType="numeric" maxLength={10} onChangeText={res => setPhone(res)} value={phone} style={styles.phonenumberinput} />
                    </View>
                    <Button onPress={() => { storeData(); }} title={'Let’s Get Started'} color={COLOR.white} bgColor={COLOR.green} marginTop={70} />
                    <ProfileModal onRequestClose={closeModal} visible={visible} onClose={() => setVisible(false)}
                        onCemera={() => { profileImgCemera(); requestCameraPermission(); }}
                        onGallery={() => { profileImgGallery(); }}
                    />
                </View>
            </ScrollView>
            <Modal visible={loding} transparent>
                <View style={styles.lodingmodalview}>
                    <ActivityIndicator size={'small'} style={styles.indicator}></ActivityIndicator>
                </View>
            </Modal>
        </View>
    );
};

export default CreateAccount;