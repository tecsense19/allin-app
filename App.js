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
