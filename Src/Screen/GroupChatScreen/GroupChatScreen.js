import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Get_Group_Details, Read_Unread_Messages, Send_Group_Text_Message, User_List_For_Group } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import Loader from '../../Custom/Loader/loader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Chatheader from '../ChatInnerScreen/ChatInnerHeader';
import ChatInputToolBar from '../ChatInnerScreen/ChatCustomFile/ChatInputToolBar';
import GroupChatheader from './GroupChatHeader';
import GroupMsgText from './GroupTextMsg';
import Timezone from 'react-native-timezone'
import { useFocusEffect } from '@react-navigation/native';

const GroupChatScreen = (props) => {
    const groupId = props.route.params


    const [messages, setMessages] = useState([])
    const [groupData, setGroupData] = useState()
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState('')
    const [visible, setVisible] = useState(false)
    const [messageIds, setMessageIds] = useState('')

    const handleSend = async () => {
        const token = await getToken()
        if (inputText.trim() == '') {
            return null
        }

        Send_Group_Text_Message(token, inputText, groupId); setInputText('')

        // setMsgType('Text')
        // switch (msgType) {
        //     case 'Text':
        //         Chat_Text_Messages(token, msgType, inputText, Userid); setInputText('')
        //         break;

        //     default:
        //         console.warn(`Unhandled message type: ${msgType}`);
        // }

    }
    useEffect(() => {
        const fetchData = async () => {
            const token = await getToken()
            if (messageIds) {
                await Read_Unread_Messages(token, messageIds);
            }
        }
        fetchData();
    }, [messageIds]);
    useEffect(() => {
        const extractMessageIds = () => {
            const ids = [];
            console.log(ids);

            Object.keys(messages).forEach(date => {
                messages[date].forEach(message => {
                    // if (message.sentBy === "User") {
                    if (message) {
                        ids.push(message.messageId);
                    }
                });
            });
            setMessageIds(ids.join(','));
        };
        extractMessageIds();

    }, [messageIds, messages]);
    useFocusEffect(React.useCallback(() => {
        getMEssage()
    }, []))

    const getMEssage = async () => {
        setLoading(true)
        const timezone = Timezone.getTimeZone()
        const token = await getToken()
        Get_Group_Details(token, groupId, timezone)
            .then((res) => {
                if (res.status_code == 200) {
                    setMessages(res.data.groupChat)
                    setGroupData(res.data.groupData)
                    setLoading(false)
                    console.log(res.data.groupData);

                }
            })
    }
    useEffect(() => {
        getMEssage()
    }, [])
    const ChatMessage = React.memo(({ message }) => {
        const renderMessage = () => {
            switch (message?.messageType) {
                case 'Text':
                    return <GroupMsgText data={message} />
                default:
                    return;
            }
        };
        return (
            <View style={{ marginHorizontal: 15, marginVertical: 2, }}>
                {renderMessage()}
            </View>
        );
    });

    const memoizedMessages = useMemo(() => {
        return Object.keys(messages).map(date => {
            console.log();

            return (
                <View key={date}>
                    {messages[date].length == 0 ? null : <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>}
                    {messages[date]?.map(message => {

                        return <ChatMessage key={message?.messageId} message={message} />;
                    })}
                </View>
            )
        });
    }, [messages]);
    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: COLOR.white }}>
            <View style={Styles.chatHeaderView}>
                <View style={{ paddingHorizontal: 10 }}>

                    <GroupChatheader
                        onProfile={() => { props.navigation.navigate('groupinfo', groupData) }}
                        // onChange={() => { { } }}
                        source={{ uri: groupData?.profile_pic }}
                        title={groupData?.name?.length >= 20 ? groupData?.name?.slice(0, 15) + ' . . . ' : groupData?.name}
                        onSearch={() => Alert.alert('search')}
                        onBack={() => { props.navigation.goBack() }}
                    />

                </View>

                <View style={{ flex: 1, backgroundColor: COLOR.white, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <ScrollView>
                        {memoizedMessages}
                    </ScrollView>
                    <View style={{ marginBottom: isFocused ? 5 : 25 }}>

                        <ChatInputToolBar placeholder={'Message Here...'} source={require('../../Assets/Image/send.png')} onChangeText={text => { setInputText(text) }} onBlur={() => setIsFocused(false)}
                            onFocus={() => setIsFocused(true)} value={inputText} onsend={handleSend} onPress={() => setVisible(true)}
                        />
                    </View>
                </View>
            </View>
            <Loader visible={loading} Retry={getMEssage} />
        </KeyboardAvoidingView>
    )
}

export default GroupChatScreen

const Styles = StyleSheet.create({
    chatHeaderView: { backgroundColor: COLOR.black, flex: 1 },
})