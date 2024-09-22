import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useUser } from '../components/UserProvider';

export default function useDashboard() {
  const { user } = useUser();

  const { data: requests, isFetching: isFetchingRequests } = useQuery({
    queryKey: ['requests-pending'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const companys = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/requests?companyUuid=${user?.uuid}&status=DUE`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });

  const { data: notice, isFetching: isFetchingNotice } = useQuery({
    queryKey: ['notice'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const companys = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/notice?companyUuid=${user?.uuid}&limit=3`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });

  const { data: reports, isFetching: isFetchingReports } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const companys = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/reports?companyUuid=${user?.uuid}&limit=3`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });

  return {
    data: { requests, notice, reports },
    isFetching: isFetchingNotice || isFetchingReports || isFetchingRequests,
  };
}
