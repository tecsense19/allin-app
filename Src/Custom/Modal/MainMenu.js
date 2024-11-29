import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const MainMenu = ({ visible, onPress, setting, onClose, title, ScanQR, onRequestClose, onLogout, onGroup }) => {
    const [onSelect, setOnSelect] = useState(1)
    return (
        <View>
            <Modal visible={visible} transparent onRequestClose={onRequestClose}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalMainView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 1 ? COLOR.lightgreen : COLOR.white, marginTop: 10 }]} onPress={() => { setOnSelect(1), onPress() }} >
                                <Text style={styles.modalText}>{title}</Text>
                                <Image source={require('../../Assets/Image/summerizemenuicon.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 2 ? COLOR.lightgreen : COLOR.white }]} onPress={() => { setOnSelect(2), ScanQR() }}>
                                <Text style={styles.modalText}>Scan QR</Text>
                                <Image source={require('../../Assets/Image/qr.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity> */}
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 3 ? COLOR.lightgreen : COLOR.white }]} onPress={() => { setOnSelect(3), onGroup() }}>
                                <Text style={styles.modalText}>Create Group</Text>
                                <Image source={require('../../Assets/Image/creategroupmenuicon.png')} style={{ height: 15, width: 15 }} />

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 4 ? COLOR.lightgreen : COLOR.white }]} onPress={() => { setOnSelect(4), setting() }}>
                                <Text style={styles.modalText}>Settings</Text>
                                <Image source={require('../../Assets/Image/settingmenuicon.png')} style={{ height: 15, width: 15 }} />

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 5 ? COLOR.lightgreen : COLOR.white, marginBottom: 10 }]} onPress={() => { setOnSelect(5), onLogout() }}>
                                <Text style={styles.modalText}>Logout</Text>
                                <Image source={require('../../Assets/Image/logoutmenuicon.png')} style={{ height: 15, width: 15 }} />

                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default MainMenu;

const styles = StyleSheet.create({
    modalMainView: { backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 },
    modalView: {
        justifyContent: 'center',
        width: 160,
        backgroundColor: COLOR.white,
        position: 'absolute',
        right: 29,
        top: 75,

        borderRadius: 5,
    },
    modalText: {
        fontSize: 16,
        color: COLOR.black,
        fontWeight: 'bold',
    },
    onselectlist: {
        marginTop: 10,
        height: 30,
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 10,
    }
});

