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
import DatePickerView from '@ant-design/react-native/lib/date-picker-view';
import ButtonAnt from '@ant-design/react-native/lib/button';

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
);

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
  const [expiration, setExpiration] = useState<Date>();
  const snapPoins = useMemo(() => ['25%', '50%', '60%'], []);
  const ref = useRef<BottomSheet>(null);
  const handleOpen = () => ref.current?.expand();
  const handleClose = () => ref.current?.close();

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
            <View style={{ paddingTop: 10 }}>
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
                        <Text
                          style={{
                            fontFamily: 'Lato_400Regular',
                            fontSize: 18,
                            color: companySelected.name === company.name ? '#1677ff' : '#5D5B5B',
                          }}>
                          {company.name}
                        </Text>
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
          justifyContent: 'space-between',
        }}
        onPress={() => setSelectCompany(true)}>
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

      <TextInputCustom label="Solicitante" text="" />
      <TextInput />
      <Button onPress={handleOpen} title="open" />
      <Button onPress={handleClose} title="close" />
      <BottomSheet
        onClose={handleClose}
        snapPoints={['20%']}
        ref={ref}
        handleStyle={{
          // backgroundColor: '#00264B',
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
        }}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: '#fff' }}>
        <View style={{ height: 100 }}>
          <Text style={{textAlign: 'center'}}>Selecione a data</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              // backgroundColor: '#00264B',
              borderBottomColor: '#d3d3d3',
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 10
            }}>
            <Text>Ano</Text>
            <Text>Mês</Text>
            <Text>Dia</Text>
          </View>
          <DatePickerView
            value={expiration}
            locale={{
              day: ' ',
              year: ' ',
              month: '',
            }}
            onChange={(val: Date) => {
              setExpiration(val);
              console.log('onChange', val);
            }}
          />
          <ButtonAnt
            type="primary"
            style={{
              marginHorizontal: 20,
            }}>
            Test
          </ButtonAnt>
        </View>
      </BottomSheet>
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
