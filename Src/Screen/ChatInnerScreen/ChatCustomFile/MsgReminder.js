import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'

const MsgReminder = ({ data, time, onPress, MYID }) => {
    const id = data.sendBy == MYID
    const [selectUserData, setSelectUserData] = useState()


    const list = ({ item, index }) => {
        return (
            <View>
                {index < 3 ? <Image source={item?.profile_image ? { uri: item?.profile_image } : require('../../../Assets/Image/admin.jpg')} style={{
                    height: 40, width: 40,
                    borderRadius: 100, marginLeft: index == 0 ? 0 : -20
                }} /> : ''}
            </View>
        )
    }
    return (
        <View style={{ alignSelf: id ? 'flex-end' : 'flex-start', width: '90%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 3, marginLeft: 3, color: COLOR.black, }}>Remind</Text>

            <View
                onPress={onPress}
                style={{
                    backgroundColor: id ? COLOR.lightgreen : COLOR.verylightgray,
                    height: 'auto',
                    borderRadius: 10, paddingHorizontal: 10, padding: 5, paddingLeft: 20


                }}>
                <Text style={styles.HeadingContent}><Text style={styles.Heading}>Title: </Text>{data.reminder.title}</Text>
                <Text style={styles.HeadingContent}><Text style={styles.Heading}>Description: </Text>{data.reminder.descriptions}</Text>
                <Text style={styles.HeadingContent}><Text style={styles.Heading}>Remind Time: </Text>{data.reminder.time}</Text>
                {selectUserData ? <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <View style={{
                        width: selectUserData?.length < 2 ? 65 : selectUserData?.length <= 2 ? 85 : 110,
                        alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
                    }}>
                        <FlatList data={selectUserData} renderItem={list} horizontal bounces={false}
                            style={{}} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor }}>{'+' + selectUserData?.length}</Text>
                    </View>
                </View> : null}
                <Text style={styles.time}>{time}</Text>

            </View>
        </View>
    )
}

export default MsgReminder
const styles = StyleSheet.create({
    Heading: { color: COLOR.black, fontSize: 15, fontWeight: 'bold', },
    HeadingContent: { fontWeight: '500', color: COLOR.black, fontSize: 14, marginTop: 15 },
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12 }
})