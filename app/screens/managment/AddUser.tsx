import Modal from '@ant-design/react-native/lib/modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router, Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import { httpClient } from '../../lib/http.client';

import { useLoading } from '~/app/components/LoadingProvider';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { useUser } from '~/app/components/UserProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';
import { ModalSelectTypeUser } from '~/app/lib/components/ModalSelectTypeUser';

export type AddUserState = {
  name: string;
  email: string;
  type: 'COMPANY' | 'USER' | 'ADMIN';
};

export default function AddUser() {
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState<AddUserState>({ name: '', email: '', type: 'USER' });
  const isMutation = useIsMutating({ mutationKey: ['add-user'], exact: true });
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { setLoading } = useLoading();
  const { showToast } = useToast();

  const showToasting = () => showToast('Usuário adicionado com sucesso', Severity.SUCCESS);
  const showLoading = () => setLoading(true);

  const mutation = useMutation({
    mutationKey: ['add-user'],
    mutationFn: async () =>
      httpClient({
        method: 'POST',
        path: '/users/create',
        data,
      }),
    onError: (err) => {
      setLoading(false);
      console.log('e)rror', err);
    },
    onSuccess: (data) => {
      setLoading(false);
      showToasting();
      router.navigate(`/(drawer)/dashboard`);
      return queryClient.invalidateQueries({ queryKey: ['users-list'] });
    },
  });

  useEffect(() => {
    if (isMutation) {
      showLoading();
    }
  }, [isMutation]);

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Adicionar usuário',
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, right: 14 }}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={style.container}>
        <View style={{ height: 25 }} />
        <CustomTextInput
          item="name"
          placeholder="Nome"
          error={error}
          setError={setError}
          state={data}
          setState={setData}
        />
        <CustomTextInput
          item="email"
          placeholder="Email"
          error={error}
          setError={setError}
          state={data}
          setState={setData}
        />
        <ModalSelectTypeUser addUser={data} setAddUsers={setData} key={2} />
        <KeyboardAvoidingView>
          <CustomButton
            disabled={!data.email && !data.name}
            style={{ marginHorizontal: 20, height: 40 }}
            type="primary"
            onPress={() => mutation.mutate()}>
            Adicionar
          </CustomButton>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    shadowColor: '#000',
  },
  body: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    color: '#716F6F',
    marginHorizontal: 20,
    paddingBottom: 0,
    paddingTop: 6,
  },
  input: {
    borderWidth: 1,
    height: 47,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#363636',
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 'auto',
    zIndex: 1,
  },
  root: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  inner: {
    flex: 1,
    top: 6,
  },
  label: {
    fontFamily: 'Lato_300Light',
    marginHorizontal: 20,
  },
  headerButton: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
});
