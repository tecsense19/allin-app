import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, openSettings, request } from "react-native-permissions";
import MyAlert from "../../Custom/Alert/PermissionAlert";

export const profileImgGallery = async () => {
    await requestCameraPermission()
    const result = await launchImageLibrary();
    if (result?.assets[0]?.uri) {
        const url = result.assets
        return url
    }
};
export const profileImgCemera = async () => {
    await requestCameraPermission()
    const result = await launchCamera();
    if (result?.assets[0]?.uri) {
        const url = result.assets
        return url
    }
};
export const BgImageCemera = async () => {
    await requestCameraPermission()
    const result = await launchCamera();
    if (result?.assets[0]?.uri) {
        const url = result?.assets
        return url
    }
};
export const BgImageGallery = async () => {
    await requestCameraPermission()
    const result = await launchImageLibrary();
    if (result?.assets[0]?.uri) {
        const url = result?.assets
        return url
    }
};
export const requestCameraPermission = async () => {

    const title = 'Permission Request';
    const Descriptions = 'This app requires camera access. Please allow camera access to continue';
    const Deny = () => console.log('Deny');
    const Allow = () => openSettings();

    try {
        const photo = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (photo === 'granted' && result === 'granted') {
            console.log('gallery===>', result);
            console.log('camera===>', photo);
        } else {
            MyAlert(title, Descriptions, Allow, Deny);
        }
    } catch (error) {
        console.log(error);
    }
};