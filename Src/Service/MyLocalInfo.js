import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromStorage = async (key) => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
        return null;
    }
};


export const setDataInStorage = async (key, data) => {
    try {
        const jsonData = JSON.stringify(data); // Convert data to JSON string
        await AsyncStorage.setItem(key, jsonData); // Set data in AsyncStorage with the provided key
    } catch (error) {
        console.error('Error setting data in AsyncStorage:', error);
    }
};