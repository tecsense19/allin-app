import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'

const Loader = ({ visible }) => {
    return (

        <Modal visible={visible} transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>

                <ActivityIndicator size={'small'} style={{ padding: 40, backgroundColor: COLOR.white, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} />

            </View>
        </Modal >

    )
}

export default Loader