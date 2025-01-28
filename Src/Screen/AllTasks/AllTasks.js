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
import ListImage from '../../Custom/ListImage/ListImage';

const AllTasks = (props) => {
    const [allUserData, setAllUserData] = useState([]);
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [messageid, setMessageID] = useState('');
    const [EmailSummary, setEmailSummary] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        getuser();
        setMessageID(props.route.params)
    }, [token]);
    const filteredUserData = allUserData?.filter(user => selectedItems?.includes(user.unique_id));
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
                    console.log(res?.data?.userList);

                }
            })
            .catch((e) => { console.log(e, 'userList screen'); });
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

        return (
            <View style={styles.listmainConatiner}>
                <TouchableOpacity
                    style={[styles.listcontainer, selectedUserIds.includes(item.unique_id) ? styles.selectedUser : null]}
                    onPress={() => { toggleUserSelection(item.unique_id) }}
                >
                    <View style={styles.imgAndNameView}>
                        <View style={styles.profileAndnameview}>
                            <ListImage uri={item?.userProfile} />
                            {/* <Image source={{ uri: item.userProfile }} style={styles.chetImg} /> */}
                            <Text style={styles.name}>
                                {item.userName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { toggleUserSelection(item.unique_id) }}>
                            <Image source={selectedUserIds.includes(item.unique_id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={styles.checkBoxIcon} />
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
                console.log(err == "[SyntaxError: JSON Parse error: Unrecognized token ' < ']");
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
                <FlatList data={memoizedUsers} renderItem={list} bounces={false} style={styles.flatList} />
            </View>
            <View style={{ paddingBottom: isFocused ? 5 : 25, backgroundColor: COLOR.white }}>
                {<View style={styles.selecteduserContainer}>
                    <View>
                        <FlatList style={{ paddingVertical: 10 }} horizontal data={filteredUserData} renderItem={({ item, index }) => {
                            return (
                                <View>
                                    {index > 3 ? null : <Image source={{ uri: item?.userProfile }} style={[styles.selectedProfileImg, { marginLeft: index > 0 ? -20 : 0, }]} />}
                                </View>
                            )
                        }} />
                    </View>
                    {selectedItems.length > 4 ? <Text style={{ fontSize: 15, color: COLOR.black, fontWeight: 'bold' }}>{'+' + (selectedItems.length - 4)}</Text> : null}
                </View>}
                <ChatInputToolBar placeholder={'Email Summary To...'} hidePlus={true} source={require('../../Assets/Image/send.png')} onChangeText={text => { setEmailSummary(text) }} onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)} value={EmailSummary} onsend={SendSummarizeEmail}
                />
            </View>
            <Loader visible={loading} Retry={SendSummarizeEmail} />
        </View>
    );
};

export default AllTasks;
