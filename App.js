// AIzaSyBVNrTxbZva7cV4XDyM8isa5JYpqA1SJYo //map api key

import { View, Text, LogBox, Linking, Alert } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import { Provider } from 'react-redux';
import store from './Src/Service/Redux/Store';

LogBox.ignoreAllLogs();
const App = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StackScreen />
      </View>
    </Provider>
  )
}
export default App

// [SyntaxError: JSON Parse error: Unrecognized token '<'] 