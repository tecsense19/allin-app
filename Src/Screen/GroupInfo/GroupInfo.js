import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, TextInput, FlatList, Alert, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../../Custom/Loader/loader'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../Custom/Header/NavigateHeader'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Button from '../../Custom/Button/Button'
import { Edit_Group, Group_User_Add, Group_User_List, Group_User_Remove, Group_User_Search, User_List } from '../../Service/actions'
import { getToken } from '../../Service/AsyncStorage'
import Timezone from 'react-native-timezone'
import Textinput from '../../Custom/TextInput/SimpaleTextInput'

const GroupInfo = (props) => {
    const Data = props?.route?.params
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [openInput, setOpenInput] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [img, setImg] = useState('')
    const [groupUserList, setGroupUserList] = useState([])
    const [searchUserList, setSearchUserList] = useState('')
    const [allUserData, setUserData] = useState('')
    const [groupname, setGroupName] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const commaSeparatedIds = selectedItems.map(item => item).join(',');

    const onGroupUserList = async () => {
        setLoading(true)
        const token = await getToken()
        const groupid = Data?.id
        Group_User_List(token, groupid)
            .then((res) => {
                if (res.status_code == 200) {
                    setGroupUserList(res.data.user_list)
                    setLoading(false)
                }
            })
    }
    const onRemoveUser = async (item) => {
        const Token = await getToken()
        const groupid = Data?.id
        const userid = item?.id
        Group_User_Remove(Token, groupid, userid)
            .then((res) => {
                if (res.status_code == 200) {
                    onGroupUserList()
                }
            })
    }
    const onAddUser = async () => {
        const token = await getToken()
        const groupid = Data?.id
        // const userid = item?.id
        Group_User_Add(token, groupid, commaSeparatedIds)
            .then((res) => {
                if (res.status_code == 200) {
                    setVisible(false)
                    onGroupUserList()
                }
            })
    }
    const list = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.full_name}</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => onRemoveUser(item)}>
                    <Image source={require('../../Assets/Image/groupbinicon.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
        )
    }
    const profileImgCemera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setImg(result.assets[0]);
            try {
            } catch (e) { }
        }
    };
    const profileImgGallery = async () => {
        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            setImg(result.assets[0]);
            try {
            } catch (e) { }
        }
    };
    const GroupEdit = async () => {
        const groupid = Data?.id

        setLoading(true)
        const token = await getToken()

        Edit_Group(token, groupid, img, groupname)
            .then((res) => {
                if (res.status_code == 200) {
                    setLoading(false)
                    setIsOpen(false)
                    Alert.alert('Group Updated Successfully')
                    props.navigation.goBack()
                }
            })
    }
    const getuser = async () => {
        const token = await getToken()
        const timezone = { timezone: Timezone.getTimeZone() }
        await User_List(timezone, token).then((res) => {
            if (res.status_code == 200) {
                setUserData(res?.data?.userList)

            }
        }).catch((e) => { console.log(e); })

    };
    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    useEffect(() => {
        onGroupUserList()
        getuser()
        setGroupName(Data?.name)
    }, [])
    const filteredEvents = groupUserList?.filter(item =>
        item?.first_name?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader title={'Group Info'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
            </View>
            <View style={{ backgroundColor: COLOR.white, flex: 1, marginTop: 15, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                <Image source={{ uri: img?.uri ? img?.uri : Data?.profile_pic }} style={{ height: 77, width: 77, alignSelf: 'center', marginTop: 20, borderRadius: 50 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, alignSelf: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>{Data?.name}</Text>
                    <TouchableOpacity onPress={() => { setIsOpen(true) }}>
                        <Image source={require('../../Assets/Image/groupediticon.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 69, flexDirection: 'row', alignItems: 'center', shadowOffset: { height: 1, width: 1 }, backgroundColor: COLOR.white, shadowOpacity: 0.2, marginTop: 28 }}>
                    {openInput ?
                        <View style={{ height: 69, flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <TextInput value={searchInput} onChangeText={(txt) => { setSearchInput(txt) }} placeholder='Search' style={{ borderWidth: 1, borderColor: COLOR.lightgray, borderRadius: 10, backgroundColor: COLOR.white, paddingLeft: 10, height: 48, flex: 1, color: COLOR.black, fontWeight: '600' }} />
                            <TouchableOpacity onPress={() => { setOpenInput(false), setSearchInput('') }} style={{ marginLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: COLOR.green }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        : <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../Assets/Image/groupaudioicon.png')} />
                                <Text style={{ marginTop: 5, color: COLOR.black, fontWeight: '600' }}>Audio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <Image style={{ height: 23, width: 23, resizeMode: 'contain' }} source={require('../../Assets/Image/groupvideoicon.png')} />
                                <Text style={{ marginTop: 5, color: COLOR.black, fontWeight: '600' }}>Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setOpenInput(true)}>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../Assets/Image/groupsearchicon.png')} />
                                <Text style={{ marginTop: 5, color: COLOR.black, fontWeight: '600' }}>Search</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: COLOR.black }}>{searchUserList.length > 0 ? searchUserList?.length + ' Members' : groupUserList?.length + ' Members'}</Text>
                    <TouchableOpacity onPress={() => { setVisible(true) }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: COLOR.green }}>+ Add Member</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={filteredEvents} renderItem={list} />
            </View>
            <Modal transparent visible={isOpen}>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 20 }}>
                    <View style={{ backgroundColor: COLOR.white, borderRadius: 10, paddingHorizontal: 20, }}>
                        <ScrollView bounces={false} style={{}}>

                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20, color: COLOR.black, fontWeight: 'bold' }}>Edit Group</Text>
                            <Image source={{ uri: img?.uri ? img?.uri : Data?.profile_pic }} style={{ height: 77, width: 77, borderRadius: 50, alignSelf: 'center', marginTop: 20 }} />
                            <TextInput value={groupname} onChangeText={(txt) => setGroupName(txt)} style={{ borderRadius: 10, marginTop: 30, paddingLeft: 10, backgroundColor: COLOR.white, shadowOpacity: 0.3, height: 48, shadowOffset: { height: 1, width: 1 }, fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 }} placeholder='Enter Group New Name' />

                            <TouchableOpacity onPress={profileImgCemera} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                                <Image source={require('../../Assets/Image/camera.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                                <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '600' }}>Take Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={profileImgGallery} style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                                <Image source={require('../../Assets/Image/image.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                                <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '600' }}>Choose Picture</Text>
                            </TouchableOpacity>
                            <Button onPress={GroupEdit} bgColor={COLOR.green} marginTop={20} marginBottom={10} title={'Update'} color={COLOR.white} />
                            <Button onPress={() => setIsOpen(false)} marginBottom={20} title={'Close'} color={COLOR.black} borderWidth={1} />
                        </ScrollView>

                    </View>


                </View>
            </Modal >
            <Modal visible={visible} >
                <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 }}>
                        <FlatList style={{ paddingHorizontal: 20, }} data={allUserData} renderItem={(({ item }) => {
                            const ids = groupUserList.map(user => user.id);
                            const isAllRadyThere = ids.includes(item.id)
                            // console.log(isHilighted);

                            const userName = item?.first_name + ' ' + item.last_name
                            return (
                                <View>
                                    {item.type == 'user' ? <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: item?.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                                            <Text style={{ fontSize: 16, marginLeft: 10, color: COLOR.black, fontWeight: 'bold' }}>{userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}</Text>
                                        </View>

                                        {isAllRadyThere ?
                                            <Text style={{ color: COLOR.green, fontWeight: 'bold' }}>Already Exists</Text>
                                            : <TouchableOpacity onPress={() => toggleItem(item?.id)}>
                                                <Image
                                                    source={selectedItems.includes(item.id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')}
                                                    style={{ height: 25, width: 25, tintColor: selectedItems.includes(item.id) ? COLOR.green : COLOR.lightgray }}
                                                />
                                            </TouchableOpacity>}
                                    </View> : null}
                                </View>
                            )
                        })} />
                        <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, }}>
                            <Button color={COLOR.white} bgColor={COLOR.green} title={'Add Member'} onPress={onAddUser} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Loader visible={loading} Retry={onGroupUserList} />
        </View>

    )
}

export default GroupInfo

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.black },

    createNoteText: {
        textAlign: 'center',
        fontSize: 20,
        color: COLOR.white,
        marginTop: 40,
        fontWeight: 'bold',
    },
    addNoteTextInput: {
        backgroundColor: COLOR.white,
        borderWidth: 1,
        color: COLOR.black,
        fontSize: 18,
        paddingLeft: 10,
        borderColor: COLOR.gray,
    },
    onSave: {
        marginTop: '10%',
        backgroundColor: COLOR.green,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 50,
    },
    fontSize: 18,
    saveTxt: {
        color: COLOR.white,
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: '600',
    },
    flatListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemImage: {
        height: 50,
        width: 50,
        borderRadius: 100,
    },


    overlayImage: {
        height: 7,
        width: 7,
    },
});
