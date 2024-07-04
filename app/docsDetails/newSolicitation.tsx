import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Subtitle from '../components/Subtitle';
import { useState } from 'react';
import TextInputCustom from '../components/TextInputCustom';
import useGetCompanys from '../hook/useGetCompanys';
import { MaterialIcons } from '@expo/vector-icons';
import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import { Ionicons } from '@expo/vector-icons';

export default function NewSolicitation() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [error, setError] = useState('');
  const [data, setData] = useState({ email: '', password: '' });
  const { data: companys } = useGetCompanys();
  const [selectCompany, setSelectCompany] = useState(false);
  const [companySelected, setCompanySelected] = useState({ id: '', name: '' });

  return (
    <View style={{ backgroundColor: '#fff', paddingTop: 20, flex: 1 }}>
      <View style={{ paddingBottom: 20 }}>
        <Subtitle text="Nova solicitação" />
      </View>
      <Modal
        animationType="slide"
        visible={selectCompany}
        onRequestClose={() => setSelectCompany(false)}>
        <SafeAreaView style={{ backgroundColor: '#00264B' }}>
          <View style={style.header}>
            <TouchableOpacity onPress={() => setSelectCompany(false)}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
            <Text style={style.title}>Selecione a Empresa</Text>
            <TouchableOpacity onPress={() => setSelectCompany(false)}>
              <Text style={{ color: '#fff' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View style={style.body}>
            <View style={{paddingTop: 10}}>
              {companys?.map((company: any) => {
                return (
                  <RadioItem
                    key={company.id}
                    checked={companySelected.id === company.id}
                    onChange={() => {
                      setCompanySelected({ id: company.id, name: company.name });
                      setSelectCompany(false);
                    }}
                    value={company.id}
                    children={
                      <View style={{ marginTop: 4 }}>
                        <Text style={{
                            fontFamily: 'Lato_400Regular',
                            fontSize: 18,
                            color: companySelected.name === company.name ? '#1677ff' : '#5D5B5B',
                        }}>{company.name}</Text>
                      </View>
                    }
                    left={true}
                  />
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity
        style={{
          borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
          borderWidth: 1,
          height: 47,
          padding: 10,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        onPress={() => setSelectCompany(true)}
      >
        <Text
          numberOfLines={1}
          style={{
            color: '#363636',
            fontFamily: 'Lato_400Regular',
            fontSize: 18,
          }}>
          {companySelected.name || 'Selecione uma empresa'}
        </Text>
        <Ionicons name="chevron-down" size={24} color="#7B8A92" />
      </TouchableOpacity>
      <TextInput
        style={{
          borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
          borderWidth: 1,
          height: 47,
          padding: 10,
          borderRadius: 5,
          color: '#363636',
          marginHorizontal: 20,
          marginVertical: 5,
          fontFamily: 'Lato_400Regular',
          fontSize: 18,
        }}
        defaultValue={data.email}
        onFocus={() => setOther({ color: '#2E77FF', input: 'company' })}
        onBlur={() => setOther({ color: '#2E77FF', input: 'company' })}
        placeholder="Documento"
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

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
