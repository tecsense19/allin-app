import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
import { MyID } from '../../../Service/AsyncStorage';
export const MsgMeeting = ({ data, onAccept, onDecline }) => {
    const [myid, setMyId] = useState('')
    const Member = data.messageDetails.users
    const acceptMeetingid = [data?.messageDetails?.accepted_users]
    const declineMeetingid = [data?.messageDetails?.decline_users]
    const getMyId = async () => {
        const myId = await MyID()
        setMyId(myId)
    }
    useEffect(() => {
        getMyId()
    }, [myid])
    const acceptresult = acceptMeetingid[0]?.split(',')?.map(Number).includes(myid);
    const declineresult = declineMeetingid[0]?.split(',')?.map(Number).includes(myid);

    return (
        <View style={styles.meetinglistContainer}>
            <Text style={styles.meetingTxt}>Meeting</Text>
            <View style={{ height: 1.5, backgroundColor: COLOR.lightgray, marginHorizontal: 15, marginTop: 5 }}></View>
            <View style={styles.meetingDetailsView}>
                <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: 'bold', marginTop: 5 }}>{data.messageDetails.title}</Text>

                <Text style={{ fontSize: 13, marginTop: 5, color: COLOR.gray, fontWeight: '600', }}>{data?.messageDetails.description?.length > 100 ? data?.messageDetails.description.slice(0, 100) + '....' : data?.messageDetails.description}</Text>
                <View style={{ height: 1.5, backgroundColor: COLOR.lightgray, marginTop: 10, }}></View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Image source={require('../../../Assets/Image/clock.png')} style={{ height: 17, width: 17, resizeMode: 'contain' }} />
                    <Text style={{ fontSize: 13, color: COLOR.gray, fontWeight: '600', marginLeft: 5 }}>{data.messageDetails.date}</Text>
                    <View style={{ height: 5, width: 5, backgroundColor: COLOR.lightgray, borderRadius: 10, marginLeft: 10 }}></View>
                    <Text style={{ fontSize: 13, color: COLOR.gray, fontWeight: '600', marginLeft: 10 }}>{data.messageDetails.start_time}</Text>

                </View>

                {data?.messageDetails?.mode == 'Online' ?
                    <TouchableOpacity onPress={() => Linking.openURL(data?.messageDetails?.meeting_url)} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                        <Image source={require('../../../Assets/Image/help.png')} style={{ height: 20, width: 20, tintColor: COLOR.gray }} />
                        <Text style={{ fontSize: 13, color: COLOR.slateblue, marginHorizontal: 8 }}>{data?.messageDetails?.meeting_url}</Text>
                    </TouchableOpacity>
                    : <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
                        <Image source={require('../../../Assets/Image/location.png')} style={{ height: 20, width: 20 }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, marginLeft: 8 }}>{data.messageDetails.location ? data.messageDetails.location : 'Empty'}</Text>
                    </View>}

                {data?.sentBy == 'loginUser' ? null
                    : acceptresult ?
                        <View style={{ backgroundColor: COLOR.lightgreen, paddingHorizontal: 10, padding: 5, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../../Assets/Image/approve.png')} style={{ height: 25, width: 25, marginRight: 5, }} />
                            <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: '600' }}>Accept</Text>
                        </View>
                        :
                        declineresult ?
                            <View style={{ backgroundColor: COLOR.lightgreen, paddingHorizontal: 10, padding: 5, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                <Image source={require('../../../Assets/Image/decline.png')} style={{ height: 30, width: 30, marginRight: 5, }} />
                                <Text style={{ fontSize: 15, color: COLOR.orange, fontWeight: '600' }}>Decline</Text>
                            </View>
                            : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 15, marginHorizontal: 10 }}>
                                <TouchableOpacity onPress={onAccept} style={{ backgroundColor: COLOR.green, height: 30, borderRadius: 30, width: '40%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 15, marginVertical: 10 }}>
                                    <Text style={{ color: COLOR.white, fontWeight: '600', fontSize: 15 }}>Accept</Text>
                                    <Image source={require('../../../Assets/Image/accept.png')} style={{ height: 20, width: 20, resizeMode: 'contain', marginLeft: -2, tintColor: COLOR.white }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onDecline} style={{ borderWidth: 1, borderColor: COLOR.green, height: 30, borderRadius: 30, width: '40%', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ color: COLOR.green, fontSize: 15, fontWeight: '600' }}>Decline</Text>
                                    <Image source={require('../../../Assets/Image/x.png')} style={{ height: 13, width: 13, resizeMode: 'contain', tintColor: COLOR.green }} />
                                </TouchableOpacity>
                            </View>}
            </View>
            <Text style={{ fontSize: 13, color: COLOR.black, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }}>{'Assigned Task:' + " " + Member.length + ' person'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 10, justifyContent: 'space-between', marginBottom: 5 }}>
                <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', }}>
                    {Member?.map((i, ind) => {
                        return (
                            <View>
                                {ind < 3 ? <Image source={{ uri: i?.profile ? i.profile : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png' }} style={{
                                    height: 30, width: 30,
                                    borderRadius: 100, marginLeft: ind == 0 ? 0 : -10,
                                }} /> : ''}
                            </View>
                        )
                    })}

                </View>
                <Text style={styles.time}>{data.time}</Text>

            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    Heading: { alignSelf: 'flex-start', marginTop: 10, fontWeight: 'bold', color: COLOR.black, fontSize: 13 },
    HeadingContent: { color: COLOR.black, fontSize: 12, fontWeight: '500' },
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12, marginRight: 15 },
    meetingFlatList: { marginHorizontal: 20, paddingBottom: 120 },
    meetingTxt: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLOR.black, marginLeft: 15, marginTop: 5 },
    meetinglistContainer: { padding: 5, backgroundColor: COLOR.white, margin: 5, borderRadius: 10, shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 3, marginTop: 20 },
    meetingDetailsView: { height: 'auto', borderRadius: 10, paddingHorizontal: 15, padding: 5, paddingLeft: 15 },
    assignedUser: { fontSize: 12, fontWeight: 'bold', color: COLOR.titlecolor, },

})