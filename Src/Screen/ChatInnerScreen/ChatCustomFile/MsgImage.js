import { View, Image, Text, } from 'react-native';
import React from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
const MsgImage = ({ data, }) => {
    const img = data?.messageDetails?.attachment_path

    const sendBy = data?.sentBy == 'loginUser'

    return (

        <View style={{
            backgroundColor: sendBy ? COLOR.lightgreen : COLOR.verylightgray,
            alignSelf: sendBy ? 'flex-end' : 'flex-start', padding: 5,
            borderRadius: 10, width: 260
        }}>
            <Image source={{ uri: img }} style={{ height: 250, width: 250, borderRadius: 10 }} />
            <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.textcolor, marginVertical: 5 }}>{data?.messageDetails?.attachment_name}</Text>
        </View>

    );
};
export default MsgImage


