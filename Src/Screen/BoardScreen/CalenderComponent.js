import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CalendarView from '../../Custom/Calendar/Calender'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import { getToken } from '../../Service/AsyncStorage'
import { Task_Done, Task_User_List } from '../../Service/actions'
import Loader from '../../Custom/Loader/loader'

const CalenderComponent = () => {
    const [isFocus, setIsFocus] = useState('Receive')
    const [userData, setAllUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handalTaskDone = async (id) => {
        await handaleTaskDone(id)
        onCheck()
    }
    const list = ({ item }) => {
        const userName = item.name
        return (
            <View style={styles.ListmainContainer}>
                <View style={styles.secondContainer}>
                    <View style={styles.twoContainerDevide}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.profile }} style={styles.profileImg} />
                            <Text style={styles.taskUserListName}>{userName?.length >= 20 ? userName?.slice(0, 20) + ' . . . ' || '' : userName}</Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} disabled={isFocus == 'Given' || item.taskStatus ? true : false} onPress={() => { handalTaskDone(item.id) }}>
                            <Image source={item.taskStatus ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={styles.checkBoxStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    const handaleTaskDone = async (id) => {
        setLoading(true)
        const Token = await getToken();
        await Task_Done(Token, id)
            .then((res) => {
                if (res.status_code == 200) {
                    Alert.alert(res.message)
                }
            })
            .catch(() => { })
    }
    const getuser = async () => {
        const Token = await getToken();
        setLoading(true)
        await Task_User_List(Token, isFocus)
            .then((res) => {
                if (res.status_code == 200) {
                    setAllUserData(res?.data?.userList);
                    setLoading(false);
                }
            })
            .catch((e) => { console.log(e, 'userList screen'); });
    };
    useEffect(() => {
        getuser()
    }, [isFocus]);
    return (
        <View>
            <CalendarView />
            {/* <DropDown Month={'Today'} onPress={() => Alert.alert('today')} /> */}
            <View style={styles.reciveAndgivenContainer}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { setIsFocus('Receive'), getuser() }}>
                    <Text style={{ fontSize: 18, color: isFocus == 'Receive' ? COLOR.black : COLOR.gray, fontWeight: 'bold', }}>Received</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { setIsFocus('Given'), getuser() }}>
                    <Text style={{ fontSize: 18, color: isFocus == 'Given' ? COLOR.black : COLOR.gray, fontWeight: 'bold' }}>Given</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ marginBottom: 100 }}
                renderItem={list}
                data={userData}
                bounces={false}
            />
            <Loader visible={loading} Retry={getuser} />

        </View>

    )
}

export default CalenderComponent
const styles = StyleSheet.create({
    reciveAndgivenContainer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 },
    ListmainContainer: { backgroundColor: COLOR.white, paddingHorizontal: 5, marginTop: 5, paddingVertical: 5 },
    secondContainer: { padding: 8, marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', },
    twoContainerDevide: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
    profileImg: { height: 55, width: 55, borderRadius: 50, marginRight: 10 },
    checkBoxStyle: { tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 },
})

const DropDown = ({ Month, onPress, isshow }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: COLOR.white, height: 55, borderRadius: 10, alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: { height: 0.5, width: 0 }, shadowColor: 'gray', shadowOpacity: 0.3, marginTop: 10
        }}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 0.9, textAlign: 'center' }}>{Month}</Text>
                <Image source={require('../../Assets/Image/back.png')} style={{ height: 24, width: 24, transform: [{ rotate: isshow ? '-270deg' : '270deg' }] }} />

            </View>



        </TouchableOpacity>
    )
}