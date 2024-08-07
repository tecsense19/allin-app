// AIzaSyBVNrTxbZva7cV4XDyM8isa5JYpqA1SJYo //map api key

import { View, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import { Provider } from 'react-redux';
import store from './Src/Service/Redux/Store';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();
const App = () => {
  // useEffect(() => { getFcmToken() }, [])

  // const getFcmToken = async () => {
  //   try {
  //     const D_token = await messaging().getToken();
  //     console.log(D_token, '====================================');

  //   } catch (error) { console.error('Error getting FCM token:', error) }
  // }


  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StackScreen />
      </View>
    </Provider>
  )
}
export default App
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
// import RNCalendarEvents from 'react-native-calendar-events';

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         // Request calendar permissions
//         const permission = await RNCalendarEvents.requestPermissions();
//         if (permission !== 'authorized') {
//           Alert.alert('Permission denied', 'You need to grant calendar access to see events.');
//           setLoading(false);
//           return;
//         }

//         // Function to fetch events for a given year
//         const fetchEventsForYear = async (year) => {
//           const startOfYear = new Date(year, 0, 1).toISOString();
//           const endOfYear = new Date(year, 11, 31).toISOString();
//           return await RNCalendarEvents.fetchAllEvents(startOfYear, endOfYear);
//         };

//         // Fetch events incrementally from 2000 to 2100
//         let allEvents = [];
//         for (let year = 2000; year <= 2100; year++) {
//           const yearEvents = await fetchEventsForYear(year);
//           allEvents = allEvents.concat(yearEvents);
//         }

//         setEvents(allEvents);
//       } catch (error) {
//         console.error('Failed to fetch events', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 18, marginBottom: 10 }}>All Calendar Events:</Text>
//       {events.length > 0 ? (
//         <FlatList
//           data={events}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={{ marginBottom: 15 }}>
//               <Text style={{ fontSize: 16 }}>{item.title}</Text>
//               <Text>{new Date(item.startDate).toLocaleString()}</Text>
//               <Text>{new Date(item.endDate).toLocaleString()}</Text>
//             </View>
//           )}
//         />
//       ) : (
//         <Text>No events found.</Text>
//       )}
//     </View>
//   );
// };

// export default App;
