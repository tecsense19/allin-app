
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, Alert, Modal, } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import Button from '../../../Custom/Button/Button'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../../Custom/Header/NavigateHeader'
import { Edit_Task, User_List } from '../../../Service/actions'
import Timezone from 'react-native-timezone'
import Loader from '../../../Custom/Loader/loader'
import DatePicker from 'react-native-date-picker'
import { getToken, MyID } from '../../../Service/AsyncStorage'
import { BlurView } from '@react-native-community/blur'


const CreateTask = ({ onSubmit, userId, token, editData }) => {
    const [selectedCheckList, setSelectedCheckList] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState();
    const [selectedItems, setSelectedItems] = useState([userId]);
    const [myID, setMyId] = useState('');
    const [loading, setLoading] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [checkboxes, setCheckboxes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCheckBoxLabel, setNewCheckBoxLabel] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedCheckBox, setSelectedCheckBox] = useState(null);
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskTime, setTaskTime] = useState(new Date());
    const [openTime, setOpenTime] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [datetime, setdatetime] = useState({ date: false, time: false })
    console.log(editData);


    useEffect(() => {
        myid()
        if (editData[0]?.messageType == 'Text') {
            setTaskTitle(editData[0].messageDetails)
        } else if (editData.messageType == 'Task') {
            setTaskTitle(editData.messageDetails.task_name)
            setCheckboxes(editData.messageDetails.tasks);
            setSelectedItems(editData.messageDetails.users.map((user, ind) => {
                return user.id
            }));
        }

    }, [myID])

    const myid = async () => {
        const a = await MyID()
        setMyId(a)
    }
    const toggleCheckBoxItem = (itemId) => {
        // console.log(itemId);
        if (selectedCheckList.includes(itemId)) {
            setSelectedCheckList(selectedCheckList.filter((id) => id !== itemId));
        } else {
            setSelectedCheckList([...selectedCheckList, itemId]);
        }
    };
    const year = taskDate?.getUTCFullYear();
    const month = (taskDate?.getUTCMonth() + 1)?.toString()?.padStart(2, '0'); // Add 1 to the month and pad with zero
    const day = taskDate?.getUTCDate()?.toString()?.padStart(2, '0'); // Pad with zero
    const TaskDate = year + '-' + month + '-' + day

    const time = new Date(taskTime);
    time.setHours(time.getHours());
    time.setMinutes(time.getMinutes());
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const meetingtime = `${hours}:${minutes}:${seconds}`;
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    const meetingDesplayTime = formattedHours + ':' + minutes + ' ' + period

    const filteredUserData = UserData?.filter(user => selectedItems?.includes(user.id)); //show selected user by defualt one user for chat
    const selectedUser = UserData?.filter(user => {
        if (myID !== user?.id) {
            return user?.id
        }
    })


    const handleSubmit = () => {
        const data = { taskId: uuid.v4, type: 'Checklist', tasktitle: taskTitle, remind: selectedItems, time: taskTime, date: taskDate, checkbox: checkboxes }
        if (taskTitle == '') {
            Alert.alert('Please Enter Title');
        }
        else if (checkboxes.length < 1) {
            Alert.alert('Add minimum one checkbox');
        }
        else {
            onSubmit(data);

        }
    };
    const handleUpdate = async () => {
        const messageId = editData?.messageId
        const token = await getToken()
        Edit_Task(token, messageId, checkboxes, taskTitle, selectedItems)
            .then((res) => {
                if (res.status_code == 200) {
                    onSubmit('edit')
                }

            })
    }
    const getuser = async () => {
        setLoading(true)
        const timezone = { timezone: Timezone.getTimeZone() }
        await User_List(timezone, token).then((res) => {
            if (res.status_code == 200) {
                setUserData(res?.data?.userList)
                setLoading(false)
            }
        }).catch((e) => { console.log(e); })

    };
    useEffect(() => {
        getuser()

    }, [])
    const list = ({ item, index }) => {
        // console.log(item);
        return (
            <View>
                {index < 4 ? <Image source={{ uri: item?.profile }} style={{
                    height: 40, width: 40,
                    borderRadius: 100, marginLeft: index == 0 ? 0 : -20
                }} /> : ''}
            </View>
        )
    }
    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    const openEditCheckBoxModal = (index) => {
        setIsEditing(true);
        setEditingIndex(index);
        setNewCheckBoxLabel(checkboxes[index].checkbox); // Pre-fill with current label
        setModalVisible(true); // Show modal
    };
    const toggleCheckbox = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index].task_checked = !updatedCheckboxes[index].task_checked;
        setCheckboxes(updatedCheckboxes);
    };
    const openCreateCheckBoxModal = () => {
        setIsEditing(false); // Not editing by default
        setModalVisible(true);
        setNewCheckBoxLabel(''); // Reset label input when creating
    };
    const submitCheckBox = () => {
        if (newCheckBoxLabel.trim() === '') return; // Avoid empty checkbox labels

        if (isEditing) {
            // If editing, update the checkbox label
            const updatedCheckboxes = [...checkboxes];
            updatedCheckboxes[editingIndex].checkbox = newCheckBoxLabel;
            setCheckboxes(updatedCheckboxes);
        } else {
            // If not editing, add a new checkbox
            setCheckboxes([...checkboxes, { checkbox: newCheckBoxLabel, task_checked: false, id: uuid.v4() }]);
        }

        setNewCheckBoxLabel('');
        setModalVisible(false); // Hide modal after submission
    };
    const deleteCheckBox = (index) => {
        const updatedCheckboxes = checkboxes.filter((_, i) => i !== index);
        setCheckboxes(updatedCheckboxes);
    };


    return (
        <ScrollView
            bounces={false}
            style={{
                backgroundColor: COLOR.white,
                width: '100%',
                paddingHorizontal: 30,
                borderRadius: 20,
                marginBottom: isFocused ? '80%' : 0
            }}>
            {/* <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>{editData ? 'Edit Task' : 'Create Task'}</Text> */}

            <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter Task Title"
                onChangeText={res => setTaskTitle(res)}
                value={taskTitle}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white,
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    shadowOffset: { height: 0, width: 1 },
                    height: 48,
                    borderRadius: 10,
                    paddingLeft: 15,
                    fontWeight: '500',
                    fontSize: 16,
                    color: COLOR.textcolor,
                    marginTop: 30
                }}
            />

            {checkboxes.map((checkbox, index) => {
                const users = checkbox?.task_checked_users?.split(',')?.map(Number);
                // console.log(users?.includes(myID));
                // console.log(checkbox?.task_checked_users, '--------------------------------', users?.includes(myID), checkbox.task_checked);


                return (
                    <View key={index} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLOR.white,
                        borderWidth: 1.5, borderColor: '#EFEFEF',
                        height: 48,
                        borderRadius: 10,
                        paddingLeft: 15,
                        fontWeight: '500',
                        fontSize: 16,
                        color: COLOR.textcolor,
                        marginTop: 15,
                        justifyContent: 'space-between'
                    }}>
                        {/* Custom Image Checkbox */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {users?.includes(myID) ?
                                <View>
                                    <Image
                                        source={
                                            users?.includes(myID)
                                                ? require('../../../Assets/Image/check.png') 
                                                : require('../../../Assets/Image/box.png') 
                                        }
                                        style={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 10,
                                            tintColor: users?.includes(myID) ? COLOR.green : COLOR.black
                                        }}
                                    />
                                </View> :
                                <TouchableOpacity onPress={() => { toggleCheckbox(index), toggleCheckBoxItem(checkbox.id) }}>
                                    <Image
                                        source={
                                            selectedCheckList.includes(checkbox.id)
                                                ? require('../../../Assets/Image/check.png') 
                                                : require('../../../Assets/Image/box.png') 
                                        }
                                        style={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 10,
                                            tintColor: selectedCheckList.includes(checkbox.id) ? COLOR.green : COLOR.black
                                        }}
                                    />
                                </TouchableOpacity>
                            }
                            <Text style={{ color: COLOR.gray, fontWeight: '500' }}>{checkbox?.checkbox?.length > 33 ? checkbox?.checkbox.slice(0, 33) + '...' : checkbox?.checkbox}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setSelectedCheckBox(checkbox) }} style={styles.menuButton}>
                            <Image source={require('../../../Assets/Image/dott.png')}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 10,
                                    tintColor: COLOR.green,
                                    resizeMode: 'contain'
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', right: 0, bottom: 30 }}>
                            {checkbox == selectedCheckBox ?
                                <View style={{ width: 100, backgroundColor: COLOR.white, alignItems: 'center', justifyContent: 'center', borderRadius: 5, shadowOffset: { height: 1, width: 2 }, shadowOpacity: 0.2, }}>
                                    <TouchableOpacity onPress={() => openEditCheckBoxModal(index)} style={{ width: 100, padding: 8 }}>
                                        <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '700', textAlign: 'center' }}>Edit</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => deleteCheckBox(index)} style={{ padding: 8, width: 100 }}>
                                        <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '700', textAlign: 'center' }}>Delete</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => setSelectedCheckBox(null)} style={{ padding: 8, width: 100 }}>
                                        <Text style={{ fontSize: 16, color: COLOR.orange, fontWeight: '700', textAlign: 'center' }}>close</Text>
                                    </TouchableOpacity>
                                </View> : ''}
                        </View>
                    </View>
                )
            })}


            <TouchableOpacity onPress={openCreateCheckBoxModal} style={{ alignSelf: 'center', marginTop: 30 }}>
                <Image source={require('../../../Assets/Image/addmoretaskicon.png')} style={{ width: 42, height: 42, marginRight: 5, tintColor: COLOR.green, resizeMode: 'contain' }} />

            </TouchableOpacity>
            {/* Modal for adding a new checkbox */}
            <Modal
                visible={modalVisible}
                // animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <BlurView
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    blurType="light"
                    blurAmount={2}
                >
                    {/* <View style={{ backgroundColor: 'rgba(255,255,255,0.7)', flex: 1, alignItems: 'center', justifyContent: 'center', }}> */}
                    <View style={{ width: '88%', backgroundColor: COLOR.white, borderRadius: 10, padding: 20, shadowOpacity: 0.3, shadowOffset: { height: 1, width: 1 }, shadowRadius: 10 }}>
                        {/* <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 16, color: COLOR.black, fontWeight: 'bold' }}>Create Checklist</Text> */}
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                            <Image source={require('../../../Assets/Image/x.png')} style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: COLOR.black }}>New Task</Text>
                        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 30 }}>
                            <Image source={require('../../../Assets/Image/addmoretaskicon.png')} style={{ width: 42, height: 42, marginRight: 5, tintColor: COLOR.green, resizeMode: 'contain' }} />

                        </TouchableOpacity>
                        <TextInput
                            style={{
                                backgroundColor: COLOR.white,
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                                shadowOffset: { height: 1, width: 1 },
                                height: 48,
                                borderRadius: 5,
                                paddingLeft: 15,
                                fontWeight: '500',
                                fontSize: 16,
                                color: COLOR.textcolor, marginTop: 30
                            }}
                            placeholder="Enter Task Title"
                            value={newCheckBoxLabel}
                            onChangeText={(text) => setNewCheckBoxLabel(text)}
                        />

                        {/* <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Image source={require('../../../Assets/Image/addmoretaskicon.png')} style={{ width: 42, height: 42, marginRight: 5, tintColor: COLOR.green, resizeMode: 'contain' }} />
                        </TouchableOpacity> */}
                        {/* <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-around', marginHorizontal: '15%', alignItems: 'center' }}> */}
                        <Button bgColor={COLOR.green} color={COLOR.white} title="Submit" onPress={submitCheckBox} marginTop={50} />
                        {/* <Button borderWidth={1} title="Cancel" onPress={() => setModalVisible(false)} /> */}
                        {/* </View> */}
                    </View>
                    {/* </View> */}
                </BlurView>

            </Modal>

            <View style={{ alignSelf: 'center', marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
                {/* <PickerButton title={'Remind'} onPress={() => setVisible(true)} /> */}
                <PickerButton source={require('../../../Assets/Image/date.png')} title={datetime?.date == true ? TaskDate : 'Date'} onPress={() => setOpenDate(true)} />
                <PickerButton source={require('../../../Assets/Image/time.png')} title={datetime?.time == true ? meetingDesplayTime : 'Time'} onPress={() => setOpenTime(true)} />
            </View>
            {filteredUserData ? <View style={{
                width: filteredUserData?.length < 2 ? 85
                    : filteredUserData?.length < 3 ? 105
                        : filteredUserData?.length < 4 ? 125 : 145,
                alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 40
            }}>
                <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false}
                    style={{}} />
                {/* <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor, marginRight: 5 }}>{filteredUserData.length <= 3 ? '' : '+' + (filteredUserData.length - 3)}</Text> */}
                <TouchableOpacity onPress={() => setVisible(true)} style={{}}>
                    <Image source={require('../../../Assets/Image/addpepole.png')} style={{ height: 40, width: 40, }} />
                </TouchableOpacity>
            </View> : null}
            <Button
                onPress={editData[0]?.messageType == 'Text' ? handleSubmit : editData?.messageType == 'Task' ? handleUpdate : handleSubmit}
                marginTop={42} marginBottom={30}
                title={editData ? 'Update' : 'Submit'}
                bgColor={COLOR.green}
                color={COLOR.white}
            />
            <Modal visible={visible} >
                <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20, paddingBottom: '20%' }}>

                        <FlatList style={{ paddingHorizontal: 20, }} data={selectedUser} renderItem={(({ item }) => {
                            // console.log(item);
                            const userName = item?.first_name + ' ' + item.last_name
                            return (
                                <View>
                                    {item.type == 'user' ? <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: item?.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                                            <Text style={{ fontSize: 16, marginLeft: 10, color: COLOR.black, fontWeight: 'bold' }}>{userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => toggleItem(item?.id)}>
                                            <Image
                                                source={selectedItems.includes(item.id) ? require('../../../Assets/Image/check.png') : require('../../../Assets/Image/box.png')}
                                                style={{ height: 25, width: 25, tintColor: selectedItems.includes(item.id) ? COLOR.green : COLOR.lightgray }}
                                            />
                                        </TouchableOpacity>
                                    </View> : null}
                                </View>
                            )
                        })} />
                        <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, }}>
                            <Button color={COLOR.white} bgColor={COLOR.green} title={'Select'} onPress={() => setVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <DatePicker
                minimumDate={new Date()}
                modal
                mode='date'
                open={openDate}
                date={taskDate}
                onConfirm={(date) => {
                    setOpenDate(false)
                    setTaskDate(date)
                    setdatetime(prevState => ({ ...prevState, date: true }));
                }}
                onCancel={() => {
                    setOpenDate(false)
                }}
            />
            <DatePicker
                modal
                mode='time'
                open={openTime}
                date={taskTime}
                onConfirm={(time) => {
                    setOpenTime(false)
                    setTaskTime(time)
                    setdatetime(prevState => ({ ...prevState, time: true }));
                }}
                onCancel={() => {
                    setOpenTime(false)
                }}
            />
            {/* <Loader visible={loading} Retry={getuser} /> */}
        </ScrollView>
    )
}

export default CreateTask

const PickerButton = ({ title, onPress, source }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 10, borderColor: COLOR.bordercolor, margin: 5, justifyContent: 'space-around' }}>
            <Image source={source}
                style={{ height: 18, width: 18, resizeMode: 'contain', }} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.gray, marginHorizontal: 10 }}>{title}</Text>
            <Image source={require('../../../Assets/Image/taskdownarrow.png')}
                style={{ height: 8, width: 13, resizeMode: 'stretch', }} />
        </TouchableOpacity>
    )
}


