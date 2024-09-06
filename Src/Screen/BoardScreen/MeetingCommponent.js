import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../Service/AsyncStorage';
import { Meetings } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';

const MeetingCommponent = () => {
    const [meetingsData, setMeetingsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getMeetingsData = async () => {
        setLoading(true)
        const token = await getToken()
        Meetings(token)
            .then((res) => { setMeetingsData(res.data), setLoading(false) })
            .catch(() => { })
    }
    const meetingList = ({ item }) => {
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
        const member = item?.assigned_users
        const time12HourString = convertTime24To12(item.start_time);
        const dateTime12HourString = convertDateTimeTo12HourFormat(item.created_at);
        return (
            <View style={styles.meetinglistContainer}>
                <Text style={styles.meetingTxt}>Meeting</Text>
                <View style={styles.meetingDetailsView}>
                    <Text style={styles.Heading}>Title: <Text style={styles.HeadingContent}>{item.title}</Text></Text>
                    <Text style={styles.Heading}>Description:
                        <Text style={styles.HeadingContent}>{item.description?.length > 60 ? item.description.slice(0, 60) + '....' : item.description}</Text>
                    </Text>
                    <Text style={styles.Heading}>Meeting Date:
                        <Text style={styles.HeadingContent}>{item.date}</Text>
                    </Text>
                    <Text style={styles.Heading}>Meeting Time:
                        < Text style={styles.HeadingContent}>{time12HourString}</Text>
                    </Text>
                    <Text style={styles.Heading}>Location:
                        < Text style={styles.HeadingContent}>{item.location ? item.location : 'Empty'}</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: item.assigned_users.length <= 2 ? 60 : 75, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', position: 'absolute', right: item.assigned_users.length <= 2 ? -20 : 0, bottom: 35 }}>
                            {member?.map((i, ind) => {
                                return (
                                    <View>
                                        {ind < 3 ? <Image source={{ uri: i?.profile == null ? 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png' : 'https://allin.website4you.co.in/public/user-profile/' + i?.profile }} style={{
                                            height: 25, width: 25,
                                            borderRadius: 100, marginLeft: ind == 0 ? 0 : -10,
                                        }} /> : ''}
                                    </View>
                                )
                            })}
                            <Text style={styles.assignedUser}>{item.assigned_users?.length >= 3 ? (item.assigned_users?.length - 3 == 0 ? '' : '+' + (item.assigned_users?.length - 3)) : ""}</Text>
                        </View>
                    </View>
                    <Text style={styles.time}>{dateTime12HourString}</Text>
                </View>
            </View>
        )
    }
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
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12 },
    meetingFlatList: { marginHorizontal: 20, paddingBottom: 120 },
    meetingTxt: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLOR.black, marginLeft: 5 },
    meetinglistContainer: { padding: 5, backgroundColor: COLOR.lightgreen, margin: 5 },
    meetingDetailsView: { height: 'auto', borderRadius: 10, paddingHorizontal: 10, padding: 5, paddingLeft: 15 },
    assignedUser: { fontSize: 12, fontWeight: 'bold', color: COLOR.titlecolor, },

})