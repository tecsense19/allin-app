import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import { Event_Details } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';

const EventDetails = (props) => {
    const [isFocuse, setIsFocuse] = useState('Attend')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')
    const id = props?.route?.params.id
    console.log(data?.event?.attend_users, 'if my id check image another not check');

    let date = new Date(data?.event?.event_date);
    let options = {
        weekday: 'long',   // e.g., "Friday"
        day: '2-digit',    // e.g., "21"
        year: 'numeric',   // e.g., "2024"
    };
    let formattedDate = date.toLocaleString('en-US', options);
    let formattedTime = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    // console.log(typeof (data.users.attend_users ? 'true' : 'ddd'));

    const list = ({ item }) => {
        return (
            <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: COLOR.lightgray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.profile }} style={{ height: 27, width: 27, borderRadius: 27, }} />
                    <Text style={{ marginLeft: 8, fontSize: 13, color: COLOR.gray, fontWeight: '500' }}>{item.first_name + ' ' + item.last_name}</Text>
                </View>
                <Text style={{ color: COLOR.black, fontWeight: '600', fontSize: 13 }}>{isFocuse == 'Attend' ? 'Join' : 'Not Join'}</Text>
            </View>
        )
    }
    const getDetails = async () => {
        setLoading(true)
        await Event_Details(id)
            .then((res) => {
                if (res.status_code == 200) {
                    setLoading(false)
                    setData(res.data)
                }
            }).catch(() => {
            })

    }
    useEffect(() => {
        getDetails()
    }, [id])
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
                    <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold', marginTop: 15 }}>{data?.event?.event_title}</Text>
                    <Text style={{ fontSize: 13, color: COLOR.gray, marginTop: 10 }}>{data?.event?.event_description}</Text>
                    <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Image source={require('../../Assets/Image/clock.png')} style={{ height: 20, width: 20 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8, marginRight: 8 }}>{formattedDate}</Text>
                        <View style={{ height: 3, width: 3, backgroundColor: COLOR.gray, borderRadius: 5 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{formattedTime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                        <Image source={require('../../Assets/Image/location.png')} style={{ height: 20, width: 20 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{data?.event?.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => { setIsFocuse('Attend') }}
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderColor: isFocuse == 'Attend' ? COLOR.green : COLOR.lightgray, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: isFocuse == 'Attend' ? COLOR.green : COLOR.gray, fontSize: 15, fontWeight: '500' }}>Attend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsFocuse('NotAttend') }}
                            style={{ flex: 1, borderBottomWidth: 1, borderColor: isFocuse == 'NotAttend' ? COLOR.green : COLOR.lightgray, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: isFocuse == 'NotAttend' ? COLOR.green : COLOR.gray, fontSize: 15, fontWeight: '500' }}>Not Attend</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList ListEmptyComponent={(() => {
                        return (
                            <View style={{ marginVertical: 50, marginTop: 70, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: COLOR.lightgray, fontWeight: 'bold', fontSize: 16 }}>
                                    Not Found User
                                </Text>
                            </View>
                        )
                    })} data={isFocuse == 'Attend' ? data?.users?.attend_users : data?.users?.notattend_users} renderItem={list} />
                </View>
            </View>
            <Loader Retry={getDetails} visible={loading} />
        </View >
    )
}

export default EventDetails

