import { View, Text, Modal, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'

const Loader = ({ visible, Retry }) => {
    const [isRetry, setIsRetry] = useState(false)
    useEffect(() => {
        setInterval(() => {
            visible == true ? setIsRetry(true) : setIsRetry(false)
        }, 10000)

    }, [visible])
    const handleRetry = () => {
        setIsRetry(false); // Reset state if needed
        Retry(); // Call the Retry function
    };
    return (

        // <Modal visible={visible} transparent>
        //     <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>

        //         <ActivityIndicator size={'small'} style={{ padding: 40, backgroundColor: COLOR.white, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} />

        //     </View>
        // </Modal >
        <Modal visible={visible} transparent>
            {isRetry ? <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.white, borderRadius: 10 }}>
                    <TouchableOpacity onPress={handleRetry} >
                        <Image source={require('../../Assets/Image/retry.png')} style={{ height: 20, width: 20, alignSelf: 'center' }} />
                        <Text style={{ fontSize: 16, color: COLOR.black, fontWeight: 'bold', marginTop: 5 }} >Retry</Text>

                    </TouchableOpacity>
                </View>
            </View> :
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>

                    <ActivityIndicator size={'small'} style={{ padding: 40, backgroundColor: COLOR.white, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} />

                </View>
            }
        </Modal >

    )
}

export default Loader