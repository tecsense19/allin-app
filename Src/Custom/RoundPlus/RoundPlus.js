import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const RoundPlus = ({ height, width, marginTop }) => {
    return (
        <View
            style={[
                styles.container,
                { height: height, width: width, marginTop: marginTop },
            ]}>
            <Image source={require('../../Assets/Image/+.png')} style={styles.plusicon} />
        </View>
    );
};

export default RoundPlus;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.green,
        borderRadius: 50,
        alignSelf: 'center',
    },
    plusicon: { height: 10, width: 10, tintColor: COLOR.white },
});
