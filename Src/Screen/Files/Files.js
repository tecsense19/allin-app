import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, Alert, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import DocumentPicker from 'react-native-document-picker';
import { Chat_File_Message, File_Uplode, User_List } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import Timezone from 'react-native-timezone'
import Loader from '../../Custom/Loader/loader';
import ListImage from '../../Custom/ListImage/ListImage';

const Files = (props) => {
    const [FileUpload, setFileUpload] = useState('')
    const [visible, setVisible] = useState('')
    const [UserData, setUserData] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [myID, setMyId] = useState('');
    const [loding, setLoading] = useState(false);

    const filteredUserData = UserData?.filter(user => selectedItems?.includes(user.id)); //show selected user by defualt one user for chat
    const selectedUser = UserData?.filter(user => { if (myID !== user?.id) { return user?.id } })
    const stringArray = selectedItems?.map(String);
    const id = stringArray?.join(',');

    useEffect(() => { getuser() }, [myID])
    const getuser = async () => {
        const token = await getToken()
        // setLoading(true)
        const timezone = { timezone: Timezone.getTimeZone() }
        await User_List(timezone, token).then((res) => {
            if (res.status_code == 200) {
                setUserData(res?.data?.userList)
                // setLoading(false)
            }
        }).catch((e) => { console.log(e); })

    };
    const list = ({ item, index }) => {
        return (
            <View>
                {index < 4 ? <Image source={{ uri: item?.profile }} style={[styles.listProfileImage, { marginLeft: index == 0 ? 0 : -20, }]} /> : ''}
            </View>
        )
    }
    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    const File_Message = async () => {
        if (!FileUpload) { return Alert.alert('please select file') }
        if (!selectedItems.length > 0) { return Alert.alert('please select user') }
        const token = await getToken()
        const formData = new FormData();
        const AttachmentUri = FileUpload[0]?.uri;
        const AttachmentName = AttachmentUri ? AttachmentUri?.split('/').pop() : ''; // Extract image name from URI
        if (AttachmentName) { formData.append('file', { uri: AttachmentUri, name: AttachmentName, type: FileUpload[0]?.type }); }

        setLoading(true)
        const data = await File_Uplode(token, formData)

        if (data?.status_code == 200) {
            const fileName = data.data.image_name
            const fileType = data.data.file_type
            Chat_File_Message('Attachment', fileName, id, token, fileType)
            setLoading(false)
            Alert.alert(data?.message);
            setFileUpload('')
        } else {
            Alert.alert(data?.message);
            setLoading(false)
        }
    }
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
            setFileUpload(result)
        }
        catch (err) {
        }
    };

    return (
        <View
            style={styles.mainContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader onPress={() => { props.navigation.goBack() }} title={'Transfer File'} color={COLOR.white} />
            </View>
            <StatusBar hidden={false} barStyle={'light-content'} />

            <View style={styles.uploadImageContainer}>
                <TouchableOpacity onPress={pickDocument} style={styles.TouchableOpacityContainer}>
                    {FileUpload ?
                        <Image source={{ uri: FileUpload[0]?.uri }} style={styles.uploadImage} />
                        : <Image source={{ uri: "https://cdn1.iconfinder.com/data/icons/general-ui-outlined-thick/24/upload-1024.png" }} style={styles.uploadImageIcon} />}
                </TouchableOpacity>

                <View style={styles.remindContainer}>
                    <PickerButton title={'Remind'} onPress={() => setVisible(true)} />
                </View>
                {filteredUserData?.length >= 1 ? <View style={{
                    width: filteredUserData?.length < 2 ? 80
                        : filteredUserData?.length < 3 ? 110
                            : filteredUserData?.length < 4 ? 140 : 170,
                    alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 20,
                }}>
                    <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false} style={{}} />
                    <Text style={styles.userLangth}>{filteredUserData.length <= 4 ? '' : '+' + (filteredUserData.length - 4)}</Text>
                </View> : null}
                <Button onPress={File_Message} title={'Send'} color={COLOR.white} bgColor={COLOR.green} />
            </View>
            <Modal visible={visible} >
                <View style={styles.modalMianContainer}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
                    </View>
                    <View style={styles.modalListContainer}>
                        <FlatList data={selectedUser} style={styles.FlatList} renderItem={(({ item }) => {
                            const userName = item?.first_name + ' ' + item.last_name
                            return (
                                <View>
                                    {item.type == 'user' ? <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <ListImage uri={item?.profile} />
                                            {/* <Image source={{ uri: item?.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} /> */}
                                            <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: 'bold' }}>{userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => toggleItem(item?.id)}>
                                            <Image
                                                source={selectedItems.includes(item.id) ? require('../../Assets/Image/check.png') : require('../../Assets/Image/box.png')}
                                                style={{ height: 25, width: 25, tintColor: selectedItems.includes(item.id) ? COLOR.green : COLOR.lightgray }}
                                            />
                                        </TouchableOpacity>
                                    </View> : null}
                                </View>
                            )
                        })} />
                        <View style={styles.selectButtonContainer}>
                            <Button color={COLOR.white} bgColor={COLOR.green} title={'Select'} onPress={() => setVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Loader visible={loding} Retry={File_Message} />
        </View>
    );
};
export default Files;

const PickerButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.pickButtonContainer}>
            <Text style={styles.pickButtonTitleText}>{title}</Text>
            <Image source={require('../../Assets/Image/down.png')}
                style={styles.pickButtonImage} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    listProfileImage: { height: 50, width: 50, borderRadius: 100, },
    mainContainer: { flex: 1, backgroundColor: COLOR.black, },
    uploadImageContainer: { flex: 1, marginTop: 10, backgroundColor: COLOR.white, borderRadius: 20, paddingTop: 5, padding: 15, },
    TouchableOpacityContainer: { backgroundColor: COLOR.verylightgray, borderRadius: 20, height: '40%', width: '80%', alignSelf: 'center', marginTop: 50, alignItems: 'center', justifyContent: 'center' },
    uploadImage: { height: '100%', width: '100%', borderRadius: 20, },
    uploadImageIcon: { height: '20%', width: '20%' },
    remindContainer: { alignSelf: 'center', marginVertical: 30, },
    userLangth: { fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor },
    modalMianContainer: { flex: 1, backgroundColor: COLOR.black, },
    modalListContainer: { marginTop: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 },
    FlatList: { paddingHorizontal: 20, padding: 10, },
    listMainContainer: { justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } },
    imageAndNameContainer: { flexDirection: 'row', alignItems: 'center' },
    profileimage: { height: 50, width: 50, borderRadius: 50 },
    username: { fontSize: 16, marginLeft: 10, color: COLOR.black, fontWeight: 'bold' },
    selectButtonContainer: { position: 'absolute', bottom: 20, left: 20, right: 20, },
    pickButtonContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 10, borderColor: COLOR.bordercolor },
    pickButtonTitleText: { fontSize: 16, fontWeight: '700', color: COLOR.titlecolor },
    pickButtonImage: { height: 18, width: 18, marginTop: -5, resizeMode: 'contain', marginLeft: 5, tintColor: COLOR.green }

})