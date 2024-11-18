import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import React from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
import { MyID } from '../../../Service/AsyncStorage';

const MsgTask = ({ data, ThreeDott }) => {


    const TaskData = data.messageDetails.tasks;
    const user = data.messageDetails.users
    // const users = task.task_checked_users.split(',').map(Number);
    // console.log(data);
    const imgData = [
        { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
        { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
        { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
    ]
    return (
        // <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.View1}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center', marginBottom: 10
                }}>
                    <View style={styles.View2}>
                        <Text style={styles.taskTitle}>
                            {data?.messageDetails?.task_name?.length > 28
                                ? `${data?.messageDetails?.task_name.slice(0, 28)}...`
                                : data?.messageDetails?.task_name}
                        </Text>
                        <TouchableOpacity onPress={ThreeDott} style={styles.onThreeDott}>
                            <Image source={require('../../../Assets/Image/dott.png')} style={styles.threedottImg} />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    TaskData.map(async (task, index) => {
                        const users = task.task_checked_users.split(',').map(Number);
                        const myID = await MyID()
                        return (
                            <View key={index} style={styles.checkboxContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '82%' }}>
                                        <Image
                                            source={users.includes(myID) ? require('../../../Assets/Image/check.png') : require('../../../Assets/Image/box.png')}
                                            style={[styles.checkImg, { tintColor: users.includes(myID) ? COLOR.green : COLOR.black }]}
                                        />
                                        <Text numberOfLines={1} style={{ color: COLOR.gray, fontWeight: '600', flex: 1 }}>{task.checkbox}</Text>
                                    </View>
                                    <View style={{}}>
                                        <FlatList style={{}} horizontal data={imgData} renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={{ uri: item.img }} style={{ height: 15, width: 15, borderRadius: 20, marginLeft: index == 0 ? 0 : - 5 }} />
                                                </View>
                                            )
                                        }} />
                                    </View>
                                </View>
                                <FlatList style={{}} data={[{}, {}]} renderItem={({ item }) => {
                                    return (
                                        <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F8F8', marginLeft: '10%', marginTop: 5, borderRadius: 5, paddingHorizontal: 10, }}>
                                            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' }} style={{ height: 20, width: 20, borderRadius: 20, marginRight: 5, }} />
                                            <Text style={{ flex: 1, color: COLOR.gray, fontSize: 10 }} numberOfLines={2}>Lorem Ipsum Dummy TextLorem Ipsum Dummy TextLorem Ipsum Dummy TextLorem Ipsum Dummy Text</Text>
                                        </View>
                                    )
                                }} />
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%', marginTop: 5 }}>
                                    <Image source={require('../../../Assets/Image/addcomment.png')} style={{ height: 12, width: 12, marginRight: 5 }} />
                                    <Text style={{ fontSize: 12, color: COLOR.gray, fontWeight: '500' }}>Add Comment</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
            <Text style={styles.tasktime}>{data?.time}</Text>
        </View>
        // </TouchableOpacity>
    );
};

export default MsgTask;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // marginVertical: 5,
    },
    View1: {
        width: '100%',
        borderRadius: 10,
        // paddingHorizontal: 10,
        backgroundColor: COLOR.white,
        shadowOpacity: 0.2,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 5,
        padding: 15

    },
    View2: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkImg: {
        height: 22,
        width: 22,
        marginRight: 10,
    },
    taskTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: COLOR.black,
        width: '92%',

    },
    onThreeDott: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 5,
    },
    threedottImg: {
        height: 35,
        width: 35,
        tintColor: COLOR.green,
        resizeMode: 'contain',
    },
    tasktime: {
        fontWeight: '700',
        color: COLOR.placeholder,
        marginTop: 5,
        marginLeft: 5,
        fontSize: 12,
    },
    checkboxContainer: {
        marginTop: 20,
    },
});
