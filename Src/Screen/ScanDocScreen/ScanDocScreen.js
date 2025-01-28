import React, { useState, useEffect, useRef } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import Button from '../../Custom/Button/Button';
import MyAlert from '../../Custom/Alert/PermissionAlert';
// import TextRecognition, {
//     TextRecognitionScript,
// } from '@react-native-ml-kit/text-recognition'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PDFView from 'react-native-view-pdf';

import RNFS from 'react-native-fs';
// import { File_Uplode } from './Src/Service/actions';
// import { getToken } from './Src/Service/AsyncStorage';
import RNFetchBlob from 'rn-fetch-blob';
import { Chat_File_Message, Docs_File_Uplode, File_Uplode, Images_To_Pdf, Scan_Document_List } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import Loader from '../../Custom/Loader/loader';
import ProfileModal from '../../Custom/Modal/ProfileModal';
import { pdfGenerator } from '../../MLKit/pdfGenerator';

const ScanDocScreen = props => {
    const pdfRef = useRef();

    const [scannedImage, setScannedImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const [isFlagPdf, setIsFlagPdf] = useState(0); // 1 = image, 2 = text
    const [pdfDetails, setPdfDetails] = useState({
        name: '',
        uri: '',
        type: ''
    });
    const [pdfList, setPdfList] = useState([]);

    const chatData = props?.route?.params

    // const getImage = async () => {
    //     setText('')
    //     // console.log(token);
    //     await launchCamera().then(async (image) => {

    //         if (image.assets[0].uri) {
    //             const result = await TextRecognition.recognize(
    //                 image.assets[0].uri,
    //                 TextRecognitionScript.JAPANESE
    //             );
    //             let recognizedText = '';
    //             result.blocks.forEach(block => {
    //                 recognizedText += block.text + '\n'; // Add each block's text followed by a newline
    //             });
    //             setText(recognizedText.trim());
    //             // const filePath = RNFS.DocumentDirectoryPath + '/recognized_text.txt';
    //             // await RNFS.writeFile(filePath, recognizedText, 'utf8');
    //             // // console.log('Text saved to:', filePath);
    //             // const url = `file://${filePath}`;
    //             // // Linking.openURL(url);

    //             // const profileImageUri = url;
    //             // const profileImageName = profileImageUri ? profileImageUri.split('/').pop() : '';
    //             // const profileImageType = 'txt'
    //             // formData.append('file', {
    //             //     uri: profileImageUri,
    //             //     name: profileImageName,
    //             //     type: profileImageType
    //             // });
    //         }
    //     })
    // }
    // console.log(scannedImage);
    // const scanDocument = async () => {
    //     setText('')
    //     const { scannedImages } = await DocumentScanner.scanDocument({
    //         letUserAdjustCrop: true,
    //         croppedImageQuality: 100,
    //         maxNumDocuments: 1
    //     });
    //     if (scannedImages.length > 0) {
    //         const fileName = scannedImages[0].substring(scannedImages[0].lastIndexOf('/') + 1);
    //         const filePath = scannedImages[0]
    //         const lastDotIndex = scannedImages[0].lastIndexOf('.');
    //         const fileType = scannedImages[0].substring(lastDotIndex + 1)
    //         setScannedImage({ fileName, filePath, fileType });            
    //         if (chatData.isChat == true) {
    //             SendScanDoc(fileName, filePath, fileType)
    //             ScanDocStore(fileName, filePath, fileType)
    //         }
    //         else {
    //             ScanDocStore(fileName, filePath, fileType)
    //         }
    //     }
    // };
    // const ScanDocStore = async (name, path, type) => {
    const ScanDocStore = async () => {
        setLoading(true)
        const formData = new FormData();
        if (pdfDetails.name) {
            formData.append('file', pdfDetails);
            formData.append('attachment_type', 'scan');
        }
        const token = await getToken()
        const data = await Docs_File_Uplode(token, formData,)
        setLoading(false)
        // setPdfDetails({
        //     name: '',
        //     uri: '',
        //     type: ''
        // });
        setPdfList([]);
        // console.log(data);
    }
    const SendScanDoc = async (name, path, type) => {
        setLoading(true)
        const formData = new FormData();
        const AttachmentUri = path
        const AttachmentName = name
        if (AttachmentName) {
            formData.append('file', { uri: AttachmentUri, name: AttachmentName, type: type });
        }
        const token = await getToken()
        const data = await File_Uplode(token, formData,)

        if (data?.status_code == 200) {
            const fileName = data.data.image_name
            const fileType = data.data.file_type
            Chat_File_Message('Attachment', fileName, chatData?.id, token, fileType)
                .then((res) => {
                    if (res?.status_code == 200) {
                        Alert.alert(res?.message)
                        setLoading(false)
                        props.navigation.goBack()
                    }
                })
        } else {

            setLoading(false)
        }
    }
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
            // console.log(error);
        }
    };
    useEffect(() => {
        requestCameraPermission();
    }, []);

    const imageModal = (flag) => {
        setVisible(true);
        setIsFlagPdf(flag);
    }
    const profileImgCemera = async () => {
        const result = await launchCamera();
        if (result?.assets[0]?.uri) {
            pdfCreator(result?.assets[0]?.uri);
        }
        setVisible(false);
    };
    const profileImgGallery = async () => {
        const result = await launchImageLibrary();
        if (result?.assets[0]?.uri) {
            pdfCreator(result?.assets[0]?.uri);
        }
        setVisible(false);
    };
    const pdfCreator = async (imageUrl) => {
        let pdfUrl = await pdfGenerator(imageUrl, isFlagPdf);
        const pdfNameIndex = pdfUrl.filePath.lastIndexOf('/') + 1;
        const pdfName = pdfUrl.filePath.slice(pdfNameIndex);
        const lastDotIndex = pdfUrl.filePath.lastIndexOf('.');
        const pdfType = pdfUrl.filePath.substring(lastDotIndex + 1)
        const filePath = `file://${pdfUrl.filePath}`
        setPdfDetails({
            name: pdfName,
            uri: filePath,
            type: pdfType
        })
    }

    const scanDocument = async () => {
        DocumentScanner.scanDocument()
            .then(({ scannedImages }) => {
                if (!scannedImages?.length) {
                    throw new Error('No images scanned');
                }
                // console.log('scannedImages======>>>', scannedImages);
                let tempImageArray = [];
                scannedImages.map(async (imagePath) => {
                    const formData = new FormData();
                    const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                    const imageExtention = imageName.substring(imageName.indexOf('.') + 1);
                    const imageType = `image/${imageExtention}`;
                    const imageObj = {
                        uri: imagePath,
                        name: imageName,
                        type: imageType
                    }
                    formData.append('image[]', [imageObj])
                    Images_To_Pdf(formData).then((response) =>{
                        // console.log('response======>>>', response); 
                        if (response.pdf_url) {
                            tempImageArray.push(response.pdf_url);
                        }
                    })
                })
                // console.log('tempImageArray======>>>', tempImageArray);
                // setScannedImage(tempImageArray)
                setPdfList(tempImageArray);
            })
            .catch(error => console.log(`Failed to create PDF: ${error}`));
    };

    return (
        <View style={styles.mainContainer}>
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader color={COLOR.white} title={'Scan document'} onPress={() => props.navigation.goBack()} />
            </View>
            <View
                style={styles.detailsContainer}>

                {pdfList.length > 0 ?
                    <>
                        <PDFView
                            key={pdfList[0]}
                            ref={pdfRef}
                            style={{ flex: 1 }}
                            resource={pdfList[0]}
                            fileFrom={"documentsDirectory"}
                            resourceType={"url"}
                            onLoad={() => console.log(`PDF rendered from`)}
                            onError={(error) => console.log('Cannot render PDF', error)}
                        />
                        <Button title={'Save'} bgColor={COLOR.green} onPress={() => ScanDocStore()} color={COLOR.white} marginHorizontal={20} marginBottom={30} />
                    </>
                    :
                    <>
                        <ScrollView style={{}} bounces={false}>
                            {text == '' ? <Image
                                resizeMode="contain"
                                style={styles.scaniconAndImage}
                                source={scannedImage.length == 0
                                    ? require('../../Assets/Image/scanner.png')
                                    : { uri: scannedImage[0].filePath }} /> : null}
                            <Text style={styles.scanText}>{text}</Text>
                        </ScrollView>

                        <Button title={'Image to Pdf'} bgColor={COLOR.green} onPress={() => scanDocument()} color={COLOR.white} marginHorizontal={20} />
                        <Button title={'Text Recognition'} bgColor={COLOR.green} onPress={() => imageModal(2)} color={COLOR.white} marginHorizontal={20} marginTop={10} />
                        {/* <Button title={'Scan Docs'} bgColor={COLOR.green} onPress={scanDocument} color={COLOR.white} marginHorizontal={20} /> */}
                        <Button title={'View Docs'} bgColor={COLOR.green} marginTop={10} onPress={() => props.navigation.navigate('docstore')} color={COLOR.white} marginHorizontal={20} />
                        {/* <Button title={'Scan Text'} bgColor={COLOR.green} marginTop={10} onPress={getImage} color={COLOR.white} marginHorizontal={20}/> */}
                        <Button title={'Close'} marginHorizontal={20} color={COLOR.black} bgColor={COLOR.white} onPress={() => props.navigation.goBack()} marginTop={10} marginBottom={30} borderWidth={1} />
                    </>
                }

            </View>
            <Loader visible={loading} Retry={() => ScanDocStore()} />
            <ProfileModal onRequestClose={() => setVisible(false)} visible={visible} onClose={() => setVisible(false)} onCemera={() => { requestCameraPermission(); profileImgCemera(); }} onGallery={() => profileImgGallery()} />
        </View>
    );
};

export default ScanDocScreen;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLOR.black },
    detailsContainer: { flex: 1, marginTop: 10, backgroundColor: COLOR.white, borderTopRightRadius: 20, borderTopLeftRadius: 20, },
    scaniconAndImage: { width: 300, height: 350, resizeMode: 'contain', alignSelf: 'center', marginTop: 50 },
    scanText: { fontSize: 16, marginTop: 20, fontWeight: 'bold', marginHorizontal: 20 }
})