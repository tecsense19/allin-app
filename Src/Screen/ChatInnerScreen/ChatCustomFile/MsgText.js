import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import COLOR from '../../../color/color'
import font from '../../../../assets/fonts/font'

const MsgText = ({ data, time, onPress, myId }) => {
    const texts = data?.text
    const id = data?.sendBy == myId
    // console.log(texts);
    return (
        <View onPress={onPress} style={{
            backgroundColor: id ? COLOR.lightgreen : COLOR.verylightgray,
            alignSelf: id ? 'flex-end' : 'flex-start', padding: 5, paddingHorizontal: 10, width: data?.text?.length > 40 ? '90%' : 'auto',
            borderRadius: 10,

        }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.black }}>{texts}</Text>
            <Text style={{
                fontSize: 12, fontWeight: '700', marginTop: 5,
                color: COLOR.placeholder, textAlign: 'right'
            }}>{time}</Text>
        </View>
    )
}

export default MsgText