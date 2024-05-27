import { View, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import CONTACT from 'react-native-contacts'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../../Custom/Header/NavigateHeader'
const MsgContact = ({ myId, Time, contact }) => {
    const [visible, setvisible] = useState(false)
    const id = contact?.sendBy == myId
    const length = contact?.contact?.length
    const data = contact?.contact
    const name = contact?.contact[0]?.givenName
    // console.log(data);

    const list = ({ item }) => {
        const onSaveContact = (Mycontact) => {


            var newPerson = {
                phoneNumbers: [{
                    label: 'mobile',
                    number: item.phoneNumbers[0].number
                }],
                givenName: item.givenName
            }

            CONTACT.openContactForm(newPerson).then(contact => {
                // contact has been saved
            })
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
                <TouchableOpacity style={{ backgroundColor: COLOR.green, padding: 10, paddingHorizontal: 20, borderRadius: 20 }} onPress={onSaveContact}>
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
            }}>{Time}</Text>
            <Modal visible={visible}>
                <View style={{ backgroundColor: COLOR.black, flex: 1, }}>
                    <Header title={'Contacts'} top={5} onPress={() => setvisible(false)} color={COLOR.white} smallTitleSize={15} />
                    <View style={{ backgroundColor: COLOR.white, flex: 1, }}>
                        <FlatList data={data} renderItem={list} style={{ paddingHorizontal: 15 }} />

                    </View>
                </View>

            </Modal>
        </TouchableOpacity >
    )
}

export default MsgContact
