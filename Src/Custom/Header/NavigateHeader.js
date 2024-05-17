import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
COLOR

const NavigateHeader = ({ title, title2, tintColor, onPress, top, color, smallTitleSize }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.onback}>
                <Image
                    source={require('../../Assets/Image/back.png')}
                    style={[styles.backicon, { tintColor: tintColor }]}
                />
            </TouchableOpacity>

            <Text style={[styles.headertitle, { marginTop: top, color: color }]}>{title}</Text>

            <Text style={[styles.title2, { fontSize: smallTitleSize ? smallTitleSize : 14 }]}>{title2}</Text>
        </View>
    );
};

export default NavigateHeader;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 60,
    },
    onback: {
        backgroundColor: COLOR.green,
        borderRadius: 100,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
    },
    backicon: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginLeft: -2,

    },
    headertitle: {
        color: COLOR.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    title2: {
        color: COLOR.white,
        fontSize: 14,
        letterSpacing: 1,
        marginTop: 5,
        fontWeight: '500',
    },
});
