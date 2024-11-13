import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, TextInput, FlatList, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../../Custom/Loader/loader'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../Custom/Header/NavigateHeader'
import ProfileModal from '../../Custom/Modal/ProfileModal'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Add_Group_Mamber, Create_group } from '../../Service/actions'
import { getToken } from '../../Service/AsyncStorage'

const CreateGroupSecondScreen = (props) => {
    const Data = props?.route?.params
    const screenWidth = Dimensions.get('window').width;


    const [groupName, setGroupName] = useState('')
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [img, setImg] = useState('')
    const [data, setData] = useState('')

    console.log(img);

    useEffect(() => {
        setData(Data?.userinfo)
    }, [])
    const ids = data ? data?.map(item => item?.id) : ''
    console.log(groupName);

    const CreteNewGroup = async () => {
        setLoading(true)
        const token = await getToken()
        const groupCreateData = { name: groupName, profile: img }
        await Create_group(token, groupCreateData).then((res) => {
            if (res.status_code == 200) {
                const groupId = res.data.id
                Add_Group_Mamber(token, groupId, ids.toString()).then((i) => {
                    if (i.status_code == 200) {
                        props.navigation.navigate('chats')
                        setLoading(false)
                    }
                })
            } else {
                setLoading(false)

                Alert.alert(res?.message)

            }
        }).catch((err) => {

        }
        )

    }


    const list = ({ item }) => {
        const username = item?.first_name + ' ' + item?.last_name
        return (
            <TouchableOpacity
                style={[styles.itemContainer, { width: (screenWidth / 5) - 20, margin: screenWidth / 28, }]}
                onPress={() => handleItemClick(item.id)}
            >
                <View style={{}}>
                    <Image source={{ uri: item?.profile }} style={styles.itemImage} />
                    <View style={{ backgroundColor: COLOR.lightgreen, padding: 3, borderRadius: 10, position: 'absolute', right: 0 }}>
                        <Image source={require('../../Assets/Image/x.png')} style={styles.overlayImage} />
                    </View>
                </View>
                <Text>{username.length > 5 ? username.slice(0, 5) + '...' : username}</Text>
            </TouchableOpacity>
        )
    }
    const profileImgCemera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setIsOpen(false)
            setImg(result.assets[0]);
            try {
                // await AsyncStorage.setItem('profile', JSON.stringify(updatedData));
            } catch (e) { }
        }


    };
    const profileImgGallery = async () => {
        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            setIsOpen(false)
            setImg(result.assets[0]);


            try {
            } catch (e) { }
        }
    };
    const handleItemClick = (itemId) => {
        setData((prevData) => prevData.filter(item => item.id !== itemId));
        if (ids.length == 1) { props.navigation.goBack() }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader title={'New Group'} onCreate={CreteNewGroup} title3={'Create'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
            </View>
            <View
                style={{
                    backgroundColor: COLOR.white,
                    flex: 1,
                    marginTop: 15,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    paddingHorizontal: 20
                }}>
                <View style={{ borderWidth: 2, height: 105, marginTop: 20, borderRadius: 5, paddingHorizontal: 10, borderStyle: 'dashed', borderColor: COLOR.lightgray, justifyContent: 'center', alignItems: 'center' }}>
                    {img ? <TouchableOpacity onPress={() => setIsOpen(true)}>
                        <Image source={{ uri: img.uri }} style={{ borderRadius: 50, height: 36, width: 36, alignSelf: 'center' }} />
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setIsOpen(true)}>
                            <Image source={require('../../Assets/Image/camera.png')} style={{ height: 36, width: 36, alignSelf: 'center' }} />
                        </TouchableOpacity>}
                    <TouchableOpacity onPress={() => setIsOpen(true)}>
                        <Text style={{ fontSize: 12, color: COLOR.black, fontWeight: 'medium', marginTop: 12 }}>Upload image or <Text style={{ color: COLOR.green }}>Browse</Text></Text>
                    </TouchableOpacity>

                </View>
                <TextInput
                    value={groupName}
                    onChangeText={(txt) => setGroupName(txt)}
                    placeholder='Group name...'
                    style={{ fontSize: 16, fontWeight: '600', shadowOpacity: 0.2, backgroundColor: COLOR.white, height: 45, shadowOffset: { height: 1, width: 1 }, marginTop: 15, borderRadius: 5, paddingLeft: 10 }} />

                <Text style={{ marginTop: 30, fontSize: 15, color: COLOR.gray, fontWeight: '600', }}>
                    MEMBERS:{" " + data.length + ' OF ' + Data?.totaluser}
                </Text>
                <FlatList data={data} renderItem={list} numColumns={4} style={{ marginTop: 10 }} />
            </View>
            <ProfileModal visible={isOpen} onCemera={profileImgCemera} onGallery={profileImgGallery} onClose={() => setIsOpen(false)} />
            <Loader visible={loading} Retry={CreteNewGroup} />
        </View>
    )
}

export default CreateGroupSecondScreen

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
