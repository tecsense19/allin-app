import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import CountryPicker from 'rn-country-picker';


const LoginTextInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    marginTop,
    placeholderTextColor,
    selectedValue
}) => {

    return (
        <View style={{ marginTop: marginTop, alignSelf: 'center', width: '75%' }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputview}>
                <View style={styles.phoneview}>
                    <CountryPicker visible={true} pickerTitle="Select yourCountry"
                        animationType={'none'} pickerTitleStyle={styles.pickertitle}
                        language="en" selectedCountryTextStyle={styles.selectedcountrytext}
                        containerStyle={{ height: 100 }} countryNameTextStyle={styles.countrynametext}
                        searchBarPlaceHolder={'Search here......'} countryFlagStyle={styles.countryflag}
                        hideCountryCode={false} countryCode={'91'}
                        selectedValue={selectedValue} />
                </View>

                <TextInput
                    autoFocus
                    maxLength={14}
                    onSubmitEditing={onSubmitEditing}
                    keyboardType="numeric"
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.numberinput}
                />
            </View>
        </View>
    );
};

export default LoginTextInput;
const styles = StyleSheet.create({
    label: {
        color: COLOR.gray,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    },
    inputview: {
        marginTop: 20,
        borderBottomWidth: 2,
        borderColor: COLOR.black,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneview: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneicon: {
        height: 30,
        width: 30,
        marginLeft: 10,
        resizeMode: 'contain',
        tintColor: COLOR.green,
    },
    numberinput: {
        flex: 1,
        color: COLOR.black,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 18,
        height: 45,
        justifyContent: 'center', paddingLeft: 5

    },
    countryPickerView: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: COLOR.bordercolor,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        height: 45,
    },
    pickertitle: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        color: COLOR.titlecolor,
    },
    selectedcountrytext: {
        paddingLeft: 5,
        fontSize: 18,
        color: COLOR.black,
        textAlign: 'right',
        fontWeight: 'bold',

    },
    countrynametext: {
        paddingLeft: 20,
        color: COLOR.titlecolor,
        fontSize: 18,
        textAlign: 'right',
        fontWeight: '600',
    },
    countryflag: {
        paddingLeft: 20,
        color: COLOR.titlecolor,
        fontSize: 18,
        textAlign: 'right',
        fontWeight: '600',
    },
});