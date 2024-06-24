import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { View, Alert, Vibration, Image, LogBox, BackHandler, Modal, Linking, TouchableOpacity, FlatList, Text, TextInput, SectionList, ScrollView, KeyboardAvoidingView } from 'react-native';
import uuid from 'react-native-uuid';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Contacts from 'react-native-contacts';
import { PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions';
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
import MyAlert from '../../Custom/Alert/PermissionAlert';
import MsgContact from './ChatCustomFile/MsgContact';
import DeleteChatHeader from './ChatCustomFile/DeleteChatHeader';
import Loader from '../../Custom/Loader/loader';
import Timezone from 'react-native-timezone'
import MsgAttachment from './ChatCustomFile/MsgAttachment';
import { Chat_Delete_Messages, Chat_File_Message, Chat_Text_Messages, Contact_Message, File_Uplode, Get_All_Messages, Location_Messages, Meeting_Messages, Read_Unread_Messages, Reminder_Messages, Task_Messages } from '../../Service/actions';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Button from '../../Custom/Button/Button';
import MsgMapImage from './ChatCustomFile/MsgMapView';
import { getToken } from '../../Service/AsyncStorage';
LogBox.ignoreAllLogs();


const ChatInnerScreen = props => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [ReMeCkModal, setReMeCkModal] = useState(false);
    const [change, setChange] = useState(false);
    const [loding, setLoding] = useState(true);
    const [msgType, setMsgType] = useState('Text');
    const [FileUplode, setFileUpload] = useState('');
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState([])
    const [selectedMSG, setSelectedMSG] = useState([])
    const [selecthandle, setSelectHandle] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [userDetails, setUserDetails] = useState('')
    const [messageIds, setMessageIds] = useState('');
    // const [showButton, setShowButton] = useState(false);
    const [location, setLocation] = useState(null);
    const [forwordId, setForwordID] = useState();
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [token, setToken] = useState('');
    const [loadedMessagesCount, setLoadedMessagesCount] = useState(15);

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // console.log(offsetY);
        if (offsetY === 0) {
            getAllMessages()
        }
    };
    console.log('aaaaaaa');

    const Userid = props?.route?.params
    // console.log(Userid);
    const userName = userDetails.first_name == undefined && userDetails.last_name == undefined ? '' : userDetails.first_name + ' ' + userDetails.last_name
    const scrollViewRef = useRef();
    const onhandalePhoneCall = () => { Linking?.openURL(`tel:${userDetails?.country_code + userDetails?.mobile}`); };
    const closeModal = () => { setVisible(false) };
    const scrollToEnd = () => { scrollViewRef.current?.scrollToEnd({ animated: true }); };
    useEffect(() => { scrollViewRef.current?.scrollToEnd({ animated: true }); }, []);
    useEffect(() => { if (selectedMSG == '') { setIsSelected(false) } }, [selectedMSG])
    useEffect(() => {
        const extractMessageIds = () => {
            const ids = [];
            Object.keys(messages).forEach(date => {
                messages[date].forEach(message => {
                    if (message.sentBy === "User") {
                        ids.push(message.messageId);
                    }
                });
            });
            setMessageIds(ids.join(','));
        };
        extractMessageIds();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            await getAllMessages();
            setLoadedMessagesCount(loadedMessagesCount + 5)

            if (messageIds) {
                await Read_Unread_Messages(token, messageIds);
            }
        }
        fetchData();
    }, [change]);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [visible]);
    useEffect(() => {
        if (selectedMSG.length > 0) {
            const id = selectedMSG?.map((res) => res?.messageId);
            setForwordID(id?.join(','))
        }
    }, [selectedMSG]);

    const requestLocationPermission = async () => {
        try {
            const granted = await request(
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
            if (granted === RESULTS.GRANTED) {
                // console.log('Location permission granted', Geolocation.watchPosition((r) => {
                // }));
            } else {
                const title = 'Permission Request';
                const Descriptions = 'This app would like to view your Location';
                const Deny = () => console.log('Deny');
                const Allow = () => Linking.openSettings();
                MyAlert(title, Descriptions, Allow, Deny);
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
            },
            error => {
                console.log(error.message);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);
    const selectedMsgDelete = async () => {
        selectedMSG.forEach((res) => {
            Chat_Delete_Messages(token, res?.messageId)
        })
        setSelectedMSG('')
        getAllMessages()
    }
    const onhandaleSelected = msg => {
        if (selectedMSG.includes(msg)) {
            setSelectedMSG(selectedMSG.filter((id) => id !== msg));
        } else { setSelectedMSG([...selectedMSG, msg]); }
    }
    const getAllMessages = async () => {
        const Token = await getToken()
        setToken(Token)
        const bodyData = { id: Userid, start: 0, limit: 1000, timezone: Timezone.getTimeZone(), filter: change == true ? 'filter' : null }
        const data = await Get_All_Messages(bodyData, Token)
        if (data?.status_code == 200) {
            // console.log(data?.data?.chat);
            setUserDetails(data.data.userData);
            setMessages(data?.data?.chat);
            setLoding(false);

        } else {
            setLoding(false);
            Alert.alert(data?.message);
        }
    };
    // console.log(messages);

    const File_Message = async () => {
        const formData = new FormData();
        const AttachmentUri = FileUplode[0]?.uri;
        const AttachmentName = AttachmentUri ? AttachmentUri?.split('/').pop() : ''; // Extract image name from URI
        if (AttachmentName) {
            formData.append('file', { uri: AttachmentUri, name: AttachmentName, type: FileUplode[0]?.type });
        }

        const data = await File_Uplode(token, formData, Userid, msgType)
        if (data?.status_code == 200) {
            const fileName = data.data.image_name
            const fileType = data.data.file_type
            // console.log(fileType,'typr');
            Chat_File_Message(msgType, fileName, Userid, token, fileType)
        } else {
            Alert.alert(data?.message);
        }
    }
    const handleSend = (currentMsgData) => {
        if (inputText.trim() == '' && msgType == 'Text') {
            return null
        }
        setMsgType('Text')
        switch (msgType) {
            case 'Text':
                Chat_Text_Messages(token, msgType, inputText, Userid); setInputText('')
                break;
            case 'Attachment':
                File_Message(); setFileUpload('')
                break;
            case 'Task':
                Task_Messages(token, msgType, currentMsgData)
                break;
            case 'Meeting':
                Meeting_Messages(token, currentMsgData)
                break;
            case 'Reminder':
                Reminder_Messages(token, currentMsgData)
                break;
            case 'Location':
                Location_Messages(token, location, Userid)
                break;
            case 'Contact':
                Contact_Message(token, currentMsgData, Userid)
                break;
            default:
                console.warn(`Unhandled message type: ${msgType}`);
        }
    };
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.audio,
                    DocumentPicker.types.plainText,
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.csv,
                    DocumentPicker.types.doc,
                    DocumentPicker.types.docx,
                    DocumentPicker.types.images,
                    DocumentPicker.types.plainText,
                    DocumentPicker.types.xls,
                ],
            });
            setVisible(false);
            setLoding(true)
            setFileUpload(result)
            setLoding(false)
        }
        catch (err) { console.log(err, 'file'); }
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
            if (IsContact) { setSelectedContact(selectedContact?.filter((id) => id !== itemId)); }
            else { setSelectedContact([...selectedContact, itemId]); }
        };
        return (
            <TouchableOpacity style={[styles.listOnContainer, { backgroundColor: IsContact ? COLOR.lightgreen : COLOR.white, }]}
                onPress={() => { selecthandle ? toggleItem(item) : '' }} onLongPress={() => { toggleItem(item), setSelectHandle(true), Vibration.vibrate(10) }}>
                <Image source={require('../../Assets/Image/admin.jpg')} style={styles.adminImg} />
                <View>
                    <Text style={styles.contactName}>{item.givenName.length > 20 ? item.givenName.slice(0, 20) + '...' : item.givenName}</Text>
                    <Text style={styles.contactNumber}>{item?.phoneNumbers[0]?.number}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const ChatMessage = React.memo(({ message }) => {
        const renderMessage = () => {
            switch (message?.messageType) {
                case 'Text':
                    return <MsgText data={message} />;
                case 'Attachment':
                    return <MsgAttachment data={message} />;
                case 'Task':
                    return <MsgTask data={message} disabled={selectedMSG.length >= 1} onPress={() => props.navigation.navigate('task', { taskId: message.messageDetails.id, token: token, user: userDetails })} />
                case 'Meeting':
                    return <MsgMeeting data={message} />
                case 'Reminder':
                    return <MsgReminder data={message} />
                case 'Location':
                    return <MsgMapImage data={message} />
                case 'Contact':
                    return <MsgContact data={message} />
                default:
                    return;
            }
        };
        return (
            <View style={{ backgroundColor: selectedMSG.includes(message) ? COLOR.green : COLOR.white, marginVertical: 2 }}>
                <TouchableOpacity style={{ marginHorizontal: 30, marginVertical: 2, }}
                    delayLongPress={500}
                    onLongPress={() => { setIsSelected(true), onhandaleSelected(message) }}
                    onPress={() => { isSelected ? onhandaleSelected(message) : '', message.messageType == 'Location' ? Linking.openURL(message.messageDetails.location_url) : '' }}>
                    {renderMessage()}
                </TouchableOpacity>
            </View>
        );
    });
    const SendFormetedContactArray = selectedContact.map(obj => ({
        givenName: obj.givenName,
        phoneNumbers: obj.phoneNumbers.map(phone => phone.number)
    }));
    const handleSearch = (text) => {
        const formattedText = text.toLowerCase(); // Convert search query to lowercase
        setSearchQuery(formattedText);
        const filteredData = contacts.filter((contact) =>
            // console.log(contact.givenName)
            contact.givenName.toLowerCase().includes(formattedText)
        );
        setFilteredContacts(filteredData);
    };
    const memoizedMessages = useMemo(() => {

        return Object.keys(messages).map(date => (
            <View key={date}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>
                {messages[date]?.map(message => {
                    if (message.messageType === 'Task Chat') {
                        return null;
                    }
                    return <ChatMessage key={message?.messageId} message={message} />;
                })}
            </View>
        ));
    }, [messages, selectedMSG]);
    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: COLOR.white }}>
            {msgType == 'Location' ?
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={location}
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                        <Text style={{ textAlign: 'right', marginTop: 80, marginRight: 30, fontSize: 12, color: COLOR.black, fontWeight: 'bold', marginBottom: 5 }}>{location?.latitude}</Text>
                        <Text style={{ textAlign: 'right', marginRight: 30, fontSize: 12, color: COLOR.black, fontWeight: 'bold' }}>{location?.longitude}</Text>

                        {/* <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} /> */}
                    </MapView>
                    <View style={{ position: 'absolute', bottom: 55, left: 30, right: 30 }}>
                        <Button title={'Send'} bgColor={COLOR.black} color={COLOR.white} onPress={handleSend} value />
                    </View>
                </View>
                : <View style={{ flex: 1 }}>
                    {msgType == 'Contact' ?
                        <View style={styles.contactContainer}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <NavigateHeader title={'Contacts'} onPress={() => { setMsgType('Text'), setSearchQuery('') }} color={COLOR.white} smallTitleSize={15} />
                            </View>
                            <View style={styles.contactListContainer}>
                                {selectedContact?.length > 0 ? <Text style={styles.selectedContactTxt}>{' Selected(' + selectedContact.length + ')'} </Text> : null}
                                {/* <TextInput placeholder='Search here...' style={styles.contactSearchInput} value={searchQuery} onChangeText={handleSearch} /> */}
                                <View style={{ backgroundColor: COLOR.verylightgray, marginTop: 15, height: 45, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput autoFocus value={searchQuery} onChangeText={handleSearch} placeholder='Search User...' style={{ backgroundColor: COLOR.verylightgray, height: 45, flex: 1, borderRadius: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }} />
                                    <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { setSearchQuery('') }} >
                                        {/* <Image source={require('../../Assets/Image/search.png')} style={{ tintColor: COLOR.green, height: 30, width: 30, marginHorizontal: 5 }} /> */}
                                        <Text style={{ color: 'skyblue', fontWeight: 'bold', marginRight: 5 }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList data={searchQuery ? filteredContacts : contacts} renderItem={list} style={styles.ContactFlatList} />
                            </View>
                            {selectedContact.length > 0 ?
                                <TouchableOpacity style={styles.OncontactScreenSend} onPress={() => { handleSend(SendFormetedContactArray); setMsgType('Text'); setSelectedContact([]) }}>
                                    <Text style={styles.sendTxt}>Send</Text>
                                </TouchableOpacity> : null}
                        </View> :
                        <View style={styles.chatMainsection}>
                            <View style={styles.chatHeaderView}>
                                {!isSelected ? <Chatheader
                                    onProfile={() => props.navigation.navigate('profile', userDetails)}
                                    onCall={onhandalePhoneCall}
                                    value={change}
                                    onChange={() => { setChange(!change), setLoding(true), getAllMessages() }}
                                    source={{ uri: userDetails.profile }}
                                    title={userName?.length >= 20 ? userName?.slice(0, 15) + ' . . . ' : userName}
                                    onSearch={() => Alert.alert('search')}
                                    onBack={() => props.navigation.goBack()}
                                /> :
                                    <DeleteChatHeader onForword={() => { props.navigation.navigate('forword', forwordId), setSelectedMSG([]) }}
                                        Count={selectedMSG ? selectedMSG?.length : null} onDelete={() => { selectedMsgDelete() }}
                                        onBack={() => { setIsSelected(false); setSelectedMSG([]) }} />}
                            </View>
                            <View style={styles.GiftedChat}>
                                <ScrollView ref={scrollViewRef}
                                    invertStickyHeaders={true}
                                    onScroll={handleScroll}
                                    scrollEventThrottle={16}>
                                    {/* {Object.keys(messages).map(date => (
                                        <View key={date}>
                                            <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>
                                            {messages[date]?.map(message => {
                                                if (message.messageType == 'Task Chat') {
                                                    return null
                                                }
                                                return (
                                                    <ChatMessage key={message?.messageId} message={message} />)
                                            })}
                                        </View>
                                    ))} */}
                                    {memoizedMessages}
                                </ScrollView>
                            </View >
                            <PlusModal
                                onCheckList={() => { setMsgType('Task'); setVisible(false); setReMeCkModal(true); }}
                                onMeeting={() => { setMsgType('Meeting'); setVisible(false); setReMeCkModal(true); }}
                                onReminder={() => { setMsgType('Reminder'); setVisible(false); setReMeCkModal(true); }}
                                onCamera={() => { onCamera(); setMsgType('Attachment'); }}
                                onPhotoGallery={() => { onPhotoGallery(); setMsgType('Attachment'); }}
                                onContacts={() => { requestContactsPermission(), setMsgType('Contact'), setVisible(false); }}
                                onFiles={() => { pickDocument(); setMsgType('Attachment'); }}
                                onRequestClose={closeModal} visible={visible}
                                onClose={() => setVisible(false)}
                                onLocation={() => { requestLocationPermission(), setVisible(false), setMsgType('Location') }}
                            // onContacts={() => { setVisible(false); }}

                            />
                            <Modal visible={ReMeCkModal} animationType='fade'>
                                <View style={styles.createItemModalView}>
                                    <CtrateHeader source={userDetails.profile} onBack={() => setReMeCkModal(false)} title={userName?.length >= 20 ? userName?.slice(0, 15) + ' . . . ' : userName} />
                                    <View style={styles.createItemModalView2}>
                                        {msgType == 'Task' ? (
                                            <CreateTask token={token} onSubmit={(taskdata) => { setMsgType('Text'), setReMeCkModal(false); handleSend(taskdata) }} userId={Userid} />
                                        ) : msgType == 'Meeting' ? (
                                            <CreateMsgMeeting token={token} onSubmit={(data) => { handleSend(data); setMsgType('Text'), setReMeCkModal(false); }} userId={Userid} />
                                        ) : msgType == 'Reminder' ? (
                                            <CreateReminder token={token} onSubmit={(reminddata) => { handleSend(reminddata); setMsgType('Text'), setReMeCkModal(false); }} userId={Userid} />
                                        ) : null}
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    }
                    <Loader visible={loding} />
                    {msgType !== 'Contact' ?
                        <View style={{ marginBottom: isFocused ? 5 : 25 }}>
                            {FileUplode ? <Image style={{ height: 150, width: 200, marginBottom: 5, borderRadius: 5, marginLeft: 30, position: 'absolute', bottom: 50, }} source={{ uri: FileUplode[0]?.uri }} /> : ''
                            }
                            <ChatInputToolBar source={require('../../Assets/Image/send.png')} onChangeText={text => { setInputText(text) }} onBlur={() => setIsFocused(false)}
                                onFocus={() => setIsFocused(true)} value={inputText} onsend={handleSend} onPress={() => setVisible(true)}
                            />
                        </View>
                        : null}
                    {/* {showButton && (<ChatScrollEnd onPress={scrollToEnd} />)} */}
                </View>
            }

        </KeyboardAvoidingView>
    );
};
export default ChatInnerScreen;

const CtrateHeader = ({ source, onBack, title }) => {
    return (
        <View style={{ paddingHorizontal: 15, padding: 15, marginTop: 35, flexDirection: 'row', alignItems: 'center', marginBottom: -15 }}>
            <TouchableOpacity onPress={onBack} style={{
                backgroundColor: COLOR.green,
                borderRadius: 50,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center', marginRight: 5
            }}>
                <Image
                    source={require('../../Assets/Image/back.png')}
                    style={{
                        height: 16,
                        width: 16,
                        resizeMode: 'contain', tintColor: COLOR.black, marginLeft: -2
                    }}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: source }} style={{ height: 45, width: 45, marginLeft: 8, borderRadius: 50 }} />
                <Text style={{
                    color: COLOR.white,
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 10,
                }}>{title}</Text>
            </View>
        </View>
    )
}