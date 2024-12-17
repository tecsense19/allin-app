import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import Timezone from 'react-native-timezone'
import { User_List } from '../../Service/actions'
import { getToken } from '../../Service/AsyncStorage'
import Loader from '../../Custom/Loader/loader'
import { useFocusEffect } from '@react-navigation/native'
import ListImage from '../../Custom/ListImage/ListImage'


const CreateGroupFirstScreen = (props) => {
    const [loading, setLoading] = useState(false)
    const [allUserData, setAllUserData] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const selectedUser = allUserData?.filter(user => { return user?.id })// by defualt selected user not show
    const filteredUserData = allUserData?.filter(user => selectedItems?.includes(user.id)); //show selected user by defualt one user for chat
    console.log(selectedItems);


    const getuser = async () => {
        setLoading(true)
        const Token = await getToken();
        const bodydata = { timezone: Timezone.getTimeZone(), };

        const res = await User_List(bodydata, Token);
        if (res.status_code === 200) {
            setLoading(false);
            setAllUserData(res.data.userList);
            setSearchResults(res.data.userList);

        } else {
            console.log('User_List API returned error:', res);
            // Handle error case, e.g., show alert or retry logic
        }
    };
    useFocusEffect(useCallback(() => {
        setSelectedItems('')
    }, []))
    useEffect(() => {
        getuser()
    }, [])
    const list = ({ item, index }) => {
        const username = item.first_name + ' ' + item.last_name


        return (
            <TouchableOpacity style={{ height: 80, marginLeft: 20, }} onPress={() => toggleItem(item.id)}>
                <Image source={{ uri: item.profile }} style={{
                    height: 50, width: 50,
                    borderRadius: 100,
                }} />
                <View style={{ backgroundColor: COLOR.lightgreen, position: 'absolute', padding: 5, borderRadius: 50, right: 0 }}>
                    <Image source={require('../../Assets/Image/x.png')} style={{
                        height: 7, width: 7,

                    }} />
                </View>
                <Text style={{ alignSelf: 'center', }}>{username.length > 6 ? username.slice(0, 6) + '...' : username}</Text>
            </TouchableOpacity>
        )
    }
    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    const handleSearch = (text) => {
        setSearchInput(text);
        if (text === '') {
            setSearchResults(allUserData);
        } else {
            const filteredResults = allUserData.filter(user => {
                const userName = (user?.first_name + ' ' + user?.last_name).toLowerCase();
                return userName.includes(text.toLowerCase());
            });
            setSearchResults(filteredResults);
        }
    };

    const handaleNavigate = () => {
        const Data = { userinfo: filteredUserData, userid: selectedItems, totaluser: allUserData?.length, selecteduser: filteredUserData?.length }
        if (selectedItems.length < 2) {
            alert('Please select at least 2 users to create group')
            return
        }
        else {
            props.navigation.navigate('creategroupsecond', Data)

        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ backgroundColor: COLOR.white, marginTop: 65, height: 45, marginHorizontal: 25, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TextInput onBlur={() => { setSearchInput(''), setSearchResults('') }} value={searchInput} onChangeText={handleSearch} placeholder='Search User...' style={{ backgroundColor: COLOR.white, height: 45, flex: 1, borderRadius: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }} />
                <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { getuser() }}>
                    <Image source={require('../../Assets/Image/search.png')} style={{ tintColor: COLOR.green, height: 30, width: 30, marginHorizontal: 5 }} />
                    {/* <Text style={{ color: 'skyblue', fontWeight: 'bold', marginRight: 5 }}>Cancel</Text> */}

                </TouchableOpacity>
            </View>
            {/* <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader title={'Create Group'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
            </View> */}
            <View
                style={{
                    backgroundColor: COLOR.white,
                    flex: 1,
                    marginTop: 15,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                <View style={{ padding: 20, justifyContent: 'space-between', flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Text style={{ color: COLOR.black, fontWeight: '600', fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
                    <View >
                        <Text style={{ color: COLOR.black, fontWeight: '600', fontSize: 16 }}>Add Members</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{filteredUserData.length + '/' + allUserData.length}</Text>
                    </View>
                    <TouchableOpacity onPress={handaleNavigate}>
                        <Text style={{ color: COLOR.black, fontWeight: '600', fontSize: 16 }}>Next</Text>
                    </TouchableOpacity>
                </View>

                {filteredUserData.length >= 1 ? <View>
                    <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false}
                        style={{ marginTop: 10, }} showsHorizontalScrollIndicator={false} />
                    <View style={{ height: 20, backgroundColor: COLOR.verylightgray }}></View>
                </View> : null}

                <FlatList style={{ paddingHorizontal: 20, marginBottom: 20 }} data={searchResults.length > 0 ? searchResults : selectedUser} renderItem={(({ item }) => {
                    const userName = item?.first_name + ' ' + item.last_name

                    return (
                        <View>
                            {item.type == 'user' ? <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <ListImage uri={item?.profile} />
                                    {/* <Image source={{ uri: item?.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} /> */}
                                    <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: 'bold' }}>{userName?.length >= 20 ? userName?.slice(0, 20) + ' . . . ' || '' : userName}</Text>
                                </View>

                                <TouchableOpacity onPress={() => toggleItem(item?.id)}>
                                    <Image
                                        source={selectedItems.includes(item.id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')}
                                        style={{ height: 25, width: 25, tintColor: selectedItems.includes(item.id) ? COLOR.green : COLOR.lightgray }}
                                    />
                                </TouchableOpacity>
                            </View> : null}
                        </View>
                    )
                })} />
            </View>
            <Loader visible={loading} Retry={getuser} />
        </View>
    )
}

export default CreateGroupFirstScreen

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
});
