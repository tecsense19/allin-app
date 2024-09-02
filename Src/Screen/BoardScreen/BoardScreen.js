

import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions, Alert, ScrollView,
    StyleSheet
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import CalendarView from '../../Custom/Calendar/Calender';
import { getToken } from '../../Service/AsyncStorage';
import { Meetings, Task_Done, Task_User_List } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';
const BoardScreen = () => {
    const [isAcctive, setIsAcctive] = useState('Screen');
    const [isFocus, setIsFocus] = useState('Receive');
    const [userData, setAllUserData] = useState([]);
    const [meetingsData, setMeetingsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handaleTaskDone = async (id) => {
        setLoading(true)
        const Token = await getToken();
        await Task_Done(Token, id)
            .then((res) => {
                if (res.status_code == 200) {
                    Alert.alert(res.message)
                    getuser()
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }
    const getuser = async () => {
        const Token = await getToken();
        setLoading(true)
        await Task_User_List(Token, isFocus)
            .then((res) => {
                if (res.status_code == 200) {
                    setAllUserData(res?.data?.userList);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log(e, 'userList screen');
                setLoading(false);
            });
    };
    const list = ({ item }) => {
        const userName = item.name
        return (
            <View style={{ backgroundColor: COLOR.white, paddingHorizontal: 5, marginTop: 5, paddingVertical: 5 }}>

                <View
                    style={{
                        padding: 8,
                        marginTop: 5,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.profile }} style={{ height: 55, width: 55, borderRadius: 50, marginRight: 10 }} />
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: COLOR.black,
                            }}>
                                {userName?.length >= 20 ? userName?.slice(0, 20) + ' . . . ' || '' : userName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} disabled={isFocus == 'Given' || item.taskStatus ? true : false} onPress={() => { handaleTaskDone(item.id) }}>
                            <Image source={item.taskStatus ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    };
    const getMeetingsData = async () => {
        setLoading(true)
        const token = await getToken()
        Meetings(token)
            .then((res) => {
                setMeetingsData(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)

            })
    }
    const meetingList = ({ item }) => {
        function convertTime24To12(timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12; // Handle 0 hours (midnight) and 12 hours (noon)
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
            return `${hours12}:${formattedMinutes} ${period}`;
        }
        function convertDateTimeTo12HourFormat(dateTimeString) {
            const [date, time] = dateTimeString.split(' ');
            const [hours, minutes, seconds] = time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12; // Handle 0 hours (midnight) and 12 hours (noon)
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
            return `${date} ${hours12}:${formattedMinutes} ${period}`;
        }
        const member = item?.assigned_users
        const time12HourString = convertTime24To12(item.start_time);
        const dateTime12HourString = convertDateTimeTo12HourFormat(item.created_at);

        return (
            <View style={{
                //  alignSelf: data?.sentBy == 'loginUser' ? 'flex-end' : 'flex-start', 
                padding: 5,
                backgroundColor: COLOR.lightgreen, margin: 5
            }}>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLOR.black, marginLeft: 5 }}>Meeting</Text>

                <View
                    onPress={''}
                    style={{
                        height: 'auto',
                        borderRadius: 10, paddingHorizontal: 10, padding: 5, paddingLeft: 15
                    }}>
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
                        <View style={{
                            width: item.assigned_users.length <= 2 ? 60 : 75,
                            alignSelf: 'center', flexDirection: 'row', alignItems: 'center', position: 'absolute',
                            right: item.assigned_users.length <= 2 ? -20 : 0,
                            bottom: 35
                        }}>
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

                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.titlecolor, }}>{item.assigned_users?.length >= 3 ? (item.assigned_users?.length - 3 == 0 ? '' : '+' + (item.assigned_users?.length - 3)) : ""}</Text>
                        </View>
                    </View>
                    <Text style={styles.time}>{dateTime12HourString}</Text>

                </View>
            </View>
        )
    }
    useEffect(() => {
        getuser()
    }, [isFocus])

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLOR.black,
            }}>
            <Text style={{ marginTop: 60, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: COLOR.white }}>Board</Text>
            <StatusBar hidden={false} barStyle={'light-content'} />

            <ScrollView
                style={{
                    flex: 1,
                    marginTop: 20,
                    backgroundColor: COLOR.white,
                    borderRadius: 20,
                    paddingTop: 15
                }}>
                <View style={{ height: 100, flex: 1, paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Screen' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Screen") }}>
                        <Title name={'Screen'} color={isAcctive == 'Screen' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Holidays' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Holidays") }}>
                        <Title name={'Holidays'} color={isAcctive == 'Holidays' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Meetings' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Meetings"), getMeetingsData() }}>
                        <Title name={'Meetings'} color={isAcctive == 'Meetings' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Events' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Events") }}>
                        <Title name={'Events'} color={isAcctive == 'Events' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity> */}

                </View>
                {isAcctive == 'Meetings' ?
                    <FlatList data={meetingsData} renderItem={meetingList} style={{ marginHorizontal: 20, paddingBottom: 120}} /> :
                    <View>
                        <CalendarView />
                        {/* <DropDown Month={'Today'} onPress={() => Alert.alert('today')} /> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
                            <TouchableOpacity style={{ margin: 10 }} onPress={() => setIsFocus('Receive')}>
                                <Text style={{ fontSize: 18, color: isFocus == 'Receive' ? COLOR.black : COLOR.gray, fontWeight: 'bold', }}>Received</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 10 }} onPress={() => setIsFocus('Given')}>
                                <Text style={{ fontSize: 18, color: isFocus == 'Given' ? COLOR.black : COLOR.gray, fontWeight: 'bold' }}>Given</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={{ marginBottom: 100 }}
                            renderItem={list}
                            data={userData}
                            bounces={false}
                        />
                    </View>

                }
            </ScrollView>
            <Loader visible={loading} Retry={getuser} />
        </View>
    );
};
const DropDown = ({ Month, onPress, isshow }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: COLOR.white, height: 55, borderRadius: 10, alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: { height: 0.5, width: 0 }, shadowColor: 'gray', shadowOpacity: 0.3, marginTop: 10
        }}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 0.9, textAlign: 'center' }}>{Month}</Text>
                <Image source={require('../../Assets/Image/back.png')} style={{ height: 24, width: 24, transform: [{ rotate: isshow ? '-270deg' : '270deg' }] }} />

            </View>



        </TouchableOpacity>
    )
}
const Title = ({ name, color }) => {
    return (
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: color }}>{name}</Text>
    )
}

export default BoardScreen;
const styles = StyleSheet.create({
    topButton:
        { flex: 1, backgroundColor: 'white', margin: 3, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.2, shadowOffset: { height: 1, width: 2 }, shadowRadius: 5, borderRadius: 10 },
    Heading: { alignSelf: 'flex-start', marginTop: 10, fontWeight: 'bold', color: COLOR.black, fontSize: 13 },
    HeadingContent: { color: COLOR.black, fontSize: 12, fontWeight: '500' },
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12 }

})