import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('myData');
    const userData = JSON.parse(jsonValue);
    const token = userData.data.token;
    return token
};