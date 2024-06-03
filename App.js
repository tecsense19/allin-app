import { View, Text, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import { getDataFromStorage } from './Src/Service/MyLocalInfo';
LogBox.ignoreAllLogs();
const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <StackScreen />
    </View>
  )
}

export default App
