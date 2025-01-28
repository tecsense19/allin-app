
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNCalendarEvents from 'react-native-calendar-events';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../Button/Button';
import { openSettings } from 'react-native-permissions';

const CalenderComponent = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [eventText, setEventText] = useState('');
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);
    const [addEventShow, setAddEventShow] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState('');

    const getDayOfWeek = (date) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateObject = new Date(date.dateString);
        return dayNames[dateObject.getDay()];
    };
    useEffect(() => {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        setSelectedDate(todayString);
        const todayDayOfWeek = getDayOfWeek({ dateString: todayString });
        setDayOfWeek(todayDayOfWeek);
    }, []);
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        const dayOfWeek = getDayOfWeek(day);
        setDayOfWeek(dayOfWeek)
    };
    const handaleDayLongpress = (day) => {
        handleDayPress(day)
        setAddEventShow(true)
    }
    useEffect(() => {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        setSelectedDate(todayString);
    }, []);
    const addEvent = async () => {
        if (!eventText || !selectedDate) return;
        try {
            const eventStartDate = new Date(selectedDate);
            const eventEndDate = new Date(selectedDate);

            await RNCalendarEvents.saveEvent(eventText, {
                startDate: eventStartDate.toISOString(),
                endDate: eventEndDate.toISOString(),
                allDay: true,
            });
            const nextDate = new Date(selectedDate);
            nextDate.setDate(nextDate.getDate());
            const nextDateString = nextDate.toISOString().split('T')[0];
            setEvents((prevEvents) => {
                const newEvents = { ...prevEvents };
                if (!newEvents[nextDateString]) {
                    newEvents[nextDateString] = [];
                }
                newEvents[nextDateString].push({ name: eventText });
                return newEvents;
            });
            setAddEventShow(false)
            setEventText('');
        } catch (error) {
            console.error('Failed to add event to calendar', error);
        }
    };
    const renderEvent = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventText}>{item.name}</Text>
        </View>
    );
    const markedDates = Object.keys(events).reduce((acc, date) => {
        acc[date] = {
            marked: true, dotColor: COLOR.green, activeOpacity: 10,
        };
        return acc;
    }, {});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Request calendar permissions
                const permission = await RNCalendarEvents.requestPermissions();
                if (permission !== 'authorized') {
                    Alert.alert(
                        'Calendar Permission',
                        'You need to grant calendar access to see events.',
                        [
                            { text: 'Cancel', style: 'cancel', },
                            { text: 'Grant Permission', onPress: () => { openSettings() }, },
                        ],
                    );
                    return;
                }

                // const fetchEventsForYear = async (year) => {
                //     const startOfYear = new Date(Date.UTC(year, 0, 0)).toISOString();
                //     const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)).toISOString();
                //     return await RNCalendarEvents.fetchAllEvents(startOfYear, endOfYear);
                // };

                const fetchEventsForYear = async (year) => {
                    const startOfYear = new Date(year, 0, 1).toISOString();
                    const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999).toISOString();
                    return await RNCalendarEvents.fetchAllEvents(startOfYear, endOfYear);
                };
                let allEvents = [];
                for (let year = 2000; year <= 2100; year++) {
                    const yearEvents = await fetchEventsForYear(year);
                    allEvents = allEvents.concat(yearEvents);
                }
                const eventsByDate = allEvents.reduce((acc, event) => {
                    const eventDate = new Date(event.startDate);
                    const nextDate = new Date(eventDate);
                    nextDate.setDate(nextDate.getDate() + 1);
                    const nextDateString = nextDate.toISOString().split('T')[0];

                    if (!acc[nextDateString]) {
                        acc[nextDateString] = [];
                    }
                    acc[nextDateString].push({ name: event.title });
                    return acc;
                }, {});
                setEvents(eventsByDate);
            } catch (error) {
                console.error('Failed to fetch events', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [addEventShow]);

    return (
        <ScrollView style={styles.container}>
            <Calendar
                onDayPress={handleDayPress}
                onDayLongPress={handaleDayLongpress}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: { selected: true, marked: true, selectedColor: COLOR.green },
                }}
                theme={theme}
            />
            <View style={styles.eventContainer}>
                <View style={styles.EventDateAndDayContainer}>
                    <Text style={styles.dateTxt}>{selectedDate.split("-")[2]}</Text>
                    <Text style={styles.dayTxt}>{dayOfWeek.slice(0, 3)}</Text>
                </View>
                <FlatList
                    data={events[selectedDate] || []}
                    renderItem={renderEvent}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={styles.emptyDateText}>No events for this day</Text>}
                />
            </View>

            <Modal visible={addEventShow} transparent >
                <View style={styles.createEventModalContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.titleText}>Create New Event</Text>
                        <Text style={styles.eventTitleText}>Event Title </Text>
                        <TextInput style={styles.input} placeholder="Enter Event Title" value={eventText} onChangeText={setEventText} />
                        <View style={styles.buttonContainer}>
                            <Button bgColor={COLOR.orange} color={COLOR.white} title="Cancel" onPress={() => setAddEventShow(false)} marginHorizontal={5} />
                            <Button bgColor={COLOR.green} color={COLOR.white} title="Submit" onPress={() => { addEvent() }} marginHorizontal={5} />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default CalenderComponent;

const theme = {
    backgroundColor: '#ffffff',
    calendarBackground: 'white',
    textSectionTitleColor: COLOR.gray,
    selectedDayTextColor: '#ffffff',
    todayTextColor: COLOR.green,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: COLOR.black,
    monthTextColor: COLOR.black,
    indicatorColor: 'blue',
    textDayFontSize: 14,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
    textDayFontWeight: '600',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '600',
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },
    eventContainer: { flex: 1, padding: 10, flexDirection: 'row', marginTop: 20 },
    input: { height: 45, marginTop: 5, borderColor: COLOR.black, borderWidth: 1, marginBottom: 10, width: '100%', paddingHorizontal: 8, borderRadius: 5, fontSize: 16 },
    eventItem: { backgroundColor: COLOR.verylightgray, borderRadius: 5, padding: 10, marginBottom: 10, },
    eventText: { fontSize: 16, color: '#2d4150', },
    emptyDateText: { fontSize: 16, color: '#d9e1e8', },
    EventDateAndDayContainer: { height: 70, width: 50, backgroundColor: COLOR.verylightgray, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    dateTxt: { fontWeight: 'bold', fontSize: 20, },
    dayTxt: { fontWeight: 'bold', fontSize: 14, marginTop: 5, color: COLOR.gray },
    createEventModalContainer: { backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center', justifyContent: 'center' },
    modalContainer: { height: 'auto', width: '90%', borderRadius: 10, backgroundColor: COLOR.white, padding: 20 },
    titleText: { color: COLOR.titlecolor, fontWeight: 'bold', fontSize: 18, textAlign: 'center', },
    eventTitleText: { color: COLOR.titlecolor, fontWeight: 'bold', fontSize: 16, marginTop: 20 },
    buttonContainer: { flexDirection: 'row', opacity: 0.8, alignItems: 'center', alignSelf: 'center', marginTop: 20 }
});