import React from 'react';
import { Alert } from 'react-native';

const MyAlert = (title, Descriptions, Allow, Deny) => {
    Alert.alert(title, Descriptions, [
        {
            text: 'Deny',
            onPress: Deny,
            style: 'destructive',
        },
        {
            text: 'Allow',
            onPress: Allow,
        },
    ]);
};
export default MyAlert;
