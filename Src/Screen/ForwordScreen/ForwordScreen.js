import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import TimeZone from 'react-native-timezone';
import { getToken } from '../../Service/AsyncStorage';
import { Forword_Messages, User_List } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';
import styles from './ForwordScreenStyle';
import Button from '../../Custom/Button/Button';

const ForwordScreen = (props) => {
    const [allUserData, setAllUserData] = useState([]);
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUserIds, setSelectedUserIds] = useState([]); // State to keep track of selected user IDs
    const [messageid, setMessageID] = useState(''); // State to keep track of selected user IDs

    useEffect(() => {
        getuser();
        setMessageID(props.route.params)
    }, [token]);
    console.log(token);

    const getuser = async () => {
        const Token = await getToken();
        setToken(Token);
        const bodydata = { timezone: TimeZone.getTimeZone(), search: search };

        await User_List(bodydata, Token)
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
            // If the user ID is already selected, remove it
            setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
        } else {
            // If the user ID is not selected, add it
            setSelectedUserIds([...selectedUserIds, userId]);
        }
    };
    const list = ({ item }) => {
        const userName = item?.first_name + ' ' + item.last_name;

        return (
            <View style={{ backgroundColor: COLOR.white, paddingHorizontal: 15, marginTop: 5 }}>
                <TouchableOpacity
                    style={[styles.listcontainer, selectedUserIds.includes(item.id) ? styles.selectedUser : null]} // Apply styles for selected user
                    onPress={() => toggleUserSelection(item.id)} // Toggle user selection onPress
                >
                    <View style={styles.imgAndNameView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.profile }} style={styles.chetImg} />
                            <Text style={styles.name}>
                                {userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => toggleUserSelection(item.id)}>
                            <Image source={selectedUserIds.includes(item.id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    const AllUserIDs = selectedUserIds.join(',');
    const ForwordMessage = async () => {
        await Forword_Messages(token, messageid, AllUserIDs)
            .then((res) => {
                if (res.status_code === 200) {
                    props.navigation.goBack()
                }
            })
            .catch((err) => { console.log(err, 'uytdrseasdrftgyhuji'); });
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerView}>
                <View style={{ backgroundColor: COLOR.white, marginTop: 65, height: 45, marginHorizontal: 25, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput autoFocus value={search} onChangeText={(res) => { setSearch(res); getuser() }} placeholder='WHO TO SEND' style={{ backgroundColor: COLOR.white, height: 45, flex: 1, borderRadius: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }} />
                    <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { setSearch(''), getuser() }}>
                        <Image source={require('../../Assets/Image/search.png')} style={{ tintColor: COLOR.green, height: 30, width: 30, marginHorizontal: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailsview}>
                <FlatList data={memoizedUsers} renderItem={list} bounces={false} style={{ marginBottom: 85, borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />


            </View>
            <View style={{ backgroundColor: COLOR.white }}>
                <Button title={'Send'} color={COLOR.white} bgColor={COLOR.green} marginHorizontal={20} marginBottom={40} onPress={ForwordMessage} />
            </View>
            <Loader visible={loading} />
        </View>
    );
};

export default ForwordScreen;
