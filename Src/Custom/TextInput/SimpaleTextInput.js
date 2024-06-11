import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const Textinput = ({
    label,
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    marginTop,
    numberOfLines,
    multiline,
}) => {
    return (
        <View style={{ marginTop: marginTop }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputview}>
                <TextInput
                    onSubmitEditing={onSubmitEditing}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    placeholderTextColor={COLOR.lightgray}
                />
            </View>
        </View>
    );
};

export default Textinput;
const styles = StyleSheet.create({
    label: {
        color: COLOR.titlecolor,
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 18,
    },
    inputview: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLOR.bordercolor,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: COLOR.black,
        fontWeight: '500',
        fontSize: 16,
        height: 45,
        paddingLeft: 10,
    },
});
