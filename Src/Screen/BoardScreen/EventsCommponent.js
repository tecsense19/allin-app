import { View, Text, FlatList, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import { Event_AttentOrNot, Event_List, Task_Meeting_Event_Unread } from '../../Service/actions'
import { getToken, MyID } from '../../Service/AsyncStorage'
import Timezone from 'react-native-timezone'
import Loader from '../../Custom/Loader/loader'

const EventsCommponent = ({ onPress }) => {
    const [EventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)
    const [myid, setMyId] = useState('')

    const getMyId = async () => {
        const myId = await MyID()
        setMyId(myId)
    }
    const getEventData = async () => {
        setLoading(true)
        const token = await getToken()
        const myid = await MyID()
        const timezone = Timezone.getTimeZone()

        await Event_List(token, myid, timezone)
            .then((res) => {
                if (res.status_code == 200) {
                    setEventData(res.data.eventList)
                    setLoading(false)

                } else {
                    // Alert.alert(res.message)
                    setLoading(false)
                }
            })
    }
    const id = EventData.map((item) => { return item.id });
    const commaS_id = id.join(',');
    const OnHandleRead = async () => {
        const token = await getToken()
        Task_Meeting_Event_Unread(token, 'Event', commaS_id)
            .then((res) => {
                if (res.status_code == 200) {
                } else {
                }
            })
    }
    useEffect(() => {
        getMyId()
        getEventData()
    }, [])
    useEffect(() => {
        OnHandleRead()
    }, [commaS_id])

    const renderUserImage = ({ item, index }) => (
        <View>
            {index < 3 ? <Image source={{ uri: item.profile }} style={{
                height: 16, width: 16,
                borderRadius: 100, marginLeft: index == 0 ? 0 : -10,
            }} /> : ''}
        </View>
    );
    const list = ({ item }) => {
        const AttendMembers = [item?.attend_users]
        const NotAttendMembers = [item?.notAttend_users]
        const AttendResult = AttendMembers[0]?.split(',')?.map(Number)?.includes(myid);
        const NotAttendResult = NotAttendMembers[0]?.split(',')?.map(Number)?.includes(myid);

        console.log(item);

        const formatDate = () => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const date = new Date(item.event_date);
            return date.toLocaleDateString('en-GB', options).replace(',', '');
        };
        const onNavigate = (i) => { onPress(i) }
        return (

            <TouchableOpacity
                onPress={() => { onNavigate(item) }}
                style={{ height: 194, shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { height: 1, width: 1 }, backgroundColor: COLOR.white, marginTop: 12, flexDirection: 'row', borderRadius: 15, flex: 1, padding: 10 }}>
                <View style={{ flex: 1.15, }}>
                    <Image source={{ uri: item.event_image }} style={{ height: 92, width: 102, borderRadius: 15 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../Assets/Image/date.png')} style={{ height: 12, width: 12, tintColor: COLOR.green }} />
                        <Text style={{ fontSize: 11, marginLeft: 5 }}>{formatDate()} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../Assets/Image/clock.png')} style={{ height: 12, width: 12, tintColor: COLOR.green }} />
                        <Text style={{ fontSize: 11, marginLeft: 5 }}>{item.event_time} </Text>
                    </View>
                </View>
                <View style={{ flex: 2, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.event_title}</Text>
                    <Text style={{ width: '100%', fontSize: 11, lineHeight: 15, color: COLOR.gray, marginTop: 8 }}>{item.event_description.length > 80 ? item.event_description.slice(0, 80) + '...' : item.event_description}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../../Assets/Image/location.png')} style={{ height: 12, width: 12, tintColor: COLOR.green }} />
                        <Text numberOfLines={2} style={{ fontSize: 11, marginLeft: 5, color: COLOR.gray, }}>{item.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View>
                            <FlatList
                                data={item.usersArr}
                                keyExtractor={(image, index) => index.toString()}
                                renderItem={renderUserImage}
                                horizontal
                            />
                        </View>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: COLOR.green }}>{item?.usersArr?.length - 3 <= 0 ? '' : ' +' + (item?.usersArr?.length - 3)}</Text>
                    </View>
                </View>
                {item.created_by !== myid ? null :
                    AttendResult ?
                        <View style={{ backgroundColor: COLOR.lightgreen, paddingHorizontal: 10, padding: 5, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row', position: 'absolute', bottom: 10, right: 10 }}>
                            <Image source={require('../../Assets/Image/approve.png')} style={{ height: 25, width: 25, marginRight: 5, }} />
                            <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: '600' }}>Attend</Text>
                        </View> :
                        NotAttendResult ? <View style={{ backgroundColor: COLOR.lightgreen, paddingHorizontal: 10, padding: 5, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row', position: 'absolute', bottom: 10, right: 10 }}>
                            <Image source={require('../../Assets/Image/decline.png')} style={{ height: 30, width: 30, marginRight: 5, }} />
                            <Text style={{ fontSize: 15, color: COLOR.orange, fontWeight: '600' }}>Not Attend</Text>
                        </View> :
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 15, marginHorizontal: 10, position: 'absolute', right: 0, bottom: 0, width: '65%' }}>
                                <TouchableOpacity onPress={() => onHandalEvent(item, 'attend')} style={{ backgroundColor: COLOR.green, height: 30, borderRadius: 30, width: '41%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, marginVertical: 10 }}>
                                    <Text style={{ color: COLOR.white, fontWeight: '600', fontSize: 14 }}>Attend</Text>
                                    <Image source={require('../../Assets/Image/accept.png')} style={{ height: 18, width: 18, resizeMode: 'contain', marginLeft: -2, tintColor: COLOR.white, marginLeft: 5 }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onHandalEvent(item, 'notattend')} style={{ borderWidth: 1, borderColor: COLOR.green, height: 30, borderRadius: 30, width: '53%', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ color: COLOR.green, fontSize: 14, fontWeight: '600' }}>Not Attend</Text>
                                    <Image source={require('../../Assets/Image/x.png')} style={{ height: 12, width: 12, resizeMode: 'contain', tintColor: COLOR.green, marginLeft: 5 }} />
                                </TouchableOpacity>
                            </View>}


            </TouchableOpacity>
        )
    }
    const onHandalEvent = async (msg, type) => {
        const myid = await MyID()
        const id = msg?.id;
        Event_AttentOrNot(id, myid, type)
            .then((res) => {
                if (res.status_code == 200) {
                    getEventData()
                }
            })
    }
    return (
        <View style={{ backgroundColor: COLOR.white, flex: 1 }}>
            <FlatList bounces={false} data={EventData} renderItem={list} style={{ paddingHorizontal: 20, paddingBottom: 120 }} />
            <Loader visible={loading} Retry={getEventData} />
        </View>
    )
}

export default EventsCommponent