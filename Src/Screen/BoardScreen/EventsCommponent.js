import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import { Event_List, Task_Meeting_Event_Unread } from '../../Service/actions'
import { getToken, MyID } from '../../Service/AsyncStorage'
import Timezone from 'react-native-timezone'
import Loader from '../../Custom/Loader/loader'

const EventsCommponent = () => {
    const [EventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)

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
                    // Alert.alert(res.message)
                }
            })
    }
    useEffect(() => {
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
        console.log(item);

        const formatDate = () => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const date = new Date(item.event_date);
            return date.toLocaleDateString('en-GB', options).replace(',', '');
        };


        return (
            // <View style={{ height: 164, shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { height: 1, width: 1 }, backgroundColor: COLOR.white, marginTop: 12, flexDirection: 'row', alignItems: 'center', borderRadius: 15 }}>
            //     <Image source={{ uri: item.event_image }} style={{ height: 144, width: 130, marginLeft: 10, borderRadius: 15 }} />
            //     <View style={{ flex: 1, padding: 10 }}>
            //         <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.event_title}</Text>
            //         <Text style={{ width: '100%', fontSize: 11, lineHeight: 15, color: COLOR.gray, marginTop: 8 }}>{item.event_description.length > 80 ? item.event_description.slice(0, 80) + '...' : item.event_description}</Text>

            //         <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 15 }}>
            //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //                 <Image source={require('../../Assets/Image/date.png')} style={{ height: 12, width: 12, tintColor: COLOR.green }} />
            //                 <Text style={{ fontSize: 11, marginLeft: 5 }}>{formatDate()} </Text>
            //             </View>
            //             <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            //                 <Image source={require('../../Assets/Image/clock.png')} style={{ height: 12, width: 12, tintColor: COLOR.green }} />
            //                 <Text style={{ fontSize: 11, marginLeft: 5 }}>{item.event_time} </Text>
            //             </View>
            //         </View>

            //         <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
            //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //                 <Image source={require('../../Assets/Image/location.png')} style={{ height: 12, width: 12, tintColor: COLOR.green }} />
            //                 <Text style={{ fontSize: 11, marginLeft: 5 }}>{item.location.length > 20 ? item.location.slice(0, 20) + '...' : item.location}</Text>
            //             </View>
            //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //                 <View>
            //                     <FlatList
            //                         data={item.usersArr}
            //                         keyExtractor={(image, index) => index.toString()}
            //                         renderItem={renderUserImage}
            //                         horizontal
            //                     />
            //                 </View>
            //                 <Text style={{ fontSize: 11, fontWeight: 'bold', color: COLOR.green }}>{item?.usersArr?.length - 3 <= 0 ? '' : ' +' + (item?.usersArr?.length - 3)}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>
            <View style={{ height: 164, shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { height: 1, width: 1 }, backgroundColor: COLOR.white, marginTop: 12, flexDirection: 'row', borderRadius: 15, flex: 1, padding: 10 }}>
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
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: COLOR.white, flex: 1 }}>
            <FlatList bounces={false} data={EventData} renderItem={list} style={{ paddingHorizontal: 20, paddingBottom: 120 }} />
            <Loader visible={loading} Retry={getEventData} />
        </View>
    )
}

export default EventsCommponent