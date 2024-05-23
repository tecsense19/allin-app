import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
const MsgImage = ({ data, time, MYID }) => {
    const id = data?.sendBy == MYID
    const src = data?.cameraimg ? data?.cameraimg : data?.galleryimg;
    // console.log('MsgGallery--------------', data);
    // console.log('src--------------', src.length);
    const list = ({ item, index }) => {
        const imageCount = src?.length - 4

        return (

            <View style={{ backgroundColor: index == 3 ? "rgba(0,0,0,0.2)" : id ? COLOR.lightgreen : COLOR.verylightgray, margin: index == 3 ? 5 : 0, borderRadius: 10, width: src?.length == 1 ? '98%' : 'auto' }}>
                {index < 4 ?
                    < Image
                        key={index}
                        source={{ uri: item.url }}
                        style={{ width: src?.length == 1 ? '100%' : 150, height: src?.length == 1 ? 260 : 125, borderRadius: 10, margin: index == 3 ? 0 : 5, opacity: index == 3 ? 0.3 : 1 }}
                    /> :
                    null}
                {index == 3 ? <Text style={{ position: 'absolute', alignSelf: 'center', top: '40%', fontSize: 22, fontWeight: '700' }}>{src.length <= 4 ? null : '+' + imageCount}</Text> : null}

            </View>

        )
    }
    return (
        <View
            style={{
                backgroundColor: id ? COLOR.lightgreen : COLOR.verylightgray,
                height: src?.length == 2 ? 165 : 300,
                width: '90%',
                alignSelf: id ? 'flex-end' : 'flex-start',
                borderRadius: 10,
                marginLeft: 5, padding: 5
            }}>
            {data?.cameraimg ? < Image
                source={{ uri: data?.cameraimg }}
                style={{ width: '97%', height: '90%', borderRadius: 10, margin: 5 }}
            /> : data?.galleryimg ? <FlatList data={src} renderItem={list} numColumns={2} style={{ alignSelf: 'center' }} /> : null}
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: '700', color: COLOR.placeholder, marginTop: 5, alignSelf: 'flex-end'
                }}>
                {time}
            </Text>
        </View>
    );
};
export default MsgImage


