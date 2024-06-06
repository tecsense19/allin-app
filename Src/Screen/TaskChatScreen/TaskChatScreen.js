import { View, Text, KeyboardAvoidingView, StatusBar, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
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

const TaskChatScreen = (props) => {
    const [messages, setMessages] = useState([]);
    const [FileUplode, setFileUpload] = useState('');
    const [msgType, setMsgType] = useState('Text');
    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState('')
    const [showButton, setShowButton] = useState(false);
    const [visible, setVisible] = useState(false);
    const TaskID = props?.route?.params?.taskId

    const token = props?.route?.params?.token
    const scrollViewRef = useRef();
    // console.log(FileUplode, '===========>>>>>>>>');
    useEffect(() => { GetTaskDetails() }, [])
    const scrollToEnd = () => { scrollViewRef.current?.scrollToEnd({ animated: true }); };
    useEffect(() => { scrollViewRef.current?.scrollToEnd({ animated: true }); }, [messages]);

    const GetTaskDetails = () => {
        Task_Detail(token, TaskID, Timezone.getTimeZone())
            .then((res) => {
                setMessages(res?.data?.chat)
            })
            .catch(() => { })

    }
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
                    <NavigateHeader title={'Task Details'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', marginTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
                    <ScrollView ref={scrollViewRef}
                        invertStickyHeaders={true}
                        onScroll={handleScroll}

                        scrollEventThrottle={16}>
                        {Object?.keys(messages)?.map(date => (
                            <View key={date}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.textcolor, textAlign: 'center', marginVertical: 30 }}>{date}</Text>
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
        </KeyboardAvoidingView>
    )
}

export default TaskChatScreen