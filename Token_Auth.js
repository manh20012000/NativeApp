import  AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN_KEY = 'userToken';

export const saveUserToken = async (token) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving user token:', error);
  }
};
export const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem(USER_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting user token:', error);
  }
};
export const clearUserToken = async () => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing user token:', error);
  }
};