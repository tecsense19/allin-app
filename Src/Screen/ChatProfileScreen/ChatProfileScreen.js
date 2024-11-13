

import {
    View,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Image,
    LogBox,
    ScrollView,
    Text,
    FlatList,
    Alert,
    Linking,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import styles from './ChatProfileScreenStyle';
import MapView, { Marker } from 'react-native-maps';


LogBox.ignoreAllLogs();
const ChatProfileScreen = props => {
    const chatProfileData = props?.route?.params

    const socialMedia = [
        { id: 1, name: 'instagram', img: require('../../Assets/Image/instagram.png'), url: chatProfileData?.instagram_profile_url },
        { id: 2, name: 'facebook', img: require('../../Assets/Image/facebook.png'), url: chatProfileData?.facebook_profile_url },
        { id: 3, name: 'twitter', img: require('../../Assets/Image/twitter.png'), url: chatProfileData?.twitter_profile_url },
        { id: 4, name: 'youtube', img: require('../../Assets/Image/youtube.png'), url: chatProfileData?.youtube_profile_url },
        { id: 5, name: 'linkedin', img: require('../../Assets/Image/linkedin.png'), url: chatProfileData?.linkedin_profile_url }
    ]
    const onhandalePhoneCall = () => {
        Linking.openURL(`tel:${chatProfileData?.country_code + chatProfileData.mobile}`);
    };

    const list = ({ item }) => {
        const handlePress = () => {
            if (item?.url) {
                Linking.openURL(item?.url);
            }
        };
        return (
            <TouchableOpacity onPress={() => { handlePress() }}>
                <Image source={item.img} style={{ height: 50, width: 50, margin: 5 }} />
            </TouchableOpacity>
        )
    }
    const userName = chatProfileData.first_name + ' ' + chatProfileData.last_name
    console.log(chatProfileData);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLOR.white }} bounces={false}>
            <View style={{ flex: 1, backgroundColor: COLOR.white }}>
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={COLOR.black}
                        hidden={false}
                    />
                    <View style={styles.headerView}>
                        <ImageBackground
                            source={{ uri: chatProfileData?.cover_image }}
                            style={styles.headerView}>
                            <View style={{ paddingHorizontal: 30 }}>
                                <NavigateHeader
                                    color={COLOR.white}
                                    title={'User Profile'}
                                    onPress={() => props.navigation.goBack()}
                                />
                            </View>
                        </ImageBackground>

                    </View>
                    <View style={styles.detailsView}>
                        <ImageBackground
                            source={{ uri: chatProfileData?.profile }}
                            borderRadius={80}
                            style={styles.profileImage}>


                        </ImageBackground>
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLOR.titlecolor,
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>

                        {userName}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLOR.textcolor,
                            fontSize: 14,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginTop: 10,
                        }}>
                        {chatProfileData?.country_code + ' ' + chatProfileData.mobile}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginHorizontal: 20, padding: 10 }}>
                        <CallMsg title={'call'} img={require('../../Assets/Image/groupaudioicon.png')} onPress={() => { onhandalePhoneCall() }} />
                        <CallMsg title={'Message'} img={require('../../Assets/Image/profilemsgicon.png')} onPress={() => { props.navigation.goBack() }} />
                        <CallMsg type={'share'} title={'share'} img={require('../../Assets/Image/profileuploadicon.png')} onPress={() => { props.navigation.goBack() }} />
                    </View>
                    {chatProfileData?.description == null || chatProfileData?.title == null ?
                        null :
                        <View style={{ marginHorizontal: 30, borderRadius: 15, padding: 15, marginTop: 20, }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.gray, fontWeight: 'bold' }}>{chatProfileData?.title}</Text>
                            <Text style={{ marginTop: 10, fontSize: 15, color: COLOR.textcolor, fontWeight: '400', textAlign: 'center' }}>
                                {chatProfileData?.description}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 15, color: COLOR.textcolor, fontWeight: '400', textAlign: 'center' }}>{chatProfileData.email}</Text>
                        </View>}

                    <FlatList data={socialMedia} renderItem={list} horizontal style={{ alignSelf: 'center', marginTop: 20 }} bounces={false} />
                </View>
                <View style={{ paddingHorizontal: 30, marginTop: 35 }}>
                    <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: 'bold', }}>Address</Text>
                    <View style={{ height: 200, marginTop: 10, borderRadius: 10, marginBottom: 30 }}>
                        {<MapView
                            scrollEnabled={true}
                            zoomEnabled={true}
                            showsUserLocation={false}
                            followsUserLocation={true}
                            style={{ height: 200, width: '100%', borderRadius: 10 }}
                            initialRegion={{
                                latitude: 23.0697,
                                longitude: 72.5229,
                                latitudeDelta: 0.02,
                                longitudeDelta: 0.02
                            }}>
                            <Marker coordinate={{ latitude: 23.0697, longitude: 72.5229 }} >
                                <Image style={{ height: 25, width: 25, tintColor: 'darkred' }} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-1024.png' }} />
                            </Marker>
                        </MapView>}
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

export default ChatProfileScreen;
const CallMsg = ({ img, onPress, title, type }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ height: 57, flex: 1, backgroundColor: COLOR.white, margin: 5, borderRadius: 7, alignItems: 'center', shadowOpacity: 0.2, shadowOffset: { height: 1, width: 1 }, justifyContent: 'center' }} >
            <Image source={img} style={{ height: type == 'share' ? 25 : 20, width: type == 'share' ? 25 : 20, marginHorizontal: 20, tintColor: COLOR.green, resizeMode: 'contain' }} />
            <Text style={{ color: COLOR.gray, fontWeight: 'medium', marginTop: 3 }}>{title}</Text>
        </TouchableOpacity>
    )
}

