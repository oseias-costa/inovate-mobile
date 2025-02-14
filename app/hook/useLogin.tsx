import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { Dispatch, SetStateAction, useState } from 'react';

import { useUser } from '../components/UserProvider';

type LoginData = {
  email: string;
  password: string;
};

export const useLogin = (setError: Dispatch<SetStateAction<string>>) => {
  const [fetchToken, setFetchToken] = useState(false);
  const { setUser } = useUser();

  const postData = async (data: LoginData) => {
    const response = await axios({
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
      method: 'POST',
      data,
    });
    return response.data;
  };

  const mutate = useMutation({
    mutationFn: postData,
    mutationKey: ['login'],
    onSuccess: async (data) => {
      AsyncStorage.setItem('token', data['token']);
      setUser(data.user);

      setError('');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(drawer)/(tabs)/dashboard');
    },
    onError: (error) => {
      setError('E-mail ou senha incorreta');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
  });

  return { mutate, fetchToken };
};
