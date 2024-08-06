import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const CalendarView = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [eventText, setEventText] = useState('');
    const [events, setEvents] = useState({});

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const addEvent = () => {
        if (!eventText || !selectedDate) return;

        setEvents((prevEvents) => {
            const newEvents = { ...prevEvents };
            if (!newEvents[selectedDate]) {
                newEvents[selectedDate] = [];
            }
            newEvents[selectedDate].push({ name: eventText });
            return newEvents;
        });
        setEventText('');
    };

    const renderEvent = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventText}>{item.name}</Text>
        </View>
    );

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

    // Generate markedDates with dots
    const markedDates = Object.keys(events).reduce((acc, date) => {
        acc[date] = {
            marked: true,
            dotColor: COLOR.green,
            activeOpacity: 0,
        };
        return acc;
    }, {});

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: { selected: true, marked: true, selectedColor: COLOR.green },
                }}
                theme={theme}
            />

            <View style={styles.eventContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter event"
                    value={eventText}
                    onChangeText={setEventText}
                />
                <Button title="Add Event" onPress={addEvent} />

                <FlatList
                    data={events[selectedDate] || []}
                    renderItem={renderEvent}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={styles.emptyDateText}>No events for this day</Text>}
                />
            </View>
        </View>
    );
}

export default CalendarView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventContainer: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
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
