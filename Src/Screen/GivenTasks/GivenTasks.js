

// 
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import TimeZone from 'react-native-timezone';
import { getToken } from '../../Service/AsyncStorage';
import { Forword_Messages, Task_Summarize_Send, Task_User_List, User_List } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';
import Button from '../../Custom/Button/Button';
import styles from './GivenTaskStyle';
import ChatInputToolBar from '../ChatInnerScreen/ChatCustomFile/ChatInputToolBar';

const GivenTasks = (props) => {
    const [allUserData, setAllUserData] = useState([]);
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUserIds, setSelectedUserIds] = useState([]); // State to keep track of selected user IDs
    // const [messageid, setMessageID] = useState(''); // State to keep track of selected user IDs
    const [EmailSummary, setEmailSummary] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        getuser();
    }, [token]);
    const filteredUserData = allUserData?.filter(user => selectedItems?.includes(user.unique_id));
    const AllUserIDs = selectedUserIds.join(',');

    const getuser = async () => {
        const Token = await getToken();
        setToken(Token);
        await Task_User_List(Token, 'Given')
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
            setSelectedUserIds(selectedUserIds?.filter(id => id !== userId));
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
        const userName = item.name
        console.log(item);

        return (
            <View style={{ backgroundColor: COLOR.white, paddingHorizontal: 15, marginTop: 5 }}>
                <TouchableOpacity
                    style={[styles.listcontainer, selectedUserIds.includes(item.unique_id) ? styles.selectedUser : null]} // Apply styles for selected user
                    onPress={() => { toggleUserSelection(item.unique_id) }} // Toggle user selection onPress
                >
                    <View style={styles.imgAndNameView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.taskReceiverProfile }} style={styles.chetImg} />
                            <Text style={styles.name}>
                                {item.taskReceiverName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { toggleUserSelection(item.unique_id) }}>
                            <Image source={selectedUserIds.includes(item.unique_id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        );
    };

    const SendSummarizeEmail = async () => {
        setLoading(true)
        await Task_Summarize_Send(token, 'Given', AllUserIDs, EmailSummary)
            .then((res) => {
                if (res.status_code == 200) {
                    // setSelectedItems(null)
                    setLoading(false)

                } else {
                    setLoading(false)
                    Alert.alert(res?.message.summary[0])
                }
            })
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.detailsview}>
                <FlatList data={memoizedUsers} renderItem={list} bounces={false} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />
            </View>
            <View style={{ paddingBottom: isFocused ? 5 : 25, backgroundColor: COLOR.white }}>
                {selectedItems.length > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View>
                        <FlatList style={{}} horizontal data={filteredUserData} renderItem={({ item, index }) => {
                            return (
                                <>
                                    {index > 3 ? null : <Image source={{ uri: item.taskReceiverProfile }} style={{ height: 42, width: 42, borderRadius: 50, marginLeft: index > 0 ? -20 : 0 }} />}
                                </>
                            )
                        }} />
                    </View>
                    {selectedItems.length > 4 ? <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: 'bold' }}>{'+' + (selectedItems.length - 4)}</Text> : null}
                </View> : null}
                <ChatInputToolBar placeholder={'Email Summary To...'} hidePlus={true} source={require('../../Assets/Image/send.png')} onChangeText={text => { setEmailSummary(text) }} onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)} value={EmailSummary} onsend={SendSummarizeEmail}
                />
            </View>
            <Loader visible={loading} Retry={getuser} />
        </View>
    );
};

export default GivenTasks;
