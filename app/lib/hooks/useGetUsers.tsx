import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const users = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/get-users`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return users.data;
    },
  });
}
