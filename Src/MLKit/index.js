import {NativeModules} from 'react-native';

const {TextRecognitionModule} = NativeModules;

export const recognizeImages = (url) => {
  return TextRecognitionModule.recognizeImage(url);
};