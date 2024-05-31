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

// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import Contact from 'react-native-contacts'
// const App = () => {
//   useEffect(() => {

// Contact.getAll().then((res)=>{console.log(res);})
//   }, [])
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App