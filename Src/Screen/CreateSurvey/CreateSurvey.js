import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, Image, Modal, FlatList, ScrollView, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import * as Progress from 'react-native-progress';

const CreateSurvey = (props) => {
    const [pollQuestion, setPollQuestion] = useState('');
    const [data, setData] = useState('');
    const [openmodal, setOpenModal] = useState(false);
    const [options, setOptions] = useState([
        { id: Date.now().toString(), text: 'new Option', votes: 2 },
        { id: Date.now().toString(), text: 'new Option', votes: 8 },
        { id: Date.now().toString(), text: 'new Option', votes: 12 },
        { id: Date.now().toString(), text: 'new Option', votes: 13 },

    ]);
    const totalVotes = 13
    const calculatePercentage = (votes) => {
        if (totalVotes === 0) return 0;
        return (votes / totalVotes).toFixed(2);
    };
    const HIGHT = Dimensions.get('screen').height
    const WIDTH = Dimensions.get('screen').width
    const handleDragEnd = ({ data }) => {
        setOptions(data);
    };
    const handleRemoveOption = (id) => {
        Alert.alert(
            'Remove Option',
            'Are you sure you want to remove this option?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => setOptions(options.filter((option) => option.id !== id)) },
            ],
            { cancelable: true }
        );
    };
    const handleTextChange = (id, newText) => {
        setOptions(prevOptions =>
            prevOptions.map(option =>
                option.id === id ? { ...option, text: newText } : option
            )
        );
    };
    const onHandaleCreate = () => {
        if (pollQuestion === '') {
            Alert.alert('Alert', 'Question is required');
            return;
        }

        setData({ pollQuestion, options })
        setOpenModal(true)
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                <View style={{ paddingHorizontal: 30 }}>
                    <NavigateHeader onPress={() => { props.navigation.goBack() }} title={'Create Survey'} color={COLOR.white} />
                </View>
                <View style={{ flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 30, marginTop: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <Text style={{ marginTop: 30, fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Question</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderColor: COLOR.lightgray, borderBottomWidth: 1,
                            marginTop: 10
                        }} >
                        <TextInput value={pollQuestion} onChangeText={(txt) => { setPollQuestion(txt) }} placeholder='Enter Your Question' style={{ height: 40, fontSize: 15, color: COLOR.black, flex: 1 }} />
                    </View>
                    <Text style={{ marginTop: 50, fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Options</Text>
                    <ScrollView bounces={false}>
                        <DraggableFlatList
                            bounces={false}
                            data={options}
                            renderItem={({ item, index, drag, isActive }) => (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderColor: COLOR.lightgray, borderBottomWidth: 1,
                                        marginTop: 10
                                    }}
                                >
                                    <PollInput
                                        value={item.text}
                                        onChangeText={(txt) => handleTextChange(item.id, txt)}
                                    />
                                    <TouchableOpacity style={{ padding: 5, }} onPress={() => { handleRemoveOption(item.id) }}>
                                        <Image source={require('../../Assets/Image/bin.png')} style={{ height: 15, width: 15, tintColor: COLOR.black }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ paddingLeft: 15, paddingVertical: 10 }} onLongPress={drag}>
                                        <Image source={require('../../Assets/Image/polldragicon.png')} style={{ height: 15, width: 15 }} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                            onDragEnd={handleDragEnd}
                        />


                        <TouchableOpacity onPress={() => setOptions([...options, { id: Date.now().toString(), text: 'new Option', votes: 0 }])}
                            style={{
                                borderRadius: 5, paddingVertical: 12,
                                borderColor: '#ddd',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderColor: COLOR.lightgray, borderBottomWidth: 1,
                                marginTop: 10
                            }}
                        >
                            <Text style={{ color: COLOR.gray }}>+Add</Text>
                        </TouchableOpacity>

                    </ScrollView>

                    <View style={{ position: 'absolute', bottom: 30, paddingHorizontal: 30, right: 0, left: 0 }}>


                        <Button onPress={() => { onHandaleCreate() }} title={'Create'} bgColor={COLOR.green} color={COLOR.white} />
                    </View>
                </View>
            </View>
            <Modal visible={openmodal} animationType='slide'>
                <View style={{ alignSelf: 'flex-start', width: '85%', backgroundColor: COLOR.lightgreen, marginTop: 50, borderRadius: 10, marginLeft: 10 }}>
                    <Text style={{ color: COLOR.black, fontSize: 16, fontWeight: 'bold', marginTop: 20, paddingHorizontal: 20 }}>{data.pollQuestion}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, paddingHorizontal: 20 }}>
                        <Image source={require('../../Assets/Image/pollmoreoptionicon.png')} style={{ height: 15, width: 30, resizeMode: 'contain' }} />
                        <Text>{'Selecte one or more'}</Text>
                    </View>
                    <FlatList style={{ marginTop: 20, paddingHorizontal: 20 }} data={data.options} renderItem={({ item }) => {
                        return (
                            <View style={{ marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <TouchableOpacity>
                                            <Image source={require('../../Assets/Image/pollunselect.png')} style={{ height: 18, width: 18 }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 14, marginLeft: 5, color: COLOR.black, fontWeight: '500' }}>{item.text}</Text>
                                    </View>
                                    <Text style={{ fontSize: 14, marginLeft: 5, color: COLOR.black, fontWeight: '500' }}>{item.votes}</Text>
                                </View>
                                <Progress.Bar unfilledColor={COLOR.lightgray} borderColor={COLOR.lightgray} color={COLOR.green} progress={calculatePercentage(item.votes)} width={WIDTH - 100} style={{ marginTop: 7 }} />

                            </View>
                        )
                    }} />
                    <Text style={{ textAlign: 'right', color: COLOR.gray, fontSize: 13, marginVertical: 10, paddingHorizontal: 20 }}>{'10:12 pm'}</Text>
                    <View style={{ borderBottomWidth: 1, borderColor: COLOR.lightgray, marginTop: 10 }} />
                    <TouchableOpacity style={{}}>
                        <Text style={{ fontSize: 16, textAlign: 'center', padding: 15, color: COLOR.green, fontWeight: 'bold' }}>
                            View Votes
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </GestureHandlerRootView>
    );
};

export default CreateSurvey;

const PollInput = ({ onChangeText, value }) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <TextInput value={value} onChangeText={onChangeText} placeholder='Enter Your Option' style={{ height: 40, fontSize: 15, color: COLOR.black, flex: 1 }} />
        </View>
    )
}
