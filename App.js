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
// import { View, Button } from 'react-native';
// import SoundPlayer from 'react-native-sound-player';

// const AudioPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const playSound = async () => {
//     try {
//       await SoundPlayer.playUrl('https://allin.website4you.co.in/public/chat-file/pitbull20-20fireball20ft20mp3cut-net_1718286096.mp3');
//       setIsPlaying(true);
//     } catch (error) {
//       console.log('Error playing sound:', error);
//     }
//   };

//   const stopSound = async () => {
//     try {
//       await SoundPlayer.stop();
//       setIsPlaying(false);
//     } catch (error) {
//       console.log('Error stopping sound:', error);
//     }
//   };

//   return (
//     <View style={{flex:1}}>
//       <Button
//         title={isPlaying ? 'Stop' : 'Play'}
//         onPress={isPlaying ? stopSound : playSound}
//       />
//     </View>
//   );
// };

// export default AudioPlayer;
