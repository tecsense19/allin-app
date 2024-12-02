import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, Image, Modal, FlatList, ScrollView, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import * as Progress from 'react-native-progress';
import { Create_Survey } from '../../Service/actions';
import uuid from 'react-native-uuid'

const CreateSurvey = (props) => {
    const [pollQuestion, setPollQuestion] = useState('');

    const [options, setOptions] = useState([
        { id: uuid.v4(), text: 'new Option', votes: 2 },
        { id: uuid.v4(), text: 'new Option', votes: 8 },
        { id: uuid.v4(), text: 'new Option', votes: 12 },
        { id: uuid.v4(), text: 'new Option', votes: 13 },
    ]);

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
        const commaSeparateOption = options.map(option => '"' + option.text.toString() + '"').join(',');
        Create_Survey(pollQuestion, 35, commaSeparateOption)
            .then((res) => {
                // if (res.status_code == 200) {
                //     console.log('res------------------>>>>>>>', res);
                // }
                // console.log('res------------------>>>>>>>', res);

            }).catch((e) => {
                console.log(e);

            })

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
                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => { handleRemoveOption(item.id) }}>
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
