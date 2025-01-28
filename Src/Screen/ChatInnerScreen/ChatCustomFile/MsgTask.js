import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { COLOR, } from '../../../Assets/AllFactors/AllFactors';
import { getToken,  } from '../../../Service/AsyncStorage';
import { BlurView } from '@react-native-community/blur';
import Button from '../../../Custom/Button/Button';
import { Add_Task_Comment, Edit_Task } from '../../../Service/actions';

const MsgTask = ({ data, ThreeDott, myID }) => {
    const [visible, setVisible] = useState(false)
    const [comment, setComment] = useState('')
    const [commentData, setCommentData] = useState('')
    const TaskData = data.messageDetails.tasks;

    const AddComment = () => {
        if (comment.trim() === '') {
            return Alert.alert('Enter a Comment')
        }
        Add_Task_Comment(comment, commentData?.id, commentData?.message_id)
            .then((res) => {
                if (res.success == true) {
                    setComment('')
                    setVisible(false)
                    setCommentData('')
                }
            })
    }
    const handleUpdate = async (task) => {
        const messageId = task?.messageId
        const token = await getToken()
        Edit_Task(token, messageId, task?.messageDetails?.tasks, task.messageDetails?.task_name, task?.messageDetails?.users)
            .then((res) => {
                if (res.status_code == 200) {
                    // console.log(res);
                }
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.View1}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={styles.View2}>
                        <Text style={styles.taskTitle}>
                            {data?.messageDetails?.task_name?.length > 28
                                ? `${data?.messageDetails?.task_name.slice(0, 28)}...`
                                : data?.messageDetails?.task_name}
                        </Text>
                        {data.sentBy == 'loginUser' ? <TouchableOpacity onPress={ThreeDott} style={styles.onThreeDott}>
                            <Image source={require('../../../Assets/Image/dott.png')} style={styles.threedottImg} />
                        </TouchableOpacity> : null}
                    </View>
                </View>

                {TaskData.map((task, index) => {
                    const users = task.task_checked_users.split(',').map(Number);
                    //  const myID = 1
                    return (
                        <View key={index} style={styles.checkboxContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                {users.includes(myID) ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '82%', }}>
                                        <Image source={require('../../../Assets/Image/check.png')} style={[styles.checkImg, { tintColor: COLOR.green }]} />
                                        <Text numberOfLines={1} style={{ color: COLOR.gray, fontWeight: '600', flex: 1 }}>{task.checkbox}</Text>
                                    </View> :
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '82%' }}>
                                        <TouchableOpacity style={{ padding: 5 }} onPress={() => handleUpdate(data)}>
                                            <Image source={require('../../../Assets/Image/box.png')} style={[styles.checkImg, { tintColor: COLOR.black }]} />
                                        </TouchableOpacity>
                                        <Text numberOfLines={1} style={{ color: COLOR.gray, fontWeight: '600', flex: 1 }}>{task.checkbox}</Text>
                                    </View>}
                                <View style={{}}>
                                    <FlatList scrollEnabled={false} style={{}} horizontal data={task?.profiles} renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={{ uri: item.profile_url }} style={{ height: 15, width: 15, borderRadius: 20, marginLeft: index == 0 ? 0 : - 5 }} />
                                            </View>
                                        )
                                    }} />
                                </View>
                            </View>
                            <FlatList scrollEnabled={false} style={{}} data={task.comments} renderItem={({ item }) => {
                                return (
                                    <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F8F8', marginLeft: '10%', marginTop: 5, borderRadius: 5, paddingHorizontal: 10, }}>
                                        <Image source={{ uri: item?.user?.profile_picture }} style={{ height: 20, width: 20, borderRadius: 20, marginRight: 5, }} />
                                        <Text style={{ flex: 1, color: COLOR.gray, fontSize: 10 }} numberOfLines={2}>{item.comment}</Text>
                                    </View>
                                )
                            }} />
                            <TouchableOpacity
                                onPress={() => { setVisible(true), setCommentData(task) }}
                                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%', paddingVertical: 10, alignSelf: 'flex-start' }}>
                                <Image source={require('../../../Assets/Image/addcomment.png')} style={{ height: 14, width: 14, marginRight: 5 }} />
                                <Text style={{ fontSize: 13, color: COLOR.gray, fontWeight: '500' }}>Add Comment</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
                }
            </View>
            <Text style={styles.tasktime}>{data?.time}</Text>
            <Modal visible={visible} transparent>
                <BlurView style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}
                    blurType="light"
                    blurAmount={10} >
                    <View style={{ width: '90%', backgroundColor: COLOR.white, paddingHorizontal: 20, borderRadius: 20, shadowOpacity: 0.3, shadowOffset: { height: 1, width: 1 }, shadowRadius: 10 }}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: 'flex-end', padding: 20, marginRight: -20 }}>
                            <Image source={require('../../../Assets/Image/x.png')} style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', }}>Add Comment</Text>
                        <TextInput
                            placeholder="Enter Comment . . ."
                            onChangeText={res => setComment(res)}
                            value={comment}
                            multiline={true}
                            placeholderTextColor={COLOR.lightgray}
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                paddingVertical: 10,
                                borderRadius: 5,
                                marginTop: 20,
                                height: 120,
                                backgroundColor: COLOR.white,
                                color: COLOR.black,
                                paddingHorizontal: 10,
                                shadowOpacity: 0.2,
                                shadowOffset: { height: 1, width: 0 },
                                shadowRadius: 3
                            }}
                        />

                        <Button onPress={AddComment} marginBottom={20} marginTop={20} fontSize={16} title={'Add'} bgColor={COLOR.green} color={COLOR.white} />
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
};

export default MsgTask;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    View1: {
        width: '100%',
        borderRadius: 10,
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
        marginTop: 10,
    },
});
