import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const token = userData.data.token;
    // console.log('====================================');
    // console.log(token);
    // console.log('====================================');
    return token
};
export const MyID = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const myID = userData.data.userDetails.id
    // console.log('====================================');
    // console.log(myID);
    // console.log('====================================');
    return myID
};