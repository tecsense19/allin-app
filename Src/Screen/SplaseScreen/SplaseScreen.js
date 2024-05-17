import { View, StatusBar, Image, StyleSheet, } from 'react-native';
import React, { useEffect, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const SplaseScreen = props => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.reset({
                routes: [{ name: 'first' }],
            });
        }, 3000);
    }, []);
    // const getUserData = async () => {
    //     const jsonValue = await AsyncStorage.getItem('userData');
    //     const userData = JSON.parse(jsonValue);
    //     console.log(userData);
    //     if (jsonValue == null) {
    //         props.navigation.reset({
    //             routes: [{ name: 'home' }],
    //         });
    //     } else {
    //         props.navigation.reset({
    //             routes: [{ name: 'bottomtab' }],
    //         });
    //     }
    // };



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLOR.black} hidden={false} />
            <Image
                source={require('../../Assets/Image/allin_logo.png')}
                style={styles.logoimg}
            />
        </View>
    );
};

export default SplaseScreen;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.white },
    logoimg: {
        height: '15%',
        width: '30%',
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'center',
        top: '35%',
    }
})
