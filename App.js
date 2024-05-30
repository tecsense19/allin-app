import { View, Text, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StackScreen />
    </View>
  )
}

export default App


// // // import React from 'react';
// // // import { View, Text, FlatList } from 'react-native';

// // // const data = {
// // //   "Today": {
// // //     "Today": [[{}, {}, {}, {}, {}, {}, {}, {}]]
// // //   },
// // //   "Yesterday": {
// // //     "Yesterday": [[{}, {}]]
// // //   },
// // //   "20/may/20": {
// // //     "20/may/20": [[{}, {}]]
// // //   }
// // // };

// // // const printTitles = (data) => {
// // //   const result = [];

// // //   for (const day in data) {
// // //     if (data.hasOwnProperty(day)) {
// // //       result.push({ title: day, objects: data[day][day] });
// // //     }
// // //   }

// // //   return result.reverse(); // Reverse the order of the days
// // // };

// // // const App = () => {
// // //   const listData = printTitles(data);

// // //   return (
// // //     <View style={{ flex: 1, padding: 20 }}>
// // //       {listData.map((item, index) => (
// // //         <View key={index}>
// // //           <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{item.title}</Text>
// // //           <FlatList
// // //             data={item.objects[0].reverse()} // Reverse the order of the objects
// // //             renderItem={({ item }) => (
// // //               <View style={{ marginBottom: 5 }}>
// // //                 <Text>{JSON.stringify(item)}</Text>
// // //               </View>
// // //             )}
// // //             keyExtractor={(item, index) => index.toString()}
// // //           />
// // //         </View>
// // //       ))}
// // //     </View>
// // //   );
// // // };

// // // export default App;

// import React from 'react';
// import { View, Text } from 'react-native';

// const chatData = {
//   "Yesterday": {
//     "Yesterday": [
//       {
//         "messageId": 10,
//         "messageType": "Text",
//         "time": "14:22 pm",
//         "sentBy": "User",
//         "messageDetails": "This is a test message."
//       }
//     ]
//   },
//   "28 May 2024": {
//     "28 May 2024": [
//       {
//         "messageId": 8,
//         "messageType": "Meeting",
//         "time": "13:45 pm",
//         "sentBy": "loginUser",
//         "messageDetails": {
//           "id": 2,
//           "message_id": 8,
//           "mode": "Online",
//           "title": "Test",
//           "description": "Test",
//           "date": "2024-02-10",
//           "start_time": "18:30:00",
//           "end_time": "19:30:00",
//           "meeting_url": "https://www.google.com/"
//         }
//       },
//       {
//         "messageId": 7,
//         "messageType": "Meeting",
//         "time": "13:43 pm",
//         "sentBy": "loginUser",
//         "messageDetails": {
//           "id": 1,
//           "message_id": 7,
//           "mode": "Offline",
//           "title": "Test",
//           "description": "Test",
//           "date": "2024-02-10",
//           "start_time": "18:30:00",
//           "end_time": "19:30:00",
//           "meeting_url": null
//         }
//       },
//       {
//         "messageId": 6,
//         "messageType": "Meeting",
//         "time": "13:43 pm",
//         "sentBy": "loginUser",
//         "messageDetails": null
//       },
//       {
//         "messageId": 5,
//         "messageType": "Meeting",
//         "time": "13:41 pm",
//         "sentBy": "loginUser",
//         "messageDetails": null
//       },
//       {
//         "messageId": 4,
//         "messageType": "Task Chat",
//         "time": "12:38 pm",
//         "sentBy": "loginUser",
//         "messageDetails": []
//       },
//       {
//         "messageId": 3,
//         "messageType": "Task Chat",
//         "time": "12:31 pm",
//         "sentBy": "loginUser",
//         "messageDetails": []
//       }
//     ]
//   },
//   "27 May 2024": {
//     "27 May 2024": [
//       {
//         "messageId": 2,
//         "messageType": "Task Chat",
//         "time": "12:25 pm",
//         "sentBy": "loginUser",
//         "messageDetails": []
//       },
//       {
//         "messageId": 1,
//         "messageType": "Task",
//         "time": "11:56 am",
//         "sentBy": "loginUser",
//         "messageDetails": {
//           "id": 1,
//           "message_id": 1,
//           "task_name": "CRUD Module",
//           "task_description": null
//         }
//       }
//     ]
//   }
// };

// const ChatMessage = ({ message }) => {
//   const renderMessage = () => {
//     switch (message.messageType) {
//       case 'Text':
//         return <Text>{message?.messageDetails}</Text>;
//       case 'Meeting':
//         return (
//           <View>
//             <Text>{message?.messageDetails?.title}</Text>
//             <Text>{message?.messageDetails?.mode}</Text>
//             <Text>{message?.messageDetails?.date}</Text>
//             <Text>{message?.messageDetails?.start_time} - {message?.messageDetails?.end_time}</Text>
//             {message?.messageDetails?.meeting_url && (
//               <Text>{message?.messageDetails?.meeting_url}</Text>
//             )}
//           </View>
//         );
//       case 'Task Chat':
//         return <Text>No messages</Text>;
//       case 'Task':
//         return (
//           <View>
//             <Text>{message?.messageDetails?.task_name}</Text>
//             <Text>{message?.messageDetails?.task_description || 'No description'}</Text>
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <View>
//       <Text style={{}}>{message.time}</Text>
//       {renderMessage()}
//     </View>
//   );
// };

// const App = () => {
//   return (
//     <View>
//       {Object.keys(chatData).map(date => (
//         <View key={date}>
//           <Text>{date}</Text>
//           {chatData[date][date].map(message => (
//             <ChatMessage key={message.messageId} message={message} />
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// export default App;
