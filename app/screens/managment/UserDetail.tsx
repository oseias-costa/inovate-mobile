import Modal from '@ant-design/react-native/lib/modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import { httpClient } from '../../lib/http.client';

import { useLoading } from '~/app/components/LoadingProvider';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';
import { User } from '~/app/lib/types/user.type';
import { Switch } from '@ant-design/react-native';

export type UserDetail = {
  name?: string;
  email?: string;
  type?: 'COMPANY' | 'USER' | 'ADMIN';
  status?: 'ACTIVE' | 'INACTIVE' | 'FIRST_ACESS' | 'PASSWORD_RESET';
  uuid: string;
};

const userType: Record<'COMPANY' | 'USER' | 'ADMIN', string> = {
  COMPANY: 'Empresa',
  USER: 'Usuário',
  ADMIN: 'Admin',
};

export default function UserDetails() {
  const [user, setUser] = useState<UserDetail>({
    name: '',
    email: '',
    type: 'USER',
    status: 'INACTIVE',
    uuid: '',
  });
  const [status, setStatus] = useState(user.status === 'ACTIVE' ? true : false);
  const [error, setError] = useState({ input: '', message: '' });
  const isMutation = useIsMutating({ mutationKey: ['update-user'], exact: true });
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { showToast } = useToast();
  const router = useRouter();
  const { uuid } = useLocalSearchParams();

  const showToasting = () => showToast('Usuário editado com sucesso', Severity.SUCCESS);
  const showLoading = () => setLoading(true);

  const { data } = useQuery<User>({
    queryKey: ['user' + uuid],
    queryFn: () =>
      httpClient({
        method: 'GET',
        path: '/users/' + uuid,
      }),
  });

  useEffect(() => {
    if (data) {
      setUser({
        name: data?.name,
        email: data?.email,
        type: data?.type,
        status: data?.status,
        uuid: data?.uuid,
      });
      setStatus(data.status === 'ACTIVE' ? true : false);
    }
  }, [data]);

  const mutation = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async () =>
      httpClient({
        method: 'PATCH',
        path: '/users/update-user',
        data: {
          name: user.name,
          status: user.status,
          uuid: user.uuid,
        },
      }),
    onError: (err) => {
      setLoading(false);
      console.log('e)rror', err);
    },
    onSuccess: () => {
      setLoading(false);
      showToasting();
      router.push(`/screens/managment/Users`);
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

  const disableButton =
    user.name !== data?.name ||
    (data?.status === 'ACTIVE' && status !== true) ||
    (data?.status === 'INACTIVE' && status !== false);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Detalhes do usuário',
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
          state={user}
          setState={setUser}
        />
        <CustomTextInput
          item="email"
          placeholder="Email"
          error={error}
          setError={setError}
          state={user}
          setState={setUser}
          notEditable={true}
        />
        <CustomTextInput
          item="type"
          itemMapper={userType[user?.type ?? 'USER']}
          placeholder="Tipo do usuário"
          error={error}
          setError={setError}
          state={user}
          setState={setUser}
          notEditable={true}
        />
        <View style={style.typeContainer}>
          <Text style={style.typeDescription}>Status</Text>
          <Switch
            checked={status}
            onChange={(data) => {
              console.log('data', data);
              setStatus(!status);
              setUser({ ...user, status: data ? 'ACTIVE' : 'INACTIVE' });
            }}
          />
        </View>
        <CustomButton
          disabled={!disableButton}
          style={{ marginHorizontal: 20, height: 40, marginTop: 'auto' }}
          type="primary"
          onPress={() => mutation.mutate()}>
          Editar
        </CustomButton>
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
  typeDescription: {
    color: '#716F6F',
    fontFamily: 'Lato_400Regular',
    marginBottom: 20,
    fontSize: 19,
  },
  typeContainer: {
    display: 'flex',
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#C5C4C0',
  },
});
