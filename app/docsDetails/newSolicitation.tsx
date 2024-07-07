import {
  Button,
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
import DatePicker from '@ant-design/react-native/lib/date-picker';
import Provider from '@ant-design/react-native/lib/provider';
import List from '@ant-design/react-native/lib/list';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';

import ButtonAnt from '@ant-design/react-native/lib/button';
import Select from '../components/Select';
import SelectCompany from '../components/SelectCompany';
import { SelectDate } from '../components/SelectDate';

export default function NewSolicitation() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [error, setError] = useState('');
  const [data, setData] = useState({ document: '', description: '' });
  const [selectCompany, setSelectCompany] = useState(false);
  const [companySelected, setCompanySelected] = useState({ id: '', name: '' });
  const [expiration, setExpiration] = useState<Date | undefined>(undefined);

  return (
    <View style={{ backgroundColor: '#fff', paddingTop: 20, flex: 1 }}>
      <View style={{ paddingBottom: 20 }}>
        <Subtitle text="Nova solicitação" />
      </View>
      <Text style={style.description}>
        Preencha os campos abaixo para abrir uma nova solicitação.
      </Text>
      <TextInput
        style={[{ borderColor: other.input === 'document' ? '#75BCEE' : '#DADADA' }, style.input]}
        defaultValue={data.document}
        onFocus={() => setOther({ color: '#2E77FF', input: 'document' })}
        onBlur={() => setOther({ color: '#2E77FF', input: 'document' })}
        placeholder="Documento"
        onChange={(e) => {
          setError('');
          setData({ ...data, document: e.nativeEvent.text });
        }}
      />
      <Select checkValue={companySelected.name} title="Selecione a empresa">
        <SelectCompany
          companySelected={companySelected}
          setCompanySelected={setCompanySelected}
          setOpenModal={setSelectCompany}
        />
      </Select>
      <SelectDate dateValue={expiration} setDate={setExpiration} placeholder="Selecione um prazo" />
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
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    color: '#716F6F',
    marginHorizontal: 20,
    position: 'relative',
    bottom: 15,
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
