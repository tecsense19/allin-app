import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'

const ChatScrollEnd = ({ onPress }) => {
    return (
        < TouchableOpacity style={{ height: 35, width: 35, borderRadius: 30, backgroundColor: COLOR.verylightgray, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 15, bottom: '15%' }} onPress={onPress}>
            <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-force-down-512.png', }} style={{ height: 25, width: 25 }} />
        </TouchableOpacity>
    )
}

export default ChatScrollEnd