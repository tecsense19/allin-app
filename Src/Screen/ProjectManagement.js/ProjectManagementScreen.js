

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
import { styles } from './ProjectManagementStyle';
const ProjectManagementScreen = props => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [Edit, setEdit] = useState(false);
    const [viewNote, setViewNote] = useState('');
    const [token, setToken] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
            const get = async () => { const token = await getToken(); setToken(token) }
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
                style={styles.note_List_Container}>
                <View style={styles.listFirstView}>
                    <View style={styles.listuserView}>
                        <Image source={item.img} style={styles.listImage} />
                    </View>
                    <Text style={styles.listname}>{item.listname}</Text>
                </View>
                <Image source={require('../../Assets/Image/rightarrow.png')} style={styles.listarrow} />
            </TouchableOpacity>
        );
    };
    return (
        <ScrollView bounces={false}>
            <View style={styles.mainContainer}>
                <StatusBar barStyle={'dark-content'} />
                <Text style={styles.P_M_Text}>Project Management</Text>
                <FlatList
                    data={Data}
                    scrollEnabled={false}
                    renderItem={list} style={{ marginTop: 10 }} />
                <View style={styles.noteTitleView}>
                    <Text style={styles.note_T}> Notes </Text>
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
                            <TouchableOpacity style={styles.notelistview}
                                onPress={() => { setVisible(true); setViewNote(item); }}>
                                <Text style={styles.notelisttitle}>
                                    {item.title.length > 21 ? item.title.slice(0, 21) + '...' : item.title}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.notedatetime}>{'formatted'}</Text>
                                    <TouchableOpacity style={{ padding: 10, }} onPress={() => { getnoteData() }} >
                                        <Image source={require('../../Assets/Image/pen.png')} style={styles.listpenicon} />
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
                        <ScrollView style={styles.modalscrollview} bounces={false}>
                            <Text style={styles.noteviewtitle}>{viewNote.title}</Text>
                            <Text style={styles.notecreatedtimedate}>
                                {/* Created:- {createdDate}{'\n'} */}
                                {/* {viewNote.updatedAt ? "Updated:- " + updatedDate : null} */}
                            </Text>
                            <Text style={styles.noteTextindetails}>{viewNote.note}</Text>
                            <Button title={'Close'} bgColor={COLOR.green} marginTop={30} marginBottom={40} onPress={() => { setVisible(false); }} />
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </ScrollView>

    );
};
export default ProjectManagementScreen