import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

import useGetUser from './hook/useGetUser';

export default function Home() {
  const [token, setToken] = useState('');
  const { user } = useGetUser();

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!user?.id.length) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/(drawer)/(tabs)/dashboard" />;
}
