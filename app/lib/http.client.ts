import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface HttpClient {
  path: string;
  method: string;
  data?: any;
  queryString?: { [key: string]: string | number };
}

export const httpClient = async (httpData: HttpClient) => {
  const token = await AsyncStorage.getItem('token');
  const url = new URL(`${process.env.EXPO_PUBLIC_API_URL}${httpData.path}`);
  const params = new URLSearchParams();

  if (httpData.queryString) {
    Object.entries(httpData.queryString).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    url.search = params.toString();
  }

  const res = await axios({
    method: httpData.method,
    baseURL: url.toString(),
    headers: { Authorization: `Bearer ${token}` },
    data: httpData.data,
  });

  return res.data;
};
