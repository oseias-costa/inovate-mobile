import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { httpClient } from '../lib/http.client';

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  refetch: () => void;
}

type User = {
  uuid: string;
  createAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  reamlID: string;
  status: string;
  type: string;
  updateAt: string;
};

export const UserContext = createContext<UserContextType | n>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialValue);

  const { data, isError, error, isSuccess, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      return httpClient({
        method: 'GET',
        path: `/users/get-user/${token}`,
      });
    },
  });

  if (isError) {
    console.log('error user', error);
  }

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }

    if (error) {
      const getError = error as AxiosError;
      if (getError.response?.status === 401) {
        AsyncStorage.removeItem('token');
        return router.navigate('/auth/login');
      }
    }
  }, [data, error]);

  return <UserContext.Provider value={{ user, setUser, refetch }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

const initialValue = {
  uuid: '',
  createAt: '',
  email: '',
  id: '',
  name: '',
  password: '',
  reamlID: '',
  status: '',
  type: '',
  updateAt: '',
};
