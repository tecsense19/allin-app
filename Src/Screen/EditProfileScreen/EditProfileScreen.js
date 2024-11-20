
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar, ImageBackground, Image, LogBox, ScrollView, Alert, Text, BackHandler, Modal, FlatList, KeyboardAvoidingView, TextInput, } from 'react-native';
import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import Sound from '../../custom/SoundListEditProfile/Sound';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import RoundPlus from '../../Custom/RoundPlus/RoundPlus';
import Textinput from '../../Custom/TextInput/EditProfileTextInput';
import MyAlert from '../../Custom/Alert/PermissionAlert';
import Loader from '../../Custom/Loader/loader';
import ProfileModal from '../../Custom/Modal/ProfileModal';
import SocialMedia from '../../Custom/Modal/SocialMedia';
import styles from '../EditProfileScreen/EditProfileScreenStyle';
import { Delete_Account, Edit_Profile } from '../../Service/actions';
import MapView, { Circle, Marker } from 'react-native-maps';

LogBox.ignoreAllLogs();
const EditProfileScreen = props => {
    const [visible, setVisible] = useState(false);
    const [viewImage, setViewImage] = useState(false);
    const [coverImg, setCoverImg] = useState(false);
    const [loding, setLoding] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [data, setData] = useState();
    const [img, setImg] = useState('');
    const [bgimg, setBgImg] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [facebookurl, setFacebookurl] = useState('');
    const [twitterurl, setTwitterurl] = useState('');
    const [youtubeurl, setYoutubeurl] = useState('');
    const [linkedinurl, setLinkedinurl] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [latlong, setLetTong] = useState('');
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
    const apiKey = 'AIzaSyBVNrTxbZva7cV4XDyM8isa5JYpqA1SJYo';

    const AccountID = data?.data?.userDetails?.account_id
    const myData = data?.data?.userDetails
    const token = data?.data?.token
    const closeModal = () => { setCoverImg(false); setViewImage(false); setVisible(false); };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [coverImg, viewImage, visible]);
    useEffect(() => {

        getData();
        setFName(myData?.first_name)
        setLName(myData?.last_name)
        setImg(myData?.profile)
        setBgImg(myData?.cover_image)
        setTitle(myData?.title == 'null' || myData?.title == 'undefined' ? '' : myData?.title)
        setDescription(myData?.description == 'null' || myData?.description == 'undefined' ? '' : myData?.description)
        setEmail(myData?.email == 'null' || myData?.email == 'undefined' ? '' : myData?.email)
        setPhone(myData?.mobile)
        setInstagramUrl(myData?.instagram_profile_url == 'null' || myData?.instagram_profile_url == 'undefined' ? '' : myData?.instagram_profile_url)
        setFacebookurl(myData?.facebook_profile_url == 'null' || myData?.facebook_profile_url == 'undefined' ? '' : myData?.facebook_profile_url)
        setTwitterurl(myData?.twitter_profile_url == 'null' || myData?.twitter_profile_url == 'undefined' ? '' : myData?.twitter_profile_url)
        setYoutubeurl(myData?.youtube_profile_url == 'null' || myData?.youtube_profile_url == 'undefined' ? '' : myData?.youtube_profile_url)
        setLinkedinurl(myData?.linkedin_profile_url == 'null' || myData?.linkedin_profile_url == 'undefined' ? '' : myData?.linkedin_profile_url)
    }, [myData?.first_name, myData?.last_name, myData?.profile]
    );
    const BgImageCemera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setBgImg(result.assets[0]);
            try {
            } catch (e) { }
        }
    };
    const BgImageGallery = async () => {
        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            setBgImg(result.assets[0]);
            try {
                await UpdateDataApiCalling()
            } catch (e) {
            }
        }
    };
    const profileImgCemera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setImg(result.assets[0]);
            try {
                // await AsyncStorage.setItem('profile', JSON.stringify(updatedData));
            } catch (e) { }
        }
        setVisible(false);
    };
    const profileImgGallery = async () => {
        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            setImg(result.assets[0]);

            try {
            } catch (e) { }
        }
        setVisible(false);
    };
    const customAlert = () => {
        const title = 'Permission Request';
        const Descriptions = 'This app requires camera access. Please allow camera access to continue';
        const Deny = () => console.log('Deny');
        const Allow = () => openSettings();
        MyAlert(title, Descriptions, Allow, Deny);
    };
    const requestCameraPermission = async () => {
        try {
            const photo = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            const result = await request(PERMISSIONS.IOS.CAMERA);
            if (result === 'granted') {
            } else { customAlert(); }
        } catch (error) { console.log(error); }
    };
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myData');
            const userData = JSON.parse(jsonValue);
            setData(userData);
        } catch (e) { }
    };
    // const createTwoButtonAlert = () =>
    //     Alert.alert('Delete Account', 'You are about to delete your account.This action is irreversible and will permanently remove all your data.Are you sure you want to proceed ?',
    //         [
    //             { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'No', },
    //             { text: 'YES', onPress: () => DeleteAccount(), style: 'destructive' },
    //         ],
    //     );
    // const DeleteAccount = async () => {

    // };

    const UpdateDataApiCalling = async () => {
        setLoding(true)
        const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        if (phone?.length <= 5 || phone?.length >= 14) {
            setLoding(false)
            return Alert.alert('Enter Valid Phone Number')
        }
        if (email == undefined || email == '') { }
        else {
            if (!regx.test(email)) {
                setLoding(false)
                return Alert.alert('Enter Valid Email')
            }
        }
        const res = await Edit_Profile(token, phone, fname, lname, title, description, email, instagramUrl, facebookurl, twitterurl, youtubeurl, linkedinurl, img, bgimg, selectedPlace?.lng, selectedPlace?.lat)
        if (res?.status_code == 200) {
            const a = {
                data: { token: token, expires_in: res?.data?.expires_in, token_type: res?.data?.token_type, userDetails: res?.data?.userData }
            };
            // console.log(res);
            await AsyncStorage.setItem('myData', JSON.stringify(a));
            setLoding(false)
            Alert.alert('Edit Profile Successfully!')
        } else {
            setLoding(false)
            Alert.alert(res?.message);
        }
    };
    const deleteAccount = async () => {
        setLoding(true)
        await Delete_Account(token).then(async (res) => {
            if (res.status_code === 200) {
                props.navigation.navigate('splase')
                await AsyncStorage.clear()
                setLoding(false)
            } else (deleteAccount())
        })
    }
    const fetchSuggestions = async (input) => {
        try {
            const response = await fetch(
                `${PLACES_API_BASE_URL}/autocomplete/json?input=${input}&key=${apiKey}&types=geocode`
            );
            const json = await response.json();
            setSuggestions(json.predictions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };
    const handleSelectSuggestion = async (place) => {
        try {
            const response = await fetch(
                `${PLACES_API_BASE_URL}/details/json?placeid=${place.place_id}&key=${apiKey}`
            );
            const json = await response.json();
            const placeDetails = json.result;

            const country = placeDetails.address_components.find(
                (component) => component.types.includes('country')
            )?.long_name;
            const state = placeDetails.address_components.find(
                (component) => component.types.includes('administrative_area_level_1')
            )?.long_name;
            const city = placeDetails.address_components.find(
                (component) => component.types.includes('locality')
            )?.long_name;
            const pincode = placeDetails.address_components.find(
                (component) => component.types.includes('postal_code')
            )?.long_name;
            const address = placeDetails.formatted_address;
            const { lat, lng } = placeDetails.geometry.location;

            setSelectedPlace({
                id: placeDetails.place_id,
                description: placeDetails.formatted_address,
                country: country || '',
                state: state || '',
                city: city || '',
                pincode: pincode || '',
                address: address || '',
                lat: lat,
                lng: lng,
            });

            setQuery(place.description);
            setSuggestions([]);
        } catch (error) {
            console.error('Error fetching place details:', error);
            setSelectedPlace(null);
        }
    };
    return (
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: COLOR.white, }} bounces={false}>
                    <StatusBar barStyle="light-content" backgroundColor={COLOR.black} hidden={false} />
                    <View onPress={() => setCoverImg(true)}>
                        <ImageBackground source={{ uri: bgimg?.uri ? bgimg?.uri : bgimg }} style={styles.headerView}>
                            <View style={{ paddingHorizontal: 30 }}>
                                <NavigateHeader tintColor={COLOR.white} color={COLOR.white} title={myData?.cover_image || img?.uri ? '' : 'Edit Profile'} onPress={() => props.navigation.navigate('setting')} />
                            </View>
                            <View style={styles.caneraIconView}>
                                <TouchableOpacity
                                    onPress={() => { requestCameraPermission(); BgImageCemera(); }} style={{ padding: 5 }}>
                                    <Image
                                        source={require('../../Assets/Image/camera.png')} style={[styles.cameraIcon, { marginBottom: 2 }]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={BgImageGallery} style={{}}>
                                    <RoundPlus height={23} width={23} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.detailsView}>
                        <View onPress={() => setViewImage(true)}>
                            <ImageBackground source={{ uri: img?.uri ? img?.uri : img }} borderRadius={80} style={styles.profileImage}>
                                <TouchableOpacity style={styles.plusIcon} onPress={() => setVisible(true)}>
                                    <RoundPlus height={30} width={30} />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <Textinput marginTop={30} onPress={UpdateDataApiCalling} label={'First Name'} placeholder={'Enter your first name'} value={fname} placeholderTextColor={COLOR.placeholder} onChangeText={txt => setFName(txt)} />
                        <Textinput onPress={UpdateDataApiCalling} label={'Last Name'} marginTop={20} placeholder={'Enter your last name'} value={lname} placeholderTextColor={COLOR.placeholder} onChangeText={txt => setLName(txt)} />
                        <Textinput onPress={UpdateDataApiCalling} label={'Title'} marginTop={20} placeholder={'Enter Title'} value={title} placeholderTextColor={COLOR.placeholder} onChangeText={txt => setTitle(txt)} />
                        <Textinput onPress={UpdateDataApiCalling} label={'Description'} marginTop={20} placeholder={'Enter description'} value={description} placeholderTextColor={COLOR.placeholder} onChangeText={txt => setDescription(txt)} />
                        <Textinput onPress={UpdateDataApiCalling} value={email} onChangeText={txt => setEmail(txt)} label={'Update Email'} marginTop={20} placeholderTextColor={COLOR.placeholder} placeholder={'Enter your email '} />
                        <Textinput onPress={UpdateDataApiCalling} keyboardType={'numeric'} value={phone} onChangeText={txt => setPhone(txt)} label={'Update Phone'} marginTop={20} maxLength={18} placeholderTextColor={COLOR.placeholder} placeholder={'Enter your phone number'} />

                        <Text style={{ fontSize: 18, color: COLOR.titlecolor, fontWeight: 'bold', marginLeft: 10, marginTop: 25, }}>
                            Address
                        </Text>
                        <TextInput
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="write a location"
                            value={query}
                            onChangeText={(text) => {
                                setQuery(text);
                                fetchSuggestions(text);
                            }}
                            placeholderTextColor={COLOR.placeholder}
                            style={{
                                backgroundColor: COLOR.white, borderWidth: 1,
                                height: 45,
                                borderRadius: 5,
                                paddingLeft: 10,
                                fontWeight: '500',
                                fontSize: 16,
                                color: COLOR.textcolor, marginTop: 5, marginHorizontal: 10
                            }}
                        />
                        {suggestions.length > 0 && (
                            <FlatList
                                style={{ width: '100%', maxHeight: 300, marginHorizontal: 10 }}
                                data={suggestions}
                                keyExtractor={(item) => item.place_id}
                                renderItem={({ item }) => (
                                    <Text style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }} onPress={() => handleSelectSuggestion(item)}>
                                        {item.description}
                                    </Text>
                                )}
                            />
                        )}
                        {selectedPlace && (
                            <MapView
                                style={{ height: 250, width: '93%', borderRadius: 10, marginTop: 10, marginHorizontal: 10 }}
                                followsUserLocation={true}
                                mapType="satellite"
                                showsUserLocation={true}
                                zoomEnabled={false}
                                scrollEnabled={false}
                                // onPress={handleMapPress}
                                region={{
                                    latitude: selectedPlace?.lat,
                                    longitude: selectedPlace?.lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}

                            >
                                <Marker coordinate={{ latitude: selectedPlace?.lat, longitude: selectedPlace?.lng }}>
                                    <Image style={{ height: 25, width: 25, tintColor: 'red' }} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-1024.png' }} />
                                </Marker>
                                <Circle
                                    center={{ latitude: selectedPlace?.lat, longitude: selectedPlace?.lng }}
                                    radius={200} // 1 km in meters
                                    strokeColor={'rgba(1, 214, 201, 1)'} // Blue color with transparency
                                    fillColor={'rgba(0, 239, 255, 0.1)'} // Blue color with transparency
                                />
                            </MapView>
                        )}
                        <Text style={{ fontSize: 18, color: COLOR.titlecolor, fontWeight: 'bold', marginLeft: 10, marginTop: 25, }}>
                            Account ID
                        </Text>
                        <View style={{ height: 45, borderWidth: 1, borderColor: COLOR.gray, marginTop: 5, borderRadius: 5, justifyContent: 'center', margin: 10 }}>
                            <Text style={{ marginLeft: 10, color: COLOR.black, fontSize: 15, fontWeight: '500', }}> {AccountID} </Text>
                        </View>
                        <Text style={{ fontSize: 18, color: COLOR.black, marginLeft: 10, fontWeight: 'bold', marginTop: 15 }}>Social Media</Text>
                        <SocialMedia source={require('../../Assets/Image/instagram.png')} placeholder={'Paste link here'} onChangeText={(res) => { setInstagramUrl(res) }} value={instagramUrl} />
                        <SocialMedia source={require('../../Assets/Image/facebook.png')} placeholder={'Paste link here'} onChangeText={(res) => { setFacebookurl(res) }} value={facebookurl} />
                        <SocialMedia source={require('../../Assets/Image/twitter.png')} placeholder={'Paste link here'} onChangeText={(res) => { setTwitterurl(res) }} value={twitterurl} />
                        <SocialMedia source={require('../../Assets/Image/youtube.png')} placeholder={'Paste link here'} onChangeText={(res) => { setYoutubeurl(res) }} value={youtubeurl} />
                        <SocialMedia source={require('../../Assets/Image/linkedin.png')} placeholder={'Paste link here'} onChangeText={(res) => { setLinkedinurl(res) }} value={linkedinurl} />
                        <Button onPress={() => UpdateDataApiCalling()} title={'Update'} color={COLOR.white} bgColor={COLOR.green} marginTop={35} marginHorizontal={10} />
                        {/* <Button onPress={() => Alert.alert('Auto Delete Task')} title={'Auto Delete Tasks'} color={COLOR.white} bgColor={COLOR.green} marginTop={10} marginHorizontal={10} /> */}
                        <Button onPress={() => deleteAccount()} title={'Delete Account '} color={COLOR.white} bgColor={COLOR.orange} marginTop={10} marginBottom={50} marginHorizontal={10} />
                        <ProfileModal onRequestClose={closeModal} visible={visible} onClose={() => setVisible(false)} onCemera={() => { requestCameraPermission(); profileImgCemera(); }} onGallery={() => { profileImgGallery(); }} />
                    </View>

                    <Loader visible={loding} Retry={UpdateDataApiCalling} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default EditProfileScreen;
