

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
                            fontWeight: '600',
                        }}>

                        {userName}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLOR.textcolor,
                            fontSize: 14,
                            fontWeight: '600',
                            letterSpacing: 1,
                            marginTop: 10,
                        }}>
                        {chatProfileData?.country_code + ' ' + chatProfileData.mobile}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', alignSelf: 'center', }}>
                        <CallMsg img={require('../../Assets/Image/telephone.png')} onPress={() => { onhandalePhoneCall() }} />
                        <CallMsg img={require('../../Assets/Image/group.png')} onPress={() => { props.navigation.goBack() }} />
                    </View>
                    {chatProfileData?.description == 'null' || chatProfileData?.title == 'null' || chatProfileData?.description || chatProfileData?.title ?
                        null :
                        <View style={{ marginHorizontal: 30, borderRadius: 15, padding: 15, marginTop: 20, backgroundColor: COLOR.lightgreen }}>
                            <Text style={{ textAlign: 'center', fontSize: 16, color: COLOR.black, fontWeight: 'bold' }}>{chatProfileData?.title}</Text>
                            <Text style={{ marginTop: 10, fontSize: 15, color: COLOR.textcolor, fontWeight: '400', textAlign: 'center' }}>
                                {chatProfileData?.description}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 15, color: COLOR.textcolor, fontWeight: '400', textAlign: 'center' }}>{chatProfileData.email}</Text>
                        </View>}

                    <FlatList data={socialMedia} renderItem={list} horizontal style={{ alignSelf: 'center', marginTop: 20 }} bounces={false} />
                </View>

            </View>
        </ScrollView>
    );
};

export default ChatProfileScreen;
const CallMsg = ({ img, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: COLOR.green, margin: 5, borderRadius: 10 }} >
            <Image source={img} style={{ height: 25, width: 25, margin: 10, marginHorizontal: 20, tintColor: COLOR.white }} />
        </TouchableOpacity>
    )
}

