import { View, StatusBar, Image, StyleSheet, Alert, } from 'react-native';
import React, { useCallback, useEffect, useState, } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationsPermission } from '../../Service/Functions';
import TimeZone from 'react-native-timezone'
import { User_List } from '../../Service/actions';
import { useFocusEffect } from '@react-navigation/native';

const SplaseScreen = props => {
    const [token, settoken] = useState('')
    const timezone = { timezone: TimeZone.getTimeZone() };

    useEffect(() => {
        setTimeout(() => {
            getMyData()
            notificationsPermission()
        }, 3000);
    }, []);


    const getMyData = async () => {

        const jsonValue = await AsyncStorage.getItem('myData');
        if (jsonValue == null) {
            props.navigation.reset({ routes: [{ name: 'first' }] });
        }
        const userData = JSON.parse(jsonValue);
        const token = userData.data.token;
        settoken(token);

        return token;
    };

    useEffect(() => {
        getuser();
    }, [])

    const getuser = async () => {
        const token = await getMyData();
        // const timezone = { timezone: Timezone.getTimeZone() }
        await User_List(timezone, token).then((data) => {
            // console.log(data);
            if (data.message == 'Token Expired' && data.status_code == 401) {
                props.navigation.reset({ routes: [{ name: 'first' }] });
            }
            // console.log(data);
            if (data?.status_code === 401) {
                props.navigation.reset({ routes: [{ name: 'first' }] });
            } else {
                props.navigation.reset({ routes: [{ name: 'home' }] });
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
