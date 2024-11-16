import { Provider } from '@ant-design/react-native';
import Button from '@ant-design/react-native/lib/button';
import Modal from '@ant-design/react-native/lib/modal';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import CustomTextInput from '~/app/components/CustomTextInput';
import { CustomButton } from './CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddTag({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [data, setData] = useState('');
  const [error, setError] = useState({ input: '', message: '' });

  return (
    <Provider>
      <Modal
        popup
        visible={open}
        animationType="slide-up"
        closable
        maskClosable
        onClose={() => setOpen(false)}>
        <View style={{ height: 180, paddingBottom: 25 }}>
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
              Adicionar etiqueta:
            </Text>
          </View>
          <CustomTextInput
            item="tag"
            placeholder="Nome"
            error={error}
            setError={setError}
            state={data}
            setState={setData}></CustomTextInput>
        </View>
        <CustomButton
          style={{ marginHorizontal: 20, height: 40 }}
          type="primary"
          onPress={() => setOpen(false)}>
          Adicionar
        </CustomButton>
      </Modal>
    </Provider>
  );
}
