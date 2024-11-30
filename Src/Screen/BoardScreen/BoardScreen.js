import { View, Text, StatusBar, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import CalenderComponent from './CalenderComponent';
import MeetingCommponent from './MeetingCommponent';
import EventsCommponent from './EventsCommponent';
import TaskCommponent from './TaskCommponent';
import { getToken } from '../../Service/AsyncStorage';
import { Task_Meeting_Event_Count } from '../../Service/actions';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const BoardScreen = (props) => {
    const [isAcctive, setIsAcctive] = useState('Calender');
    const [taskCount, setTaskCount] = useState('');
    const [meetingCount, seetMeetingCount] = useState('');
    const [eventCount, setEventCount] = useState('');
    useEffect(() => {
        getCount()
        setInterval(() => {
            getCount()
        }, 2000);
    }, [])
    const getCount = async () => {
        const token = await getToken()
        Task_Meeting_Event_Count(token)
            .then((res) => {
                if (res.status_code == 200) {
                    seetMeetingCount(res.data.unread_counts.Meeting)
                    setTaskCount(res.data.unread_counts.Task)
                    setEventCount(res.data.unread_counts.event)
                }
            })
    }
    return (
        <View
            style={styles.screenMainContainer}>
            <Text style={styles.boardTxt}>Board</Text>
            <StatusBar hidden={false} barStyle={'light-content'} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>

                <View style={styles.deatilsContainer}>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Task' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Task") }}>
                        <Title name={'Task'} color={isAcctive == 'Task' ? COLOR.white : COLOR.black} />
                        {taskCount ? <View style={{ height: 18, width: 18, backgroundColor: '#DD5D3D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -7, right: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.white }}>{taskCount}</Text>
                        </View> : ''}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Calender' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Calender") }}>
                        <Title name={'Calendar'} color={isAcctive == 'Calender' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Meetings' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Meetings") }}>
                        <Title name={'Meetings'} color={isAcctive == 'Meetings' ? COLOR.white : COLOR.black} />
                        {meetingCount ? <View style={{ height: 18, width: 18, backgroundColor: '#DD5D3D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -7, right: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.white }}>{meetingCount}</Text>
                        </View> : ''}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Events' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Events") }}>
                        <Title name={'Events'} color={isAcctive == 'Events' ? COLOR.white : COLOR.black} />
                        {eventCount ? <View style={{ height: 18, width: 18, backgroundColor: '#DD5D3D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -7, right: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.white }}>{eventCount}</Text>
                        </View>
                            : ''}
                    </TouchableOpacity>
                </View>
                {isAcctive == 'Task' ? <TaskCommponent /> :
                    // {isAcctive == 'Task' ? <TaskCommponent onPress={(res) => { props.navigation.navigate('taskdetails', res) }} /> :
                    isAcctive == 'Calender' ? <CalenderComponent /> :
                        isAcctive == 'Meetings' ? <MeetingCommponent /> :
                            // isAcctive == 'Events' ? <EventsCommponent /> : null
                            // isAcctive == 'Meetings' ? <MeetingCommponent onPress={(res) => { props.navigation.navigate('meetingdetails', res) }} /> :
                            isAcctive == 'Events' ? <EventsCommponent onPress={(res) => { props.navigation.navigate('eventdetails', res) }} /> : null
                }
            </ScrollView>
        </View>
    );
};

const Title = ({ name, color }) => {
    return (
        <Text style={[styles.headerTopButtonTitle, { color: color }]}>{name}</Text>
    )
}
export default BoardScreen;

const styles = StyleSheet.create({
    topButton: { flex: 1, backgroundColor: 'white', margin: 3, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.2, shadowOffset: { height: 1, width: 2 }, shadowRadius: 5, borderRadius: 30 },
    headerTopButtonTitle: { fontSize: 15, fontWeight: 'bold', },
    screenMainContainer: { flex: 1, backgroundColor: COLOR.black, },
    boardTxt: { marginTop: 60, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: COLOR.white },
    scrollContainer: { flex: 1, marginTop: 20, backgroundColor: COLOR.white, borderRadius: 20, paddingTop: 15 },
    deatilsContainer: { height: 70, flex: 1, paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'center', flexDirection: 'row', marginBottom: 20 },

})