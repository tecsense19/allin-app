import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const Chatheader = ({
    onBack,
    source,
    title,
    onSearch,
    onCall,
    value, onChange, disabled, onProfile
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <TouchableOpacity onPress={onBack} style={styles.onback}>
                    <Image
                        source={require('../../Assets/Image/back.png')}
                        style={[styles.backicon, { tintColor: COLOR.black, marginLeft: -2 }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={disabled} onPress={onProfile} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={source} style={styles.profileimg} />
                    <Text style={styles.username}>{title}</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>

                <TouchableOpacity onPress={onCall} style={{ marginRight: 7 }}>
                    <Image
                        source={require('../../Assets/Image/telephone.png')}
                        style={[styles.icon, { tintColor: COLOR.green }]}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={onChange} style={{ marginRight: 7, }}>
                    {value ? <Image
                        source={require('../../Assets/Image/chatnext.png')}
                        style={styles.icon}
                    /> : <Image
                        source={require('../../Assets/Image/chatnext.png')}
                        style={[styles.icon, { transform: [{ rotate: '180deg' }] }]}
                    />}
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={onSearch}>
            <Image
              source={require('../../assets/search.png')}
              style={[styles.icon, { height: 24, width: 24 }]}
            />
          </TouchableOpacity> */}
            </View>

        </View>
    );
};

export default Chatheader;
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.black,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-between',
        marginTop: 40,
    },
    view1: {
        backgroundColor: COLOR.black,
        flexDirection: 'row',
        alignItems: 'center',
    },
    onback: {
        backgroundColor: COLOR.green,
        borderRadius: 50,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center', marginRight: 5
    },
    backicon: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    profileimg: { height: 45, width: 45, marginLeft: 8, borderRadius: 50 },
    username: {
        color: COLOR.white,
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    icon: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginLeft: 8,
        tintColor: COLOR.white,
    },


});
