import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const ChatHeader = ({
    onSearch,
    onMenu,
    onInvite,
    title,
    tintColor,
    onCall,
    value,
    onBack,
    hide

}) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {hide ? <TouchableOpacity onPress={onBack} style={{
                    backgroundColor: COLOR.green,
                    borderRadius: 50,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                }}>
                    <Image
                        source={require('../../Assets/Image/back.png')}
                        style={{
                            height: 16,
                            width: 16,
                            resizeMode: 'contain', tintColor: COLOR.black, marginLeft: -2
                        }}
                    />
                </TouchableOpacity> : ''}
                <Text style={styles.title}>{title}</Text>
            </View>
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
                {value ? '' : <TouchableOpacity onPress={onInvite}>
                    <Image
                        style={[styles.headerIcon, { tintColor: tintColor }]}
                        source={require('../../Assets/Image/invite2.png')}
                    />
                </TouchableOpacity>}
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
