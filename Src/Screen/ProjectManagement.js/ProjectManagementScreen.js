

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
    StatusBar,
    Dimensions
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import RoundPlus from '../../Custom/RoundPlus/RoundPlus';
import Button from '../../Custom/Button/Button';
import { getToken } from '../../Service/AsyncStorage';

const ProjectManagementScreen = props => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [Edit, setEdit] = useState(false);
    const [viewNote, setViewNote] = useState('');
    const [token, setToken] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
            const get = async () => {
                const token = await getToken()
                setToken(token)

            }
            return get

        }, []),
    );

    const HIGHT = Dimensions.get('screen').height
    const loadTasks = async () => {
        const savedTasks = await AsyncStorage.getItem('note');
        setData(JSON.parse(savedTasks));
    };
    const Data = [
        {
            id: 1,
            listname: 'Work Hours ',
            img: require('../../Assets/Image/workhours.png'),
            navigation: 'work',
        },
        {
            id: 2,
            listname: 'Files',
            navigation: 'files',
            img: require('../../Assets/Image/file.png'),
        },
        {
            id: 3,
            listname: 'Create Survey',
            img: require('../../Assets/Image/survey.png'),
            navigation: 'createsurvey',
        },
        {
            id: 4,
            listname: 'Create Event',
            navigation: 'createevent',
            img: require('../../Assets/Image/event.png'),
        },
        {
            id: 5,
            listname: 'Scan Docs',
            navigation: 'scandocs',
            img: require('../../Assets/Image/scandocs.png'),
        },
        {
            id: 6,
            listname: 'Sign Docs',
            navigation: 'signdocs',
            img: require('../../Assets/Image/signdocs.png'),
        },
    ];
    const list = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate(item.navigation, token)}
                style={{
                    alignSelf: 'center',
                    height: 60,
                    width: '95%',
                    backgroundColor: COLOR.white,
                    marginVertical: 8,
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    shadowColor: "#000", flexDirection: 'row', alignItems: 'center',
                    shadowOffset: { width: 0, height: 1, },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,


                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                    <View style={{ backgroundColor: COLOR.lightgreen, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 50, marginLeft: 10, marginRight: 10 }}>
                        <Image
                            source={item.img}
                            style={{
                                tintColor: COLOR.green,
                                height: 33,
                                width: 33,
                            }}
                        />
                    </View>
                    <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: 'bold' }}>{item.listname}</Text>
                </View>
                <Image source={require('../../Assets/Image/rightarrow.png')} style={{ height: 25, width: 25, marginRight: 15 }} />

            </TouchableOpacity>
        );
    };
    const create = new Date(viewNote?.createdAt);
    // const createdDate = ConvertDate(create);
    const update = new Date(viewNote?.updatedAt);
    // const updatedDate = ConvertDate(update);
    // console.log(updatedDate);

    return (
        // <SafeAreaView>
        <ScrollView bounces={false}>

            <View style={{ flex: 1, backgroundColor: COLOR.white, padding: 10 }}>

                <StatusBar barStyle={'dark-content'} />
                <Text style={{ fontSize: 20, color: COLOR.black, fontWeight: 'bold', marginLeft: 10, marginBottom: 10, marginTop: 60 }}>Project Management</Text>
                <FlatList
                    data={Data}
                    scrollEnabled={false}
                    renderItem={list} style={{ marginTop: 10 }} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 15,
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLOR.titlecolor,
                        }}>
                        Notes
                    </Text>
                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => props.navigation.navigate('note')}>
                        <RoundPlus height={26} width={26} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ paddingBottom: HIGHT < 844 ? 130 : 200 }}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: COLOR.lightgreen,
                                    padding: 10,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    height: 45, marginHorizontal: 10,
                                }}
                                onPress={() => {
                                    setVisible(true);
                                    setViewNote(item);
                                }}>
                                <Text
                                    style={{
                                        width: 180,
                                        fontSize: 16,
                                        fontWeight: '600',
                                        color: COLOR.titlecolor,
                                    }}>

                                    {item.title.length > 21
                                        ? item.title.slice(0, 21) + '...'
                                        : item.title}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            color: COLOR.textcolor,
                                        }}>
                                        {formatted}
                                    </Text>
                                    <TouchableOpacity style={{ padding: 10, }}
                                        onPress={() => { getnoteData() }}
                                    >
                                        <Image
                                            source={require('../../Assets/Image/pen.png')}
                                            style={{
                                                height: 25,
                                                width: 25,

                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {Edit ? <View style={{ height: 50, width: 50 }}></View> : null}
                            </TouchableOpacity>
                        );
                    }}

                />

                <Modal visible={visible}>
                    <View style={{ flex: 1, backgroundColor: COLOR.white }}>
                        <NavigateHeader onPress={() => setVisible(false)} />
                        <ScrollView
                            style={{
                                padding: 15,
                                backgroundColor: COLOR.white,
                                marginTop: 20,
                            }}
                            bounces={false}>
                            <Text
                                style={{
                                    fontSize: 23,
                                    fontWeight: '600',
                                    color: COLOR.black,
                                }}>
                                {viewNote.title}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: COLOR.gray,
                                    fontWeight: '500',
                                    marginTop: 10,
                                }}>
                                {/* Created:- {createdDate}{'\n'} */}
                                {/* {viewNote.updatedAt ? "Updated:- " + updatedDate : null} */}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginTop: 10,
                                    fontWeight: '600',

                                    lineHeight: 30,
                                    color: COLOR.textcolor,
                                }}>
                                {viewNote.note}
                            </Text>
                            <Button
                                title={'Close'}
                                bgColor={COLOR.green}
                                marginTop={30}
                                marginBottom={40}
                                onPress={() => {
                                    setVisible(false);
                                }}
                            />
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </ScrollView>

        // </SafeAreaView>
    );
};
export default ProjectManagementScreen