import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import Loader from '../../Custom/Loader/loader'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import NavigateHeader from '../../Custom/Header/NavigateHeader'

const CreateGroupSecondScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />

            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader title={'New Group'} color={COLOR.white} onPress={() => props.navigation.goBack()} />
            </View>
            <View
                style={{
                    backgroundColor: COLOR.white,
                    flex: 1,
                    marginTop: 15,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>





            </View>
            {/* <Loader visible={loading} Retry={getuser} /> */}
        </View>
    )
}

export default CreateGroupSecondScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.black },

    createNoteText: {
        textAlign: 'center',
        fontSize: 20,
        color: COLOR.white,
        marginTop: 40,
        fontWeight: 'bold',
    },
    addNoteTextInput: {
        backgroundColor: COLOR.white,
        borderWidth: 1,
        color: COLOR.black,
        fontSize: 18,
        paddingLeft: 10,
        borderColor: COLOR.gray,
    },
    onSave: {
        marginTop: '10%',
        backgroundColor: COLOR.green,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 50,
    },
    fontSize: 18,
    saveTxt: {
        color: COLOR.white,
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: '600',
    },
});
