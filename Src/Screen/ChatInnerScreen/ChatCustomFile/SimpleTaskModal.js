import { View, Text, Modal, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'
import Button from '../../../Custom/Button/Button'

const SimpleTaskModal = ({ visble, close, submit, addMore, msg }) => {
    const [newCheckBoxLabel, setNewCheckBoxLabel] = useState('')
    useEffect(() => {
        setNewCheckBoxLabel(msg)
    }, [msg])
    return (

        <Modal visible={visble} transparent >
            {/* <TouchableWithoutFeedback style={{ flex: 1,backgroundColor:'red' }} onPress={close}> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <View style={{ backgroundColor: COLOR.white, borderRadius: 10, padding: 20, shadowOpacity: 0.3, shadowOffset: { height: 1, width: 1 }, shadowRadius: 10, width: '100%' }}>
                    <TouchableOpacity onPress={close} style={{ alignSelf: 'flex-end', padding: 10, marginRight: -10 }}>
                        <Image source={require('../../../Assets/Image/x.png')} style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>
                    {/* <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: COLOR.black }}>New Task</Text> */}
                    <TextInput
                        style={{
                            backgroundColor: COLOR.white,
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            shadowOffset: { height: 1, width: 1 },
                            height: 48,
                            borderRadius: 5,
                            paddingLeft: 15,
                            fontWeight: '500',
                            fontSize: 16,
                            color: COLOR.textcolor, marginTop: 30
                        }}
                        placeholder="Enter Task Title"
                        value={newCheckBoxLabel}
                        onChangeText={(text) => setNewCheckBoxLabel(text)}
                    />
                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={addMore}>
                        <Image source={require('../../../Assets/Image/addmoretaskicon.png')} style={{ width: 42, height: 42, marginRight: 5, tintColor: COLOR.green, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Button bgColor={COLOR.green} color={COLOR.white} title="Submit" onPress={submit} marginTop={20} />

                </View>
            </View>
            {/* </TouchableWithoutFeedback> */}

        </Modal >
    )
}

export default SimpleTaskModal