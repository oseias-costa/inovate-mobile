import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
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

  const { data, isError, error, isSuccess } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/get-user/${token}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return user.data;
    },
    // retry: false,
  });

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

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
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
