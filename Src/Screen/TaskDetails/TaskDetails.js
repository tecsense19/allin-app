
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR, HEIGHT } from '../../Assets/AllFactors/AllFactors';
import { TaskComplete_or_Incomplete } from '../../Service/actions';

const TaskDetails = (props) => {
    const [isFocuse, setIsFocuse] = useState('Completed')
    const [completeTaskList, setCompleteTaskList] = useState('')
    const [inCompleteTaskList, setInCompleteTaskList] = useState('')
    const data = props?.route?.params
    const getTaskListDetails = async () => {
        await TaskComplete_or_Incomplete(data?.message_id, 'complete').then((res) => {
            if (res.status_code == 200) {
                setCompleteTaskList(res.data)
            }
        })
        await TaskComplete_or_Incomplete(data?.message_id, 'incomplete').then((res) => {
            if (res.status_code == 200) {
                setInCompleteTaskList(res.data)
            }
        })
    }
    useEffect(() => {
        getTaskListDetails()
    }, [])

    const list = ({ item, index }) => {
        const totalmamber = item?.userData?.length
        const count = totalmamber > 4 ? totalmamber - 4 : totalmamber

        return (
            <View style={{ backgroundColor: COLOR.white, borderRadius: 10, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 }, marginTop: 20, padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '500', }}>{'Task No.' + (index + 1)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View>
                            <FlatList style={{}}
                                horizontal bounces={false}
                                data={item.userData}
                                renderItem={({ item, index }) => {
                                    return (
                                        <>
                                            {index < 4 ? <Image source={{ uri: item.profile }} style={{ height: 27, width: 27, borderRadius: 25, backgroundColor: 'white', marginLeft: index == 0 ? 0 : - 10, }} /> : null}
                                        </>
                                    )
                                }} />
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 2 }}>{count > 4 ? '+' + count : ''}</Text>
                    </View>
                </View>
                <Text numberOfLines={3} style={{ fontSize: 14, marginTop: 5, color: COLOR.gray }}>{item.taskname}</Text>
            </View >
        )
    }
    return (
        <View style={{ backgroundColor: COLOR.black, flex: 1 }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                <View style={{ flex: 1, marginTop: 10 }}>
                    <NavigateHeader top={2} color={COLOR.white} title={'Task List'} onPress={() => { props.navigation.goBack() }} />
                </View>
                <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image source={require('../../Assets/Image/taskdetailsremindicon.png')} style={{ height: 15, width: 15 }} />
                    <Text style={{ fontSize: 18, color: COLOR.white, fontWeight: '600', marginLeft: 5 }}>Remind</Text>
                </View>
            </View>

            <View style={{ marginTop: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20, flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginTop: 15, marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => { setIsFocuse('Completed') }}
                        style={{ flex: 1, height: 40, borderBottomWidth: 1, borderColor: isFocuse == 'Completed' ? COLOR.green : COLOR.lightgray, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: isFocuse == 'Completed' ? COLOR.green : COLOR.gray, fontSize: 15, fontWeight: '500' }}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsFocuse('incompleted') }}
                        style={{ flex: 1, borderBottomWidth: 1, borderColor: isFocuse == 'incompleted' ? COLOR.green : COLOR.lightgray, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: isFocuse == 'incompleted' ? COLOR.green : COLOR.gray, fontSize: 15, fontWeight: '500' }}>In completed</Text>
                    </TouchableOpacity>
                </View>
                <FlatList bounces={false} style={{ marginBottom: 20, marginTop: 5, paddingHorizontal: 10 }}
                    ListEmptyComponent={(() => {
                        return (
                            <Text style={{ marginTop: HEIGHT / 3, fontSize: 18, color: COLOR.gray, fontWeight: 'bold', textAlign: 'center' }}>Not Found</Text>
                        )
                    })} data={isFocuse == 'Completed' ? completeTaskList : inCompleteTaskList} renderItem={list} />
            </View>
        </View >
    )
}

export default TaskDetails

