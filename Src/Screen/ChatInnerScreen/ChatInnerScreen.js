
import React, { useState, useCallback, useEffect } from 'react';
import { View, Alert, Vibration, Image, LogBox, BackHandler, Modal, Linking, TouchableOpacity, FlatList, Text, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { handleMsgText } from './Function/ApiCaliing';
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
    const [file, setFile] = useState('');
    const [cameraImage, setCameraImage] = useState('');
    const [gallery, setGallery] = useState('');
    const [myID, setMyId] = useState('');
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState([])
    const [selectedMSG, setSelectedMSG] = useState([])
    const [selecthandle, setSelectHandle] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const chatProfileData = props?.route?.params
    const userId = chatProfileData?.item?.id

    const token = chatProfileData?.token
    const onhandalePhoneCall = () => { Linking?.openURL(`tel:${chatProfileData?.data?.mobile_no}`); };
    const closeModal = () => { setVisible(false) };
    useEffect(() => { getMyId(); setSelectedContact('') }, [])
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress', closeModal,);
        return () => backHandler.remove();
    }, [visible]);
    useEffect(() => {
        getAllMessages()
    }, [])
    useEffect(() => { requestContactsPermission }, [])
    useEffect(() => { if (selectedMSG == '') { setIsSelected(false) } }, [selectedMSG])
    const onSend = useCallback((messages = []) => { setMessages(previousMessages => GiftedChat.append(previousMessages, messages),); }, []);

    const renderScrollButton = () => (
        <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-force-down-512.png', }} style={{ height: 25, width: 25 }} />
    );
    const getMyId = async () => {
        //     try {
        //         const jsonValue = await AsyncStorage.getItem('userData');
        //         const myid = JSON.parse(jsonValue); setMyId(myid.id);
        //     } catch (e) { }
        // };
        // const onhandaleSelected = msg => {
        //     if (selectedMSG.includes(msg)) {
        //         setSelectedMSG(selectedMSG.filter((id) => id !== msg));
        //     } else { setSelectedMSG([...selectedMSG, msg]); }
    }
    const selectedMsgDelete = async () => {
        selectedMSG?.forEach(async (id) => {
            await firestore()?.collection('messages')?.doc(id?.id)?.delete();
            if (id?.cameraimg !== '') {
                await storage()?.refFromURL(id?.cameraimg)?.delete()
            } else if (id?.galleryimg !== '') {
                for (let uri of id?.galleryimg) {
                    await storage()?.refFromURL(uri?.url)?.delete()
                }
            } else if (id?.file !== '') {
                await storage()?.refFromURL(id?.file?.url)?.delete()
            }
            setSelectedMSG('');
            setIsSelected(false);
        })
    }
    const onhandaleSelected = msg => {
        if (selectedMSG.includes(msg)) {
            setSelectedMSG(selectedMSG.filter((id) => id !== msg));
        } else { setSelectedMSG([...selectedMSG, msg]); }
    }
    // const handleMsgText = async () => {
    //     try {
    //         const response = await fetch('https://allin.website4you.co.in/api/v1/text-message', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({ 
    //                 message_type: msgType, 
    //                 message: inputText, 
    //                 receiver_id: userId 
    //             })
    //         });

    //         const data = await response.json();

    //         if (data?.message) {
    //             Alert.alert(data.message);
    //         } else {
    //             setVisible(false);
    //             Alert.alert('No message received from server.');
    //         }
    //     } catch (error) {
    //         setVisible(false);
    //         console.error('Error:', error);
    //         Alert.alert('An error occurred:', error.message);
    //     }
    // };
    const getAllMessages = async () => {
        try {
            const response = await fetch('https://allin.website4you.co.in/api/v1/user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: userId
                })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();

            if (data?.message === 'Get Data Successfully!') {
                setMessages(data.data.chat.Today.Today)
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

    const handleSend = async (currentMsgData) => {
        switch (msgType) {
            case 'Text':
                handleMsgText(token, msgType, inputText, userId);
                setInputText('')
                setMsgType('Text')
                break;
            case 'Task':
                Alert.alert('Task');
                break;
            // Uncomment and implement other cases as needed
            // case MESSAGE_TYPES.VIDEO:
            //     return { type: MESSAGE_TYPES.VIDEO, uri: payload.uri };
            default:
                console.warn(`Unhandled message type: ${msgType}`);
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles], });
            setVisible(false);
            setLoding(true)
            const storageRef = storage().ref(`images/documents/${uuid.v4()}`);
            await storageRef.putFile(result[0].uri);
            const downloadURL = await storageRef.getDownloadURL();
            setFile({ url: downloadURL, name: result[0].name, type: result[0].type });
            setLoding(false)
        }
        catch (err) { console.log(err); }
    };
    const onCamera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setIsFocused(false); setVisible(false); setLoding(true)
            const url = result?.assets[0]?.uri
            setCameraImage(url)
            try {

            } catch (error) { console.error(error); }
            setLoding(false)
        }
    };
    const onPhotoGallery = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            selectionLimit: 10,
        };

        launchImageLibrary(options, (response) => {
            if (!response.didCancel) {
                setLoding(true);
                const selectedImages = response.assets;
                const processedImages = [];
                selectedImages.forEach((image) => {
                    processedImages.push({ uri: image.uri }); // Change this to the actual location/path of the saved image
                });
                setGallery((prevImages) => [...prevImages, ...processedImages]);
                setLoding(false);
                setReMeCkModal(false)

            }
        });
    };
    const renderMessage = props => {
        const { currentMessage } = props;
        const dateString = currentMessage.createdAt;
        const dateObject = new Date(dateString);
        const hours = dateObject.getHours() > 12 ? dateObject.getHours() - 12 : dateObject.getHours();
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const amOrPm = dateObject.getHours() >= 12 ? 'PM' : 'AM';
        const Msgtime = hours + ':' + minutes + ' ' + amOrPm;
        console.log(currentMessage.messageDetails);
        return (

            <Text>{currentMessage.messageDetails}</Text>


        );
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
    return (
        <View style={{ flex: 1 }}>
            {msgType == 'Contact' ?
                <View style={styles.contactContainer}>
                    <NavigateHeader title={'Contacts'} onPress={() => setMsgType('Text')} color={COLOR.white} smallTitleSize={15} />
                    <View style={styles.contactListContainer}>
                        {selectedContact?.length > 0 ? <Text style={styles.selectedContactTxt}>{' Selected(' + selectedContact.length + ')'} </Text> : null}
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
                            source={{ uri: chatProfileData?.item?.profile }}
                            title={userName?.length >= 20 ? userName?.slice(0, 15) + ' . . . ' : userName}
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
                            onCheckList={() => { setMsgType('Task'); setVisible(false); setReMeCkModal(true); }}
                            onMeeting={() => { setMsgType('Meeting'); setVisible(false); setReMeCkModal(true); }}
                            onReminder={() => { setMsgType('Reminder'); setVisible(false); setReMeCkModal(true); }}
                            onCamera={() => { onCamera(); setMsgType('Attachment'); }}
                            onPhotoGallery={() => { onPhotoGallery(); setMsgType('Attachment'); }}
                            onContacts={() => { setMsgType('Contact'), setVisible(false); }}
                            onLocation={() => { Alert.alert('Location'); setVisible(false); }}
                            onFiles={() => { pickDocument(); setMsgType('Attachment'); }}
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
                </View >
            }
            <Loader visible={loding} />
        </View>
    );
};
export default ChatInnerScreen;
