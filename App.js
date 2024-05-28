import { View, Text, LogBox } from 'react-native'
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
