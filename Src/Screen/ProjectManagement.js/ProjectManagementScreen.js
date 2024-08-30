

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
import React, { useEffect, useState, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import RoundPlus from '../../Custom/RoundPlus/RoundPlus';
import Button from '../../Custom/Button/Button';
import { getToken } from '../../Service/AsyncStorage';
import { styles } from './ProjectManagementStyle';
import { Get_Note } from '../../Service/actions';
import Loader from '../../Custom/Loader/loader';
const ProjectManagementScreen = props => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [viewNote, setViewNote] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getNoteData()
        }, []),
    );
    const get = async () => { const token = await getToken(); setToken(token) }
    useEffect(() => {
        get()
        if (token.length > 2) {
            setLoading(false)
        } else { get() }
        getNoteData()

    }, [token, data])
    const HIGHT = Dimensions.get('screen').height

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
            navigation: 'event',
            img: require('../../Assets/Image/event.png'),
        },
        {
            id: 5,
            listname: 'Scan Docs',
            navigation: 'scandoc',
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
    const getNoteData = async () => {
        await Get_Note(token)
            .then((res) => {
                if (res.status_code === 200) {
                    setData(res.data.notes);

                }
            })
    }
    const CreatedAt = viewNote?.created_at?.toString()?.slice(0, 10)?.replace("T", " ");
    const UpdateAt = viewNote?.updated_at?.toString()?.slice(0, 10)?.replace("T", " ");
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
                    style={{ paddingBottom: 100 }}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const date = new Date(item.updated_at);
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const year = date.getFullYear();
                        const hh = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const AmPm = hh >= 12 ? 'pm' : 'am';
                        const hours = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh;
                        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${AmPm}`;//:${seconds}
                        return (
                            <TouchableOpacity style={styles.notelistview}
                                onPress={() => { setVisible(true); setViewNote(item); }}>
                                <Text style={styles.notelisttitle}>
                                    {item?.title?.length > 20 ? item?.title?.slice(0, 20) + '...' : item?.title}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.notedatetime}>{formattedDate}</Text>
                                    <TouchableOpacity style={{}} onPress={() => { setViewNote(item); props.navigation.navigate('note', item); }} >
                                        <Image source={require('../../Assets/Image/pen.png')} style={styles.listpenicon} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <Modal visible={visible}>
                    <View style={{ flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 20, marginTop: 20 }}>
                        <NavigateHeader onPress={() => setVisible(false)} />
                        <ScrollView style={styles.modalscrollview} bounces={false}>
                            <Text style={styles.noteviewtitle}>{viewNote.title}</Text>
                            <Text style={styles.notecreatedtimedate}>
                                Created:- {CreatedAt}{'\n'}
                                Updated:- {UpdateAt}
                            </Text>
                            <Text style={styles.noteTextindetails}>{viewNote.description}</Text>
                            <Button title={'Close'} color={COLOR.white} bgColor={COLOR.green} marginTop={30} marginBottom={40} onPress={() => { setVisible(false); }} />
                        </ScrollView>
                    </View>
                </Modal>
            </View>
            <Loader visible={loading} />
        </ScrollView>

    );
};
export default ProjectManagementScreen