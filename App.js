import { View, Text, LogBox, Linking, Alert } from 'react-native'
import React, { useEffect } from 'react'
import StackScreen from './Src/Navigation/Stack/Stcak'
import Contacts from 'react-native-contacts';

LogBox.ignoreAllLogs();
const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <StackScreen />
    </View>
  )
}
export default App



// import React, { useEffect, useState } from 'react';
// import { View, Text, Linking } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import Button from './Src/Custom/Button/Button';
// import TextRecognition, {
//   TextRecognitionScript,
// } from '@react-native-ml-kit/text-recognition';
// import RNFS from 'react-native-fs';
// import { File_Uplode } from './Src/Service/actions';
// import { getToken } from './Src/Service/AsyncStorage';
// import RNFetchBlob from 'rn-fetch-blob';



// const MyTextRecognitionScreen = () => {
//   const [text, setText] = useState('')


//   const getImage = async () => {
//     const formData = new FormData();
//     const token = await getToken()
//     // console.log(token);
//     launchCamera().then(async (image) => {

//       if (image.assets[0].uri) {
//         // console.log(image.assets[0].uri);
//         const result = await TextRecognition.recognize(
//           image.assets[0].uri,
//           TextRecognitionScript.JAPANESE
//         );
//         let recognizedText = '';
//         result.blocks.forEach(block => {
//           recognizedText += block.text + '\n'; // Add each block's text followed by a newline
//         });

//         setText(recognizedText.trim());

//         const filePath = RNFS.DocumentDirectoryPath + '/recognized_text.txt';
//         await RNFS.writeFile(filePath, recognizedText, 'utf8');
//         // console.log('Text saved to:', filePath);
//         const url = `file://${filePath}`;
//         // Linking.openURL(url);

//         const profileImageUri = url;
//         const profileImageName = profileImageUri ? profileImageUri.split('/').pop() : '';
//         const profileImageType = 'txt'
//         formData.append('file', {
//           uri: profileImageUri,
//           name: profileImageName,
//           type: profileImageType
//         });
//         await File_Uplode(token, formData).then((res) => {
//           console.log(res.data.image_path);
//           // downloadFile(res.data.image_path)
//         })

//       }
//     })
//   }
//   const downloadFile = (uri) => {
//     const { config, fs } = RNFetchBlob;
//     const downloadDir = fs.dirs.DocumentDir;
//     const options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: `${downloadDir}`,
//         description: 'Downloading file.',
//       },
//     };

//     RNFetchBlob.config(options)
//       .fetch('GET', uri)
//       .then(res => {
//         // File successfully downloaded
//         console.log('File downloaded to: ', `file://${res.path()}`);
//         Linking.openURL(`file://${res.path()}`)
//       })
//       .catch(err => {
//         // Error handling
//         console.error('Error downloading file: ', err);
//       });
//   };
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', }}>

//       <Button title={"pick"} bgColor={'black'} color={'white'} onPress={getImage} />
//       <Text>{text}</Text>
//     </View>
//   );
// };

// export default MyTextRecognitionScreen;
