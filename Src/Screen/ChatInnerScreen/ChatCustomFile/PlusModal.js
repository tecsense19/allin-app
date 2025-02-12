import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';

const PlusModal = ({ visible, onClose, onCamera, onCheckList, onMeeting, onFiles, onReminder, onPhotoGallery, onContacts, onRequestClose, onLocation, onScan }) => {
    const [onSelect, setOnSelect] = useState(1)
    return (
        <View>
            <Modal visible={visible} transparent onRequestClose={onRequestClose}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <View style={style.modalview}>

                            <TouchableOpacity onPress={() => { setOnSelect(1), onCheckList() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 1 ? COLOR.lightgreen : COLOR.white, marginTop: 10 }]}>
                                <Text style={style.txt}>Check list</Text>
                                <Image source={require('../../../Assets/Image/chatchecklisticon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(2), onMeeting() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 2 ? COLOR.lightgreen : COLOR.white }]}>
                                <Text style={style.txt}>Meeting</Text>
                                <Image source={require('../../../Assets/Image/chatmeetingicon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(3), onReminder() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 3 ? COLOR.lightgreen : COLOR.white }]}>
                                <Text style={style.txt}>Reminder</Text>
                                <Image source={require('../../../Assets/Image/chatremindericon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(4), onCamera() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 4 ? COLOR.lightgreen : COLOR.white }]}>
                                <Text style={style.txt}>Camera</Text>
                                <Image source={require('../../../Assets/Image/chatcameraicon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(5), onPhotoGallery() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 5 ? COLOR.lightgreen : COLOR.white }]}>
                                <Text style={style.txt}>Photo Gallery </Text>
                                <Image source={require('../../../Assets/Image/chatgalleryicon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(6), onContacts() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 6 ? COLOR.lightgreen : COLOR.white }]}>
                                <Text style={style.txt}>Contacts</Text>
                                <Image source={require('../../../Assets/Image/chatcontacticon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(7), onLocation() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 7 ? COLOR.lightgreen : COLOR.white }]}>
                                <Text style={style.txt}>Location</Text>
                                <Image source={require('../../../Assets/Image/chatlocationicon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(8), onFiles() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 8 ? COLOR.lightgreen : COLOR.white, }]}>
                                <Text style={style.txt}>Files</Text>
                                <Image source={require('../../../Assets/Image/chatfileicon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOnSelect(9), onScan() }}
                                style={[style.onSelectlist, { backgroundColor: onSelect == 9 ? COLOR.lightgreen : COLOR.white, marginBottom: 10 }]}>
                                <Text style={style.txt}>Scan</Text>
                                <Image source={require('../../../Assets/Image/scan.png')} style={{ height: 15, width: 15, tintColor: '#04CFC2' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default PlusModal;

const style = StyleSheet.create({
    txt: {
        color: COLOR.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalview: {
        backgroundColor: COLOR.white,
        position: 'absolute',
        bottom: 88,
        left: 20,
        width: 180,
        borderRadius: 5,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowColor: COLOR.gray,
    },
    onSelectlist: { height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 2, paddingHorizontal: 10 }
});
