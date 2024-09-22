import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';

type NewSolicitationProps = {
  requesterId: string;
  companyId: string;
  document: string;
  description: string;
  realmId: string;
  expiration: string;
};

export default function useNewSolicitation(solicitation: NewSolicitationProps) {
  const queryClient = useQueryClient();

  const postCreateDoc = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios({
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}/document/create-request`,
      method: 'POST',
      data: solicitation,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: postCreateDoc,
    onSuccess: (data) => {
      router.replace('/docsDetails/SolicitationSucess');
      return queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        console.log(error.response.data.message);
      }
    },
  });
}
