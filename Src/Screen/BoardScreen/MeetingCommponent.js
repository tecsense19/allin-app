import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getToken, MyID } from '../../Service/AsyncStorage';
import { Meeting_Onhandale_Accept, Meetings, Task_Meeting_Event_Unread } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';

const MeetingCommponent = ({ onPress }) => {
    const [myid, setMyId] = useState('')
    const [meetingsData, setMeetingsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const id = meetingsData.map((item) => { return item.message_id });
    const commaS_id = id.join(',');

    const getMyId = async () => {
        const myId = await MyID()
        setMyId(myId)
    }
    useEffect(() => {
        getMyId()
    }, [myid])
    useEffect(() => {
        OnHandleRead()
    }, [commaS_id])

    const onHandalMeeting = async (msg, type) => {
        const token = await getToken()
        const myid = await MyID()
        const messageId = msg?.message_id;

        Meeting_Onhandale_Accept(token, messageId, myid, type)
            .then((res) => {
                if (res.status_code == 200) {
                    getMeetingsData()
                }
            })
    }
    const getMeetingsData = async () => {
        setLoading(true)
        const token = await getToken()
        Meetings(token)
            .then((res) => {
                if (res.status_code == 200) {
                    setLoading(false)
                    setMeetingsData(res.data)
                }
            })
    }
    const meetingList = ({ item }) => {
        const acceptMeetingid = [item?.accepted_users]
        const declineMeetingid = [item?.decline_users]
        const acceptresult = acceptMeetingid[0]?.split(',')?.map(Number)?.includes(myid);
        const declineresult = declineMeetingid[0]?.split(',')?.map(Number)?.includes(myid);

        const convertTime24To12 = (timeString) => {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12; // Handle 0 hours (midnight) and 12 hours (noon)
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${hours12}:${formattedMinutes} ${period}`;
        }
        function convertDateTimeTo12HourFormat(dateTimeString) {
            const [date, time] = dateTimeString.split(' ');
            const [hours, minutes, seconds] = time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12; // Handle 0 hours (midnight) and 12 hours (noon)
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${date} ${hours12}:${formattedMinutes} ${period}`;
        }
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'long', // full name of the day (e.g., Sunday)
                day: 'numeric',  // numeric day (e.g., 6)
                month: 'short',  // short form of the month (e.g., Oct)
                year: 'numeric', // numeric year (e.g., 2024)
            });
        };
        const member = item?.assigned_users
        const meetingtime12HourString = convertTime24To12(item.start_time);
        const MsgTime = convertDateTimeTo12HourFormat(item.created_at)
        const MeetingDate = formatDate(item.date)

        const id = meetingsData.map((item) => { return item.message_id });
        const commaS_id = id.join(',');

        const OnHandleRead = async () => {
            const token = await getToken()

            Task_Meeting_Event_Unread(token, 'Task', commaS_id)
                .then((res) => {
                    if (res.status_code == 200) {
                        getMeetingsData()
                    }
                })
        }
        const onNavigate = (e) => {
            onPress(e)
        }
        return (
            <TouchableOpacity
                onPress={() => onNavigate(item)}
                style={styles.meetinglistContainer}>
                <Text style={styles.meetingTxt}>Meeting</Text>
                <View style={{ height: 1.5, backgroundColor: COLOR.lightgray, marginHorizontal: 15, marginTop: 5 }}></View>
                <View style={styles.meetingDetailsView}>
                    <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: 'bold', marginTop: 5 }}>{item.title}</Text>

                    <Text style={{ fontSize: 13, marginTop: 5, color: COLOR.gray, fontWeight: '600', }}>{item.description?.length > 100 ? item.description.slice(0, 100) + '....' : item.description}</Text>
                    <View style={{ height: 1.5, backgroundColor: COLOR.lightgray, marginTop: 10, }}></View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../Assets/Image/clock.png')} style={{ height: 17, width: 17, resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 13, color: COLOR.gray, fontWeight: '600', marginLeft: 5 }}>{MeetingDate}</Text>
                        <View style={{ height: 5, width: 5, backgroundColor: COLOR.lightgray, borderRadius: 10, marginLeft: 10 }}></View>
                        <Text style={{ fontSize: 13, color: COLOR.gray, fontWeight: '600', marginLeft: 10 }}>{meetingtime12HourString}</Text>

                    </View>


                    {item?.mode == 'Online' ?
                        <TouchableOpacity onPress={() => Linking.openURL(item?.meeting_url)} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
                            <Image source={require('../../Assets/Image/help.png')} style={{ height: 20, width: 20, tintColor: COLOR.gray }} />
                            <Text style={{ fontSize: 13, color: COLOR.slateblue, fontWeight: '600', marginLeft: 10 }}>{item?.meeting_url}</Text>
                        </TouchableOpacity>
                        : <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
                            <Image source={require('../../Assets/Image/location.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 13, color: COLOR.gray, fontWeight: '600', marginLeft: 10 }}>{item?.location}</Text>
                        </View>}

                    {item?.created_by == myid ? null
                        : acceptresult ?
                            <View style={{ backgroundColor: COLOR.lightgreen, paddingHorizontal: 10, padding: 5, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                <Image source={require('../../Assets/Image/approve.png')} style={{ height: 25, width: 25, marginRight: 5, }} />
                                <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: '600' }}>Accept</Text>
                            </View>
                            :
                            declineresult ?
                                <View style={{ backgroundColor: COLOR.lightgreen, paddingHorizontal: 10, padding: 5, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                    <Image source={require('../../Assets/Image/decline.png')} style={{ height: 30, width: 30, marginRight: 5, }} />
                                    <Text style={{ fontSize: 15, color: COLOR.orange, fontWeight: '600' }}>Decline</Text>
                                </View>
                                : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 15, marginHorizontal: 10 }}>
                                    <TouchableOpacity onPress={() => onHandalMeeting(item, 'accept')} style={{ backgroundColor: COLOR.green, height: 30, borderRadius: 30, width: '40%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 15, marginVertical: 10 }}>
                                        <Text style={{ color: COLOR.white, fontWeight: '600', fontSize: 15 }}>Accept</Text>
                                        <Image source={require('../../Assets/Image/accept.png')} style={{ height: 20, width: 20, resizeMode: 'contain', marginLeft: -2, tintColor: COLOR.white }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onHandalMeeting(item, 'decline')} style={{ borderWidth: 1, borderColor: COLOR.green, height: 30, borderRadius: 30, width: '40%', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={{ color: COLOR.green, fontSize: 15, fontWeight: '600' }}>Decline</Text>
                                        <Image source={require('../../Assets/Image/x.png')} style={{ height: 13, width: 13, resizeMode: 'contain', tintColor: COLOR.green }} />
                                    </TouchableOpacity>
                                </View>}
                </View>
                <Text style={{ fontSize: 13, color: COLOR.black, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }}>{'Assigned Task:' + ' ' + member.length + ' person'}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 10, justifyContent: 'space-between', marginBottom: 5 }}>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', }}>
                        {member?.map((i, ind) => {
                            return (
                                <View>
                                    {ind < 3 ? <Image source={{ uri: i?.profile == null ? 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png' : 'https://allin.website4you.co.in/public/user-profile/' + i?.profile }} style={{
                                        height: 30, width: 30,
                                        borderRadius: 100, marginLeft: ind == 0 ? 0 : -10,
                                    }} /> : ''}
                                </View>
                            )
                        })}

                        {/* <Text style={styles.assignedUser}>{item.assigned_users?.length >= 3 ? (item.assigned_users?.length - 3 == 0 ? '' : '+' + (item.assigned_users?.length - 3)) : ""}</Text> */}
                    </View>
                    <Text style={styles.time}>{MsgTime}</Text>

                </View>

            </TouchableOpacity>
        )
    }
    const OnHandleRead = async () => {
        const token = await getToken()
        Task_Meeting_Event_Unread(token, 'Meeting', commaS_id)
            .then((res) => {
                if (res.status_code == 200) {
                }
            })
    }
    useEffect(() => {

        OnHandleRead()
    }, [commaS_id])
    useEffect(() => {
        getMeetingsData()
    }, [])
    return (
        <View>
            <FlatList data={meetingsData} renderItem={meetingList} style={styles.meetingFlatList} />
            <Loader visible={loading} Retry={getMeetingsData} />
        </View>
    )
}

export default MeetingCommponent

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