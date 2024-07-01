import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const ChatHeader = ({
    onSearch,
    onMenu,
    onInvite,
    title,
    tintColor,
    onCall,
    value

}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconview}>
                <TouchableOpacity onPress={onSearch}>
                    <Image
                        style={[styles.headerIcon, { tintColor: tintColor }]}
                        source={require('../../Assets/Image/search.png')}
                    />
                </TouchableOpacity>

                {value ? '' : <TouchableOpacity onPress={onCall}>
                    <Image
                        style={[styles.headerIcon, { tintColor: COLOR.green, height: 18, }]}
                        source={require('../../Assets/Image/telephone.png')}
                    />
                </TouchableOpacity>}
                <TouchableOpacity onPress={onInvite}>
                    <Image
                        style={[styles.headerIcon, { tintColor: tintColor }]}
                        source={require('../../Assets/Image/invite2.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onMenu}>
                    <Image
                        style={[styles.headerIcon, { tintColor: tintColor, height: 35, width: 35 }]}
                        source={require('../../Assets/Image/dott.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatHeader;
const styles = StyleSheet.create({
    headerIcon: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    container: {
        padding: 20,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: { color: COLOR.white, fontSize: 24, fontWeight: 'bold', },
    iconview: { flexDirection: 'row', alignItems: 'center' },
});
