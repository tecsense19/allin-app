import { View, Text, KeyboardAvoidingView, StatusBar, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert, Image, StyleSheet, Dimensions, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ChatInputToolBar from '../ChatInnerScreen/ChatCustomFile/ChatInputToolBar'
import ChatScrollEnd from '../../Custom/ChatScrollButton/ChatScrollEnd'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../Custom/Header/NavigateHeader'
import { File_Uplode, Task_Detail, Task_Message_Send } from '../../Service/actions'
import Timezone from 'react-native-timezone'
import MsgText from '../ChatInnerScreen/ChatCustomFile/MsgText'
import MsgAttachment from '../ChatInnerScreen/ChatCustomFile/MsgAttachment'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Loader from '../../Custom/Loader/loader'
import Chatheader from '../ChatInnerScreen/ChatInnerHeader'

const TaskChatScreen = (props) => {
    const [messages, setMessages] = useState([]);
    const [taskRemind, setTaskRemind] = useState([]);
    const [taskDetails, setTaskDetails] = useState('');
    const [FileUplode, setFileUpload] = useState('');
    const [msgType, setMsgType] = useState('Text');
    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState('')
    const [showButton, setShowButton] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const TaskID = props?.route?.params?.taskId
    const token = props?.route?.params?.token
    const chatProfileData = props?.route?.params?.user
    const userName = chatProfileData?.first_name + '' + chatProfileData?.last_name

    const scrollViewRef = useRef();
    const WIDTH = Dimensions.get('screen').width
    useEffect(() => { GetTaskDetails() }, [])
    const onhandalePhoneCall = () => { Linking?.openURL(`tel:${chatProfileData?.country_code + chatProfileData?.mobile}`); };

    const scrollToEnd = () => { scrollViewRef.current?.scrollToEnd({ animated: true }); };

    useEffect(() => { scrollViewRef.current?.scrollToEnd({ animated: true }); }, [messages]);
    const isoDateString = taskDetails.created_at;
    const date = new Date(isoDateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC"
    };
    const formattedDate = date.toLocaleString("en-US", options);
    const GetTaskDetails = () => {
        Task_Detail(token, TaskID, Timezone.getTimeZone())
            .then((res) => {
                setMessages(res?.data?.chat)
                setTaskDetails(res.data.task)
                setTaskRemind(res.data.task.userList);
                setLoading(false)
            })
            .catch(() => { })

    }
    // const handleScroll = event => {
    //     const offsetY = event.nativeEvent.contentOffset.y;
    //     const contentHeight = event.nativeEvent.contentSize.height;
    //     const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    //     if (offsetY + layoutHeight >= contentHeight) {
    //         setShowButton(false);
    //     } else {
    //         setShowButton(true);
    //     }
    // };
    const ChatMessage = ({ message }) => {
        const renderMessage = () => {
            if (message?.attachmentType == null) {
                return <MsgText data={message} />
            } else {
                return <MsgAttachment data={message} />;
            }
        };
        return (
            <View style={{ marginVertical: 2 }}>
                <TouchableOpacity style={{ marginHorizontal: 20, marginVertical: 2, }} delayLongPress={500}>
                    {renderMessage()}
                </TouchableOpacity>
            </View>
        );
    };
    const File_Message = async () => {
        GetTaskDetails()
        const formData = new FormData();
        const AttachmentUri = FileUplode[0]?.uri;
        const AttachmentName = AttachmentUri ? AttachmentUri?.split('/').pop() : ''; // Extract image name from URI
        if (AttachmentUri) {
            formData.append('file', { uri: AttachmentUri, name: AttachmentName, type: FileUplode[0]?.type });
        }
        if (msgType == 'Text') {
            Task_Message_Send(token, TaskID, inputText, msgType,), setInputText('')
        } else {
            const data = await File_Uplode(token, formData)
            console.log(data);
            if (data?.status_code == 200) {
                const fileName = data.data.image_name
                const fileType = data.data.file_type
                Task_Message_Send(token, TaskID, inputText, msgType, fileType, fileName)
                setFileUpload('')

            } else {
                Alert.alert(data?.message);
            }
        }

    }
    const handleSend = () => {
        GetTaskDetails()
        if (inputText.trim() == '' && msgType == 'Text') {
            return null
        }
        File_Message()
    };
    const onCamera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            setIsFocused(false); setVisible(false);
            const url = result?.assets
            setFileUpload(url)
            setVisible(false)
            setMsgType('Attachment')
            try {
            } catch (error) { console.error(error); }
        }
    };
    const onPhotoGallery = async () => {
        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            setIsFocused(false); setVisible(false);
            const url = result?.assets
            setFileUpload(url)
            setVisible(false)
            setMsgType('Attachment')

            try {
            } catch (error) { console.error(error); }
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: COLOR.white }}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ flex: 1, backgroundColor: COLOR.black }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Chatheader
                        // onProfile={() => Alert.alert('Profile')}
                        onCall={onhandalePhoneCall}
                        onChange={() => setChange(!change)}
                        source={{ uri: chatProfileData?.profile }}
                        title={userName?.length >= 20 ? userName?.slice(0, 15) + ' . . . ' : userName}
                        onSearch={() => Alert.alert('search')}
                        onBack={() => props.navigation.goBack()}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', marginTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
                    <ScrollView ref={scrollViewRef}
                        invertStickyHeaders={true}
                        // onScroll={handleScroll}
                        scrollEventThrottle={16}>
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={styles.titleView}>
                                <Image source={require('../../Assets/Image/check.png')}
                                    style={[styles.detailsTaskCheckImg, { tintColor: COLOR.green }]} />
                                <Text style={styles.titletxt}>{taskDetails.task_name}</Text>
                            </View>
                            <View style={styles.descriptionsView}>
                                <TouchableOpacity onPress={() => Alert.alert('Add Remind')}>
                                    <Image source={require('../../Assets/Image/invite1.png')}
                                        style={styles.inviteImg} />
                                </TouchableOpacity>
                                <Text style={styles.descriptionsTxt}>{taskDetails.task_description}</Text>
                            </View>
                            <View style={styles.TimeView}>
                                <TouchableOpacity onPress={() => Alert.alert('Add Remind')}>
                                    <Image source={require('../../Assets/Image/clock.png')}
                                        style={styles.clockImg} />
                                </TouchableOpacity>
                                <Text style={styles.timeTxt}>{formattedDate}</Text>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                {taskRemind.map((i, index) => {
                                    return (
                                        <View style={{ flexDirection: 'row', }} key={i}>
                                            {index < 4 ? <Image source={{ uri: i?.profilePic }} style={{
                                                height: 80,
                                                width: 80,
                                                borderRadius: 5, margin: WIDTH <= 390 ? 5 : 10

                                            }} /> : null}
                                            <View style={[styles.listImageCountView, { backgroundColor: index + 1 == 4 ? COLOR.black : null, }]}>
                                                <Text style={styles.countTxt} >{index + 1 == 4 ? '+' + (taskRemind?.length - 4) : ''}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </TouchableOpacity>
                        </View>
                        {Object?.keys(messages)?.map(date => (
                            <View key={date}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>
                                {messages[date]?.map(message =>
                                (
                                    <ChatMessage key={message?.messageId} message={message} />
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ paddingBottom: isFocused ? 5 : 25, backgroundColor: 'white' }}>
                    <ChatInputToolBar source={require('../../Assets/Image/send.png')} onChangeText={text => { setInputText(text) }} onBlur={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)} value={inputText} onsend={handleSend} onPress={() => setVisible(true)}
                    />
                </View>
                {showButton && (<ChatScrollEnd onPress={scrollToEnd} />)}
            </View>
            <Modal visible={visible} transparent>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: COLOR.white, height: 80, width: 120, position: 'absolute', bottom: 80, left: 25, borderRadius: 10, padding: 10 }}>
                            <TouchableOpacity style={{ marginVertical: 5 }} onPress={onCamera}>
                                <Text style={{ color: COLOR.black, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginVertical: 5 }} onPress={onPhotoGallery}>
                                <Text style={{ color: COLOR.black, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Loader visible={loading} />
        </KeyboardAvoidingView>
    )
}

export default TaskChatScreen

const styles = StyleSheet.create({
    titleView: { flexDirection: 'row', marginTop: 20, alignItems: 'center' },
    detailsTaskCheckImg: { height: 30, width: 30, resizeMode: 'contain' },
    titletxt: { fontSize: 14, fontWeight: '500', width: '85%', marginLeft: 5 },
    descriptionsView: { flexDirection: 'row', alignItems: 'center', marginLeft: 2, marginTop: 10 },
    inviteImg: { tintColor: COLOR.DeepSkyBlue, height: 20, width: 20 },
    descriptionsTxt: { fontSize: 14, fontWeight: '500', marginLeft: 10, width: '85%' },
    TimeView: { flexDirection: 'row', alignItems: 'center', marginLeft: 2, marginTop: 15 },
    clockImg: { tintColor: COLOR.DeepSkyBlue, height: 25, width: 25, resizeMode: 'contain' },
    timeTxt: { fontSize: 14, fontWeight: '500', marginLeft: 10, width: '85%' },
    listImageCountView: { height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 50, position: 'absolute', right: -5, top: 0 },
    countTxt: { fontSize: 10, fontWeight: 'bold', color: COLOR.white },

})