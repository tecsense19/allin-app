import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Image,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const ProfileModal = ({
    visible,
    onClose,
    onCemera,
    onGallery,
    onRequestClose,
}) => {
    return (
        <View>
            <Modal visible={visible} transparent onRequestClose={onRequestClose}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.container}>
                        <View style={styles.modalview}>
                            <TouchableOpacity onPress={onCemera} style={styles.onmodalicon}>
                                <Image
                                    source={require('../../Assets/Image/camera.png')}
                                    style={styles.cameraicon}
                                />
                                <Text style={styles.modaltxt}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onGallery} style={styles.onmodalicon}>
                                <Image
                                    source={require('../../Assets/Image/image.png')}
                                    style={styles.imgicon}
                                />
                                <Text style={styles.modaltxt}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default ProfileModal;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
    modalview: {
        backgroundColor: COLOR.white,
        position: 'absolute',
        bottom: -10,
        left: 0,
        right: 0,
        borderRadius: 20,
        padding: 10,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 70,
    },
    cameraicon: { height: 40, width: 40, tintColor: COLOR.green },
    imgicon: { height: 40, width: 40, tintColor: COLOR.green },
    onmodalicon: { alignItems: 'center', justifyContent: 'center' },
    modaltxt: { color: COLOR.gray, fontWeight: 'bold', fontSize: 16 },
});
