import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
const MsgText = ({ data, }) => {
    const texts = data.messageDetails
    const sendBy = data?.sentBy == 'loginUser'

    return (
        <View style={{
            backgroundColor: sendBy ? COLOR.lightgreen : COLOR.verylightgray,
            alignSelf: sendBy ? 'flex-end' : 'flex-start', padding: 5, paddingHorizontal: 10, width: data?.text?.length > 40 ? '90%' : 'auto',
            borderRadius: 10,

        }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.black }}>{texts}</Text>
            <Text style={{
                fontSize: 12, fontWeight: '700', marginTop: 5,
                color: COLOR.placeholder, textAlign: 'right'
            }}>{data.time}</Text>
        </View>
    )
}

export default MsgText