import { View, TouchableOpacity, StatusBar, ImageBackground, Image, Alert, LogBox, ScrollView, BackHandler, Text, TextInput, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CountryPicker from 'rn-country-picker';
import uuid from 'react-native-uuid';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../../Custom/Button/Button';
import styles from './CreateAccountStyle';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import RoundPlus from '../../Custom/RoundPlus/RoundPlus';
import Textinput from '../../Custom/TextInput/SimpaleTextInput';
import ProfileModal from '../../Custom/Modal/ProfileModal';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { BgImageCemera, BgImageGallery, profileImgCemera, profileImgGallery, requestCameraPermission, } from './Functions';
import { Send_Otp } from '../../Service/actions';
import messaging from '@react-native-firebase/messaging';

const CreateAccount = props => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [img, setImg] = useState('');
    const [bgimg, setBgImg] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [visible, setVisible] = useState(false);
    const [loding, setLoding] = useState(false);
    const [maskNumber, setMaskNumber] = useState('');
    const [deviceToken, setDeviceToken] = useState('')
    const closeModal = () => { setVisible(false); };
    const onChangeText = ({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) => {
        // console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
        setPhone(unmaskedPhoneNumber)
        setCountryCode(dialCode)
        setMaskNumber(phoneNumber)
    };
    useEffect(() => { getFcmToken() }, [])
    const getFcmToken = async () => {
        try {
            const D_token = await messaging().getToken();
            setDeviceToken(D_token)
        } catch (error) { console.error('Error getting FCM token:', error) }
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [visible]);
    const handleCoverImgCamera = async () => {
        const CoverImage = await BgImageCemera()
        setBgImg(CoverImage)
    };
    const handleCoverImgGallery = async () => {
        const CoverImage = await BgImageGallery()
        setVisible(false)
        setBgImg(CoverImage)
    };
    const handleProfileImgCamera = async () => {
        const profileImage = await profileImgCemera()
        setVisible(false); setImg(profileImage)
    }
    const handleProfileImgGallery = async () => {
        const profileImage = await profileImgGallery();
        setVisible(false); setImg(profileImage)
        console.log(profileImage);
    };
    const handleValidAccount = async () => {
        if (fname == '') {
            Alert.alert('Please enter your first name to proceed');
        } else if (lname == '') {
            Alert.alert('Please enter your last name to proceed');
        } else {
            sendOtp()
        }
    };
    const sendOtp = async () => {
        setLoding(true)
        const dataa = { country_code: countryCode, mobile: phone, type: 'Register', first_name: fname, last_name: lname, device_token: deviceToken, profile: img, cover_image: bgimg, }
        await Send_Otp(dataa)
            .then(res => {
                if (res?.status_code == 200) {
                    setLoding(false)
                    props.navigation.navigate('verification', { mobile: phone, country_code: countryCode, first_name: fname, last_name: lname, profile: img, cover_image: bgimg, type: 'Ragister', maskNumber: maskNumber });
                } else { setLoding(false), Alert.alert(res?.message) }
            })
            .catch(error => setLoding(false), console.log('register sendotp:', error));
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} bounces={false}>
                    <StatusBar barStyle="light-content" backgroundColor={COLOR.black} hidden={false} />
                    <ImageBackground style={styles.headerView} source={{ uri: bgimg[0]?.uri }}>
                        <View style={{ paddingHorizontal: 30, }}>
                            <NavigateHeader title={'Create account '} color={COLOR.white} onPress={() => props.navigation.goBack()} />
                        </View>
                        <View style={styles.caneraIconView}>
                            <TouchableOpacity
                                onPress={handleCoverImgCamera}
                                style={{ marginRight: 10 }}
                            >
                                <Image source={require('../../Assets/Image/camera.png')} style={styles.cameraIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCoverImgGallery}
                                style={{ marginRight: 10 }}>
                                <RoundPlus height={22} width={22} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <View style={styles.detailsView}>
                        <ImageBackground source={{ uri: img[0]?.uri, }} borderRadius={80} style={styles.profileImage}>
                            <TouchableOpacity style={styles.plusIcon} onPress={() => setVisible(true)}>
                                <RoundPlus height={27} width={27} />
                            </TouchableOpacity>
                            {!img[0]?.uri ? (<Image style={{ height: 25, width: 25 }} source={require('../../Assets/Image/camera.png')} />) : ('')}
                        </ImageBackground>
                        <Textinput marginTop={60} value={fname} onChangeText={txt => setFname(txt)} label={'First Name'} placeholder={'Enter Your First Name'} />
                        <Textinput value={lname} onChangeText={txt => setLname(txt)} label={'Last Name'} marginTop={20} placeholder={'Enter Your Last Name'} />
                        <Text style={styles.phonenumber}> Phone Number </Text>
                        {/* <View style={styles.countryPickerView}>
                            <CountryPicker pickerTitle="Select yourCountry" animationType={'none'} pickerTitleStyle={styles.pickertitle} language="en" selectedCountryTextStyle={styles.selectedcountrytext} containerStyle={{ height: 100 }} countryNameTextStyle={styles.countrynametext} searchBarPlaceHolder={'Search here......'} countryFlagStyle={styles.countryflag} hideCountryCode={false} countryCode={'91'} selectedValue={res => setCountryCode(res)} />
                            <TextInput placeholder="Enter Phone Number" placeholderTextColor={COLOR.lightgray} keyboardType="numeric" maxLength={14} onChangeText={res => { setPhone(res) }} value={phone} style={styles.phonenumberinput} />
                        </View> */}
                        <IntlPhoneInput onChangeText={onChangeText} defaultCountry="IN" />
                        <Button onPress={handleValidAccount} title={'Let’s Get Started'} color={COLOR.white} bgColor={COLOR.green} marginTop={30} />
                        <ProfileModal onRequestClose={closeModal} visible={visible} onClose={() => setVisible(false)}
                            onCemera={() => { handleProfileImgCamera() }}
                            onGallery={() => { handleProfileImgGallery() }}
                        />
                    </View>

                </ScrollView>
                <Modal visible={loding} transparent>
                    <View style={styles.lodingmodalview}>
                        <ActivityIndicator size={'small'} style={styles.indicator}></ActivityIndicator>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}
export default CreateAccount