// AIzaSyBVNrTxbZva7cV4XDyM8isa5JYpqA1SJYo //map api key

import { View, Text, LogBox, Linking, Alert } from 'react-native'
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

// [SyntaxError: JSON Parse error: Unrecognized token '<'] 