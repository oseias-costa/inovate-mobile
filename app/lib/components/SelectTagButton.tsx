import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal as ModalRN,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalAnt from '@ant-design/react-native/lib/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../http.client';
import { Provider } from '@ant-design/react-native';
import CustomTextInput from '~/app/components/CustomTextInput';
import { useLoading } from '~/app/components/LoadingProvider';

type SelectProps = {
  title: string;
  checkValue: string;
  children: React.JSX.Element;
  placeholder: string;
  disable?: boolean;
  error?: {
    input: string;
    message: string;
  };
  setError?: Dispatch<
    SetStateAction<{
      input: string;
      message: string;
    }>
  >;
  type: 'REPORT' | 'REQUEST' | 'NOTICE';
  item?: string;
};

export default function SelectTagButton({
  title,
  checkValue,
  children,
  placeholder,
  disable,
  error,
  item,
  type,
}: SelectProps) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState<{ tag: string }>({ tag: '' });
  const [err, setErr] = useState({ input: '', message: '' });
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  console.log(name);
  const createTag = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: async () =>
      httpClient({
        path: '/tags',
        method: 'POST',
        data: {
          name: name.tag,
          type,
        },
      }),
    onError: (err) => {
      console.log(err);
      setLoading(false);
    },
    onSuccess: () => {
      setLoading(false);
      setName({ tag: '' });
      return queryClient.invalidateQueries({ queryKey: ['tag' + type] });
    },
  });

  const addTag = () => {
    ModalAnt.alert(
      <Text style={{ color: '#3B3D3E' }}>Adicionar etiqueta</Text>,
      <CustomTextInput
        state={name}
        setState={setName}
        error={err}
        setError={setErr}
        item="tag"
        placeholder="Nome"
      />,
      [
        {
          text: 'Cancel',
          onPress: () => setName({ tag: '' }),
          style: { fontFamily: 'Lato_400Regular', color: '#6D6D6D' },
        },
        {
          text: 'Adicionar',
          onPress: () => {
            setLoading(true);
            createTag.mutate();
          },
          style: { textAlign: 'center', fontFamily: 'Lato_400Regular' },
        },
      ]
    );
  };

  return (
    <>
      <Provider>
        <ModalRN
          animationType="slide"
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}>
          <SafeAreaView style={{ backgroundColor: '#00264B' }}>
            <View style={style.header}>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <MaterialIcons name="arrow-back-ios" size={24} color="white" />
              </TouchableOpacity>
              <Text style={style.title}>{title}</Text>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <View style={style.body}>{children}</View>
          </SafeAreaView>
        </ModalRN>
      </Provider>
      <View
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 'auto',
        }}>
        <Text style={style.label}>{placeholder}</Text>
        <TouchableOpacity onPress={() => addTag()}>
          <Text style={style.add}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[{ borderColor: error === item ? 'red' : '#75BCEE' }, style.button]}
        onPress={() => !disable && setOpenModal(true)}>
        <Text
          numberOfLines={1}
          style={{
            color: '#363636',
            fontFamily: 'Lato_400Regular',
            fontSize: 16,
          }}>
          {checkValue || title}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#7B8A92" />
      </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    height: 40,
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
    fontSize: 16,
  },
  label: {
    fontFamily: 'Lato_300Light',
    marginHorizontal: 20,
    marginTop: 10,
  },
  add: {
    fontFamily: 'Lato_400Regular',
    marginHorizontal: 20,
    marginTop: 10,
    color: '#005AB1',
  },
  button: {
    borderColor: '#DADADA',
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
