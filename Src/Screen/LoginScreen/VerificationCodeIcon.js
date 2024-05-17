import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const VerificationCodeIcon = ({ marginTop }) => {
    return (
        <Image
            source={require('../../Assets/Image/block.png')}
            style={styles.icon}
        />
    );
};
export default VerificationCodeIcon;
const styles = StyleSheet.create({

    icon: { height: 113, width: 113, alignSelf: 'center' },
});
