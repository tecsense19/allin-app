import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'

const ListImage = ({ uri, marginRight }) => {
    return (
        <ImageBackground source={require('../../Assets/Image/admin.jpg')} style={{ height: 55, width: 55, borderRadius: 55, marginRight: marginRight ? marginRight : 10 }}>
            <Image source={{ uri: uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 55 }} />
        </ImageBackground>
    )
}

export default ListImage