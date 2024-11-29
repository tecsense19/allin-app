import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Bubble, Time, Day } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import TmeModal from '../../Custom/Modal/TmeModal';
import Button from '../../Custom/Button/Button';
import NavigateHeader from '../../Custom/Header/NavigateHeader';


const TmeScreen = (props) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isfocus, setFocus] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar:
                        'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
                },
            },
        ]);
    }, []);

    const handleSend = () => {
        if (inputText == '') {
            return null;
        }

        const newMessage = {
            _id: uuid.v4(),
            text: inputText.trim(),
            createdAt: new Date(),

            user: {
                _id: 1,
            },
        };

        onSend([newMessage]);
        setInputText('');
    };
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.black }}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <NavigateHeader onPress={() => { props.navigation.goBack() }} />
                <Image source={require('../../Assets/Image/aichatlogo2.png')} style={{ height: 115, width: 115, marginTop: 60, marginLeft: '35%' }} />

            </View>
            <View style={{ backgroundColor: COLOR.white, position: 'absolute', height: 45, bottom: 0, left: 0, right: 0 }}></View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLOR.white,
                    marginTop: 20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    paddingTop: 10,

                    paddingBottom: isfocus == false || visible == true ? 30 : 5,
                    paddingHorizontal: 10
                }}>
                <GiftedChat
                    messages={messages}
                    onSend={message => onSend(message)}
                    user={{
                        _id: 1,
                    }}
                    renderTime={props => {
                        return (
                            <Time
                                {...props}
                                timeTextStyle={{
                                    left: {
                                        color: COLOR.textcolor,
                                        fontSize: 14,
                                        fontWeight: '500', textAlign: 'right'
                                    },
                                    right: {
                                        color: COLOR.textcolor,
                                        fontSize: 14,
                                        fontWeight: '500',
                                    },
                                }}
                            />
                        );
                    }}
                    renderDay={pr => {
                        return (
                            <Day
                                {...props}
                                textStyle={{
                                    color: COLOR.textcolor,
                                    fontWeight: '500',
                                    fontSize: 14,
                                    marginBottom: 15,
                                }}
                            />
                        );
                    }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}
                                textStyle={{
                                    right: {
                                        fontSize: 16,
                                        color: COLOR.black,
                                        fontWeight: '500',
                                    },
                                    left: {
                                        fontSize: 16,
                                        color: COLOR.black,
                                        fontWeight: '500',
                                    },
                                }}
                                wrapperStyle={{
                                    left: {
                                        backgroundColor: COLOR.verylightgray,
                                        borderRadius: 5, marginTop: 10
                                    },
                                    right: {
                                        backgroundColor: COLOR.lightgreen,
                                        borderRadius: 5, marginTop: 10
                                    },
                                }}
                            />
                        );
                    }}
                    renderInputToolbar={() => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                    // shadowOpacity: 10,
                                    // shadowColor: COLOR.lightgray,
                                    // shadowRadius: 5,
                                }}>
                                <View
                                    style={{
                                        backgroundColor: COLOR.verylightgray,
                                        borderRadius: 10,
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity onPress={() => setVisible(true)}>
                                        <Text
                                            style={{
                                                fontSize: 24,
                                                color: COLOR.black,
                                                marginLeft: 15,
                                                marginRight: 7,
                                                fontWeight: '500',
                                            }}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        value={inputText}
                                        onChangeText={text => setInputText(text)}
                                        placeholderTextColor={COLOR.placeholder}
                                        cursorColor={COLOR.black}
                                        style={{
                                            flex: 1,
                                            height: 45,
                                            fontSize: 16,
                                            fontWeight: '500',
                                            alignItems: 'flex-start',
                                            paddingLeft: 10,
                                            color: COLOR.textcolor,
                                        }}
                                        placeholder="Ask T.me  "
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleSend()}
                                    style={{
                                        backgroundColor: '#213460',
                                        height: 45,
                                        width: 45,
                                        marginLeft: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 50,
                                    }}>
                                    <Image
                                        source={require('../../Assets/Image/send.png')}
                                        style={{ height: 20, width: 20, tintColor: COLOR.white }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
            <TmeModal visible={visible} onClose={() => setVisible(false)}
                onCamera={() => setVisible(false)}
                onFile={() => setVisible(false)}
                onScane={() => setVisible(false)}
                onGallery={() => setVisible(false)}
            />

        </View>


    );
};

export default TmeScreen;
