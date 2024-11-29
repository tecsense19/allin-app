import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'

const TmeModal = ({ visible, onClose, onCamera, onFile, onGallery, onScane }) => {
    const [onSelect, setOnSelect] = useState(1)
    return (
        <Modal visible={visible} transparent >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <View style={{
                        backgroundColor: COLOR.white, height: 150, width: 150, justifyContent: 'center',
                        position: 'absolute', bottom: 150, left: 20, shadowOpacity: 0.5, borderRadius: 10,
                        shadowColor: 'gray', shadowOffset: { height: 1, width: 1 },
                    }}>
                        <ModalList source={require('../../Assets/Image/chatcameraicon.png')} title={'Camera'} onPress={() => { setOnSelect(1), onCamera() }} backgroundColor={onSelect == 1 ? COLOR.lightgreen : COLOR.white} />
                        <ModalList source={require('../../Assets/Image/chatgalleryicon.png')} title={'Photo Gallery'} onPress={() => { setOnSelect(2), onGallery() }} backgroundColor={onSelect == 2 ? COLOR.lightgreen : COLOR.white} />
                        <ModalList source={require('../../Assets/Image/chatfileicon.png')} title={'File'} onPress={() => { setOnSelect(3), onFile() }} backgroundColor={onSelect == 3 ? COLOR.lightgreen : COLOR.white} />
                        <ModalList source={require('../../Assets/Image/scan.png')} title={'Scan Text'} onPress={() => { setOnSelect(4), onScane() }} backgroundColor={onSelect == 4 ? COLOR.lightgreen : COLOR.white} />

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default TmeModal
const ModalList = ({ onPress, title, backgroundColor, source }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: backgroundColor, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: 30, paddingHorizontal: 10, width: '100%' }}>
            <Text style={{ fontSize: 16, fontWeight: '700', }}>{title}</Text>
            <Image source={source} style={{ height: 15, width: 15, }} />
        </TouchableOpacity>
    )
}