
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import React, { } from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
const MsgTask = ({ data, time, MYID, onPress, disabled }) => {
    const id = data?.sendBy == MYID

    const createTwoButtonAlert = () =>
        Alert.alert(
            'Acctions',
            'Are You sure to edit,delete.....?',
            [
                { text: 'Edit', },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'No',
                },
                { text: 'DELETE', onPress: () => deleteTwoButton(), style: 'destructive' },
            ],
        );
    const deleteTwoButton = () => {
        Alert.alert('Delete Task',
            'Are you sure delete Task....?',
            [{ text: 'Cancel', onPress: () => (''), style: 'No', },
            { text: 'DELETE', onPress: () => delteTAsk(), style: 'destructive' }]);
    }
    const delteTAsk = () => {
        const taskId = data?.Checklist?.taskId

    }
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}
            style={{ justifyContent: 'center', }}>
            <View style={styles.View1}>
                <View style={styles.View2}>
                    <Image
                        source={require('../../../Assets/Image/check.png')}
                        style={[styles.checkImg, { tintColor: id ? COLOR.green : COLOR.slateblue, }]}
                    />
                    {id ? <Text style={styles?.taskTitle}>
                        {data?.Checklist?.title?.length > 28 ?
                            data?.Checklist?.title?.slice(0, 28) + '...' : data?.Checklist?.title}</Text> :
                        <Text style={styles.taskTitle}>
                            {data?.Checklist?.title?.length > 42 ?
                                data?.Checklist?.title?.slice(0, 42) + '...' : data?.Checklist?.title}</Text>}
                </View>
                {id ? <TouchableOpacity onPress={createTwoButtonAlert} style={styles.onThreeDott}>
                    <Image source={require('../../../Assets/Image/dott.png')} style={styles.threedottImg} />
                </TouchableOpacity> : null}
            </View>
            <Text style={styles.tasktime}>{time}</Text>
        </TouchableOpacity >
    );
};

export default MsgTask;
const styles = StyleSheet.create({
    View1: { width: '100%', borderRadius: 10, marginTop: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowOffset: { height: 1, width: 1 }, shadowRadius: 5, height: 55 },
    View2: { flexDirection: 'row', alignItems: 'center', },
    checkImg: { height: 30, width: 30, marginRight: 10, },
    taskTitle: { fontSize: 17, fontWeight: '500', color: COLOR.textcolor, width: '92%' },
    onThreeDott: { position: 'absolute', right: 10, paddingHorizontal: 5 },
    threedottImg: { height: 35, width: 35, tintColor: COLOR.green, resizeMode: 'contain' },
    tasktime: { alignSelf: 'flex-end', fontWeight: '700', color: COLOR.placeholder, marginTop: 5, marginRight: 5, fontSize: 12 },


})