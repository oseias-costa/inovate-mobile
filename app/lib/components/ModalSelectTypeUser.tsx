import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import { Ionicons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomButton } from './CustomButton';

import { Radio } from '~/app/components/Radio';
import { AddUserState } from '~/app/screens/managment/AddUser';

type TypeUsersProps = {
  addUser: AddUserState;
  setAddUsers: Dispatch<SetStateAction<AddUserState>>;
};

const description = {
  USER: 'Colaborador Inovate',
  COMPANY: 'Empresa',
  ADMIN: 'Administrador',
};

export function ModalSelectTypeUser({ addUser, setAddUsers }: TypeUsersProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Text style={styles.label}>Selecione o tipo do usuário</Text>
      <TouchableOpacity style={styles.button} onPress={() => setOpenModal(true)}>
        <Text numberOfLines={1} style={styles.textButton}>
          {addUser?.type ? description[addUser?.type] : 'Selecione o tipo de usuário'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#7B8A92" />
      </TouchableOpacity>
      <Provider>
        <Modal
          popup
          visible={openModal}
          animationType="slide-up"
          closable
          maskClosable
          onClose={() => setOpenModal(false)}>
          <View style={{ height: 300, paddingBottom: 25 }}>
            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: 'Lato_400Regular',
                  fontSize: 16,
                  color: '#363636',
                  marginHorizontal: 20,
                  marginTop: 20,
                  paddingBottom: 14,
                }}>
                Selecione o tipo do usuário:
              </Text>
            </View>
            <Radio
              placeholder="Empresa"
              value="COMPANY"
              itemSelected={addUser?.type}
              onChange={() => setAddUsers({ ...addUser, type: 'COMPANY' })}
            />
            <Radio
              placeholder="Colaborador Inovate"
              value="USER"
              itemSelected={addUser?.type}
              onChange={() => setAddUsers({ ...addUser, type: 'USER' })}
            />
            <Radio
              placeholder="Administrador"
              value="ALL_USERS"
              itemSelected={addUser?.type}
              onChange={() => setAddUsers({ ...addUser, type: 'ADMIN' })}
            />
            <CustomButton
              type="primary"
              onPress={() => {
                setOpenModal(false);
              }}>
              Selecionar
            </CustomButton>
          </View>
        </Modal>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#DADADA',
    borderWidth: 1,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textButton: {
    color: '#363636',
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
  boxTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  boxTopText: {
    textAlign: 'center',
    color: '#928787',
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
  },
  dateValue: {
    fontFamily: 'Lato_400Regular',
    fontSize: 20,
    color: '#363636',
  },
  buttonClose: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  label: {
    fontFamily: 'Lato_300Light',
    marginHorizontal: 20,
  },
});
