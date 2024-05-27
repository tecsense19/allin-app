import messaging from "@react-native-firebase/messaging";
import { openSettings } from "react-native-permissions";
import MyAlert from "../Custom/Alert/PermissionAlert";

export const notificationsPermission = async () => {
    const authStatus = await messaging()?.requestPermission();
    const title = 'Permission Request';
    const Descriptions = 'This app requires notification access. Please allow notification access to continue';
    const Deny = () => console.log('Deny');
    const Allow = () => openSettings();
    const enabled =
        authStatus === messaging?.AuthorizationStatus?.AUTHORIZED ||
        authStatus === messaging?.AuthorizationStatus?.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    } else {
        MyAlert(title, Descriptions, Allow, Deny);
    }
}
