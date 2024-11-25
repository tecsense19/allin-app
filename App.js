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




