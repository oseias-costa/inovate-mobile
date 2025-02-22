import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { router } from 'expo-router';

export default async function useError(error: Error | null) {
  const getError = error as AxiosError;
  if (getError.response?.status === 401) {
    await AsyncStorage.removeItem('token');
    return router.push('/auth/login');
  }
}
