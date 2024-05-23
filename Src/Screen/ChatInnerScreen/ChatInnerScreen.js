
import React, { useState, useCallback, useEffect } from 'react';
import { View, Alert, Vibration, Image, LogBox, BackHandler, Modal, Linking, TouchableOpacity, FlatList, Text, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MsgImage from '../../custom/RenderMessageComponent/MsgImage/MsgImage';
import Contacts from 'react-native-contacts';
import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
import MyAlert from '../../service/Alert';
import MsgContact from '../../custom/RenderMessageComponent/MsgContact/MsgContact';
import MsgDocument from '../../custom/RenderMessageComponent/MsgDocument/MsgDocument';
import DeleteChatHeader from '../../custom/Header/DeleteChatHeader';
import Loding from '../../card/Loding';
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
LogBox.ignoreAllLogs();

const ChatInnerScreen = props => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [ReMeCkModal, setReMeCkModal] = useState(false);
    const [change, setChange] = useState(false);
    const [loding, setLoding] = useState(false);
    const [addMessage, setAddMessage] = useState(0);
    const [file, setFile] = useState('');
    const [cameraImage, setCameraImage] = useState('');
    const [gallery, setGallery] = useState('');
    const [myID, setMyId] = useState('');
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState([])
    const [selectedMSG, setSelectedMSG] = useState([])
    const [selecthandle, setSelectHandle] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const chatProfileData = props?.route?.params?.data;
    const userId = chatProfileData?.id
    const navigation = props.navigation

    const onhandalePhoneCall = () => { Linking.openURL(`tel:${chatProfileData.data.mobile_no}`); };
    const closeModal = () => { setVisible(false) };
    useEffect(() => { getMyId(); setSelectedContact('') }, [])
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [visible]);
    // useEffect(() => {
    //     const unsubscribe = firestore().collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    //         const allMsg = [];
    //         snapshot.forEach(doc => {
    //             const data = doc.data();
    //             if ((data.sendBy === myID && data.sendTo === userId) || (data.sendBy === userId && data.sendTo === myID)) {
    //                 allMsg.push({ id: doc.id, ...data });
    //             }
    //         }); setMessages(allMsg);
    //     });
    //     return () => unsubscribe();
    // }, [myID, userId]);
    useEffect(() => { requestContactsPermission() }, [])
    useEffect(() => { if (selectedMSG == '') { setIsSelected(false) } }, [selectedMSG])
    const onSend = useCallback((messages = []) => { setMessages(previousMessages => GiftedChat.append(previousMessages, messages),); }, []);

    const renderScrollButton = () => (
        <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-force-down-512.png', }} style={{ height: 25, width: 25 }} />
    );
    // const getMyId = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('userData');
    //         const myid = JSON.parse(jsonValue); setMyId(myid.id);
    //     } catch (e) { }
    // };
    // const onhandaleSelected = msg => {
    //     if (selectedMSG.includes(msg)) {
    //         setSelectedMSG(selectedMSG.filter((id) => id !== msg));
    //     } else { setSelectedMSG([...selectedMSG, msg]); }
    // }
    // const selectedMsgDelete = async () => {
    //     selectedMSG?.forEach(async (id) => {
    //         await firestore()?.collection('messages')?.doc(id?.id)?.delete();
    //         if (id?.cameraimg !== '') {
    //             await storage()?.refFromURL(id?.cameraimg)?.delete()
    //         } else if (id?.galleryimg !== '') {
    //             for (let uri of id?.galleryimg) {
    //                 await storage()?.refFromURL(uri?.url)?.delete()
    //             }
    //         } else if (id?.file !== '') {
    //             await storage()?.refFromURL(id?.file?.url)?.delete()
    //         }
    //         setSelectedMSG('');
    //         setIsSelected(false);
    //     })
    // }
    // const handleSend = async (currentMsgData) => {
    //     if (inputText.trim() == '' && addMessage == 0 && gallery == '' && cameraImage == '' && currentMsgData?.descriptions == null && !selectedContact && !file) { return null; }
    //     if (currentMsgData?.type == 'Checklist' || currentMsgData?.type == 'Meeting' || currentMsgData?.type == 'Reminder') {
    //         setChange(true)
    //     } else { setChange(false) }
    //     const selectedUsers = currentMsgData?.remind
    //     if (selectedUsers) {
    //         selectedUsers?.forEach(async userId => {
    //             const newMessage = {
    //                 _id: uuid.v4(),
    //                 sendBy: myID,
    //                 sendTo: userId,
    //                 createdAt: Date.parse(new Date()),
    //                 Checklist: currentMsgData?.type === 'Checklist' ? { title: currentMsgData?.tasktitle, taskId: currentMsgData?.taskId, descriptions: currentMsgData?.taskdescriptions, tasktime: {} } : null,
    //                 meeting: currentMsgData?.type === 'Meeting' ? {
    //                     title: currentMsgData?.meetingtitle,
    //                     descriptions: currentMsgData?.meetingdescription,
    //                     date: currentMsgData?.meetingdate,
    //                     time: currentMsgData?.meetingtime,
    //                     remind: selectedUsers,
    //                 } : null,
    //                 reminder: currentMsgData?.type === 'Reminder' ? {
    //                     descriptions: currentMsgData?.reminddescriptions,
    //                     title: currentMsgData?.remindtitle,
    //                     time: currentMsgData?.remindtime,
    //                     remind: selectedUsers
    //                 } : null,
    //                 user: { _id: myID, },
    //             };
    //             onSend([newMessage]); setAddMessage(0);
    //             await firestore().collection('messages').add(newMessage);
    //         });
    //     } else {
    //         const newMessage = {
    //             _id: uuid.v4(),
    //             sendBy: myID,
    //             sendTo: userId,
    //             text: inputText.trim(),
    //             createdAt: Date.parse(new Date()),
    //             cameraimg: cameraImage,
    //             galleryimg: gallery,
    //             contact: currentMsgData?.length >= 1 ? currentMsgData : null,
    //             file: file,
    //             user: {
    //                 _id: myID,
    //             },
    //         }; onSend([newMessage]); setAddMessage(0); setInputText(''); await firestore().collection('messages').add(newMessage); setCameraImage(''); setSelectedContact(''); setGallery(''); setCameraImage(''); setAddMessage(0); setFile('')

    //     }
    // };
    // const pickDocument = async () => {
    //     try {
    //         const result = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles], });
    //         setVisible(false);
    //         setLoding(true)
    //         const storageRef = storage().ref(`images/documents/${uuid.v4()}`);
    //         await storageRef.putFile(result[0].uri);
    //         const downloadURL = await storageRef.getDownloadURL();
    //         setFile({ url: downloadURL, name: result[0].name, type: result[0].type });
    //         setLoding(false)
    //     }
    //     catch (err) { console.log(err); }
    // };
    // const onCamera = async () => {
    //     const result = await launchCamera();
    //     if (result?.assets[0]?.uri) {
    //         setIsFocused(false); setVisible(false); setLoding(true)
    //         const url = result?.assets[0]?.uri
    //         const storageRef = storage().ref(`images/chatImage/${uuid.v4()}`)
    //         try {
    //             await storageRef.putFile(url);
    //             storageRef.getDownloadURL().then((i) => { setCameraImage(i) })
    //         } catch (error) { console.error(error); }
    //         setLoding(false)
    //     }
    // };
    // const onPhotoGallery = async () => {
    //     let options = { mediaType: 'photo', maxWidth: 300, maxHeight: 550, quality: 1, selectionLimit: 10, };
    //     launchImageLibrary(options, async (response) => {
    //         if (!response.didCancel) {
    //             setIsFocused(false);
    //             setVisible(false);
    //             setLoding(true)
    //             const downloadURLs = [];
    //             for (const asset of response.assets) {
    //                 const storageRef = storage().ref(`images/chatImage/${uuid.v4()}`);
    //                 await storageRef.putFile(asset.uri);
    //                 const downloadURL = await storageRef.getDownloadURL();
    //                 downloadURLs.push({ url: downloadURL, path: uuid.v4() });
    //             }
    //             setGallery((prevFilePathArray) => [
    //                 ...prevFilePathArray, ...downloadURLs,
    //             ]);
    //             setLoding(false)
    //         }
    //     });
    // };
    const renderMessage = props => {
        const { currentMessage } = props;
        const dateString = currentMessage.createdAt;
        const dateObject = new Date(dateString);
        const hours = dateObject.getHours() > 12 ? dateObject.getHours() - 12 : dateObject.getHours();
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const amOrPm = dateObject.getHours() >= 12 ? 'PM' : 'AM';
        const Msgtime = hours + ':' + minutes + ' ' + amOrPm;
        return (
            <View style={{}}>
                {!change ?
                    <TouchableOpacity
                        delayLongPress={500}
                        onLongPress={() => { setIsSelected(true), onhandaleSelected(currentMessage) }}
                        onPress={() => { isSelected ? onhandaleSelected(currentMessage) : '' }}
                        style={{ marginVertical: 2, paddingHorizontal: 5, padding: 3, backgroundColor: selectedMSG.includes(currentMessage) ? COLOR.green : COLOR.white }}>
                        {currentMessage?.Checklist?.descriptions ? <MsgTask disabled={isSelected}
                            onPress={() => navigation.navigate('task', { currentMsg: currentMessage, chatprofileInfo: chatProfileData, myid: myID, time: Msgtime },)} MYID={myID} data={currentMessage} userinfo={chatProfileData} time={Msgtime} /> :
                            currentMessage?.text ? <MsgText data={currentMessage} myId={myID} userId={userId} time={Msgtime} /> :
                                currentMessage?.meeting?.title ? <MsgMeeting data={currentMessage} MYID={myID} time={Msgtime} /> :
                                    currentMessage?.cameraimg ? (<MsgImage data={currentMessage} time={Msgtime} MYID={myID} />) :
                                        currentMessage?.galleryimg ? (<MsgImage data={currentMessage} time={Msgtime} MYID={myID} />) :
                                            currentMessage?.reminder?.descriptions ? <MsgReminder MYID={myID} data={currentMessage} time={Msgtime} /> :
                                                currentMessage?.contact ? <MsgContact myId={myID} Time={Msgtime} contact={currentMessage} /> :
                                                    currentMessage?.file ? <MsgDocument disabled={isSelected} myId={myID} data={currentMessage} time={Msgtime} /> :
                                                        null}
                    </TouchableOpacity> :
                    <View style={{}}>
                        {currentMessage?.Checklist?.descriptions ? <MsgTask
                            onPress={() => navigation.navigate('task', { currentMsg: currentMessage, chatprofileInfo: chatProfileData, myid: myID, time: Msgtime },)} MYID={myID} data={currentMessage} userinfo={chatProfileData} time={Msgtime} /> :
                            currentMessage?.meeting?.title ? <MsgMeeting data={currentMessage} MYID={myID} time={Msgtime} /> :
                                currentMessage?.reminder?.descriptions ? <MsgReminder MYID={myID} data={currentMessage} time={Msgtime} /> :
                                    null}</View>}
            </View>
        );
    };
    // const customAlert = () => {
    //     const title = 'Permission Request';
    //     const Descriptions = 'This app would like to view your contacts';
    //     const Deny = () => console.log('Deny');
    //     const Allow = () => openSettings();
    //     MyAlert(title, Descriptions, Allow, Deny);
    // };
    // const requestContactsPermission = async () => {
    //     const result = await request(PERMISSIONS.IOS.CONTACTS);
    //     if (result === 'granted') { Contacts.getAll().then(contacts => { setContacts(contacts) }) }
    //     else { customAlert(); }
    // };
    const list = ({ item }) => {
        const IsContact = selectedContact.includes(item)
        const toggleItem = (itemId) => {
            if (IsContact) { setSelectedContact(selectedContact.filter((id) => id !== itemId)); }
            else { setSelectedContact([...selectedContact, itemId]); }
        };
        return (
            <TouchableOpacity style={[styles.listOnContainer, { backgroundColor: IsContact ? COLOR.lightgreen : COLOR.white, }]}
                onPress={() => { selecthandle ? toggleItem(item) : '' }} onLongPress={() => { toggleItem(item), setSelectHandle(true), Vibration.vibrate(10) }}>
                <Image source={require('../../assets/admin.jpg')} style={styles.adminImg} />
                <View>
                    <Text style={styles.contactName}>{item.givenName.length > 20 ? item.givenName.slice(0, 20) + '...' : item.givenName}</Text>
                    <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {addMessage == 6 ?
                <View style={styles.contactContainer}>
                    <NavigateHeader title={'Contacts'} onPress={() => setAddMessage(0)} color={COLOR.white} smallTitleSize={15} />
                    <View style={styles.contactListContainer}>
                        {selectedContact.length > 0 ? <Text style={styles.selectedContactTxt}>{' Selected(' + selectedContact.length + ')'} </Text> : null}
                        <TextInput placeholder='Search here...' style={styles.contactSearchInput} />
                        <FlatList data={contacts} renderItem={list} style={styles.ContactFlatList} />
                    </View>
                    {selectedContact.length > 0 ?
                        <TouchableOpacity style={styles.OncontactScreenSend} onPress={() => handleSend(selectedContact)}>
                            <Text style={styles.sendTxt}>Send</Text>
                        </TouchableOpacity> : null}
                </View> :
                <View style={styles.chatMainsection}>
                    <View style={styles.chatHeaderView}>
                        {!isSelected ? <Chatheader
                            onProfile={() => props.navigation.navigate('userprofile', chatProfileData)}
                            onCall={onhandalePhoneCall}
                            value={change}
                            onChange={() => setChange(!change)}
                            source={chatProfileData?.data?.profile_image == '' ? require('../../assets/userimg.png') : { uri: chatProfileData?.data?.profile_image }}
                            title={chatProfileData?.data?.first_name?.length >= 20 ? chatProfileData?.data?.first_name?.slice(0, 15) + ' . . . ' : chatProfileData?.data?.first_name}
                            onSearch={() => Alert.alert('search')}
                            onBack={() => props.navigation.goBack()}
                        /> :
                            <DeleteChatHeader Count={selectedMSG ? selectedMSG?.length : null} onDelete={() => { selectedMsgDelete() }} onBack={() => { setIsSelected(false); setSelectedMSG('') }} />}
                    </View>
                    <View style={styles.GiftedChat}>
                        <GiftedChat
                            inverted={change ? false : true}
                            renderMessage={props => renderMessage(props)}
                            messages={messages}
                            onSend={messages => onSend(messages)}
                            user={{ _id: 1, }}
                            scrollToBottom={true}
                            scrollToBottomComponent={renderScrollButton}
                            renderInputToolbar={(props) => {
                                return (<ChatInputToolBar onChangeText={text => { setInputText(text) }} onBlur={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)} value={inputText} onsend={handleSend} onPress={() => setVisible(true)}
                                    source={inputText == '' || (cameraImage == '' && gallery == '') ? require('../../Assets/Image/send.png') : require('../../Assets/Image/voice.png')}
                                />)
                            }} />
                        <View style={[styles.selectCatagoryModalView, { marginBottom: isFocused == false ? 45 : 30, }]}></View>
                        <PlusModal
                            onRequestClose={closeModal} visible={visible}
                            onClose={() => setVisible(false)}
                            onCheckList={() => { setAddMessage(1); setVisible(false); setReMeCkModal(true); }}
                            onMeeting={() => { setAddMessage(2); setVisible(false); setReMeCkModal(true); }}
                            onReminder={() => { setAddMessage(3); setVisible(false); setReMeCkModal(true); }}
                            onCamera={() => { onCamera(); setAddMessage(4); }}
                            onPhotoGallery={() => { onPhotoGallery(); setAddMessage(5); }}
                            onContacts={() => { setAddMessage(6), setVisible(false); }}
                            onLocation={() => { Alert.alert('Location'); setVisible(false); }}
                            onFiles={() => { pickDocument(); setAddMessage(0); }}
                        />
                        <Modal visible={ReMeCkModal}>
                            <View style={styles.createItemModalView}>
                                <NavigateHeader color={COLOR.white} title={addMessage == 1 ? 'Create Task' : addMessage == 2 ? 'Create Meeting' : addMessage == 3 ? 'Create Remind' : null} onPress={() => { setAddMessage(0); setReMeCkModal(false) }} />
                                <View style={styles.createItemModalView2}>

                                    {addMessage == 1 ? (
                                        <CreateTask onSubmit={(taskdata) => { setAddMessage(0), setReMeCkModal(false); handleSend(taskdata) }} userId={userId} />
                                    ) : addMessage == 2 ? (
                                        <CreateMsgMeeting onSubmit={(data) => { handleSend(data); setAddMessage(0), setReMeCkModal(false); }} userId={userId} />
                                    ) : addMessage == 3 ? (
                                        <CreateReminder onSubmit={(reminddata) => { handleSend(reminddata); setAddMessage(0), setReMeCkModal(false); }} userId={userId} />
                                    ) : null}
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View >
            }
            <Loding visible={loding} />
        </View>
    );
};
export default ChatInnerScreen;
