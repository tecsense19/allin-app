
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNCalendarEvents from 'react-native-calendar-events';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../Button/Button';

const CalendarView = () => {
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
        console.log(dayOfWeek);


    };
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

            // Ensure time is at the start and end of the day
            eventStartDate.setHours(0, 0, 0, 0);
            eventEndDate.setHours(23, 59, 59, 999);

            // Add the event to the device's calendar
            await RNCalendarEvents.saveEvent(eventText, {
                startDate: eventStartDate.toISOString(),
                endDate: eventEndDate.toISOString(),
                allDay: true,
            });

            // Update local state to reflect the new event
            const nextDate = new Date(selectedDate);
            nextDate.setDate(nextDate.getDate() + 1);
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



    // Generate markedDates with dots
    const markedDates = Object.keys(events).reduce((acc, date) => {
        acc[date] = {
            marked: true,
            dotColor: COLOR.green,
            activeOpacity: 10,
        };
        return acc;
    }, {});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Request calendar permissions
                const permission = await RNCalendarEvents.requestPermissions();
                if (permission !== 'authorized') {
                    Alert.alert('Permission denied', 'You need to grant calendar access to see events.');
                    setLoading(false);
                    return;
                }

                // Function to fetch events for a given year
                const fetchEventsForYear = async (year) => {
                    const startOfYear = new Date(Date.UTC(year, 0, 1)).toISOString();
                    const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)).toISOString();
                    return await RNCalendarEvents.fetchAllEvents(startOfYear, endOfYear);
                };

                // Fetch events incrementally from 2000 to 2100
                let allEvents = [];
                for (let year = 2000; year <= 2100; year++) {
                    const yearEvents = await fetchEventsForYear(year);
                    allEvents = allEvents.concat(yearEvents);
                }

                // Organize events by date with offset
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
                onDayLongPress={() => { setAddEventShow(true); }}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: { selected: true, marked: true, selectedColor: COLOR.green },
                }}
                theme={theme}
            />

            <View style={styles.eventContainer}>
                <View style={{ height: 70, width: 50, backgroundColor: COLOR.verylightgray, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20,}}>{selectedDate.split("-")[2]}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 5, color: COLOR.gray }}>{dayOfWeek.slice(0, 3)}</Text>
                </View>
                <FlatList
                    data={events[selectedDate] || []}
                    renderItem={renderEvent}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={styles.emptyDateText}>No events for this day</Text>}
                />
            </View>

            <Modal visible={addEventShow} transparent >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: 'auto', width: '90%', borderRadius: 10, backgroundColor: COLOR.white, padding: 20 }}>
                        <Text style={{ color: COLOR.titlecolor, fontWeight: 'bold', fontSize: 18, textAlign: 'center', }}>Create New Event</Text>
                        <Text style={{ color: COLOR.titlecolor, fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Event Title </Text>

                        <TextInput style={styles.input} placeholder="Enter Event Title" value={eventText} onChangeText={setEventText} />

                        <View style={{ flexDirection: 'row', opacity: 0.8, alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                            <Button bgColor={COLOR.orange} color={COLOR.white} title="Cancel" onPress={() => setAddEventShow(false)} marginHorizontal={5} />
                            <Button bgColor={COLOR.green} color={COLOR.white} title="Submit" onPress={() => { addEvent() }} marginHorizontal={5} />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default CalendarView;

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row', marginTop: 20
    },
    input: {
        height: 45,
        marginTop: 5,
        borderColor: COLOR.black,
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 8,
        borderRadius: 5,
        fontSize: 16

    },
    eventItem: {
        backgroundColor: COLOR.verylightgray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    eventText: {
        fontSize: 16,
        color: '#2d4150',
    },
    emptyDateText: {
        fontSize: 16,
        color: '#d9e1e8',
    },
});

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import RNCalendarEvents from 'react-native-calendar-events';
// import { COLOR } from '../../Assets/AllFactors/AllFactors';

// const CalendarView = () => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [eventText, setEventText] = useState('');
//     const [events, setEvents] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const today = new Date();
//         const todayString = today.toISOString().split('T')[0];
//         setSelectedDate(todayString);
//     }, []);

//     const handleDayPress = (day) => {
//         setSelectedDate(day.dateString);
//     };

//     const addEvent = async () => {
//         if (!eventText || !selectedDate) return;

//         try {
//             const eventStartDate = new Date(selectedDate);
//             const eventEndDate = new Date(selectedDate);

//             // Ensure time is at the start and end of the day
//             eventStartDate.setHours(0, 0, 0, 0);
//             eventEndDate.setHours(23, 59, 59, 999);

//             // Add the event to the device's calendar
//             await RNCalendarEvents.saveEvent(eventText, {
//                 startDate: eventStartDate.toISOString(),
//                 endDate: eventEndDate.toISOString(),
//                 allDay: true,
//             });

//             // Update local state to reflect the new event
//             setEvents((prevEvents) => {
//                 const newEvents = { ...prevEvents };
//                 if (!newEvents[selectedDate]) {
//                     newEvents[selectedDate] = [];
//                 }
//                 newEvents[selectedDate].push({ name: eventText });
//                 return newEvents;
//             });

//             setEventText('');
//         } catch (error) {
//             console.error('Failed to add event to calendar', error);
//         }
//     };

//     const renderEvent = ({ item }) => (
//         <View style={styles.eventItem}>
//             <Text style={styles.eventText}>{item.name}</Text>
//         </View>
//     );

//     const theme = {
//         backgroundColor: '#ffffff',
//         calendarBackground: 'white',
//         textSectionTitleColor: COLOR.gray,
//         selectedDayTextColor: '#ffffff',
//         todayTextColor: COLOR.green,
//         textDisabledColor: '#d9e1e8',
//         dotColor: '#00adf5',
//         selectedDotColor: '#ffffff',
//         arrowColor: COLOR.black,
//         monthTextColor: COLOR.black,
//         indicatorColor: 'blue',
//         textDayFontSize: 14,
//         textMonthFontSize: 18,
//         textDayHeaderFontSize: 14,
//         textDayFontWeight: '600',
//         textMonthFontWeight: 'bold',
//         textDayHeaderFontWeight: '600',
//     };

//     // Generate markedDates with dots
//     const markedDates = Object.keys(events).reduce((acc, date) => {
//         acc[date] = {
//             marked: true,
//             dotColor: COLOR.green,
//             activeOpacity: 10,
//         };
//         return acc;
//     }, {});

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 // Request calendar permissions
//                 const permission = await RNCalendarEvents.requestPermissions();
//                 if (permission !== 'authorized') {
//                     Alert.alert('Permission denied', 'You need to grant calendar access to see events.');
//                     setLoading(false);
//                     return;
//                 }

//                 // Function to fetch events for a given year
//                 const fetchEventsForYear = async (year) => {
//                     const startOfYear = new Date(Date.UTC(year, 0, 1)).toISOString();
//                     const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)).toISOString();
//                     return await RNCalendarEvents.fetchAllEvents(startOfYear, endOfYear);
//                 };

//                 // Fetch events incrementally from 2000 to 2100
//                 let allEvents = [];
//                 for (let year = 2000; year <= 2100; year++) {
//                     const yearEvents = await fetchEventsForYear(year);
//                     allEvents = allEvents.concat(yearEvents);
//                 }

//                 // Organize events by date with offset
//                 const eventsByDate = allEvents.reduce((acc, event) => {
//                     const eventDate = new Date(event.startDate);
//                     const nextDate = new Date(eventDate);
//                     nextDate.setDate(nextDate.getDate() + 1); // Shift event date by one day
//                     const nextDateString = nextDate.toISOString().split('T')[0];

//                     if (!acc[nextDateString]) {
//                         acc[nextDateString] = [];
//                     }
//                     acc[nextDateString].push({ name: event.title });
//                     return acc;
//                 }, {});

//                 setEvents(eventsByDate);
//             } catch (error) {
//                 console.error('Failed to fetch events', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEvents();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Calendar
//                 onDayPress={handleDayPress}
//                 markedDates={{
//                     ...markedDates,
//                     [selectedDate]: { selected: true, marked: true, selectedColor: COLOR.green },
//                 }}
//                 theme={theme}
//             />

//             <View style={styles.eventContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Enter event"
//                     value={eventText}
//                     onChangeText={setEventText}
//                 />
//                 <Button title="Add Event" onPress={addEvent} />

//                 <FlatList
//                     data={events[selectedDate] || []}
//                     renderItem={renderEvent}
//                     keyExtractor={(item, index) => index.toString()}
//                     ListEmptyComponent={<Text style={styles.emptyDateText}>No events for this day</Text>}
//                 />
//             </View>
//         </View>
//     );
// };

// export default CalendarView;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     eventContainer: {
//         flex: 1,
//         padding: 10,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 8,
//     },
//     eventItem: {
//         backgroundColor: COLOR.verylightgray,
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     eventText: {
//         fontSize: 16,
//         color: '#2d4150',
//     },
//     emptyDateText: {
//         fontSize: 16,
//         color: '#d9e1e8',
//     },
// });

