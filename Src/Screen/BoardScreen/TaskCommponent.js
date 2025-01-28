import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../Service/AsyncStorage';
import { Task_Meeting_Event_Unread, Task_User_List } from '../../Service/actions';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Loader from '../../Custom/Loader/loader';
import ListImage from '../../Custom/ListImage/ListImage';

const TaskCommponent = ({ onPress }) => {
    const [isFocus, setIsFocus] = useState('Given')
    const [loading, setLoading] = useState(false);
    const [recevieTaskData, setRecevieTaskData] = useState([]);
    const [givenTaskData, setGivenTaskData] = useState([]);

    const reciveid = recevieTaskData.map((item) => { return item?.message_id });
    const givingid = givenTaskData?.map((item) => { return item?.message_id });
    const commaS_id = reciveid?.join(',') + ',' + givingid?.join(',');

    useEffect(() => {
        getAllTask()
    }, [])
    const onNavigate = (e) => {
        onPress(e)
    }
    const list = ({ item }) => {
        const date = new Date(item?.date);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        return (

            <TouchableOpacity
                onPress={() => onNavigate(item)}
                style={styles.ListmainContainer}>
                <View style={styles.secondContainer}>
                    <View style={styles.twoContainerDevide}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                            <ListImage uri={isFocus == 'Receive' ? item?.taskCreatorProfile : item?.taskReceiverProfile} />
                            {/* <Image source={{ uri: isFocus == 'Receive' ? item?.taskCreatorProfile : item?.taskReceiverProfile }} style={styles.profileImg} /> */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.black, }}>{isFocus == 'Receive' ? item?.taskCreatorName : item?.taskReceiverName}</Text>
                                <Text style={{ color: '#7B7B7B', fontSize: 14, marginTop: 5, fontWeight: 'regular' }}>{item.completedTasks + "/" + item.totalTasks + 'Completed'}</Text>
                            </View>
                        </View>
                        {/* {isFocus == 'Receive' ? '' : */}
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#7B7B7B', fontSize: 14, fontWeight: 'regular' }}>{item?.time}</Text>
                            <Text style={{ color: '#7B7B7B', fontSize: 14, marginTop: 5, fontWeight: 'regular' }}>{formattedDate}</Text>
                        </View>
                        {/* // } */}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const getAllTask = async () => {
        setLoading(true)
        const Token = await getToken();
        await Task_User_List(Token, 'Given')
            .then((res) => {
                if (res.status_code == 200) {
                    setGivenTaskData(res?.data.userList);
                    setLoading(false)
                }
            })
        await Task_User_List(Token, 'Receive')
            .then((res) => {
                if (res.status_code == 200) {
                    setRecevieTaskData(res?.data.userList);
                    setLoading(false)
                }
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
    }, []);

    return (
        <View>
            <View style={styles.reciveAndgivenContainer}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { setIsFocus('Receive') }}>
                    <Text style={{ fontSize: 18, color: isFocus == 'Receive' ? COLOR.black : COLOR.gray, fontWeight: 'bold', }}>Received</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { setIsFocus('Given') }}>
                    <Text style={{ fontSize: 18, color: isFocus == 'Given' ? COLOR.black : COLOR.gray, fontWeight: 'bold' }}>Giving</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ marginBottom: '30%', paddingHorizontal: 10 }}
                renderItem={list}
                data={isFocus == 'Given' ? givenTaskData : recevieTaskData}
                bounces={false}
                ListEmptyComponent={<Text style={{ marginTop: '50%', textAlign: 'center', color: COLOR.gray, fontSize: 16, fontWeight: 'bold' }}>Not Found</Text>}
            />
            <Loader visible={loading} Retry={getAllTask} />
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
