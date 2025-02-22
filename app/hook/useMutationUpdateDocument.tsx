import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import Modal from '@ant-design/react-native/lib/modal';
import { Dispatch, SetStateAction } from 'react';

type Error = {
  input: string;
  message: string;
};

type UpdateSolicitationProps = {
  id: string;
  document: string;
  description: string;
  expiration: string;
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
};

export default function useMutationUpdateDocument(document: UpdateSolicitationProps) {
  const queryClient = useQueryClient();

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  return useMutation({
    mutationKey: [document.id],
    mutationFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const updateRequest = await axios({
        method: 'PATCH',
        data: {
          id: document.id,
          document: document.document,
          description: document.description,
          expiration: String(document.expiration),
        },
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/document/update-request`,
        headers: { Authorization: `Bearer ${token}` },
      });
      return updateRequest.data;
    },
    onSuccess: () => {
      router.push('/docsDetails/updateSucess');
      return queryClient.invalidateQueries({
        queryKey: [`document-${document.id}`, 'documents', document.id],
      });
    },
    onError: (err: AxiosError | any) => {
      if (err?.response?.data?.message[0]) {
        document.setError(err);
        errModal(err);
      }
    },
  });
}
