import { View, Text, LogBox, Linking, Alert } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();
const App = () => {

  useEffect(() => {
    // saveContact()
    getFcmToken()
  }, [])

  const getFcmToken = async () => {
    try {
      const D_token = await messaging().getToken();
      console.log(D_token);
      // setDevicetoken(D_token)
    } catch (error) {
      console.error('Error getting FCM token:', error)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <StackScreen />
    </View>
  )
}
export default App