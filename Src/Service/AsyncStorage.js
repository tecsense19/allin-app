import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const token = userData.data.token;
    return token
};
export const MyID = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const myID = userData.data.userDetails.id
    return myID
};
export const AccountId = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const Accountid = userData.data.userDetails.account_id
    return Accountid
};
export const MyData = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const data = userData.data
    return data
};
