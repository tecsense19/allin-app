import messaging from "@react-native-firebase/messaging";
import { useRef } from "react";
import { openSettings } from "react-native-permissions";
import MyAlert from "../../Custom/Alert/PermissionAlert";

export const handleEditNumber = (data, navigation) => {
    if (data?.type == 'login') {
        navigation.navigate('login')
    } else {
        navigation.navigate('createaccount')
    }
}

