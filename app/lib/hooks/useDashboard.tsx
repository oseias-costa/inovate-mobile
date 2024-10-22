import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect } from 'react';

import { useUser } from '../../components/UserProvider';
import { httpClient } from '../http.client';

export default function useDashboard() {
  const { user, refetch } = useUser();

  const {
    data: requests,
    isFetching: isFetchingRequests,
    refetch: refetchRequest,
    error,
  } = useQuery({
    queryKey: ['requests-pending'],
    queryFn: async () =>
      await httpClient({
        method: 'GET',
        path: '/requests',
        queryString: {
          companyUuid: user?.uuid,
          status: 'PENDING',
          limit: 3,
          page: 1,
        },
      }),
    enabled: false,
  });

  const {
    data: notice,
    isFetching: isFetchingNotice,
    refetch: refetchNotice,
  } = useQuery({
    queryKey: ['notice'],
    queryFn: async () =>
      httpClient({
        method: 'GET',
        path: '/notice',
        queryString: {
          companyUuid: user?.uuid,
          limit: 3,
          page: 1,
        },
      }),
    enabled: false,
  });

  const {
    data: reports,
    isFetching: isFetchingReports,
    refetch: refetchReport,
  } = useQuery({
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
    enabled: false,
  });

  const {
    data: numbers,
    isFetching: isFetchingNumbers,
    refetch: refetchNumbers,
    error: numbersError,
  } = useQuery({
    queryKey: ['numbers'],
    queryFn: async () =>
      httpClient({
        method: 'GET',
        path: `/notifications/numbers`,
        queryString: {
          uuid: user?.uuid,
        },
      }),
    enabled: false,
  });

  if (numbersError) {
    console.log(numbersError);
  }

  useFocusEffect(
    useCallback(() => {
      refetchReport();
      refetchNotice();
      refetchRequest();
    }, [])
  );

  const refetchAllItems = () => {
    refetchRequest();
    refetchReport();
    refetchNotice();
    refetchNumbers();
  };

  useEffect(() => {
    if (!user) {
      refetch();
    }
    if (user) {
      refetchAllItems();
    }
  }, [user]);

  return {
    data: { requests, notice, reports, numbers },
    isFetching: isFetchingNotice || isFetchingReports || isFetchingRequests || isFetchingNumbers,
    refetch: async () => refetchAllItems(),
  };
}
