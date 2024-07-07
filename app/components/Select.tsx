import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SelectProps = {
  title: string,
  checkValue: string,
  children: React.JSX.Element
};

export default function Select({ title, checkValue, children }: SelectProps) {
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
      <TouchableOpacity
        style={{
          borderColor: '#DADADA',
          borderWidth: 1,
          height: 47,
          padding: 10,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => setOpenModal(true)}>
        <Text
          numberOfLines={1}
          style={{
            color: '#363636',
            fontFamily: 'Lato_400Regular',
            fontSize: 18,
          }}>
          { checkValue ||  title }
        </Text>
        <Ionicons name="chevron-down" size={24} color="#7B8A92" />
      </TouchableOpacity>
    </>
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
