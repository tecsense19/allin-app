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
