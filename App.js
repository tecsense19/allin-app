import { View, LogBox, TouchableOpacity, Image, } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import store from './Src/Service/Redux/Store';
import messaging from '@react-native-firebase/messaging';
import { AccountId, MyID } from './Src/Service/AsyncStorage';
import StackScreen from './Src/navigation/Stack/Stcak';

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





// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { BlurView } from '@react-native-community/blur'; // Optional, for blur effect

// const App = () => {
//   // Sample data array
//   const data = [
//     { id: '1', name: 'John' },
//     { id: '2', name: 'Jane' },
//     { id: '3', name: 'Jake' },
//     { id: '4', name: 'Jill' },
//   ];

//   const [selectedItem, setSelectedItem] = useState(null); // To track the selected item
//   const [isModalVisible, setModalVisible] = useState(false); // To control the modal visibility
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Position of the modal
//   const [highlightedItemId, setHighlightedItemId] = useState(null); // To track the highlighted item

//   // Function to handle long press on list item
//   const handleLongPress = (item, event) => {
//     const { pageY, pageX } = event.nativeEvent; // Get the position of the touch
//     setSelectedItem(item);
//     setModalPosition({ top: pageY, left: pageX }); // Set the modal position
//     setHighlightedItemId(item.id); // Highlight the pressed item
//     setModalVisible(true); // Show the modal
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setHighlightedItemId(null); // Reset the highlight
//   };

//   return (
//     <View style={styles.container}>
//       {/ Modal for displaying item details /}
//       <Modal
//         visible={isModalVisible}
//         animationType="fade"
//         transparent={true}
//         onRequestClose={handleCloseModal}
//       >
//         <TouchableWithoutFeedback onPress={handleCloseModal}>
//           <View style={styles.modalBackground}>
//             <BlurView style={[styles.modalContent, { top: modalPosition.top, left: modalPosition.left }]} blurType="light" blurAmount={10}>
//               <Text style={styles.modalText}>Selected Item: {selectedItem?.name}</Text>
//             </BlurView>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>

//       {/ List with blur effect /}
//       <View style={styles.listContainer}>
//         {data.map((item) => {
//           const isHighlighted = highlightedItemId === item.id;
//           return (
//             <TouchableOpacity
//               key={item.id}
//               onLongPress={(event) => handleLongPress(item, event)} // Capture long press event
//               style={[styles.item, isHighlighted && styles.highlightedItem]}
//               onLayout={(event) => {
//                 const layout = event.nativeEvent.layout;
//                 if (isHighlighted) {
//                   // Store the position of the highlighted item
//                   setModalPosition({ top: layout.y, left: layout.x });
//                 }
//               }}
//             >
//               <Text style={styles.text}>{item.name}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listContainer: {
//     width: '100%',
//     paddingTop: 20,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 10,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 5,
//     width: '80%',
//     alignItems: 'center',
//   },
//   highlightedItem: {
//     backgroundColor: '#d1e7fd', // Highlight color for the long-pressed item
//   },
//   text: {
//     fontSize: 18,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'flex-start', // Position the modal close to the clicked item
//     alignItems: 'flex-start',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
//   },
//   modalContent: {
//     position: 'absolute',
//     padding: 15,
//     borderRadius: 5,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     width: '80%',
//   },
//   modalText: {
//     fontSize: 18,
//     color: '#000',
//   },
// });
// export default App