import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
const SocialMedia = ({ placeholder, source, onChangeText, value }) => {
    return (
        <View style={{ height: 45, borderWidth: 1, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderColor: COLOR.textcolor, marginTop: 15 }}>

            <View style={{ height: 45, alignItems: 'center', justifyContent: 'center', padding: 5, width: 45, borderWidth: 1, borderRadius: 5, borderColor: COLOR.textcolor, marginLeft: -1 }}>
                <Image source={source} style={{ height: 25, width: 25, }} />
            </View>
            <TextInput placeholder={placeholder} style={{ fontSize: 14, fontWeight: '500', color: COLOR.textcolor, height: 45, flex: 1, paddingHorizontal: 10 }} onChangeText={onChangeText} value={value} />
        </View>
    )
}

export default SocialMedia