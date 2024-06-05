import { View, Image, Text, } from 'react-native';
import React from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
const MsgAttachment = ({ data, }) => {
    const uri = data?.messageDetails?.attachment_path

    const sendBy = data?.sentBy == 'loginUser'
    // console.log(data.attachmentType);
    return (

        <View style={{
            backgroundColor: sendBy ? COLOR.lightgreen : COLOR.verylightgray,
            alignSelf: sendBy ? 'flex-end' : 'flex-start', padding: 5,
            borderRadius: 10, width: '100%'
        }}>
            {data.attachmentType == 'pdf' ? <View>
                <Image source={{ uri: uri }} style={{ height: 100, width: '100%', borderRadius: 10 }} />
                <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.black, marginVertical: 5 }}>{data?.messageDetails?.attachment_name}</Text>
            </View> : data.attachmentType == 'jpg' || data.attachmentType == 'png' || data.attachmentType == 'jpeg' || data.attachmentType == 'gif' || data.attachmentType == 'webp' || data.attachmentType == 'heic' || data.attachmentType == 'heic' ?
                <View>
                    <Image source={{ uri: uri }} style={{ height: 250, width: '100%', borderRadius: 10 }} />
                    <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.black, marginVertical: 5 }}>{data?.messageDetails?.attachment_name}</Text>
                </View>
                :
                <View >
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', height: 60, paddingHorizontal: 8, borderRadius: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: COLOR.black, marginVertical: 5 }}>{data?.messageDetails?.attachment_name}</Text>
                    </View>
                    <Text style={{
                        fontSize: 12, fontWeight: '700', marginTop: 5,
                        color: COLOR.placeholder, textAlign: 'right'
                    }}>{data.time}</Text>
                </View>
            }
        </View>

    );
};
export default MsgAttachment


