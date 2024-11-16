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
import AddTag from './AddTag';
import ModalAnt from '@ant-design/react-native/lib/modal';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../http.client';

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
}: SelectProps) {
  const [openModal, setOpenModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState();

  const createTag = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: async (data) =>
      httpClient({
        path: '/tags',
        method: 'POST',
        data,
      }),
  });

  const addTag = () => {
    ModalAnt.prompt(
      <Text style={{ color: 'blue' }}>Criar Etiqueta</Text>,
      <View />,
      [
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
        {
          text: 'Adicionar',
          onPress: () => console.log('test'),
          style: { textAlign: 'center' },
        },
      ],
      'default',
      '',
      ['Nome da etiqueta']
    );
  };

  return (
    <>
      <ModalRN animationType="slide" visible={openModal} onRequestClose={() => setOpenModal(false)}>
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
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
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
    marginBottom: 10,
  },
});
