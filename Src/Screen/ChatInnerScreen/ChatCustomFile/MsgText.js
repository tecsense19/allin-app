import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
const MsgText = ({ data, }) => {
    const texts = data.messageDetails
    const sendBy = data?.sentBy == 'loginUser'
    // console.log(data);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', alignSelf: sendBy ? 'flex-end' : 'flex-start', }}>
            {data.profilePic && !sendBy ? <Image source={{ uri: data.profilePic }} style={{
                height: 35, width: 35, borderRadius: 35, marginRight: 5
            }} /> : null}
            <View style={{
                backgroundColor: sendBy ? COLOR.lightgreen : COLOR.verylightgray,
                padding: 5, paddingHorizontal: 10, width: data?.text?.length > 40 ? '90%' : 'auto',
                borderRadius: 10,

            }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.black }}>{texts}</Text>
                <Text style={{
                    fontSize: 12, fontWeight: '700', marginTop: 5,
                    color: COLOR.placeholder, textAlign: 'right'
                }}>{data.time}</Text>
            </View>
            {data.profilePic && sendBy ? <Image source={{ uri: data.profilePic }} style={{
                height: 35, width: 35, borderRadius: 35, marginLeft: 5
            }} /> : null}
        </View>
    )
}

export default MsgText