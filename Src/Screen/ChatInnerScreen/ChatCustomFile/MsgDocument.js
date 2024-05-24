import { View, Text, Image, TouchableOpacity, Alert, Linking } from 'react-native'
import React from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
const MsgDocument = ({ data, time, myId, disabled }) => {
    const id = data?.sendBy == myId
    // console.log(data.file.name, '==========>MsgDocument');
    return (
        <View>
            {data?.file?.type == 'application/pdf' ?
                <TouchableOpacity disabled={disabled} onPress={() => Linking.openURL(data?.file?.url)} style={{
                    width: '90%', height: 'auto', backgroundColor: id ? COLOR.lightgreen : COLOR.verylightgray, alignSelf: id ? 'flex-end' : 'flex-start', borderRadius: 10,
                    paddingHorizontal: 10
                }}>
                    <View style={{
                        overflow: 'hidden',
                        aspectRatio: 2.5,
                    }}>
                        <Image source={{ uri: data?.file?.url }} style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            marginBottom: '-150%', borderRadius: 10, marginTop: 10, backgroundColor: COLOR.white
                        }} />
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '700', color: COLOR.DeepSkyBlue }}>{data?.file?.name}</Text>

                    <Text style={{
                        fontSize: 12, fontWeight: '700',
                        color: COLOR.placeholder, textAlign: 'right', margin: 5
                    }}>{time}</Text>
                </TouchableOpacity>
                : <View style={{
                    width: '90%', height: 'auto', backgroundColor: id ? COLOR.lightgreen : COLOR.verylightgray, alignSelf: id ? 'flex-end' : 'flex-start', borderRadius: 10,
                    paddingHorizontal: 10
                }}>
                    <View style={{ borderRadius: 10, paddingVertical: 15, padding: 10, marginTop: 10, backgroundColor: COLOR.white }}>
                        <Text style={{ fontSize: 15, color: COLOR.DeepSkyBlue, fontWeight: '600' }}>{data?.file?.name}</Text>
                    </View>
                    <Text style={{
                        fontSize: 12, fontWeight: '700',
                        color: COLOR.placeholder, textAlign: 'right', margin: 5
                    }}>{time}</Text>
                </View>}
        </View>


    )
}

export default MsgDocument