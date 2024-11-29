
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const TaskDetails = (props) => {
    const [isFocuse, setIsFocuse] = useState('Completed')
    const data = props?.route?.params
    const DATA = [{
        imgData: [
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
        ]
    }, {
        imgData: [
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
        ]
    }, {
        imgData: []
    }, {
        imgData: [
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
            { img: 'https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_1280.jpg' },
        ]
    }]
    const list = ({ item }) => {
        return (
            <View style={{ height: 100, backgroundColor: COLOR.white, borderRadius: 10, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 }, marginTop: 20, padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: '500' }}>Task No</Text>
                    <View>
                        <FlatList style={{}}
                            horizontal bounces={false}
                            data={item.imgData}
                            renderItem={({ item, index }) => {
                                return (
                                    <Image source={{ uri: item.img }} style={{ height: 27, width: 27, borderRadius: 25, marginLeft: index == 0 ? 0 : - 8, }} />
                                )
                            }} />
                    </View>
                </View>
                <Text numberOfLines={3} style={{ fontSize: 14, marginTop: 5, color: COLOR.gray }}>Lorem Ipsum Dummy Text Dummy Lorem Ipsum Lorem Ipsum Dummy Text Dummy Lorem Dummy Text Dummy Lorem Ipsum Lorem Ipsum Dummy Text Dummy Lorem Ipsum </Text>
            </View >
        )
    }
    return (
        <View style={{ backgroundColor: COLOR.black, flex: 1 }}>
            <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
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
                <FlatList data={DATA} renderItem={list} style={{ paddingHorizontal: 10 }} />
            </View>
        </View >
    )
}

export default TaskDetails

