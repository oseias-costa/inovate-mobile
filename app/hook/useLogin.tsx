import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { Dispatch, SetStateAction, useState } from 'react';

import { useUser } from '../components/UserProvider';
import { User } from '../lib/types/user.type';

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

      router.replace('/(drawer)/(tabs)/dashboard');
    },
    onError: (error) => {
      console.log('E-mail ou senha incorretos', error);
      setError('E-mail ou senha incorretos');
    },
  });

  return { mutate, fetchToken };
};
