import ButtonAnt from '@ant-design/react-native/lib/button';
import Modal from '@ant-design/react-native/lib/modal';
import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import Loading from '../../components/Loading';
import Select from '../../components/Select';
import SelectCompany from '../../components/SelectCompany';
import { SelectDate } from '../../components/SelectDate';
import Subtitle from '../../components/Subtitle';
import useGetCompanys from '../../hook/useGetCompanys';
import useMutateRemoveDocument from '../../hook/useMutateRemoveDocument';
import { httpClient } from '../../lib/http.client';

import { useLoading } from '~/app/components/LoadingProvider';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';

export default function UpdateSolicitation() {
  const { uuid } = useLocalSearchParams();
  const { setLoading } = useLoading();
  const { showToast } = useToast();

  const { data: request } = useQuery({
    queryKey: [`request-${uuid}`],
    queryFn: async () =>
      httpClient({
        path: `/requests/${uuid}`,
        method: 'GET',
      }),
  });

  const { data: companys } = useGetCompanys();
  const company = companys?.find((item: any) => item.name === request.company);
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState({
    document: request.documentName,
    description: request.description,
  });
  const [companySelected, setCompanySelected] = useState({
    uuid: request.companyId,
    name: company?.name,
  });
  const [expiration, setExpiration] = useState<Date | undefined>(request?.expiration);

  const isMutation = useIsMutating({ mutationKey: [`request-${uuid}`], exact: true });
  const showToasting = () => showToast('Solicitação editada com sucesso', Severity.SUCCESS);

  const mutation = useMutation({
    mutationKey: [`request-${uuid}`],
    mutationFn: async () =>
      httpClient({
        method: 'PATCH',
        path: `/requests/${uuid}`,
        data: {
          document: data.document,
          description: data.description,
          companyUuid: companySelected.uuid,
          expiration,
        },
      }),
    onError: (err) => {
      console.log('e)rror', err);
    },
    onSuccess: (data) => {
      showToasting();
      setLoading(false);
      router.navigate('/(tabs)/requests');
      return queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  const showLoading = () => setLoading(true);

  useEffect(() => {
    if (isMutation) {
      showLoading();
    }
  }, [isMutation]);

  const deleteDocument = useMutateRemoveDocument(String(uuid));
  const queryClient = useQueryClient();

  const deleteModal = () => {
    Modal.alert(
      <Text style={{ color: 'red' }}>Deseja realmente excluir?</Text>,
      <Text style={style.descriptionModal}>Atenção, essa ação não poderá ser desfeita.</Text>,
      [
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteDocument.mutate() },
      ]
    );
  };

  const deleteSucess = () => {
    router.navigate({
      pathname: '/(drawer)/(tabs)/requests',
    });
    return queryClient.invalidateQueries({
      queryKey: ['requests', `request-${uuid}`],
    });
  };

  useEffect(() => {
    if (deleteDocument?.isSuccess) {
      deleteSucess();
    }
  }, [deleteDocument]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Editar',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity onPress={() => deleteModal()}>
              <Text style={style.headerButton}>Excluir</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={style.container}>
        {/* <Loading isLoading={!!isMutation} /> */}
        <View style={{ paddingBottom: 15, paddingTop: 20 }}>
          <Subtitle text="Editar solicitação" />
          <Text style={style.description}>
            Altere os campos necessário e clique em editar a solicitação.
          </Text>
        </View>
        <CustomTextInput
          item="document"
          placeholder="Documento"
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
          placeholder="Empresa"
          disable>
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
        <CustomButton
          style={{ marginHorizontal: 20, height: 40 }}
          type="primary"
          onPress={() => mutation.mutate()}>
          Editar solicitação
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
    fontSize: 16,
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
  headerButton: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  descriptionModal: {
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
    color: '#363636',
  },
});
