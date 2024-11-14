import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function Select({
  title,
  checkValue,
  children,
  placeholder,
  disable,
  error,
  item,
}: SelectProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal animationType="slide" visible={openModal} onRequestClose={() => setOpenModal(false)}>
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
      </Modal>
      <Text style={style.label}>{placeholder}</Text>
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
