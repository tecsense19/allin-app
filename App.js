import { View, LogBox, TouchableOpacity, Image, } from 'react-native'
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
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const App = () => {
//   // State to store the touch position
//   const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

//   // Handle touch event and update position
//   const handleTouch = (e) => {
//     const { locationX, locationY } = e.nativeEvent;
//     setTouchPosition({ x: locationX, y: locationY });
//   };

//   return (
//     <TouchableOpacity style={styles.container} onLongPress={handleTouch}>
//       <View style={styles.touchableArea}>
//         <Text>Touch anywhere on the screen</Text>
//       </View>

//       {/* Display "Hello World" at the touch position */}
//       <Text style={[styles.helloText, { top: touchPosition.y, left: touchPosition.x }]}>
//         Hello World
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   touchableArea: {
//     width: 300,
//     height: 200,
//     backgroundColor: '#DDDDDD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   helloText: {
//     position: 'absolute',
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'blue',
//   },
// });

// export default App;
