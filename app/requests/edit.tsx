import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Subtitle from '../components/Subtitle';
import { useEffect, useState } from 'react';
import Select from '../components/Select';
import SelectCompany from '../components/SelectCompany';
import { SelectDate } from '../components/SelectDate';
import CustomTextInput from '../components/CustomTextInput';
import { useIsMutating, useQueryClient } from '@tanstack/react-query';
import ButtonAnt from '@ant-design/react-native/lib/button';
import Loading from '../components/Loading';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import useGetCompanys from '../hook/useGetCompanys';
import useGetDocumentById from '../hook/useGetDocumentById';
import useMutationUpdateDocument from '../hook/useMutationUpdateDocument';
import useMutateRemoveDocument from '../hook/useMutateRemoveDocument';
import Modal from '@ant-design/react-native/lib/modal';

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
  const isMutation = useIsMutating({ mutationKey: [id], exact: true });
  const { mutate } = useMutationUpdateDocument({
    id: String(id),
    document: data.document,
    description: data.description,
    expiration: document.expiration,
    setError,
    error,
  });
  const deleteDocument = useMutateRemoveDocument(String(id));
  const queryClient = useQueryClient()

  const deleteModal = () => {
    Modal.alert(<Text style={{color: 'red'}}>Deseja realmente excluir?</Text>, <Text style={style.descriptionModal}>Atenção, essa ação não poderá ser desfeita.</Text>, [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'Excluir', onPress: () => deleteDocument.mutate() },
    ]);
  };

  const deleteSucess = () => {    
    router.navigate({pathname: '/docs', params: {
      type: 'success',
      text1: 'Solicitação excluída',
      text2: 'A solicitação foi excluída com sucesso. 👋',
    }})
      return queryClient.invalidateQueries({
        queryKey: ['documents', document.id],
      });
  }

  useEffect(() => {
    if(deleteDocument?.isSuccess){
      deleteSucess()
    }
  },[deleteDocument])

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
          disable={true}>
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
        <ButtonAnt style={style.button} type="primary" onPress={() => mutate()}>
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
  }
});
