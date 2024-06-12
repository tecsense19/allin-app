import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'

const MsgReminder = ({ data, }) => {
    const member = data.messageDetails.users
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
        <View style={{ alignSelf: data.sentBy == 'loginUser' ? 'flex-end' : 'flex-start', width: '90%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 5, color: COLOR.black, }}>Remind</Text>
            <View
                style={{
                    backgroundColor: data.sentBy == 'loginUser' ? COLOR.lightgreen : COLOR.verylightgray,
                    height: 'auto',
                    borderRadius: 10, paddingHorizontal: 10, padding: 5, paddingLeft: 10
                }}>
                <Text style={styles.HeadingContent}><Text style={styles.Heading}>Title: </Text>{data.messageDetails.title}</Text>
                <Text style={styles.HeadingContent}><Text style={styles.Heading}>Description: </Text>{data.messageDetails.description}</Text>
                <Text style={styles.HeadingContent}><Text style={styles.Heading}>Remind Time: </Text>{data.messageDetails.time}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{
                        width: member?.length <= 2 ? 65 : 75,
                        alignSelf: 'center', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: -5, right: member?.length <= 2 ? -20 : 0
                    }}>
                        <FlatList data={member} renderItem={list} horizontal bounces={false}
                            style={{}} />
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.titlecolor }}>{member?.length <= 2 ? '' : '+' + (member.length - 3)}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{data.time}</Text>
            </View>
        </View>
    )
}

export default MsgReminder
const styles = StyleSheet.create({
    Heading: { color: COLOR.black, fontSize: 13, fontWeight: 'bold', },
    HeadingContent: { fontWeight: '500', color: COLOR.black, fontSize: 12, marginTop: 10 },
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12, marginTop: 15 }
})