
import { View, LogBox, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import { Provider } from 'react-redux';
import store from './Src/Service/Redux/Store';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();
const App = () => {

  useEffect(() => { getFcmToken() }, [])
  const getFcmToken = async () => {
    try {
      const D_token = await messaging().getToken();
      console.log(D_token, '====================================');
    } catch (error) { console.error('Error getting FCM token:', error) }
  }


  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StackScreen />

      </View>
    </Provider>
  )
}
export default App

// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { User_List, User_Mobile_Number } from './Src/Service/actions'
// import { getToken } from './Src/Service/AsyncStorage'
// import { PERMISSIONS, request } from 'react-native-permissions'
// import Contacts from 'react-native-contacts';


// const App = () => {
//   const [contactsData, setContacts] = useState([])
//   const [ApiContact, setApiContact] = useState([])

//   const getApiMobailNumbers = async () => {
//     const token = await getToken()
//     const data = await User_List('', token)
//     console.log(data.data.userList);

//   }
//   const requestContactsPermission = async () => {
//     const result = await request(PERMISSIONS.IOS.CONTACTS);
//     if (result === 'granted') {
//       Contacts.getAll().then(contacts => {
//         setContacts(contacts)
//         // console.log(contacts);

//       })
//     }
//     else { customAlert(); }
//   };
//   const transformData = (data) => ({
//     givenName: data.givenName,
//     phoneNumbers: data.phoneNumbers.map(phone => phone.number)
//   });
//   const transformedDataArray = contactsData.map(transformData);
//   useEffect(() => {
//     getApiMobailNumbers(),
//       requestContactsPermission()
//   }, [])
//   const formatPhoneNumbers = (contacts) => {
//     return contacts.map(contact => {
//       return contact.phoneNumbers.map(number =>
//         number.replace(/\D/g, '')  // Remove non-digit characters
//       );
//     }).flat();
//   }

//   const formattedNumbers = formatPhoneNumbers(transformedDataArray);
//   console.log(formattedNumbers);
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App
