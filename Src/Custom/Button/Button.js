import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const Button = ({
    bgColor,
    color,
    borderWidth,
    borderColor,
    marginTop,
    marginBottom,
    disabled,
    title,
    onPress,
    marginHorizontal,
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{
                padding: 10,
                backgroundColor: bgColor,
                borderWidth: borderWidth,
                borderColor: borderColor,
                borderRadius: 10,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginHorizontal: marginHorizontal,
                justifyContent: 'center',
                height: 45,
            }}>
            <Text style={[styles.title, { color: color }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: COLOR.textcolor,
        fontWeight: 'bold',
    },
});
