import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Subtitle from '../components/Subtitle';
import { useEffect, useState } from 'react';
import Select from '../components/Select';
import SelectCompany from '../components/SelectCompany';
import { SelectDate } from '../components/SelectDate';
import CustomTextInput from '../components/CustomTextInput';
import { useIsMutating } from '@tanstack/react-query';
import useNewSolicitation from '../hook/useNewSolicitation';
import useGetUser from '../hook/useGetUser';
import ButtonAnt from '@ant-design/react-native/lib/button';
import Loading from '../components/Loading';
import { newSolicitationError } from '../lib/errors';
import Modal from '@ant-design/react-native/lib/modal';

export default function NewSolicitation() {
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState({ document: '', description: '' });
  const [companySelected, setCompanySelected] = useState({ id: '', name: '' });
  const [expiration, setExpiration] = useState<Date | undefined>(undefined);
  const { user } = useGetUser();
  const isMutation = useIsMutating({ mutationKey: ['documents'], exact: true });
  const {
    error: errorRequest,
    data: response,
    mutate,
  } = useNewSolicitation({
    companyId: companySelected.id,
    document: data.document,
    description: data.description,
    expiration: String(expiration),
    realmId: String(user?.reamlID),
    requesterId: String(user?.id),
  });

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  useEffect(() => {
    if (errorRequest?.response?.data?.message[0]) {
      const error = newSolicitationError(errorRequest?.response?.data?.message);
      console.log(error);
      setError(error);
    }
    if (errorRequest?.response?.data?.message[0]) {
      errModal(error.message);
    }
  }, [errorRequest]);

  return (
    <SafeAreaView style={style.container}>
      <Loading isLoading={!!isMutation} />
      <View style={{ paddingBottom: 15, paddingTop: 20 }}>
        <Subtitle text="Nova solicitação" />
        <Text style={style.description}>
          Preencha os campos abaixo para abrir uma nova solicitação.
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
      <Select checkValue={companySelected.name} title="Selecione a empresa" placeholder="Empresa">
        <SelectCompany companySelected={companySelected} setCompanySelected={setCompanySelected} />
      </Select>
      <SelectDate dateValue={expiration} setDate={setExpiration} placeholder="Selecione um prazo" />
      <ButtonAnt style={style.button} type="primary" onPress={() => mutate()}>
        Abrir solicitação
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
