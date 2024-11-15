import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const EventDetails = (props) => {
    const [isFocuse, setIsFocuse] = useState('Accept')
    const data = props?.route?.params

    let date = new Date(data?.event_date);

    let options = {
        weekday: 'long',   // e.g., "Friday"
        day: '2-digit',    // e.g., "21"
        year: 'numeric',   // e.g., "2024"
        // hour: '2-digit',   // e.g., "03"
        // minute: '2-digit', // e.g., "30"
        // hour12: true       // AM/PM format
    };
    let formattedDate = date.toLocaleString('en-US', options);
    let formattedTime = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })


    const list = ({ item }) => {
        console.log(item);

        return (
            <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: COLOR.lightgray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.profile }} style={{ height: 27, width: 27, borderRadius: 27, }} />
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
                    <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Event</Text>
                    <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                    <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold', marginTop: 15 }}>{data?.event_title}</Text>
                    <Text style={{ fontSize: 13, color: COLOR.gray, marginTop: 10 }}>{data?.event_description}</Text>
                    <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Image source={require('../../Assets/Image/clock.png')} style={{ height: 20, width: 20 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8, marginRight: 8 }}>{formattedDate}</Text>
                        <View style={{ height: 3, width: 3, backgroundColor: COLOR.gray, borderRadius: 5 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{formattedTime}</Text>
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
                    <FlatList data={data.usersArr} renderItem={list} />
                </View>
            </View>
        </View >
    )
}

export default EventDetails

