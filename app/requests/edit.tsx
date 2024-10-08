import ButtonAnt from '@ant-design/react-native/lib/button';
import Modal from '@ant-design/react-native/lib/modal';
import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import Loading from '../components/Loading';
import Select from '../components/Select';
import SelectCompany from '../components/SelectCompany';
import { SelectDate } from '../components/SelectDate';
import Subtitle from '../components/Subtitle';
import useGetCompanys from '../hook/useGetCompanys';
import useMutateRemoveDocument from '../hook/useMutateRemoveDocument';
import useMutationUpdateDocument from '../hook/useMutationUpdateDocument';
import { httpClient } from '../lib/http.client';

export default function UpdateSolicitation() {
  const { id } = useLocalSearchParams();

  const { data: request } = useQuery({
    queryKey: [`request-${id}`],
    queryFn: async () =>
      httpClient({
        path: `/requests/${id}`,
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

  const isMutation = useIsMutating({ mutationKey: [id], exact: true });

  const mutation = useMutation({
    mutationKey: [id],
    mutationFn: async () =>
      httpClient({
        method: 'PATCH',
        path: `/requests/${id}`,
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
      router.navigate('/(tabs)/requests');
      return queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  const deleteDocument = useMutateRemoveDocument(String(id));
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
      params: {
        type: 'success',
        text1: 'Solicitação excluída',
        text2: 'A solicitação foi excluída com sucesso. 👋',
      },
    });
    return queryClient.invalidateQueries({
      queryKey: ['documents', request.uuid],
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
        <Loading isLoading={!!isMutation} />
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
        <ButtonAnt style={style.button} type="primary" onPress={() => mutation.mutate()}>
          Editar solicitação
        </ButtonAnt>
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
