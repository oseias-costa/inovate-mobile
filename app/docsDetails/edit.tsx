import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Subtitle from '../components/Subtitle';
import { useState } from 'react';
import Select from '../components/Select';
import SelectCompany from '../components/SelectCompany';
import { SelectDate } from '../components/SelectDate';
import CustomTextInput from '../components/CustomTextInput';
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import useGetUser from '../hook/useGetUser';
import ButtonAnt from '@ant-design/react-native/lib/button';
import Loading from '../components/Loading';
import Modal from '@ant-design/react-native/lib/modal';
import { router, useLocalSearchParams } from 'expo-router';
import useGetCompanys from '../hook/useGetCompanys';
import useGetDocumentById from '../hook/useGetDocumentById';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

export default function UpdateSolicitation() {
  const { id } = useLocalSearchParams();
  const { data: document } = useGetDocumentById(String(id));
  const { data: companys } = useGetCompanys();
  const company = companys?.find((item: any) => item.id === document?.companyId);
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState({
    document: document.document,
    description: document.description,
  });
  const [companySelected, setCompanySelected] = useState({
    id: document.companyId,
    name: company?.name,
  });
  const [expiration, setExpiration] = useState<Date | undefined>(document?.expiration);
  const { user } = useGetUser();
  const isMutation = useIsMutating({ mutationKey: [id], exact: true });
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: [id],
    mutationFn: async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(id);
      const updateRequest = await axios({
        method: 'PATCH',
        data: {
          id: id,
          document: data.document,
          description: data.description,
          expiration: String(expiration),
        },
        baseURL: 'http://10.0.0.101:3009/document/update-request',
        headers: { Authorization: `Bearer ${token}` },
      });
      return updateRequest.data;
    },
    onSuccess: (data) => {
      router.navigate('/docsDetails/updateSucess');
      return queryClient.invalidateQueries({ queryKey: [`document-${id}`, 'documents', id] });
    },
    onError: (err: AxiosError | any) => {
      console.log(err);
      if (err?.response?.data?.message[0]) {
        console.log(error);
        setError(error);
        errModal(err);
      }
    },
  });

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  return (
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
        disable={true}>
        <SelectCompany companySelected={companySelected} setCompanySelected={setCompanySelected} />
      </Select>
      <SelectDate dateValue={expiration} setDate={setExpiration} placeholder="Selecione um prazo" />
      <ButtonAnt style={style.button} type="primary" onPress={() => mutate.mutate()}>
        Editar solicitação
      </ButtonAnt>
    </SafeAreaView>
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
});
