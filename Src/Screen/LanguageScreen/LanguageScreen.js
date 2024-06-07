import {
    View,
    Text,
    SectionList,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';

const LanguageScreen = props => {
    const [select, setSelect] = useState(false);
    const [language, setLanguage] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            getLanguage();
        }, []),
    );
    const getLanguage = async () => {
        try {
            const storedLanguage = await AsyncStorage.getItem('language');
            if (storedLanguage !== null) {
                setLanguage(JSON.parse(storedLanguage));
                setSelect(JSON.parse(storedLanguage));
            }
        } catch (error) {
            console.error('Error loading language from storage:', error);
        }
    };
    const DATA = [
        {
            title: 'Suggested',
            data: ['English (US)', 'English (UK)'],
        },
        {
            title: 'Language',
            data: [
                'Mandarin',
                'Hindi',
                'Spanish',
                'Arabic',
                'French',
                'Bengali',
                'Russian',
                'Indonesian',
            ],
        },
    ];

    const header = ({ section: { title } }) => {
        return (
            <View style={styles.titleContainer}>
                <View
                    style={{
                        borderWidth: title === 'Language' ? 1 : 0,
                        marginBottom: title === 'Language' ? 35 : 0,
                        borderColor: COLOR.verylightgray,
                        width: '97%',
                        marginLeft: -3,
                    }}></View>
                <Text style={styles.titletxt}>{title}</Text>
            </View>
        );
    };
    const list = ({ item }) => {
        const isSelected = select === item;
        const storeLanguage = async () => {
            const data = JSON.stringify(item);
            await AsyncStorage.setItem('language', data);
        };
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelect(isSelected ? item : item), storeLanguage();
                }}
                style={styles.listContainer}>
                <Text style={styles.languagetxt}>{item}</Text>

                <View style={styles.selecticonView}>
                    {isSelected ? (
                        <Image
                            source={require('../../Assets/Image/radio.png')}
                            style={styles.radioicon}
                        />
                    ) : (
                        <Image
                            source={require('../../Assets/Image/radiobox.png')}
                            style={styles.radioboxicon}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} hidden={false} />
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader color={COLOR.white} title={'Language'} onPress={() => props.navigation.goBack()} />

            </View>
            <View style={styles.listView}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={list}
                    renderSectionHeader={header}
                    style={{ marginBottom: 30 }}
                    bounces={false}
                />
            </View>
        </View>
    );
};

export default LanguageScreen;
const styles = StyleSheet.create({
    container: { backgroundColor: COLOR.black, flex: 1 },
    titleContainer: { padding: 15, marginLeft: 15, marginTop: 15 },
    line: {
        borderBottomWidth: 1,
        marginTop: -25,
        marginBottom: 30,
        borderColor: COLOR.lightgray,
    },
    titletxt: {
        fontSize: 18,
        color: COLOR.titlecolor,
        fontWeight: '600',
    },
    listContainer: {
        padding: 8,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    languagetxt: {
        fontSize: 16,
        color: COLOR.textcolor,
        fontWeight: '500',
    },
    selecticonView: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    radioicon: {
        height: 23,
        width: 23,
        marginRight: 10,
        resizeMode: 'contain',
        tintColor: COLOR.black,
    },
    radioboxicon: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginRight: 10,
        tintColor: COLOR.black,
    },
    listView: {
        flex: 1,
        backgroundColor: COLOR.white,
        marginTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
});
