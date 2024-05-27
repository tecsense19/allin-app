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
