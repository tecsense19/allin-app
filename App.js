import { View, Text, LogBox } from 'react-native'
import React from 'react'
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

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Animated } from 'react-native';

// const Dropdown = ({ options }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const translateY = useState(new Animated.Value(-200))[0];

//   const toggleDropdown = () => {
//     if (isOpen) {
//       Animated.timing(translateY, {
//         toValue: -200, // Slide up to hide the dropdown
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setIsOpen(false));
//     } else {
//       setIsOpen(true);
//       Animated.timing(translateY, {
//         toValue: 0, // Slide down to show the dropdown
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={toggleDropdown}>
//         <Text style={{ fontSize: 18 }}>
//           {selectedOption || 'Select an option'}
//         </Text>
//       </TouchableOpacity>
//       <Animated.View
//         style={{
//           position: 'absolute',
//           top: 40,
//           left: 0,
//           right: 0,
//           backgroundColor: 'white',
//           borderColor: 'gray',
//           borderWidth: 1,
//           transform: [{ translateY }],
//           zIndex: 1,
//         }}
//       >
//         {isOpen &&
//           options.map((option, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleOptionSelect(option)}
//               style={{ padding: 10 }}
//             >
//               <Text>{option}</Text>
//             </TouchableOpacity>
//           ))}
//       </Animated.View>
//     </View>
//   );
// };

// // Example usage:
// const MyComponent = () => {
//   const options = ['Option 1', 'Option 2', 'Option 3'];
  
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Dropdown options={options} />
//     </View>
//   );
// };

// export default MyComponent;



// import React, { useState, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// const Stopwatch = () => {
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const intervalRef = useRef(null);

//   const startStopwatch = () => {
//     setIsRunning(true);
//     intervalRef.current = setInterval(() => {
//       setElapsedTime(prevTime => prevTime + 1);
//     }, 1000);
//   };

//   const stopStopwatch = () => {
//     setIsRunning(false);
//     clearInterval(intervalRef.current);
//   };

//   const resetStopwatch = () => {
//     setIsRunning(false);
//     clearInterval(intervalRef.current);
//     setElapsedTime(0);
//   };

//   const formatTime = timeInSeconds => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
//       <View style={styles.buttonContainer}>
//         {!isRunning ? (
//           <TouchableOpacity onPress={startStopwatch} style={styles.button}>
//             <Text style={styles.buttonText}>Start</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity onPress={stopStopwatch} style={styles.button}>
//             <Text style={styles.buttonText}>Stop</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity onPress={resetStopwatch} style={styles.button}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
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
//   timerText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: 'skyblue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginHorizontal: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'white',
//   },
// });

// export default Stopwatch;
