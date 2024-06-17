import { View, Text, LogBox, Linking, Alert } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import Contacts from 'react-native-contacts';

LogBox.ignoreAllLogs();
const App = () => {

  useEffect(() => {
    // saveContact()
  }, [])
  const saveContact = () => {
    const newContact = {
      givenName: 'John',
      familyName: 'Doe',
      phoneNumbers: [{
        label: 'mobile',
        number: '1234567890',
      }],
    };



    Contacts.openContactForm(newContact)
      .then(() => {
        Alert.alert('Contact saved successfully');
      })
      .catch((error) => {
        Alert.alert('Error saving contact', error.message);
      })
      .finally(() => {
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <StackScreen />
    </View>
  )
}
export default App