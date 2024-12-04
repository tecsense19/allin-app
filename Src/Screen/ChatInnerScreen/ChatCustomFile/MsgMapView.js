import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';

const MsgMapImage = ({ data }) => {
    const latitude = data?.messageDetails.latitude
    const longitude = data?.messageDetails.longitude

    // console.log(data);
    return (
        <View style={{ alignSelf: data.sentBy == 'loginUser' ? 'flex-end' : 'flex-start', padding: 5, backgroundColor: data.sentBy == 'loginUser' ? COLOR.lightgreen : COLOR.verylightgray, borderRadius: 10, width: '100%' }}>
            <MapView
                scrollEnabled={false}
                zoomEnabled={false}
                // showsUserLocation={true}
                followsUserLocation={true}
                style={{ height: 280, width: '100%', borderRadius: 10 }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }}>
                <Marker coordinate={{ latitude: latitude, longitude: longitude }} >
                    <Image style={{ height: 25, width: 25, tintColor: 'darkred' }} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-1024.png' }} />
                </Marker>
            </MapView>
            <Text style={{ fontSize: 12, color: COLOR.bordercolor, fontWeight: 'bold', textAlign: 'right', margin: 5 }}>{data.time}</Text>
        </View>
    );
};



export default MsgMapImage;
