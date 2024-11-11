import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { router, SplashScreen, Redirect } from 'expo-router';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { httpClient } from '../lib/http.client';
import { User } from '../lib/types/user.type';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refetch: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  refetch: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data, isError, error, isSuccess, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      return httpClient({
        method: 'GET',
        path: `/users/get-user/${token}`,
      });
    },
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }

    if (user?.name === '') {
      refetch();
    }
    if (data === undefined) {
      return router.push('/auth/login');
    }
  }, [data, error, user]);

  if (isError) {
    const getError = error as AxiosError;
    if (getError.response?.status === 401) {
      setUser(null);
      AsyncStorage.removeItem('token');
      return router.navigate('/auth/login');
    }
  }

  return <UserContext.Provider value={{ user, setUser, refetch }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
