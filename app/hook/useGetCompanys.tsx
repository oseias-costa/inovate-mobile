import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { httpClient } from '../lib/http.client';

export default function useGetCompanys() {
  return useQuery({
    queryKey: ['companys'],
    queryFn: async () =>
      httpClient({
        path: '/users',
        method: 'GET',
        queryString: {
          type: 'COMPANY',
          limit: 12,
          page: 1,
        },
      }),
  });
}
