import ButtonAnt from '@ant-design/react-native/lib/button';
import Modal from '@ant-design/react-native/lib/modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

import CustomTextInput from '../../components/CustomTextInput';
import Select from '../../components/Select';
import SelectCompany from '../../components/SelectCompany';
import { httpClient } from '../../lib/http.client';

import { useLoading } from '~/app/components/LoadingProvider';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

export default function Edit() {
  const { uuid } = useLocalSearchParams();
  const [error, setError] = useState({ input: '', message: '' });
  const [data, setData] = useState({ title: '', text: '' });
  const [companySelected, setCompanySelected] = useState({ uuid: '', name: '' });
  const isMutation = useIsMutating({ mutationKey: ['update-report'], exact: true });
  const queryClient = useQueryClient();
  const richText = useRef<any>();
  const { setLoading } = useLoading();
  const { showToast } = useToast();

  const showToasting = () => showToast('Relatório criado com sucesso', Severity.SUCCESS);
  const showLoading = () => setLoading(true);

  const { data: notice } = useQuery({
    queryKey: [`reports-${uuid}`],
    queryFn: async () =>
      httpClient({
        method: 'GET',
        path: `/reports/${uuid}`,
      }),
  });

  useEffect(() => {
    if (isMutation) {
      showLoading();
    }
  }, [isMutation]);

  useEffect(() => {
    if (notice) {
      setData({ title: notice.title, text: notice.text });
    }
  }, [notice]);

  const mutation = useMutation({
    mutationKey: ['update-report'],
    mutationFn: async () =>
      httpClient({
        method: 'PATCH',
        path: `/reports/${uuid}`,
        data: {
          title: data.title,
          text: data.text,
        },
      }),
    onError: (err) => {
      setLoading(false);
      console.log('e)rror', err);
    },
    onSuccess: (data) => {
      setLoading(false);
      showToasting();
      router.navigate('/(drawer)/(tabs)/reports');
      return queryClient.invalidateQueries({ queryKey: ['reports', `reports-${uuid}`] });
    },
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      richText.current?.insertImage(imageUri);
    } else {
      Alert.alert('Nenhuma imagem foi selecionada.');
    }
  };

  const errModal = (err: string) => {
    Modal.alert('Solicitação', err, [
      // { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('ok') },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Editar relatório',
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" style={{ right: 8 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={style.container}>
        <View style={{ height: 25 }} />
        <CustomTextInput
          item="title"
          placeholder="Título do relatório"
          error={error}
          setError={setError}
          state={data}
          setState={setData}
        />
        <Select checkValue={companySelected.name} title="Selecione a empresa" placeholder="Empresa">
          <SelectCompany
            companySelected={companySelected}
            setCompanySelected={setCompanySelected}
          />
        </Select>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <Text style={style.label}>Texto</Text>
            <View
              style={{
                height: 150,
                borderColor: '#DADADA',
                borderWidth: 1,
                marginHorizontal: 20,
                borderRadius: 5,
                marginVertical: 5,
                marginBottom: 10,
              }}>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator
                contentContainerStyle={{ borderRadius: 5 }}>
                <RichEditor
                  ref={richText}
                  onChange={(descriptionText) => {
                    console.log('descriptionText:', descriptionText);
                    setData({ title: data.title, text: descriptionText });
                  }}
                  initialContentHTML={data?.text}
                  editorStyle={{
                    color: '#363636',
                  }}
                  style={{
                    borderRadius: 5,
                  }}
                  containerStyle={{
                    borderRadius: 5,
                  }}
                  showsVerticalScrollIndicator
                  initialHeight={100}
                  scrollEnabled
                />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        {isKeyboardVisible ? (
          <View style={style.inner}>
            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.insertImage,
                actions.keyboard,
              ]}
              selectedIconTint="#00264B"
              iconMap={{ [actions.heading1]: handleHead }}
              onPressAddImage={pickImage}
            />
          </View>
        ) : null}
        <CustomButton type="primary" onPress={() => mutation.mutate()}>
          Editar
        </CustomButton>
      </SafeAreaView>
    </>
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
  root: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  inner: {
    flex: 1,
    top: 6,
  },
  label: {
    fontFamily: 'Lato_300Light',
    marginHorizontal: 20,
  },
  headerButton: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
});
