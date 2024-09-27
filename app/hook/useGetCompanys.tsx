import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetCompanys() {
  return useQuery({
    queryKey: ['companys'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const companys = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/companys`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });
}
