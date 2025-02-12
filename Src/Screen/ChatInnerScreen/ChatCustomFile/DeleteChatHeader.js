import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, onCopy } from 'react-native'
import React from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
const DeleteChatHeader = ({ onBack, onedit, onDelete, Count, onCopy, edithide, isCopy }) => {

    const createDeleteAlert = () =>
        Alert.alert(
            'Deleted Messages...?',
            'Are You sure to delete selacted Messages',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'No',
                },
                { text: 'DELETE', onPress: onDelete, style: 'destructive' },
            ],
        );

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <TouchableOpacity onPress={onBack} style={styles.onback}>
                    <Image
                        source={require('../../../Assets/Image/back.png')}
                        style={[styles.backicon, { tintColor: COLOR.black, }]}
                    />
                </TouchableOpacity>
                <Text style={{ marginLeft: 40, color: COLOR.white, fontSize: 20 }}>{Count}</Text>

            </View>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                {/* <TouchableOpacity onPress={onReply} style={{ marginRight: 15 }}>
                    <Image
                        source={require('../../../Assets/Image/reply.png')}
                        style={{ height: 22, width: 22, tintColor: COLOR.white, marginRight: 20 }}
                    />
                </TouchableOpacity> */}

                {edithide ? <TouchableOpacity onPress={onedit} style={{ marginRight: 15 }}>
                    <Image
                        source={require('../../../Assets/Image/groupediticon.png')}
                        style={{ height: 20, width: 20, tintColor: COLOR.white, resizeMode: 'contain' }}
                    />
                </TouchableOpacity> : ''}
                <TouchableOpacity onPress={createDeleteAlert} style={{ marginRight: 15 }}>
                    <Image
                        source={require('../../../Assets/Image/groupbinicon.png')}
                        style={{ height: 20, width: 20, tintColor: COLOR.white, }}
                    />
                </TouchableOpacity>
                {isCopy ?
                <TouchableOpacity onPress={onCopy} style={{ marginRight: 15 }}>
                <Image
                    source={require('../../../Assets/Image/copyicon.png')}
                    style={{ height: 20, width: 20, tintColor: COLOR.white, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            : null}

            </View>

        </View>
    )
}

export default DeleteChatHeader
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.black,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-between',
        marginTop: 40,
        height: 65

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
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginLeft: 8,
        tintColor: COLOR.white,
    },


});
