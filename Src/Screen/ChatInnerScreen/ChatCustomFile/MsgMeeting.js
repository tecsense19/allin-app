import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
export const MsgMeeting = ({ data, onPress, MYID, }) => {
    const id = data?.sendBy == MYID;
    const [selectUserData, setSelectUserData] = useState()

    // console.log('====================================');
    // console.log(data);
    // console.log('====================================');
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
        <View style={{ alignSelf: data?.sentBy == 'loginUser' ? 'flex-end' : 'flex-start', width: '90%', }}>
            {/* {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLOR.black, marginLeft: 5 }}>Meeting</Text> */}

            <View
                onPress={onPress}
                style={{
                    backgroundColor: data?.sentBy == 'loginUser' ? COLOR.lightgreen : COLOR.verylightgray,
                    height: 'auto',

                    borderRadius: 10, paddingHorizontal: 10, padding: 5, paddingLeft: 20


                }}>
                <Text style={styles.Heading}>Title: <Text style={styles.HeadingContent}>{data.messageDetails.title}</Text></Text>
                <Text style={styles.Heading}>Description: <Text style={styles.HeadingContent}>{data?.messageDetails.description?.length > 60 ? data?.messageDetails.description.slice(0, 60) + '....' : data?.messageDetails.description}</Text></Text>
                <Text style={styles.Heading}>Meeting Date: <Text style={styles.HeadingContent}>{data.messageDetails.date}</Text></Text>
                <Text style={styles.Heading}>Meeting Time: < Text style={styles.HeadingContent}>{data.messageDetails.start_time}</Text></Text>
                <Text style={styles.Heading}>Location: < Text style={styles.HeadingContent}>{'India'}</Text></Text>
                {/* {selectUserData ? <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <View style={{
                        width: selectUserData?.length < 2 ? 65 : selectUserData?.length <= 2 ? 85 : 110,
                        alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
                    }}>
                        <FlatList data={selectUserData} renderItem={list} horizontal bounces={false}
                            style={{}} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor }}>{'+' + selectUserData?.length}</Text>
                    </View>
                </View> : null} */}
                <Text style={styles.time}>{data.time}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Heading: { alignSelf: 'flex-start', marginTop: 15, fontWeight: 'bold', color: COLOR.black, fontSize: 15 },
    HeadingContent: { color: COLOR.black, fontSize: 14, fontWeight: '500' },
    time: { alignSelf: 'flex-end', margin: 5, fontWeight: '700', color: COLOR.placeholder, fontSize: 12 }
})