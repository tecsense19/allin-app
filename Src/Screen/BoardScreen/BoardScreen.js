

import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions, Alert, ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import CalendarView from '../../Custom/Calendar/Calender';
import { getToken } from '../../Service/AsyncStorage';
import { Task_Done, Task_User_List } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';
const BoardScreen = () => {
    const [today, setToday] = useState('Screen');
    const [isFocus, setIsFocus] = useState('Receive');
    const [token, setToken] = useState('');
    const [userData, setAllUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const HEIGHT = Dimensions.get('screen').height;
    const WIDTH = Dimensions.get('screen').width;
    const data = [
        { id: 1, name: 'Screen', msgcount: 0 },
        { id: 2, name: 'Hollyday', msgcount: 0 },
        { id: 3, name: 'Meetings', msgcount: 2 },
        { id: 4, name: 'Events', msgcount: 5 },
    ];
    const handaleTaskDone = async (id) => {
        setLoading(true)
        const Token = await getToken();
        console.log(id);
        await Task_Done(Token, id)
            .then((res) => {
                if (res.status_code == 200) {
                    Alert.alert(res.message)
                    getuser()
                }
            })
            .catch(() => {
                setLoading(false)

            })


    }
    const getuser = async () => {
        const Token = await getToken();
        setLoading(true)
        setToken(Token);

        await Task_User_List(Token, isFocus)
            .then((res) => {
                if (res.status_code == 200) {
                    setAllUserData(res?.data?.userList);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log(e, 'userList screen');
                setLoading(false);

            });
    };
    const list = ({ item }) => {
        const userName = item.name
        console.log(item);


        return (
            <View style={{ backgroundColor: COLOR.white, paddingHorizontal: 5, marginTop: 5, paddingVertical: 5 }}>
                <View
                    style={{
                        padding: 8,
                        marginTop: 5,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item?.profile }} style={{ height: 55, width: 55, borderRadius: 50, marginRight: 10 }} />
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: COLOR.black,
                            }}>
                                {userName?.length >= 20 ? userName?.slice(0, 20) + ' . . . ' || '' : userName}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 5 }} disabled={isFocus == 'Given' || item.taskStatus ? true : false} onPress={() => { handaleTaskDone(item.id) }}>
                            <Image source={item.taskStatus ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')} style={{ tintColor: COLOR.green, height: 25, width: 25, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    };
    useEffect(() => {
        getuser()
    }, [isFocus])

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLOR.black,
            }}>
            <Text style={{ marginTop: 60, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: COLOR.white }}>Board</Text>
            <StatusBar hidden={false} barStyle={'light-content'} />

            <ScrollView
                style={{
                    flex: 1,
                    marginTop: 20,
                    backgroundColor: COLOR.white,
                    borderRadius: 20,
                    paddingTop: 15
                }}>

                <CalendarView />
                {/* <DropDown Month={'Today'} onPress={() => Alert.alert('today')} /> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => setIsFocus('Receive')}>
                        <Text style={{ fontSize: 18, color: isFocus == 'Receive' ? COLOR.black : COLOR.gray, fontWeight: 'bold', }}>Received</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => setIsFocus('Given')}>
                        <Text style={{ fontSize: 18, color: isFocus == 'Given' ? COLOR.black : COLOR.gray, fontWeight: 'bold' }}>Given</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ marginBottom: 100 }}

                    renderItem={list}
                    data={userData}

                    bounces={false}
                />

            </ScrollView>
            <Loader visible={loading} />
        </View>
    );
};
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

export default BoardScreen;
