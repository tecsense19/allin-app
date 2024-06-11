import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, } from 'react-native';
import NavigateHeader from '../../../Custom/Header/NavigateHeader';
import Textinput from '../../../Custom/TextInput/SimpaleTextInput';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';

const CreateNote = props => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [editableData, setEditableData] = useState('');

    useEffect(() => {
        loadTasks();
        setEditableData(props?.route?.params);
        setTitle(editableData?.title);
        setNote(editableData?.note);
    }, [editableData]);
    console.log(editableData);

    const loadTasks = async () => {
    };
    const DeleteNote = async () => {

    }

    const SaveTask = async () => {
        let noteData = storedTasks ? JSON.parse(storedTasks) : [];

        if (editableData) {
            const updatedData = {
                id: editableData?.id,
                title: title,
                note: note,
                createdAt: editableData?.createdAt,
                updatedAt: Date.parse(new Date())

            };
            const dataIndex = noteData.findIndex(item => item.id === editableData?.id);
            if (dataIndex !== -1) {
                noteData[dataIndex] = updatedData;
                firestore().collection('note').doc(editableData?.noteId).update(updatedData)
            }
        } else {
            const newData = {
                id: new Date().getTime().toString(),
                title: title,
                note: note,
                createdAt: Date.parse(new Date()),
                updatedAt: ''
            };
            noteData.push(newData);

        }

        if (!title == '' && !note == '') {
            props.navigation.goBack();
        } else {
            Alert.alert('Enter title and task');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader title={'Note'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
            </View>
            <View
                style={{
                    backgroundColor: COLOR.white,
                    flex: 1,
                    marginTop: 15,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                <ScrollView style={{ padding: 15, paddingHorizontal: 20, flex: 1 }} bounces={false}>
                    <Textinput
                        value={title}
                        onChangeText={txt => setTitle(txt)}
                        label={'Note Title'}
                        placeholder={'Enter Your Note Title'}
                        marginTop={30}
                    />
                    <Text
                        style={{
                            marginTop: 30,
                            color: COLOR.black,
                            fontWeight: 'bold',
                            marginLeft: 5,
                            fontSize: 18,
                            marginBottom: 10,
                        }}>
                        Note Description
                    </Text>
                    <TextInput
                        placeholder="Enter note"
                        onChangeText={res => setNote(res)}
                        value={note}
                        multiline={true}
                        placeholderTextColor={COLOR.lightgray}
                        style={[
                            styles.addNoteTextInput,
                            {
                                fontSize: 16,
                                fontWeight: '500',
                                paddingVertical: 15,
                                borderRadius: 10,
                                paddingTop: 15,
                                alignItems: 'center',
                                height: 150,
                            },
                        ]}
                    />

                    <TouchableOpacity
                        style={styles.onSave}
                        onPress={() => {
                            SaveTask();
                        }}>
                        <Text style={styles.saveTxt}> {editableData ? 'Update' : '  Save  '} </Text>
                    </TouchableOpacity>

                    {editableData ? <TouchableOpacity
                        style={[styles.onSave, { marginTop: '-10%', backgroundColor: COLOR.orange }]}
                        onPress={() => {
                            DeleteNote();
                        }}>
                        <Text style={styles.saveTxt}> {' Delete'} </Text>
                    </TouchableOpacity> : null}

                </ScrollView>
            </View>

            <KeyboardAvoidingView
                behavior={
                    Platform.OS === 'ios' ? 'padding' : 'height'
                }></KeyboardAvoidingView>
        </View>
    );
};
export default CreateNote;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.black },

    createNoteText: {
        textAlign: 'center',
        fontSize: 20,
        color: COLOR.white,
        marginTop: 40,
        fontWeight: 'bold',
    },
    addNoteTextInput: {
        backgroundColor: COLOR.white,
        borderWidth: 1,
        color: COLOR.black,
        fontSize: 18,
        paddingLeft: 10,
        borderColor: COLOR.gray,
    },
    onSave: {
        marginTop: '10%',
        backgroundColor: COLOR.green,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 50,
    },
    fontSize: 18,
    saveTxt: {
        color: COLOR.white,
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: '600',
    },
});
