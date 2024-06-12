import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import styles from './CallScreenStyle';
import { getToken } from '../../Service/AsyncStorage';

const CallScreen = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(props.route.params)
    }, [])

    const list = ({ item }) => {
        console.log(item);
        const onhandalePhoneCall = () => {
            Linking.openURL(`tel:${item.country_code + ' ' + item.mobile}`);
        };
        const userName = item.first_name + ' ' + item.last_name
        return (
            <View style={{ backgroundColor: COLOR.white, }}>
                <View style={styles.listcontainer}>
                    <View style={styles.imgAndNameView}>
                        <Image source={{ uri: item.profile }} style={styles.chetImg} />
                        <View>
                            <Text style={styles.name}>
                                {userName.length >= 20
                                    ? userName.slice(0, 20) + ' . . . '
                                    : userName}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={onhandalePhoneCall}>
                        <Image
                            source={require('../../Assets/Image/telephone.png')}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: COLOR.green,
                            }}
                        />
                        <Text style={styles.time}>{item.time}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.black, }}>


            <StatusBar barStyle={'light-content'} />
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader title={'Call'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLOR.white,
                    marginTop: 10,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    paddingHorizontal: 20
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLOR.verylightgray,
                        borderRadius: 10,

                        marginTop: 20,
                        height: 45,
                    }}>
                    <Image
                        source={require('../../Assets/Image/search.png')}
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: COLOR.black,
                            marginLeft: 10,
                        }}
                    />

                    <TextInput
                        onSubmitEditing={() => setShowSearch(false)}
                        style={{
                            fontSize: 16,
                            flex: 1,
                            fontWeight: '500',
                            marginLeft: 15,
                            color: COLOR.textcolor,
                        }}
                        placeholder="Search here"
                        placeholderTextColor={COLOR.placeholder}
                    />
                </View>

                <FlatList renderItem={list} data={data} />
            </View>
        </View>
    );
};

export default CallScreen;
