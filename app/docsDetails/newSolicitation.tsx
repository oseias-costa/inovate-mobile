import { Modal, SafeAreaView, Text, TextInput, View } from 'react-native';
import Subtitle from '../components/Subtitle';
import { useMemo, useRef, useState } from 'react';
import TextInputCustom from '../components/TextInputCustom';
import useGetCompanys from '../hook/useGetCompanys';
import { Button } from '~/components/Button';

export default function NewSolicitation() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [error, setError] = useState('');
  const [data, setData] = useState({ email: '', password: '' });
  const { data: companys } = useGetCompanys();
  const [selectCompany, setSelectCompany] = useState(false)

  return (
    <View style={{ backgroundColor: '#fff', paddingTop: 20, flex: 1 }}>
      <View style={{ paddingBottom: 20 }}>
        <Subtitle text="Nova solicitação" />
      </View>
      <TextInput placeholder="Empresa" onPressIn={() => setSelectCompany(true)} />
      <Modal 
        animationType='slide'
        visible={selectCompany}
        onRequestClose={() => setSelectCompany(false)}
      >
        <SafeAreaView>
        <Text>Test</Text>
        <Button title='Close' onPress={() => setSelectCompany(false)}/>
        </SafeAreaView>
      </Modal>
      <TextInput
        style={{
          width: '100%',
          borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
          borderWidth: 1,
          height: 47,
          padding: 10,
          borderRadius: 5,
          color: '#363636',
          marginVertical: 5,
          fontFamily: 'Lato_400Regular',
          fontSize: 18,
        }}
        defaultValue={data.email}
        onFocus={() => setOther({ color: '#2E77FF', input: 'company' })}
        onBlur={() => setOther({ color: '#2E77FF', input: 'company' })}
        placeholder="E-mail"
        onChange={(e) => {
          setError('');
          setData({ ...data, email: e.nativeEvent.text });
        }}
      />
      <TextInputCustom label="Descrição" text="" />
      <TextInputCustom label="Prazo" text="" />
      <TextInputCustom label="Solicitante" text="" />
    </View>
  );
}
