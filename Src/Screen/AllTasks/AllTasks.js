


// 
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import TimeZone from 'react-native-timezone';
import { getToken } from '../../Service/AsyncStorage';
import { Forword_Messages, Task_Summarize_Send, Task_User_List, User_List } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';
import Button from '../../Custom/Button/Button';
import styles from './AllTasksStyle';
import ChatInputToolBar from '../ChatInnerScreen/ChatCustomFile/ChatInputToolBar';

const AllTasks = (props) => {
    const [allUserData, setAllUserData] = useState([]);
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUserIds, setSelectedUserIds] = useState([]); // State to keep track of selected user IDs
    const [messageid, setMessageID] = useState(''); // State to keep track of selected user IDs
    const [EmailSummary, setEmailSummary] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);


    useEffect(() => {
        getuser();
        setMessageID(props.route.params)
    }, [token]);
    const filteredUserData = allUserData?.filter(user => selectedItems?.includes(user.id));
    // console.log(filteredUserData); //show selected user by defualt one user for chat
    const AllUserIDs = selectedUserIds.join(',');
    // console.log(AllUserIDs);
    // console.log(selectedItems);

    // const toggleItem = (itemId) => {
    //     if (selectedItems.includes(itemId)) {
    //         setSelectedItems(selectedItems.filter((id) => id !== itemId));
    //     } else {
    //         setSelectedItems([...selectedItems, itemId]);
    //     }
    // };
    const getuser = async () => {
        const Token = await getToken();
        setToken(Token);
        await Task_User_List(Token, 'All Task')
            .then((res) => {
                if (res.status_code == 200) {
                    setAllUserData(res?.data?.userList);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log(e, 'userList screen');
            });
    };
    const memoizedUsers = useMemo(() => allUserData, [allUserData]);
    const toggleUserSelection = (userId) => {
        if (selectedUserIds.includes(userId)) {
            setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
        } else {
            setSelectedUserIds([...selectedUserIds, userId]);
        }
        if (selectedItems.includes(userId)) {
            setSelectedItems(selectedItems.filter((id) => id !== userId));
        } else {
            setSelectedItems([...selectedItems, userId]);
        }
    };
    const list = ({ item }) => {
        const userName = item?.name

        return (
            <View style={{ backgroundColor: COLOR.white, paddingHorizontal: 15, marginTop: 5 }}>
                <TouchableOpacity
                    style={[styles.listcontainer, selectedUserIds.includes(item.id) ? styles.selectedUser : null]} // Apply styles for selected user
                    onPress={() => { toggleUserSelection(item.id) }} // Toggle user selection onPress
                >
                    <View style={styles.imgAndNameView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.profile }} style={styles.chetImg} />
                            <Text style={styles.name}>
                                {userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { toggleUserSelection(item.id) }}>
                            <Image source={selectedUserIds.includes(item.id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        );
    };

    const SendSummarizeEmail = async () => {
        setLoading(true)
        await Task_Summarize_Send(token, 'All Task', AllUserIDs, EmailSummary)
            .then((res) => {
                if (res.status_code == 200) {
                    // setSelectedItems()
                    setLoading(false)
                } else {
                    setLoading(false)
                    Alert.alert(res?.message.summary[0])
                    setLoading(false)
                }
            }).catch(err => {
                console.log(err=="[SyntaxError: JSON Parse error: Unrecognized token ' < ']");
                setLoading(false)
                // SendSummarizeEmail()
                // if (err == "[SyntaxError: JSON Parse error: Unrecognized token ' < ']") {
                //     SendSummarizeEmail()
                // }

            })

    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.detailsview}>
                <FlatList data={memoizedUsers} renderItem={list} bounces={false} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />
            </View>
            <View style={{ paddingBottom: isFocused ? 5 : 25, backgroundColor: COLOR.white }}>
                {<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>

                    <FlatList style={{ flex: 1 }} horizontal data={filteredUserData} renderItem={({ item, index }) => {
                        return (
                            <View>
                                <Image source={{ uri: index > 3 ? '' : item.profile }} style={{ height: 42, width: 42, borderRadius: 50, marginLeft: index > 0 ? -20 : 0, margin: 2 }} />
                            </View>
                        )
                    }} />
                </View>}
                <ChatInputToolBar placeholder={'Email Summary To...'} hidePlus={true} source={require('../../Assets/Image/send.png')} onChangeText={text => { setEmailSummary(text) }} onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)} value={EmailSummary} onsend={SendSummarizeEmail}
                />
            </View>
            <Loader visible={loading} />
        </View>
    );
};

export default AllTasks;
