import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
export const MsgMeeting = ({ data, onPress, MYID, }) => {

    const Member = data.messageDetails.users
    const list = ({ item, index }) => {
        return (
            <View>
                {index < 3 ? <Image source={{ uri: item?.profile }} style={{
                    height: 25, width: 25,
                    borderRadius: 100, marginLeft: index == 0 ? 0 : -10
                }} /> : ''}
            </View>
        )
    }
    return (
        <View style={{ alignSelf: data?.sentBy == 'loginUser' ? 'flex-end' : 'flex-start', width: '90%', }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLOR.black, marginLeft: 5 }}>Meeting</Text>

            <View
                onPress={onPress}
                style={{
                    backgroundColor: data?.sentBy == 'loginUser' ? COLOR.lightgreen : COLOR.verylightgray,
                    height: 'auto',

                    borderRadius: 10, paddingHorizontal: 10, padding: 5, paddingLeft: 15


                }}>
                <Text style={styles.Heading}>Title: <Text style={styles.HeadingContent}>{data.messageDetails.title}</Text></Text>
                <Text style={styles.Heading}>Description: <Text style={styles.HeadingContent}>{data?.messageDetails.description?.length > 60 ? data?.messageDetails.description.slice(0, 60) + '....' : data?.messageDetails.description}</Text></Text>
                <Text style={styles.Heading}>Meeting Date: <Text style={styles.HeadingContent}>{data.messageDetails.date}</Text></Text>
                <Text style={styles.Heading}>Meeting Time: < Text style={styles.HeadingContent}>{data.messageDetails.start_time}</Text></Text>
                <Text style={styles.Heading}>Location: < Text style={styles.HeadingContent}>{'India'}</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{
                        width: data.messageDetails.users?.length <= 2 ? 60 : 75,
                        alignSelf: 'center', flexDirection: 'row', alignItems: 'center', position: 'absolute', right: data.messageDetails.users?.length <= 2 ? -20 : 0, bottom: 30
                    }}>
                        <FlatList data={Member} renderItem={list} horizontal bounces={false}
                            style={{}} />
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.titlecolor, }}>{Member?.length >= 3? '+' + (Member?.length - 3):""}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{data.time}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Heading: { alignSelf: 'flex-start', marginTop: 10, fontWeight: 'bold', color: COLOR.black, fontSize: 13 },
    HeadingContent: { color: COLOR.black, fontSize: 12, fontWeight: '500' },
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12 }
})