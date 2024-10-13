import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';

import useError from './useError';
import { useUser } from '../components/UserProvider';
import { httpClient } from '../lib/http.client';

export default function useDashboard() {
  const { user } = useUser();

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
  });

  useFocusEffect(
    React.useCallback(() => {
      refetchReport();
      refetchNotice();
      refetchRequest();
    }, [])
  );

  useEffect(() => {
    refetchReport();
    refetchNotice();
    refetchRequest();
  }, [user]);

  return {
    data: { requests, notice, reports },
    isFetching: isFetchingNotice || isFetchingReports || isFetchingRequests,
  };
}
