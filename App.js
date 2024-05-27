import { View, Text, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StackScreen />
    </View>
  )
}

export default App

// import { View, Text } from 'react-native'
// import React from 'react'
// import IntlPhoneInput from 'react-native-intl-phone-input';
// import { COLOR } from './Src/Assets/AllFactors/AllFactors';

// const App = () => {
//   const onChangeText = ({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) => {
//     console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
//   };
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
//       <IntlPhoneInput onChangeText={onChangeText} defaultCountry="IN" />

//     </View>
//   )
// }

// export default App
