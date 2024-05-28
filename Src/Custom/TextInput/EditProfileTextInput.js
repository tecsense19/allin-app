import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';


const Textinput = ({
    label,
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    marginTop,
    onPress,
    maxLength,
    keyboardType,
    placeholderTextColor,
}) => {
    return (
        <View style={{ marginTop: marginTop }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputView}>
                <TextInput
                    placeholderTextColor={placeholderTextColor}
                    onSubmitEditing={onSubmitEditing}
                    placeholder={placeholder}
                    value={value}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    style={styles.TextInput}
                    maxLength={maxLength}
                />
                <View style={styles.updateView}>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.updateTxt}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Textinput;
const styles = StyleSheet.create({
    label: {
        color: COLOR.titlecolor,
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 18,
    },
    inputView: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLOR.textcolor,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center', marginHorizontal: 10
    },
    TextInput: {
        flex: 1,
        color: COLOR.black,
        fontSize: 16,
        height: 45,
        paddingLeft: 10,
        fontWeight: '500',
    },
    updateView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: COLOR.green, borderTopRightRadius: 4, borderBottomRightRadius: 4,
        padding: 13,
        borderColor: COLOR.gray,
    },
    updateTxt: {
        fontSize: 18,
        color: COLOR.white,
        fontWeight: 'bold',
    },
});
