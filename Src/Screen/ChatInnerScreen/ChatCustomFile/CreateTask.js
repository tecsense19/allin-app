// import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, Alert, Modal } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import uuid from 'react-native-uuid'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import Button from '../../../Custom/Button/Button'
// import { COLOR } from '../../../Assets/AllFactors/AllFactors'
// import NavigateHeader from '../../../Custom/Header/NavigateHeader'
// import { User_List } from '../../../Service/actions'
// import Timezone from 'react-native-timezone'
// import Loader from '../../../Custom/Loader/loader'


// const CreateTask = ({ onSubmit, userId, token }) => {
//     const [descriptions, setDescription] = useState('');
//     const [title, setTitle] = useState('');
//     const [isFocused, setIsFocused] = useState(false);
//     const [visible, setVisible] = useState(false);
//     const [UserData, setUserData] = useState();
//     const [selectedItems, setSelectedItems] = useState([userId]);
//     const [myID, setMyId] = useState('');
//     const [loading, setLoading] = useState(false);
//     const id = uuid.v4()

//     const filteredUserData = UserData?.filter(user => selectedItems?.includes(user.id)); //show selected user by defualt one user for chat
//     const selectedUser = UserData?.filter(user => {
//         if (myID !== user?.id) {
//             return user?.id
//         }
//     })// by defualt selected user not show

//     const handleSubmit = () => {
//         const data = { taskId: id, type: 'Checklist', tasktitle: title, taskdescriptions: descriptions, remind: selectedItems }
//         if (title == '') {
//             Alert.alert('Please enter title and descriptions');
//         }

//         else {
//             onSubmit(data);
//             setDescription(null)
//         }
//     };

//     const getuser = async () => {
//         setLoading(true)
//         const timezone = { timezone: Timezone.getTimeZone() }
//         await User_List(timezone, token).then((res) => {
//             if (res.status_code == 200) {
//                 setUserData(res?.data?.userList)
//                 setLoading(false)
//             }
//         }).catch((e) => { console.log(e); })

//     };
//     useEffect(() => {
//         getuser()

//     }, [myID])

//     const list = ({ item, index }) => {
//         // console.log(item);
//         return (
//             <View>
//                 {index < 4 ? <Image source={{ uri: item?.profile }} style={{
//                     height: 50, width: 50,
//                     borderRadius: 100, marginLeft: index == 0 ? 0 : -20
//                 }} /> : ''}
//             </View>
//         )
//     }
//     const toggleItem = (itemId) => {
//         if (selectedItems.includes(itemId)) {
//             setSelectedItems(selectedItems.filter((id) => id !== itemId));
//         } else {
//             setSelectedItems([...selectedItems, itemId]);
//         }
//     };
//     return (
//         <ScrollView
//             bounces={false}
//             style={{
//                 backgroundColor: COLOR.white,
//                 width: '100%',
//                 paddingHorizontal: 30,
//                 borderRadius: 20,
//                 marginBottom: isFocused ? '80%' : 0
//             }}>
//             <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Create Task</Text>

//             <Title title={'Task Title'} />
//             <TextInput
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 placeholder="Enter Task Title"
//                 onChangeText={res => setTitle(res)}
//                 value={title}
//                 placeholderTextColor={COLOR.placeholder}
//                 style={{
//                     backgroundColor: COLOR.white,
//                     shadowOpacity: 0.2,
//                     shadowRadius: 5,
//                     shadowOffset: { height: 1, width: 1 },
//                     height: 45,
//                     borderRadius: 5,
//                     paddingLeft: 15,
//                     fontWeight: '500',
//                     fontSize: 16,
//                     color: COLOR.textcolor,
//                     marginTop: 8
//                 }}
//             />
//             <Title title={'Task Description'} />
//             <TextInput
//                 placeholder="Enter Description..."
//                 multiline
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 value={descriptions}
//                 onChangeText={(res) => setDescription(res)}
//                 placeholderTextColor={COLOR.placeholder}
//                 style={{
//                     backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
//                     height: 150,
//                     borderRadius: 5,
//                     paddingLeft: 15,
//                     fontSize: 16,
//                     marginTop: 8,
//                     paddingTop: 10,
//                     fontWeight: '500',
//                     color: COLOR.textcolor,
//                 }}
//             />

//             <View style={{ alignSelf: 'center', marginTop: 50 }}>
//                 <PickerButton title={'Remind'} onPress={() => setVisible(true)} />
//             </View>
//             {filteredUserData ? <View style={{
//                 width: filteredUserData?.length < 2 ? 80
//                     : filteredUserData?.length < 3 ? 110
//                         : filteredUserData?.length < 4 ? 140 : 170,
//                 alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: 10
//             }}>
//                 <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false}
//                     style={{}} />
//                 <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor }}>{filteredUserData.length <= 4 ? '' : '+' + (filteredUserData.length - 4)}</Text>
//             </View> : null}
//             <Button
//                 onPress={handleSubmit}
//                 marginTop={20} marginBottom={30}
//                 title={'Submit'}
//                 bgColor={COLOR.green}
//                 color={COLOR.white}
//             />
//             <Modal visible={visible} >
//                 <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
//                     <View style={{ paddingHorizontal: 20 }}>
//                         <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
//                     </View>
//                     <View style={{ marginTop: 10, paddingHorizontal: 20, padding: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 }}>
//                         <FlatList data={selectedUser} renderItem={(({ item }) => {
//                             console.log(item);
//                             const userName = item?.first_name + ' ' + item.last_name
//                             return (
//                                 <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <Image source={{ uri: item?.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} />
//                                         <Text style={{ fontSize: 16, marginLeft: 10, color: COLOR.black, fontWeight: 'bold' }}>{userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}</Text>
//                                     </View>

//                                     <TouchableOpacity onPress={() => toggleItem(item?.id)}>
//                                         <Image
//                                             source={selectedItems.includes(item.id) ? require('../../../Assets/Image/check.png') : require('../../../Assets/Image/box.png')}
//                                             style={{ height: 25, width: 25, tintColor: selectedItems.includes(item.id) ? COLOR.green : COLOR.lightgray }}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             )
//                         })} />
//                         <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, }}>
//                             <Button color={COLOR.white} bgColor={COLOR.green} title={'Select'} onPress={() => setVisible(false)} />
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </ScrollView>
//     )
// }

// export default CreateTask

// const PickerButton = ({ title, onPress }) => {
//     return (
//         <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 10, borderColor: COLOR.bordercolor }}>
//             <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor }}>{title}</Text>
//             <Image source={require('../../../Assets/Image/down.png')}
//                 style={{ height: 18, width: 18, marginTop: -5, resizeMode: 'contain', marginLeft: 5, tintColor: COLOR.green }} />
//         </TouchableOpacity>
//     )
// }
// const Title = ({ title }) => {
//     return (
//         <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor, marginTop: 20 }}>{title}</Text>)
// }


import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, Alert, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import Button from '../../../Custom/Button/Button'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../../Custom/Header/NavigateHeader'
import { User_List } from '../../../Service/actions'
import Timezone from 'react-native-timezone'
import Loader from '../../../Custom/Loader/loader'
import DatePicker from 'react-native-date-picker'


const CreateTask = ({ onSubmit, userId, token }) => {
    const [descriptions, setDescription] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState();
    const [selectedItems, setSelectedItems] = useState([userId]);
    const [myID, setMyId] = useState('');
    const [loading, setLoading] = useState(false);
    const id = uuid.v4()


    const [taskTitle, setTaskTitle] = useState(''); // State for task title
    const [checkboxes, setCheckboxes] = useState([]); // State for holding checkboxes
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [newCheckBoxLabel, setNewCheckBoxLabel] = useState(''); // State for the new checkbox label
    const [isEditing, setIsEditing] = useState(false); // State to track if editing
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedCheckBox, setSelectedCheckBox] = useState(null);
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskTime, setTaskTime] = useState(new Date());
    const [openTime, setOpenTime] = useState(false);
    const [openDate, setOpenDate] = useState(false);


    const year = taskDate.getUTCFullYear();
    const month = (taskDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month and pad with zero
    const day = taskDate.getUTCDate().toString().padStart(2, '0'); // Pad with zero
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
    })// by defualt selected user not show

    const handleSubmit = () => {
        const data = { taskId: id, type: 'Checklist', tasktitle: taskTitle, remind: selectedItems, time: taskTime, date: taskDate, checkbox: checkboxes }
        console.log(data);

        if (taskTitle == '') {
            Alert.alert('Please Enter Title');
        }
        else if (checkboxes.length < 1) {
            Alert.alert('Add minimum one checkbox');

        }
        else {
            onSubmit(data);
            setDescription(null)
        }
    };
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

    }, [myID])
    const list = ({ item, index }) => {
        // console.log(item);
        return (
            <View>
                {index < 4 ? <Image source={{ uri: item?.profile }} style={{
                    height: 50, width: 50,
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
        setNewCheckBoxLabel(checkboxes[index].label); // Pre-fill with current label
        setModalVisible(true); // Show modal
    };



    const toggleCheckbox = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
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
            updatedCheckboxes[editingIndex].label = newCheckBoxLabel;
            setCheckboxes(updatedCheckboxes);
        } else {
            // If not editing, add a new checkbox
            setCheckboxes([...checkboxes, { label: newCheckBoxLabel, checked: false, id: checkboxes.length + 1 }]);
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
            <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Create Task</Text>

            <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter Task Title"
                onChangeText={res => setTaskTitle(res)}
                value={taskTitle}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white,
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    shadowOffset: { height: 1, width: 1 },
                    height: 45,
                    borderRadius: 5,
                    paddingLeft: 15,
                    fontWeight: '500',
                    fontSize: 16,
                    color: COLOR.textcolor,
                    marginTop: 30
                }}
            />

            {checkboxes.map((checkbox, index) => {
                return (
                    <View key={index} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLOR.white,
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        shadowOffset: { height: 1, width: 1 },
                        height: 45,
                        borderRadius: 5,
                        paddingLeft: 15,
                        fontWeight: '500',
                        fontSize: 16,
                        color: COLOR.textcolor,
                        marginTop: 15,
                        justifyContent: 'space-between'
                    }}>
                        {/* Custom Image Checkbox */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => toggleCheckbox(index)}>
                                <Image
                                    source={
                                        checkbox.checked
                                            ? require('../../../Assets/Image/check.png') // Path to checked image
                                            : require('../../../Assets/Image/box.png') // Path to unchecked image
                                    }
                                    style={{
                                        width: 24,
                                        height: 24,
                                        marginRight: 10,
                                        tintColor: checkbox.checked ? COLOR.green : COLOR.black
                                    }}
                                />
                            </TouchableOpacity>
                            <Text>{checkbox?.label?.length > 33 ? checkbox?.label.slice(0, 33) + '...' : checkbox?.label}</Text>
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
                                    <TouchableOpacity onPress={() => deleteCheckBox(index)} style={{ padding: 8, width: 100 }}>
                                        <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '700', textAlign: 'center' }}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setSelectedCheckBox(null)} style={{ padding: 8, width: 100 }}>
                                        <Text style={{ fontSize: 16, color: COLOR.orange, fontWeight: '700', textAlign: 'center' }}>close</Text>
                                    </TouchableOpacity>
                                </View> : ''}
                        </View>
                    </View>
                )
            })}


            <TouchableOpacity onPress={openCreateCheckBoxModal} style={{ height: 45, backgroundColor: COLOR.green, marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 20, borderRadius: 50 }}>
                <Image source={require('../../../Assets/Image/+.png')} style={{ width: 18, height: 18, marginRight: 5, tintColor: COLOR.white, resizeMode: 'contain' }} />
                <Text style={{ fontSize: 18, color: COLOR.white, fontWeight: 'bold' }}>Create Task</Text>
            </TouchableOpacity>
            {/* Modal for adding a new checkbox */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: '25%', width: '85%', backgroundColor: COLOR.white, borderRadius: 10, padding: 20, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 16, color: COLOR.black, fontWeight: 'bold' }}>Create Checklist</Text>
                        <TextInput
                            style={{
                                backgroundColor: COLOR.white,
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                                shadowOffset: { height: 1, width: 1 },
                                height: 45,
                                borderRadius: 5,
                                paddingLeft: 15,
                                fontWeight: '500',
                                fontSize: 16,
                                color: COLOR.textcolor,

                            }}
                            placeholder="Enter Checklist label"
                            value={newCheckBoxLabel}
                            onChangeText={(text) => setNewCheckBoxLabel(text)}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-around', marginHorizontal: '15%', alignItems: 'center' }}>
                            <Button bgColor={COLOR.green} color={COLOR.white} title="Submit" onPress={submitCheckBox} />
                            <Button borderWidth={1} title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ alignSelf: 'center', marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
                {/* <PickerButton title={'Remind'} onPress={() => setVisible(true)} /> */}
                <PickerButton title={TaskDate} onPress={() => setOpenDate(true)} />
                <PickerButton title={meetingDesplayTime} onPress={() => setOpenTime(true)} />
            </View>
            {filteredUserData ? <View style={{
                width: filteredUserData?.length < 2 ? 105
                    : filteredUserData?.length < 3 ? 135
                        : filteredUserData?.length < 4 ? 165 : 190,
                alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 40
            }}>
                <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false}
                    style={{}} />
                {/* <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor, marginRight: 5 }}>{filteredUserData.length <= 3 ? '' : '+' + (filteredUserData.length - 3)}</Text> */}
                <TouchableOpacity onPress={() => setVisible(true)} style={{ height: 50, width: 50, backgroundColor: COLOR.green, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                    <Image source={require('../../../Assets/Image/+.png')} style={{ height: 25, width: 25, tintColor: COLOR.white }} />
                </TouchableOpacity>
            </View> : null}
            <Button
                onPress={handleSubmit}
                marginTop={20} marginBottom={30}
                title={'Submit'}
                bgColor={COLOR.green}
                color={COLOR.white}
            />
            <Modal visible={visible} >
                <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 20, padding: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 }}>
                        <FlatList data={selectedUser} renderItem={(({ item }) => {
                            console.log(item);
                            const userName = item?.first_name + ' ' + item.last_name
                            return (
                                <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>
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
                }}
                onCancel={() => {
                    setOpen(false)
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
                }}
                onCancel={() => {
                    setOpenTime(false)
                }}
            />
            <Loader visible={loading} Retry={''} />
        </ScrollView>
    )
}

export default CreateTask

const PickerButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 10, borderColor: COLOR.bordercolor, margin: 10, }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor }}>{title}</Text>
            <Image source={require('../../../Assets/Image/down.png')}
                style={{ height: 18, width: 18, marginTop: -5, resizeMode: 'contain', marginLeft: 10, tintColor: COLOR.green, }} />
        </TouchableOpacity>
    )
}


