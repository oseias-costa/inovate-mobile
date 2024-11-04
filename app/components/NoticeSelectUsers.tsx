import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import { Ionicons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Radio } from './Radio';
import Select from './Select';
import SelectMultipleCompanies from './SelectMultipleCompanies';
import { CustomButton } from '../lib/components/CustomButton';
import SelectMultiplesUsers from '../lib/components/SelectMultipleUsers';

export type DestinationUsers = {
  type: 'ALL' | 'ALL_COMPANYS' | 'ALL_USERS' | 'SELECTED_COMPANYS' | 'SELECTED_USERS';
  companys?: [string];
  users?: [string];
};

type NoticeSelectUsersProps = {
  noticeDestination: DestinationUsers | undefined;
  setNoticeDestionation: Dispatch<SetStateAction<DestinationUsers | undefined>>;
  placeholder: string;
  setCompanies: Dispatch<SetStateAction<{ name: string; uuid: string }[] | undefined>>;
  companies: { name: string; uuid: string }[] | undefined;
};

const description = {
  ALL: 'Todos',
  ALL_COMPANYS: 'Todas as empresas',
  ALL_USERS: 'Todos os colaboradores',
  SELECTED_COMPANYS: 'Empresas selecionadas',
  SELECTED_USERS: 'Usuários selecionados',
};

export function NoticeSelectUsers({
  noticeDestination,
  setNoticeDestionation,
  placeholder,
  setCompanies,
  companies,
}: NoticeSelectUsersProps) {
  const [openModal, setOpenModal] = useState(false);
  const [companySelected, setCompanySelected] = useState({ uuid: '', name: '' });

  return (
    <>
      <Text style={styles.label}>Selecione os destinatários</Text>
      <TouchableOpacity style={styles.button} onPress={() => setOpenModal(true)}>
        <Text numberOfLines={1} style={styles.textButton}>
          {noticeDestination?.type ? description[noticeDestination?.type] : placeholder}
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
          <View
            style={{
              height: 360,
              paddingBottom: 25,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
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
                Selecione para quem deseja enviar:
              </Text>
            </View>
            <Radio
              placeholder="Todos"
              value="ALL"
              itemSelected={noticeDestination?.type}
              onChange={() => setNoticeDestionation({ type: 'ALL' })}
            />
            <Radio
              placeholder="Todas as empresas"
              value="ALL_COMPANYS"
              itemSelected={noticeDestination?.type}
              onChange={() => setNoticeDestionation({ type: 'ALL_COMPANYS' })}
            />
            <Radio
              placeholder="Todos os usuários"
              value="ALL_USERS"
              itemSelected={noticeDestination?.type}
              onChange={() => setNoticeDestionation({ type: 'ALL_USERS' })}
            />
            <Radio
              placeholder="Selecionar empresas"
              value="SELECTED_COMPANYS"
              itemSelected={noticeDestination?.type}
              onChange={() => setNoticeDestionation({ type: 'SELECTED_COMPANYS' })}
            />
            <Radio
              placeholder="Selecionar Usuários"
              value="SELECTED_USERS"
              itemSelected={noticeDestination?.type}
              onChange={() => setNoticeDestionation({ type: 'SELECTED_USERS' })}
            />
            {noticeDestination?.type === 'SELECTED_COMPANYS' ? (
              <View style={{ paddingTop: 20 }}>
                <Select
                  checkValue={companySelected.name}
                  title="Selecione a empresa"
                  placeholder="Empresa">
                  <SelectMultipleCompanies companies={companies} setCompanies={setCompanies} />
                </Select>
              </View>
            ) : null}
            {noticeDestination?.type === 'SELECTED_USERS' ? (
              <View style={{ paddingTop: 20 }}>
                <Select
                  checkValue={companySelected.name}
                  title="Selecione os usuários"
                  placeholder="Usuários">
                  <SelectMultiplesUsers users={companies} setUsers={setCompanies} />
                </Select>
              </View>
            ) : null}
          </View>
          <CustomButton
            type="primary"
            style={{
              marginHorizontal: 20,
              height: 40,
              marginTop: 20,
              bottom: 0,
            }}
            onPress={() => {
              setOpenModal(false);
            }}>
            Selecionar
          </CustomButton>
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
