import { View, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import Contacts from 'react-native-contacts'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../../Custom/Header/NavigateHeader'
const MsgContact = ({ data }) => {
    const [visible, setvisible] = useState(false)
    const id = data.sentBy == 'loginUser'
    const parshData = JSON.parse(data.messageDetails)
    const length = parshData.length
    const name = parshData[0].givenName

    const list = ({ item, index }) => {
        console.log(item.phoneNumbers[0]);
        const saveContact = () => {
            const newContact = {
                givenName: item.givenName,
                phoneNumbers: [{ label: 'mobile', number: item.phoneNumbers[0], }],
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
            <View style={{ marginTop: 15, padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLOR.white }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, marginRight: 10, borderRadius: 50 }} />
                    <View>
                        <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: '700' }}>{item.givenName.length > 20 ? item.givenName.slice(0, 20) + '...' : item.givenName}</Text>
                        <Text style={{ fontSize: 16, color: COLOR.gray, fontWeight: '600', marginTop: 5 }}>{item.phoneNumbers[0].number}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: COLOR.green, padding: 10, paddingHorizontal: 20, borderRadius: 20 }} onPress={saveContact}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add</Text>
                </TouchableOpacity>
            </View>

        )
    }
    return (

        <TouchableOpacity style={{ backgroundColor: id ? COLOR.lightgreen : COLOR.verylightgray, height: 70, borderRadius: 10, width: '90%', alignSelf: id ? 'flex-end' : 'flex-start', justifyContent: 'center', marginLeft: id ? 5 : 0 }}
            onPress={() => setvisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15, padding: 5 }}>
                {length > 1 && length <= 2 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        < Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, borderRadius: 50 }} />
                        < Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, borderRadius: 50, marginLeft: -40 }} />
                    </View> : length >= 3 ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            < Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, borderRadius: 50, }} />
                            < Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, borderRadius: 50, marginLeft: -40 }} />
                            < Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, borderRadius: 50, marginLeft: -40 }} />
                        </View> :
                        < Image source={require('../../../Assets/Image/admin.jpg')} style={{ height: 50, width: 50, marginRight: 10, borderRadius: 50 }} />
                }
                <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: '700', marginLeft: 10, width: '80%' }}>{length > 1 ? name + '\n' + `and ${length - 1} other contact` : name}</Text>
            </View>
            <Text style={{
                position: 'absolute', right: 15, bottom: 5, fontSize: 12, fontWeight: '700',
                color: COLOR.placeholder,
            }}>{data.time}</Text>
            <Modal visible={visible}>
                <View style={{ backgroundColor: COLOR.black, flex: 1, }}>
                    <View style={{ paddingHorizontal: 25 }}>
                        <NavigateHeader title={'Contacts'} top={5} onPress={() => setvisible(false)} color={COLOR.white} smallTitleSize={15} />
                    </View>
                    <View style={{ backgroundColor: COLOR.white, flex: 1, }}>
                        <FlatList data={parshData} renderItem={list} style={{ paddingHorizontal: 15 }} />

                    </View>
                </View>

            </Modal>
        </TouchableOpacity >
    )
}

export default MsgContact
