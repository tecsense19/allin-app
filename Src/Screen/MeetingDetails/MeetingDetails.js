


import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const MeetingDetails = (props) => {
    const [isFocuse, setIsFocuse] = useState('Accept')
    const data = props?.route?.params

    const date = new Date(data.date);
    const options = { weekday: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    console.log(formattedDate); // Example output: "Thursday, 17 2024"

    function convertTo12HourFormat(timeString) {
        const [hours, minutes, seconds] = timeString.split(":");
        const date = new Date(2024, 0, 1, hours, minutes, seconds);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', options);
        return formattedTime;
    }
    const convertedTime = convertTo12HourFormat(data.start_time);




    const list = ({ item }) => {
        return (
            <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: COLOR.lightgray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item?.profile == null ? 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png' : 'https://allin.website4you.co.in/public/user-profile/' + item?.profile }} style={{ height: 27, width: 27, borderRadius: 27, }} />
                    <Text style={{ marginLeft: 8, fontSize: 13, color: COLOR.gray, fontWeight: '500' }}>{item.first_name + ' ' + item.last_name}</Text>
                </View>
                <Text style={{ color: COLOR.black, fontWeight: '600', fontSize: 13 }}>Join</Text>
            </View>
        )
    }
    return (
        <View style={{
            backgroundColor: COLOR.black, flex: 1
        }}>
            <View style={{ paddingHorizontal: 30 }} >
                <NavigateHeader onPress={() => { props.navigation.goBack() }} />
            </View>
            <View style={{ marginTop: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 30 }}>
                {/*card view */}
                <View style={{ backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 7, marginTop: 30, borderRadius: 5, shadowOffset: { height: 1, width: 1 }, padding: 30 }}>
                    <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Meeting</Text>
                    <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                    <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold', marginTop: 15 }}>{data?.title}</Text>
                    <Text style={{ fontSize: 13, color: COLOR.gray, marginTop: 10 }}>{data?.description}</Text>
                    <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Image source={require('../../Assets/Image/clock.png')} style={{ height: 20, width: 20 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8, marginRight: 8 }}>{formattedDate}</Text>
                        <View style={{ height: 3, width: 3, backgroundColor: COLOR.gray, borderRadius: 5 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{convertedTime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                        <Image source={require('../../Assets/Image/location.png')} style={{ height: 20, width: 20 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{data.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => { setIsFocuse('Accept') }}
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderColor: isFocuse == 'Accept' ? COLOR.green : COLOR.lightgray, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: isFocuse == 'Accept' ? COLOR.green : COLOR.gray, fontSize: 15, fontWeight: '500' }}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsFocuse('Decline') }}
                            style={{ flex: 1, borderBottomWidth: 1, borderColor: isFocuse == 'Decline' ? COLOR.green : COLOR.lightgray, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: isFocuse == 'Decline' ? COLOR.green : COLOR.gray, fontSize: 15, fontWeight: '500' }}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={data.assigned_users} renderItem={list} />
                </View>
            </View>
        </View >
    )
}

export default MeetingDetails

