import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors'

const FeedScreen = () => {
    return (
        <View style={{ backgroundColor: COLOR.white, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar barStyle={'dark-content'} />
            <Text style={{ fontSize: 18, color: COLOR.black, fontWeight: '700' }}>FeedScreen</Text>
        </View>
    )
}

export default FeedScreen