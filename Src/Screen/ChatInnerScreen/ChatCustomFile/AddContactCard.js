import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import Contacts from 'react-native-contacts'

const AddContactCard = ({ userDetails, }) => {
    const userName = userDetails.first_name == undefined && userDetails.last_name == undefined ? '' : userDetails.first_name + ' ' + userDetails.last_name
    const saveContact = () => {
        const newContact = {
            givenName: userName,
            phoneNumbers: [{ label: 'mobile', number: userDetails?.country_code + userDetails?.mobile, }],
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
        <View style={{ backgroundColor: '#F7F8F8', alignSelf: 'center', alignItems: 'center', padding: 20 }}>
            <Image source={{ uri: userDetails.profile }} style={{ height: 52, width: 52, borderRadius: 50 }} />
            <Text style={{ color: COLOR.black, fontWeight: 'bold', fontSize: 15, marginTop: 10, }}>{userDetails?.country_code + ' ' + userDetails?.mobile}</Text>
            <Text style={{ color: COLOR.black, fontWeight: '500', fontSize: 13, marginTop: 5, }}>-{userName}</Text>
            <Text style={{ color: COLOR.gray, fontSize: 13, marginTop: 15, }}>Not a contact No Common Groups</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image source={require('../../../Assets/Image/safetytool.png')} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                <Text style={{ marginLeft: 5, color: '#298BFF', fontWeight: '500', fontSize: 13 }}>Safety tools</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <TouchableOpacity style={{ height: 30, backgroundColor: '#E5E5E7', width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 5, margin: 5 }}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 13 }}>Block</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveContact} style={{ height: 30, backgroundColor: '#E5E5E7', width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 5, margin: 5 }}>
                    <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 13 }}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddContactCard