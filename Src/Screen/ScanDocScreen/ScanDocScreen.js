

// import React, { useState, useEffect } from 'react';
// import { Image, ScrollView, Text, View } from 'react-native';
// import DocumentScanner from 'react-native-document-scanner-plugin';
// import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
// import NavigateHeader from '../../Custom/Header/NavigateHeader';
// import { COLOR } from '../../Assets/AllFactors/AllFactors';
// import Button from '../../Custom/Button/Button';
// import MyAlert from '../../Custom/Alert/PermissionAlert';
// // import TextRecognition, {
// //     TextRecognitionScript,
// // } from '@react-native-ml-kit/text-recognition';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import RNFS from 'react-native-fs';
// // import { File_Uplode } from './Src/Service/actions';
// // import { getToken } from './Src/Service/AsyncStorage';
// import RNFetchBlob from 'rn-fetch-blob';
// const ScanDocScreen = props => {
//     const [scannedImage, setScannedImage] = useState();
//     const [text, setText] = useState('')


//     const getImage = async () => {
//         setText('')
//         // console.log(token);
//         await launchCamera().then(async (image) => {

//             if (image.assets[0].uri) {
//                 const result = await TextRecognition.recognize(
//                     image.assets[0].uri,
//                     TextRecognitionScript.JAPANESE
//                 );
//                 let recognizedText = '';
//                 result.blocks.forEach(block => {
//                     recognizedText += block.text + '\n'; // Add each block's text followed by a newline
//                 });
//                 setText(recognizedText.trim());
//                 // const filePath = RNFS.DocumentDirectoryPath + '/recognized_text.txt';
//                 // await RNFS.writeFile(filePath, recognizedText, 'utf8');
//                 // // console.log('Text saved to:', filePath);
//                 // const url = `file://${filePath}`;
//                 // // Linking.openURL(url);

//                 // const profileImageUri = url;
//                 // const profileImageName = profileImageUri ? profileImageUri.split('/').pop() : '';
//                 // const profileImageType = 'txt'
//                 // formData.append('file', {
//                 //     uri: profileImageUri,
//                 //     name: profileImageName,
//                 //     type: profileImageType
//                 // });
//             }
//         })
//     }
//     console.log(scannedImage);
//     const scanDocument = async () => {
//         setText('')
//         // start the document scanner
//         const { scannedImages } = await DocumentScanner.scanDocument({
//             letUserAdjustCrop: true,
//             croppedImageQuality: 100,
//         });

//         // get back an array with scanned image file paths
//         if (scannedImages.length > 0) {
//             // set the img src, so we can view the first scanned image
//             setScannedImage(scannedImages[0]);
//         }
//     };
//     const customAlert = () => {
//         const title = 'Permission Request';
//         const Descriptions =
//             'This app requires camera access. Please allow camera access to continue';
//         const Deny = () => console.log('Deny');
//         const Allow = () => openSettings();
//         MyAlert(title, Descriptions, Allow, Deny);
//     };
//     const requestCameraPermission = async () => {
//         try {
//             const photo = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
//             const result = await request(PERMISSIONS.IOS.CAMERA);
//             if (result === 'granted') {
//             } else {
//                 customAlert();
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         // call scanDocument on load

//         requestCameraPermission();
//     }, []);

//     return (
//         <View style={{ flex: 1, backgroundColor: COLOR.black }}>
//             <View style={{ paddingHorizontal: 20 }}>
//                 <NavigateHeader
//                     color={COLOR.white}
//                     title={'Scan document'}
//                     onPress={() => props.navigation.goBack()}
//                 />
//             </View>
//             <View
//                 style={{
//                     flex: 1,
//                     marginTop: 10,
//                     backgroundColor: COLOR.white,
//                     borderTopRightRadius: 20,
//                     borderTopLeftRadius: 20,
//                 }}>

//                 <ScrollView style={{}} bounces={false}>
//                     {text == '' ? <Image
//                         resizeMode="contain"
//                         style={{
//                             width: 300,
//                             height: 350,
//                             resizeMode: 'contain',
//                             alignSelf: 'center',
//                             marginTop: 50
//                         }}
//                         source={
//                             scannedImage == undefined
//                                 ? require('../../Assets/Image/scanner.png')
//                                 : { uri: scannedImage }
//                         }
//                     /> : null}
//                     <Text style={{ fontSize: 16, marginTop: 20, fontWeight: 'bold', marginHorizontal: 20 }}>{text}</Text>
//                 </ScrollView>
//                 <Button
//                     title={'Scan Docs'}
//                     bgColor={COLOR.green}

//                     onPress={scanDocument}
//                     color={COLOR.white}
//                     marginHorizontal={20}
//                 />
//                 {/* <Button
//                     title={'Scan Text'}
//                     bgColor={COLOR.green}
//                     marginTop={10}
//                     onPress={getImage}
//                     color={COLOR.white}
//                     marginHorizontal={20}
//                 /> */}
//                 <Button
//                     title={'Close'}
//                     marginHorizontal={20}
//                     color={COLOR.black}
//                     bgColor={COLOR.white}
//                     onPress={() => props.navigation.goBack()}
//                     marginTop={10}
//                     marginBottom={30}
//                     borderWidth={1}
//                 />
//             </View>
//         </View>
//     );
// };

// export default ScanDocScreen;






import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../../Custom/Button/Button';
import MyAlert from '../../Custom/Alert/PermissionAlert';
import TextRecognition, {
    TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import RNFS from 'react-native-fs';
// import { File_Uplode } from './Src/Service/actions';
// import { getToken } from './Src/Service/AsyncStorage';
import RNFetchBlob from 'rn-fetch-blob';
const ScanDocScreen = props => {
    const [scannedImage, setScannedImage] = useState();
    const [text, setText] = useState('')


    const getImage = async () => {
        setText('')
        // console.log(token);
        await launchCamera().then(async (image) => {

            if (image.assets[0].uri) {
                const result = await TextRecognition.recognize(
                    image.assets[0].uri,
                    TextRecognitionScript.JAPANESE
                );
                let recognizedText = '';
                result.blocks.forEach(block => {
                    recognizedText += block.text + '\n'; // Add each block's text followed by a newline
                });
                setText(recognizedText.trim());
                // const filePath = RNFS.DocumentDirectoryPath + '/recognized_text.txt';
                // await RNFS.writeFile(filePath, recognizedText, 'utf8');
                // // console.log('Text saved to:', filePath);
                // const url = `file://${filePath}`;
                // // Linking.openURL(url);

                // const profileImageUri = url;
                // const profileImageName = profileImageUri ? profileImageUri.split('/').pop() : '';
                // const profileImageType = 'txt'
                // formData.append('file', {
                //     uri: profileImageUri,
                //     name: profileImageName,
                //     type: profileImageType
                // });
            }
        })
    }
    console.log(scannedImage);
    const scanDocument = async () => {
        setText('')
        // start the document scanner
        const { scannedImages } = await DocumentScanner.scanDocument({
            letUserAdjustCrop: true,
            croppedImageQuality: 100,
        });

        // get back an array with scanned image file paths
        if (scannedImages.length > 0) {
            // set the img src, so we can view the first scanned image
            setScannedImage(scannedImages[0]);
        }
    };
    const customAlert = () => {
        const title = 'Permission Request';
        const Descriptions =
            'This app requires camera access. Please allow camera access to continue';
        const Deny = () => console.log('Deny');
        const Allow = () => openSettings();
        MyAlert(title, Descriptions, Allow, Deny);
    };
    const requestCameraPermission = async () => {
        try {
            const photo = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            const result = await request(PERMISSIONS.IOS.CAMERA);
            if (result === 'granted') {
            } else {
                customAlert();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // call scanDocument on load

        requestCameraPermission();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.black }}>
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader
                    color={COLOR.white}
                    title={'Scan document'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    marginTop: 10,
                    backgroundColor: COLOR.white,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>

                <ScrollView style={{}} bounces={false}>
                    {text == '' ? <Image
                        resizeMode="contain"
                        style={{
                            width: 300,
                            height: 350,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: 50
                        }}
                        source={
                            scannedImage == undefined
                                ? require('../../Assets/Image/scanner.png')
                                : { uri: scannedImage }
                        }
                    /> : null}
                    <Text style={{ fontSize: 16, marginTop: 20, fontWeight: 'bold', marginHorizontal: 20 }}>{text}</Text>
                </ScrollView>
                <Button
                    title={'Scan Docs'}
                    bgColor={COLOR.green}

                    onPress={scanDocument}
                    color={COLOR.white}
                    marginHorizontal={20}
                />
                <Button
                    title={'Scan Text'}
                    bgColor={COLOR.green}
                    marginTop={10}
                    onPress={getImage}
                    color={COLOR.white}
                    marginHorizontal={20}
                />
                <Button
                    title={'Close'}
                    marginHorizontal={20}
                    color={COLOR.black}
                    bgColor={COLOR.white}
                    onPress={() => props.navigation.goBack()}
                    marginTop={10}
                    marginBottom={30}
                    borderWidth={1}
                />
            </View>
        </View>
    );
};

export default ScanDocScreen;