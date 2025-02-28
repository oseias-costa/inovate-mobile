import Modal from '@ant-design/react-native/lib/modal';
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider } from '@ant-design/react-native';

import CustomTextInput from '../../components/CustomTextInput';
import Select from '../../components/Select';
import SelectCompany from '../../lib/components/SelectCompany';
import { SelectDate } from '../../components/SelectDate';
import Subtitle from '../../components/Subtitle';
import { httpClient } from '../../lib/http.client';

import { useLoading } from '~/app/components/LoadingProvider';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { useUser } from '~/app/components/UserProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';
import SelectTagButton from '~/app/lib/components/SelectTagButton';
import SelectTag from '~/app/lib/components/SelectTag';

export default function Create() {
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState({ document: '', description: '' });
  const [companySelected, setCompanySelected] = useState({ uuid: '', name: '' });
  const [tagSelected, setTagSelected] = useState({ id: 0, name: '' });
  const [expiration, setExpiration] = useState<Date | undefined>(undefined);
  const { user } = useUser();
  const isMutation = useIsMutating({ mutationKey: ['create-request'], exact: true });
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { showToast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['create-request'],
    mutationFn: async () =>
      httpClient({
        method: 'POST',
        path: '/requests',
        data: {
          document: data.document,
          description: data.description,
          companyUuid: companySelected.uuid,
          requesterUuid: user?.uuid,
          expiration,
          tagId: tagSelected.id,
        },
      }),
    onError: (err) => {
      setLoading(false);
      console.log(err);
    },
    onSuccess: (data) => {
      setLoading(false);
      showToast('Solicitação criada com sucesso', Severity.SUCCESS);
      router.push('/requests');
      setData({ document: '', description: '' });
      setCompanySelected({ uuid: '', name: '' });
      setTagSelected({ id: 0, name: '' });
      setExpiration(new Date());

      return queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  useEffect(() => {
    if (isMutation) {
      setLoading(true);
    }
  }, [isMutation]);

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  return (
    <Provider>
      <SafeAreaView style={style.container}>
        <View style={{ paddingTop: 20, flex: 1 }}>
          <Subtitle text="Nova solicitação" />
          <Text style={style.description}>
            Preencha os campos abaixo para abrir uma nova solicitação.
          </Text>
          <CustomTextInput
            item="document"
            placeholder="Nome do documento"
            state={data}
            setState={setData}
            error={error}
            setError={setError}
          />
          <CustomTextInput
            item="description"
            placeholder="Descrição do documento"
            state={data}
            setState={setData}
            error={error}
            setError={setError}
          />
          <Select
            checkValue={companySelected.name}
            title="Selecione a empresa"
            placeholder="Empresa">
            <SelectCompany
              companySelected={companySelected}
              setCompanySelected={setCompanySelected}
            />
          </Select>
          <SelectDate
            dateValue={expiration}
            setDate={setExpiration}
            placeholder="Selecione um prazo"
          />
          <SelectTagButton
            checkValue={tagSelected.name}
            title="Selecione a etiqueta"
            placeholder="Etiqueta"
            type="REQUEST">
            <SelectTag tagSelected={tagSelected} setTagSelected={setTagSelected} type="REQUEST" />
          </SelectTagButton>
          <CustomButton
            disabled={
              data.document == '' ||
              data.description == '' ||
              companySelected.uuid == '' ||
              !expiration
            }
            type="primary"
            style={{ marginHorizontal: 20, height: 40, marginTop: 'auto' }}
            onPress={() => mutation.mutate()}>
            Abrir solicitação
          </CustomButton>
        </View>
      </SafeAreaView>
    </Provider>
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
    fontSize: 16,
  },
  description: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#A49D9D',
    marginHorizontal: 20,
    paddingBottom: 20,
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
});
