import { View, Text, Image, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import { Meeting_Details } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';

const MeetingDetails = (props) => {
    const [isFocuse, setIsFocuse] = useState('Accept')
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    const MeetingId = props?.route?.params?.message_id ? props?.route?.params?.message_id : props?.route?.params.messageDetails.message_id

    const date = new Date(data?.meeting?.created_at);
    const options = { weekday: 'long', day: 'numeric', year: 'numeric' };



    const formattedDate = date.toLocaleDateString('en-US', options);

    let formattedTime = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    const list = ({ item }) => {
        return (
            <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item?.profile }} style={{ height: 27, width: 27, borderRadius: 27, }} />
                    <Text style={{ marginLeft: 8, fontSize: 13, color: COLOR.gray, fontWeight: '500' }}>{item.first_name + ' ' + item.last_name}</Text>
                </View>
                <Text style={{ color: COLOR.black, fontWeight: '600', fontSize: 13 }}>Join</Text>
            </View>
        )
    }
    const getMeetingDetails = async () => {
        Meeting_Details(MeetingId)
            .then((res) => {
                if (res.status_code == 200) {
                    setData(res.data);
                    setLoading(false)
                }
            })
    }
    useEffect(() => {
        getMeetingDetails()
    }, [MeetingId])
    return (
        <View style={{
            backgroundColor: COLOR.black, flex: 1
        }}>
            <View style={{ paddingHorizontal: 30 }} >
                <NavigateHeader onPress={() => { props.navigation.goBack() }} />
            </View>
            <View style={{ marginTop: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, flex: 1, backgroundColor: COLOR.white, }}>
                {/*card view */}
                <ScrollView bounces={false} style={{ flex: 1, paddingHorizontal: 30 }}>
                    {!loading && <View style={{ backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 7, marginTop: 30, borderRadius: 5, shadowOffset: { height: 1, width: 1 }, padding: 30 }}>
                        <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Meeting</Text>
                        <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                        <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: 'bold', marginTop: 15 }}>{data?.meeting?.title}</Text>
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginTop: 10 }}>{data?.meeting?.description}</Text>
                        <View style={{ borderBottomWidth: 1, marginTop: 15, borderColor: COLOR.lightgray }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <Image source={require('../../Assets/Image/clock.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8, marginRight: 8 }}>{formattedDate}</Text>
                            <View style={{ height: 3, width: 3, backgroundColor: COLOR.gray, borderRadius: 5 }} />
                            <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{formattedTime}</Text>
                        </View>
                        {data?.meeting?.mode == 'Online' ?
                            <TouchableOpacity onPress={() => Linking.openURL(data?.meeting?.meeting_url)} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                                <Image source={require('../../Assets/Image/help.png')} style={{ height: 20, width: 20, tintColor: COLOR.gray }} />
                                <Text style={{ fontSize: 13, color: COLOR.slateblue, marginLeft: 8 }}>{data?.meeting?.meeting_url}</Text>
                            </TouchableOpacity>
                            : <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                                <Image source={require('../../Assets/Image/location.png')} style={{ height: 20, width: 20 }} />
                                <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{data?.meeting?.location}</Text>
                            </View>}
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
                        <FlatList bounces={false}
                            renderItem={list}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{ borderBottomWidth: 0.51, borderColor: COLOR.lightgray }} />
                                )
                            }}
                            ListEmptyComponent={(() => {
                                return (
                                    <View style={{ marginVertical: 50, marginTop: 70, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: COLOR.lightgray, fontWeight: 'bold', fontSize: 16 }}>
                                            User Not Found
                                        </Text>
                                    </View>
                                )
                            })} data={isFocuse == 'Accept' ? data?.users?.accepted_users : data?.users?.declined_users}
                        />
                    </View>}
                </ScrollView>
            </View>
            <Loader visible={loading} Retry={() => props.navigation.goBack()} />
        </View >
    )
}

export default MeetingDetails

