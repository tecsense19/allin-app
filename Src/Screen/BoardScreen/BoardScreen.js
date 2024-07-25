

import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions, Alert,
    ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const BoardScreen = () => {
    const [today, setToday] = useState('Screen');

    const HEIGHT = Dimensions.get('screen').height;
    const WIDTH = Dimensions.get('screen').width;
    const data = [
        { id: 1, name: 'Screen', msgcount: 0 },
        { id: 2, name: 'Hollyday', msgcount: 0 },
        { id: 3, name: 'Meetings', msgcount: 2 },
        { id: 4, name: 'Events', msgcount: 5 },
    ];


    const list = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => setToday(item.name)}
                style={{
                    marginHorizontal: 2,
                    backgroundColor: today == item.name ? COLOR.green : COLOR.white,
                    height: 70,
                    marginTop: today == item.name ? 2 : 0,
                    width: WIDTH / 4.6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    shadowOffset: { height: today == item.name ? 5 : 0, width: 0 },
                    shadowColor: 'gray', shadowOpacity: 0.3,
                }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: COLOR.titlecolor,
                    }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLOR.black,
            }}>
            <Text style={{ marginTop: 60, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: COLOR.white }}>Board</Text>
            <StatusBar hidden={false} barStyle={'light-content'} />

            <View
                style={{
                    flex: 1,
                    marginTop: 20,
                    backgroundColor: COLOR.white,
                    borderRadius: 20,
                    paddingTop: 5,
                    padding: 15,
                }}>
                <DropDown Month={'Today'} onPress={() => Alert.alert('today')} />
                <FlatList
                    style={{
                        marginTop: 30,
                        padding: 5

                    }}
                    renderItem={list}
                    data={data}
                    horizontal
                    bounces={false}
                />

            </View>
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
