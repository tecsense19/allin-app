import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'

const ListImage = ({ uri, marginRight, height, width, marginLeft }) => {
    return (
        <ImageBackground source={require('../../Assets/Image/admin.jpg')} style={{ height: height ? height : 55, width: width ? width : 55, borderRadius: 55, marginRight: marginRight ? marginRight : 10, marginLeft: marginLeft ? marginLeft : 0 }}>
            <Image source={{ uri: uri }} style={{ height: height ? height : 55, width: width ? width : 55, resizeMode: 'cover', borderRadius: 55, }} />
        </ImageBackground>
    )
}

export default ListImage