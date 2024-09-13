import { View, Text, StatusBar, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import CalenderComponent from './CalenderComponent';
import MeetingCommponent from './MeetingCommponent';
import EventsCommponent from './EventsCommponent';
import TaskCommponent from './TaskCommponent';
const BoardScreen = () => {
    const [isAcctive, setIsAcctive] = useState('Calender');

    return (
        <View
            style={styles.screenMainContainer}>
            <Text style={styles.boardTxt}>Board</Text>
            <StatusBar hidden={false} barStyle={'light-content'} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>

                <View style={styles.deatilsContainer}>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Task' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Task") }}>
                        <Title name={'Task'} color={isAcctive == 'Task' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Calender' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Calender") }}>
                        <Title name={'Calender'} color={isAcctive == 'Calender' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Meetings' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Meetings") }}>
                        <Title name={'Meetings'} color={isAcctive == 'Meetings' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { backgroundColor: isAcctive == 'Events' ? COLOR.green : COLOR.white }]} onPress={() => { setIsAcctive("Events") }}>
                        <Title name={'Events'} color={isAcctive == 'Events' ? COLOR.white : COLOR.black} />
                    </TouchableOpacity>
                </View>
                {isAcctive == 'Task' ? <TaskCommponent /> :
                    isAcctive == 'Calender' ? <CalenderComponent /> :
                        isAcctive == 'Meetings' ? <MeetingCommponent /> :
                            isAcctive == 'Events' ? <EventsCommponent /> : null
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
    deatilsContainer: { height: 70, flex: 1, paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'center', flexDirection: 'row', marginBottom: 10 },

})