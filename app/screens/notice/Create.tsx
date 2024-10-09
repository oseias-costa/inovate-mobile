import ButtonAnt from '@ant-design/react-native/lib/button';
import Modal from '@ant-design/react-native/lib/modal';
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import {
  Alert,
  ColorValue,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LegacyRef, useEffect, useRef, useState } from 'react';

import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

import CustomTextInput from '../../components/CustomTextInput';
import Select from '../../components/Select';
import SelectCompany from '../../components/SelectCompany';
import { httpClient } from '../../lib/http.client';
import WebView from 'react-native-webview';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

export default function Create() {
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState({ title: '', text: '' });
  const [companySelected, setCompanySelected] = useState({ uuid: '', name: '' });
  const isMutation = useIsMutating({ mutationKey: ['documents'], exact: true });
  const queryClient = useQueryClient();
  const richText = useRef<any>();

  const mutation = useMutation({
    mutationKey: ['create-notice'],
    mutationFn: async () =>
      httpClient({
        method: 'POST',
        path: '/notice',
        data: {
          title: data.title,
          text: data.text,
          companyUuid: companySelected.uuid,
        },
      }),
    onError: (err) => {
      console.log('e)rror', err);
    },
    onSuccess: (data) => {
      router.navigate('/(drawer)/(tabs)/notice');
      return queryClient.invalidateQueries({ queryKey: ['notice'] });
    },
  });

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  // useEffect(() => {
  //   if (errorRequest?.response?.data?.message[0]) {
  //     const error = newSolicitationError(errorRequest?.response?.data?.message);
  //     console.log(error);
  //     setError(error);
  //   }
  //   if (errorRequest?.response?.data?.message[0]) {
  //     errModal(error.message);
  //   }
  // }, [errorRequest]);

  return (
    <SafeAreaView style={style.container}>
      {/* <View style={{ paddingBottom: 15, paddingTop: 20 }}>
        <Subtitle text="Nova solicitação" />
        <Text style={style.description}>
          Preencha os campos abaixo para abrir uma nova solicitação.
        </Text>
      </View> */}
      <CustomTextInput
        item="title"
        placeholder="Título"
        error={error}
        setError={setError}
        state={data}
        setState={setData}
      />
      <Select checkValue={companySelected.name} title="Selecione a empresa" placeholder="Empresa">
        <SelectCompany companySelected={companySelected} setCompanySelected={setCompanySelected} />
      </Select>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <Text>Description:</Text>
          <RichEditor
            styleWithCSS
            editorStyle={{
              color: '#363636',
            }}
            style={{
              borderColor: '#d3d3d3',
              borderWidth: 1,
              paddingHorizontal: 20,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            ref={richText}
            onChange={(descriptionText) => {
              console.log('descriptionText:', descriptionText);
              setData({ title: data.title, text: descriptionText });
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <View style={{ bottom: 0 }}>
          <RichToolbar
            editor={richText}
            actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
            iconMap={{ [actions.heading1]: handleHead }}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: 0 }}>
        <WebView
          style={{ opacity: 0 }} // Torna o WebView invisível se não for exibido
          dataDetectorTypes="none" // Isso desativa a detecção de dados
        />
      </View>
      <ButtonAnt style={style.button} type="primary" onPress={() => mutation.mutate()}>
        Enviar aviso
      </ButtonAnt>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingBottom: 0,
    paddingTop: 6,
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
  button: {
    marginHorizontal: 20,
    marginTop: 'auto',
    zIndex: 1,
  },
});
