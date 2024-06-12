import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-native-date-picker'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import Button from '../../../Custom/Button/Button'
import NavigateHeader from '../../../Custom/Header/NavigateHeader'
import Timezone from 'react-native-timezone'
import { User_List } from '../../../Service/actions'

const CreateReminder = ({ onSubmit, userId, token }) => {
    const [descriptions, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [opentime, setOpenTime] = useState(false);
    const [UserData, setUserData] = useState();
    const [visible, setVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([userId]);
    const [Time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false);

    let hours = Time.getHours().toString().padStart(2, '0')
    const minutes = Time.getMinutes().toString().padStart(2, '0');
    const Second = Time.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const remindtime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    // const apiTime = `${hours.toString().padStart(2, '0')}:${minutes}:${Second} `;

    const timestamp = new Date(Time);
    const apiTime = (timestamp.getUTCHours().toString().padStart(2, '0')) + ':' + (timestamp.getUTCMinutes().toString().padStart(2, '0')) + ':' + timestamp.getUTCSeconds().toString().padStart(2, '0')

    // timestamp.setDate(timestamp.getDate() - 25);
    // const apiDate = timestamp.toISOString().slice(0, 10).replace("T", " ");
    const apiDate = (timestamp.getUTCFullYear()) + '-' + (timestamp.getUTCMonth() + 1) + '-' + timestamp.getUTCDate()

    const filteredUserData = UserData?.filter(user => selectedItems?.includes(user?.id)); //show selected user by defualt one user for chat

    const handleSubmit = () => {
        const data = { type: 'Reminder', reminddescriptions: descriptions, remindtitle: title, apiTime, apiDate, remind: selectedItems }
        if (descriptions == '') {
            Alert.alert('Please enter title and description');
        }
        else if (
            descriptions.length < 50
        ) { Alert.alert('Write minimum 50 Character') }
        else {
            onSubmit(data);
            setDescription('')
        }
    };
    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const getuser = async () => {
        const timezone = { timezone: Timezone.getTimeZone() }
        await User_List(timezone, token).then((res) => {
            if (res.status_code == 200) {
                setUserData(res?.data?.userList)

            }
        }).catch((e) => { console.log(e); })

    };
    useEffect(() => {
        getuser()

    }, [])
    const list = ({ item, index }) => {
        return (
            <View>
                {index < 4 ? <Image source={{ uri: item.profile }} style={{
                    height: 40, width: 40,
                    borderRadius: 100, marginLeft: index == 0 ? 0 : -20
                }} /> : ''}
            </View>
        )
    }
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

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
                <PickerButton title={'  Remind  '} onPress={() => setVisible(true)} />
                <PickerButton title={remindtime} onPress={() => setOpenTime(true)} />

            </View>
            <Title title={'Reminder Title'} />
            <TextInput
                placeholder="Enter Title....."

                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={title}
                onChangeText={(res) => setTitle(res)}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
                    height: 45,
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 16,
                    marginTop: 8,
                    fontWeight: '500',
                    color: COLOR.textcolor,
                }}

            />
            <Title title={'Reminder Description'} />
            <TextInput
                placeholder="Enter Descriptions....."
                multiline
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={descriptions}
                onChangeText={(res) => setDescription(res)}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
                    height: 150,
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 16,
                    marginTop: 8,
                    paddingTop: 10,
                    fontWeight: '500',
                    color: COLOR.textcolor,
                }}

            />
            {descriptions.length > 50 ? '' : <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Image source={require('../../../Assets/Image/notice.png')} style={{ height: 15, width: 15, marginRight: 5, tintColor: COLOR.orange }} />
                <Text style={{
                    color: COLOR.orange, fontWeight: '500',
                    textAlign: 'left', fontSize: 14, width: '90%'
                }}>{'Descriptions minimum 50 characters are require'}</Text>
            </View>}





            {filteredUserData ? <View style={{
                width: filteredUserData?.length < 2 ? 65
                    : filteredUserData?.length < 3 ? 85
                        : filteredUserData?.length < 4 ? 105 : 125,
                alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: 10
            }}>
                <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false}
                    style={{}} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor }}>{'+' + filteredUserData?.length}</Text>
            </View> : null}
            <Button
                onPress={handleSubmit}
                marginTop={20} marginBottom={30}
                title={'Submit'}
                bgColor={COLOR.green}
                color={COLOR.white}
            />

            <DatePicker
                modal
                mode='datetime'
                open={opentime}
                date={Time}
                onConfirm={(time) => {
                    setOpenTime(false)
                    setTime(time)
                    console.log(time);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Modal visible={visible} >
                <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 20, padding: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 }}>
                        <FlatList data={UserData} renderItem={(({ item }) => {
                            // console.log(item);
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


        </ScrollView>
    )
}

export default CreateReminder

const PickerButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 10, borderColor: COLOR.bordercolor, marginHorizontal: 10, }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor }}>{title}</Text>
            <Image source={require('../../../Assets/Image/down.png')}
                style={{ height: 18, width: 18, resizeMode: 'contain', marginTop: -5, marginLeft: 5, tintColor: COLOR.green }} />
        </TouchableOpacity>
    )
}


const Title = ({ title }) => {
    return (

        <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor, marginTop: 30 }}>{title}</Text>

    )
}