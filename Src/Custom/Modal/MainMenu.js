import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const MainMenu = ({ visible, onPress, setting, onClose, title, QR, onRequestClose, onLogout, }) => {
    const [onSelect, setOnSelect] = useState(1)
    return (
        <View>
            <Modal visible={visible} transparent onRequestClose={onRequestClose}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalMainView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 1 ? COLOR.lightgreen : COLOR.white, marginTop: 10 }]} onPress={() => { setOnSelect(1), onPress() }} >
                                <Text style={styles.modalText}>{title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 2 ? COLOR.lightgreen : COLOR.white }]} onPress={() => { setOnSelect(2), QR() }}>
                                <Text style={styles.modalText}>Website QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 3 ? COLOR.lightgreen : COLOR.white }]} onPress={() => { setOnSelect(3), setting() }}>
                                <Text style={styles.modalText}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.onselectlist, { backgroundColor: onSelect == 4 ? COLOR.lightgreen : COLOR.white, marginBottom: 10 }]} onPress={() => { setOnSelect(4), onLogout() }}>
                                <Text style={styles.modalText}>Logout</Text>
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
        width: 140,
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
        alignItems: 'center'
    }
});

