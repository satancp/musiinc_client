import AsyncStorage from '@react-native-async-storage/async-storage';

const setKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('set local data error', key, value, e);
  }
};

const getKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return undefined;
  } catch (e) {
    console.log('get local data error', key, e);
    return undefined;
  }
};

export default { setKey, getKey };
