import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const httpClient = async (path: string, method: string, data?: any) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios({
    method,
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}${path}`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  });

  return res.data;
};
