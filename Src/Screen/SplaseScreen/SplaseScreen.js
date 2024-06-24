import { View, StatusBar, Image, StyleSheet, Alert, } from 'react-native';
import React, { useCallback, useEffect, useState, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationsPermission } from '../../Service/Functions';
import TimeZone from 'react-native-timezone'
import { User_List } from '../../Service/actions';
import { useFocusEffect } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const SplaseScreen = props => {
    const timezone = { timezone: TimeZone.getTimeZone() };
    useEffect(() => {
        getNotificationData()

        setTimeout(() => {
            getMyData()
            notificationsPermission()
        }, 2000);
    }, []);
    const getNotificationData = async () => {
        messaging().onMessage(remoteMessage => {
            props.navigation.navigate('chatinner', remoteMessage.data.sender)
        });
        // messaging().getInitialNotification().then(remoteMessage => {
        //     if (remoteMessage && remoteMessage.data.sender) {
        //         navigation.navigate('chatinner', { sender: remoteMessage.data.sender });
        //     }
        // });
    }

    const getMyData = async () => {

        const jsonValue = await AsyncStorage.getItem('myData');
        const userData = JSON.parse(jsonValue);
        // console.log(jsonValue);

        if (jsonValue == null) {
            return props.navigation.reset({ routes: [{ name: 'first' }] });
        } else {
            return getuser(userData.data.token)
        }
    };
    const getuser = async (token) => {
        await User_List(timezone, token).then((data) => {
            if (data.message == 'Token Expired' && data.status_code == 401) {
                return props.navigation.reset({ routes: [{ name: 'first' }] });
            }
            if (data?.status_code === 200) {
                return props.navigation.reset({ routes: [{ name: 'home' }] });
            } else {
                return props.navigation.reset({ routes: [{ name: 'first' }] });
            }
        }).catch((e) => { console.log(token, '=======>>>>', e, 'userListApihome screen'); })
    }

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


// import { View, StatusBar, Image, StyleSheet, Alert, } from 'react-native';
// import React, { useCallback, useEffect, useState, } from 'react';
// import { COLOR } from '../../Assets/AllFactors/AllFactors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { notificationsPermission } from '../../Service/Functions';
// import TimeZone from 'react-native-timezone'
// import { User_List } from '../../Service/actions';
// import { useFocusEffect } from '@react-navigation/native';
// import { getToken } from '../../Service/AsyncStorage';

// const SplaseScreen = props => {
//     useEffect(() => {
//         getMyData()
//     }, []);


//     const getMyData = async () => {
//         const token = await getToken()
//         console.log(token);
//     };
//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor={COLOR.black} hidden={false} />
//             <Image
//                 source={require('../../Assets/Image/allin_logo.png')}
//                 style={styles.logoimg}
//             />
//         </View>
//     );
// };
// export default SplaseScreen;
// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: COLOR.white },
//     logoimg: {
//         height: '15%',
//         width: '30%',
//         resizeMode: 'contain',
//         position: 'absolute',
//         alignSelf: 'center',
//         top: '35%',
//     }
// })
