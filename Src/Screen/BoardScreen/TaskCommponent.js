import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../Service/AsyncStorage';
import { Task_Meeting_Event_Unread, Task_User_List } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';

const TaskCommponent = () => {
    const [isFocus, setIsFocus] = useState('Given')
    const [userData, setAllUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const id = userData.map((item) => { return item.message_id });
    const commaS_id = id.join(',');


    const list = ({ item }) => {
        console.log(item, '================================');

        const userName = item.name
        const date = new Date(item.date);    // Get day, month, and year
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();

        // Format the date as DD/MM/YYYY
        const formattedDate = `${day}/${month}/${year}`;


        const time = new Date(item.time);
        time.setHours(time.getHours());
        time.setMinutes(time.getMinutes());
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        const meetingtime = `${hours}:${minutes}:${seconds}`;
        const formattedHours = hours % 12 || 12;
        const period = hours < 12 ? 'AM' : 'PM';
        const meetingDesplayTime = formattedHours + ':' + minutes + ' ' + period


        return (
            <View style={styles.ListmainContainer}>
                <View style={styles.secondContainer}>
                    <View style={styles.twoContainerDevide}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.profile }} style={styles.profileImg} />
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.black }}>{userName?.length >= 20 ? userName?.slice(0, 20) + ' . . . ' || '' : userName}</Text>
                                {isFocus == 'Receive' ? '' : <View>
                                    <Text style={{ color: '#7B7B7B', fontSize: 14, marginTop: 5, fontWeight: 'regular' }}>{item.completedCount + "/" + item.totalTasks + 'Completed'}</Text>
                                </View>}
                            </View>
                        </View>
                        {isFocus == 'Receive' ? '' : <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#7B7B7B', fontSize: 14, fontWeight: 'regular' }}>{meetingDesplayTime}</Text>
                            <Text style={{ color: '#7B7B7B', fontSize: 14, marginTop: 5, fontWeight: 'regular' }}>{formattedDate}</Text>
                        </View>}

                    </View>

                </View>

            </View>
        );
    };
    const getReceiveTask = async () => {
        setIsFocus('Receive')
        setLoading(true)
        const Token = await getToken();
        await Task_User_List(Token, 'Receive')
            .then((res) => {
                if (res.status_code == 200) {
                    setLoading(false);
                    setAllUserData(res?.data?.userList);
                }
            })
    };
    const GetGiveingTask = async () => {
        setLoading(true)
        setIsFocus('Given')
        const Token = await getToken();
        await Task_User_List(Token, 'Given')
            .then((res) => {
                if (res.status_code == 200) {
                    setLoading(false);
                    setAllUserData(res?.data?.userList);
                } else (
                    setLoading(false),
                    Alert.alert(res.message)
                )
            })
    };
    const OnHandleRead = async () => {
        const token = await getToken()
        Task_Meeting_Event_Unread(token, 'Task', commaS_id)
            .then((res) => {
                if (res.status_code == 200) {
                }
            })
    }
    useEffect(() => {
        OnHandleRead()
    }, [commaS_id]);
    useEffect(() => {
        GetGiveingTask()
    }, [])

    return (
        <View>
            {/* <DropDown Month={'Today'} onPress={() => Alert.alert('today')} /> */}
            <View style={styles.reciveAndgivenContainer}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { getReceiveTask() }}>
                    <Text style={{ fontSize: 18, color: isFocus == 'Receive' ? COLOR.black : COLOR.gray, fontWeight: 'bold', }}>Received</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { GetGiveingTask() }}>
                    <Text style={{ fontSize: 18, color: isFocus == 'Given' ? COLOR.black : COLOR.gray, fontWeight: 'bold' }}>Giving</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ marginBottom: 100 }}
                renderItem={list}
                data={userData}
                bounces={false}
                ListEmptyComponent={<Text style={{ marginTop: '50%', textAlign: 'center', color: COLOR.gray, fontSize: 16, fontWeight: 'bold' }}>Not Found</Text>}
            />
            <Loader visible={loading} Retry={GetGiveingTask} />

        </View>
    )
}

export default TaskCommponent
const styles = StyleSheet.create({
    reciveAndgivenContainer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', },
    ListmainContainer: { backgroundColor: COLOR.white, paddingHorizontal: 15, marginTop: 20, },
    secondContainer: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', },
    twoContainerDevide: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
    profileImg: { height: 55, width: 55, borderRadius: 50, marginRight: 10 },
    checkBoxStyle: { tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 },
})


// const DropDown = ({ Month, onPress, isshow }) => {
//     return (
//         <TouchableOpacity onPress={onPress} style={{
//             backgroundColor: COLOR.white, height: 55, borderRadius: 10, alignItems: 'center',
//             justifyContent: 'center',
//             shadowOffset: { height: 0.5, width: 0 }, shadowColor: 'gray', shadowOpacity: 0.3, marginTop: 10
//         }}>
//             <View style={{ flexDirection: 'row', }}>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 0.9, textAlign: 'center' }}>{Month}</Text>
//                 <Image source={require('../../Assets/Image/back.png')} style={{ height: 24, width: 24, transform: [{ rotate: isshow ? '-270deg' : '270deg' }] }} />

//             </View>



//         </TouchableOpacity>
//     )
// }