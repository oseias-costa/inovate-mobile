import ButtonAnt from '@ant-design/react-native/lib/button';
import DatePickerView from '@ant-design/react-native/lib/date-picker-view';
import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import { MaterialIcons } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { formatDate } from '../lib/date';

type SelectDateProps = {
  dateValue: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  placeholder: string;
};

export function Request() {
  const [showDate, setShowDate] = useState('');
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Text style={styles.label}>Prazo</Text>
      <TouchableOpacity style={styles.button} onPress={() => setOpenModal(true)}>
        <MaterialIcons name="date-range" size={24} color="#7B8A92" />
      </TouchableOpacity>
      <Provider>
        <Modal
          popup
          style={{
            borderTopEndRadius: 13,
            borderTopStartRadius: 13,
          }}
          visible={openModal}
          animationType="slide-up"
          closable
          maskClosable
          onClose={() => setOpenModal(false)}>
          <View style={{ height: 'auto' }}>
            <View style={styles.boxTop}>
              <Text style={styles.boxTopText}>Ano</Text>
              <Text style={styles.boxTopText}>Mês</Text>
              <Text style={styles.boxTopText}>Dia</Text>
            </View>
            <ButtonAnt
              type="primary"
              style={styles.buttonClose}
              onPress={() => {
                setOpenModal(false);
              }}>
              Selecionar
            </ButtonAnt>
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
    height: 47,
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
    fontSize: 18,
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
    fontFamily: 'Lato_700Bold',
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
