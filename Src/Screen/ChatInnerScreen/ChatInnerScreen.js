import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { View, Alert, Vibration, Image, LogBox, BackHandler, Modal, Linking, TouchableOpacity, FlatList, Text, TextInput, SectionList, ScrollView, KeyboardAvoidingView } from 'react-native';
import uuid from 'react-native-uuid';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Contacts from 'react-native-contacts';
import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
import Chatheader from './ChatInnerHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import PlusModal from './ChatCustomFile/PlusModal';
import CreateMsgMeeting from './ChatCustomFile/CreateMeeting';
import { MsgMeeting } from './ChatCustomFile/MsgMeeting';
import MsgText from './ChatCustomFile/MsgText';
import MsgReminder from './ChatCustomFile/MsgReminder';
import CreateReminder from './ChatCustomFile/CreateReminder';
import ChatInputToolBar from './ChatCustomFile/ChatInputToolBar';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import MsgTask from './ChatCustomFile/MsgTask';
import CreateTask from './ChatCustomFile/CreateTask';
import { styles } from './ChatInnerScreenStyle';
import MsgImage from './ChatCustomFile/MsgImage';
import MyAlert from '../../Custom/Alert/PermissionAlert';
import MsgContact from './ChatCustomFile/MsgContact';
import MsgDocument from './ChatCustomFile/MsgDocument';
import DeleteChatHeader from './ChatCustomFile/DeleteChatHeader';
import Loader from '../../Custom/Loader/loader';
import { handaleDeleteMsg, handleFileUplode, handleMsgText, handleUnreadeMsg } from './Function/ApiCaliing';
import Timezone from 'react-native-timezone'
import ChatScrollEnd from '../../Custom/ChatScrollButton/ChatScrollEnd';
LogBox.ignoreAllLogs();

const ChatInnerScreen = props => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [ReMeCkModal, setReMeCkModal] = useState(false);
    const [change, setChange] = useState(false);
    const [loding, setLoding] = useState(false);
    const [msgType, setMsgType] = useState('Text');
    const [FileUplode, setFileUpload] = useState('');
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState([])
    const [selectedMSG, setSelectedMSG] = useState([])
    const [selecthandle, setSelectHandle] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [userDetails, setUserDetails] = useState('')
    const chatProfileData = props?.route?.params
    const userId = chatProfileData?.item?.id

    const scrollViewRef = useRef();
    const [showButton, setShowButton] = useState(false);

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        if (offsetY + layoutHeight >= contentHeight) {
            setShowButton(false);
        } else {
            setShowButton(true);
        }
    };

    const scrollToEnd = () => { scrollViewRef.current?.scrollToEnd({ animated: true }); };
    useEffect(() => { scrollViewRef.current?.scrollToEnd({ animated: true }); }, [messages]);
    const allMessageIds = [];
    Object.keys(messages).forEach(date => {
        messages[date].forEach(message => {
            if (message.sentBy === "User") {
                allMessageIds.push(message.messageId.toString());
            }
        });
    });
    const allMessageIdsString = allMessageIds.toString();
    const token = chatProfileData?.token
    const onhandalePhoneCall = () => { Linking?.openURL(`tel:${userDetails?.country_code + userDetails?.mobile}`); };
    const closeModal = () => { setVisible(false) };

    useEffect(() => {
        getAllMessages()
        handleUnreadeMsg(token, allMessageIdsString)
        requestContactsPermission()
    }, [])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [visible]);
    useEffect(() => { if (selectedMSG == '') { setIsSelected(false) } }, [selectedMSG])
    const selectedMsgDelete = async () => {
        setLoding(true)

        selectedMSG.forEach((res) => {
            console.log(res.messageId);
            handaleDeleteMsg(token, res.messageId)
        })
        setSelectedMSG('')
        getAllMessages()
        setLoding(false)

    }
    const onhandaleSelected = msg => {
        if (selectedMSG.includes(msg)) {
            setSelectedMSG(selectedMSG.filter((id) => id !== msg));
        } else { setSelectedMSG([...selectedMSG, msg]); }
    }
    const getAllMessages = async () => {
        try {
            const response = await fetch('https://allin.website4you.co.in/api/v1/user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: userId,
                    limit: 1000,
                    start: 0,
                    timezone: Timezone.getTimeZone(),
                })
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
            const data = await response.json();
            if (data?.message === 'Get Data Successfully!') {
                setUserDetails(data.data.userData);
                setMessages(data?.data?.chat)
            } else {
                setVisible(false);
                Alert.alert('No message received from server.');
            }
        } catch (error) {
            setVisible(false);
            console.error('Error:', error);
            Alert.alert('An error occurred:', error.message ?? 'Unknown error');
        }
    };

    const handleSend = (currentMsgData) => {
        // getAllMessages()
        if (inputText.trim() == '' && msgType == 'Text') {
            return null
        }
        setMsgType('Text')
        switch (msgType) {
            case 'Text':
                handleMsgText(token, msgType, inputText, userId); getAllMessages(); setInputText('')
                break;
            case 'Attachment':
                handleFileUplode(token, formData, userId, msgType); getAllMessages(); setFileUpload('')
                break;

            default:
                console.warn(`Unhandled message type: ${msgType}`);

        }
    };
    const formData = new FormData();
    const AttachmentUri = FileUplode[0]?.uri;
    const AttachmentName = AttachmentUri ? AttachmentUri?.split('/').pop() : ''; // Extract image name from URI
    if (AttachmentName) {
        formData.append('file', { uri: AttachmentUri, name: AttachmentName, type: FileUplode[0]?.type });
    }
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles], });
            setVisible(false);
            setLoding(true)
            // console.log(result);
            setFileUpload(result)
            setLoding(false)
        }
        catch (err) { console.log(err); }
    };
    const onCamera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setIsFocused(false); setVisible(false);
            const url = result?.assets
            setFileUpload(url)

            try {

            } catch (error) { console.error(error); }
            setLoding(false)
        }
    };
    const onPhotoGallery = async () => {


        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            setIsFocused(false); setVisible(false);
            const url = result?.assets
            setFileUpload(url)

            try {

            } catch (error) { console.error(error); }
            setLoding(false)
        }
    };
    const customAlert = () => {
        const title = 'Permission Request';
        const Descriptions = 'This app would like to view your contacts';
        const Deny = () => console.log('Deny');
        const Allow = () => openSettings();
        MyAlert(title, Descriptions, Allow, Deny);
    };
    const requestContactsPermission = async () => {
        const result = await request(PERMISSIONS.IOS.CONTACTS);
        if (result === 'granted') { Contacts.getAll().then(contacts => { setContacts(contacts) }) }
        else { customAlert(); }
    };
    const list = ({ item }) => {
        const IsContact = selectedContact.includes(item)
        const toggleItem = (itemId) => {
            if (IsContact) { setSelectedContact(selectedContact.filter((id) => id !== itemId)); }
            else { setSelectedContact([...selectedContact, itemId]); }
        };
        return (
            <TouchableOpacity style={[styles.listOnContainer, { backgroundColor: IsContact ? COLOR.lightgreen : COLOR.white, }]}
                onPress={() => { selecthandle ? toggleItem(item) : '' }} onLongPress={() => { toggleItem(item), setSelectHandle(true), Vibration.vibrate(10) }}>
                <Image source={require('../../Assets/Image/admin.jpg')} style={styles.adminImg} />
                <View>
                    <Text style={styles.contactName}>{item.givenName.length > 20 ? item.givenName.slice(0, 20) + '...' : item.givenName}</Text>
                    <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const userName = chatProfileData?.item?.first_name + '' + chatProfileData?.item?.last_name
    const ChatMessage = ({ message }) => {
        // console.log();
        const renderMessage = () => {
            switch (message?.messageType) {
                case 'Text':
                    return <MsgText data={message} />;
                case 'Attachment':
                    return <MsgImage data={message} />;
                case 'Task':
                    return (
                        <View>
                            <Text>{message?.messageDetails?.task_name}</Text>
                            <Text>{message?.messageDetails?.task_description || 'No description'}</Text>
                        </View>
                    );
                default:
                    return null;
            }
        };

        return (
            <TouchableOpacity style={{ marginHorizontal: 30, paddingVertical: 1, marginVertical: 2, backgroundColor: selectedMSG.includes(message) ? COLOR.green : COLOR.white }}
                delayLongPress={500}
                onLongPress={() => { setIsSelected(true), onhandaleSelected(message) }}
                onPress={() => { isSelected ? onhandaleSelected(message) : '' }}>
                {renderMessage()}
            </TouchableOpacity>
        );
    };
    // const memoizedMessagesByDate = useMemo(() => {
    //     return Object.keys(messages).map(date => (
    //         <View key={date}>
    //             <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>
    //             {messages[date]?.map(message => (
    //                 <ChatMessage key={message?.messageId} message={message} />
    //             ))}
    //         </View>
    //     ));
    // }, [messages]);

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: COLOR.white }}>
            <View style={{ flex: 1 }}>
                {msgType == 'Contact' ?
                    <View style={styles.contactContainer}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <NavigateHeader title={'Contacts'} onPress={() => setMsgType('Text')} color={COLOR.white} smallTitleSize={15} />
                        </View>
                        <View style={styles.contactListContainer}>
                            {selectedContact?.length > 0 ? <Text style={styles.selectedContactTxt}>{' Selected(' + selectedContact.length + ')'} </Text> : null}
                            <TextInput placeholder='Search here...' style={styles.contactSearchInput} />
                            <FlatList data={contacts} renderItem={list} style={styles.ContactFlatList} />
                        </View>
                        {selectedContact.length > 0 ?
                            <TouchableOpacity style={styles.OncontactScreenSend} onPress={() => { handleSend(selectedContact); setMsgType('Text') }}>
                                <Text style={styles.sendTxt}>Send</Text>
                            </TouchableOpacity> : null}
                    </View> :
                    <View style={styles.chatMainsection}>
                        <View style={styles.chatHeaderView}>
                            {!isSelected ? <Chatheader
                                onProfile={() => Alert.alert('Profile')}
                                onCall={onhandalePhoneCall}
                                value={change}
                                onChange={() => setChange(!change)}
                                source={{ uri: chatProfileData?.item?.profile }}
                                title={userName?.length >= 20 ? userName?.slice(0, 15) + ' . . . ' : userName}
                                onSearch={() => Alert.alert('search')}
                                onBack={() => props.navigation.goBack()}
                            /> :
                                <DeleteChatHeader Count={selectedMSG ? selectedMSG?.length : null} onDelete={() => { selectedMsgDelete() }} onBack={() => { setIsSelected(false); setSelectedMSG('') }} />}
                        </View>
                        <View style={styles.GiftedChat}>

                            <ScrollView ref={scrollViewRef}
                                invertStickyHeaders={true}
                                // onScroll={handleScroll}

                                scrollEventThrottle={16}>
                                {Object.keys(messages).map(date => (
                                    <View key={date}>
                                        <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>
                                        {messages[date]?.map(message => (
                                            <ChatMessage key={message?.messageId} message={message} />
                                        ))}
                                    </View>
                                ))}

                            </ScrollView>

                        </View >
                        <PlusModal
                            //    onCheckList={() => { setMsgType('Task'); setVisible(false); setReMeCkModal(true); }}
                            // onMeeting={() => { setMsgType('Meeting'); setVisible(false); setReMeCkModal(true); }}
                            //    onReminder={() => { setMsgType('Reminder'); setVisible(false); setReMeCkModal(true); }}
                            onCamera={() => { onCamera(); setMsgType('Attachment'); }}
                            onPhotoGallery={() => { onPhotoGallery(); setMsgType('Attachment'); }}
                            onContacts={() => { setMsgType('Contact'), setVisible(false); }}
                            //    onLocation={() => { Alert.alert('Location'); setVisible(false); }}
                            onFiles={() => { pickDocument(); setMsgType('Attachment'); }}
                            onRequestClose={closeModal} visible={visible}
                            onClose={() => setVisible(false)}
                            onCheckList={() => { setVisible(false); }}
                            onMeeting={() => { setVisible(false); }}
                            onReminder={() => { setVisible(false); }}
                            onLocation={() => { setVisible(false) }}
                        />
                        <Modal visible={ReMeCkModal}>
                            <View style={styles.createItemModalView}>
                                <View style={{ paddingHorizontal: 15, padding: 15 }}>
                                    <NavigateHeader color={COLOR.white} title={msgType == 'Task' ? 'Create Task' : msgType == 'Meeting' ? 'Create Meeting' : msgType == 'Reminder' ? 'Create Remind' : null} onPress={() => { setMsgType('Text'); setReMeCkModal(false) }} />
                                </View>
                                <View style={styles.createItemModalView2}>

                                    {msgType == 'Task' ? (
                                        <CreateTask onSubmit={(taskdata) => { setMsgType('Text'), setReMeCkModal(false); handleSend(taskdata) }} userId={userId} />
                                    ) : msgType == 'Meeting' ? (
                                        <CreateMsgMeeting onSubmit={(data) => { handleSend(data); setMsgType('Text'), setReMeCkModal(false); }} userId={userId} />
                                    ) : msgType == 'Reminder' ? (
                                        <CreateReminder onSubmit={(reminddata) => { handleSend(reminddata); setMsgType('Text'), setReMeCkModal(false); }} userId={userId} />
                                    ) : null}
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
                <Loader visible={loding} />
                {msgType !== 'Contact' ?
                    <View style={{ marginBottom: isFocused ? 5 : 25 }}>
                        <ChatInputToolBar source={require('../../Assets/Image/send.png')} onChangeText={text => { setInputText(text) }} onBlur={() => setIsFocused(false)}
                            onFocus={() => setIsFocused(true)} value={inputText} onsend={handleSend} onPress={() => setVisible(true)}
                        />
                    </View>
                    : null}
                {showButton && (<ChatScrollEnd onPress={scrollToEnd} />)}
            </View>
        </KeyboardAvoidingView>
    );
};
export default ChatInnerScreen;