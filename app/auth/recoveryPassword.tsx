import Button from '@ant-design/react-native/lib/button';
import { Link, Redirect } from 'expo-router';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

export default function RecoveryPassword() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [email, setEmail] = useState('');
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });
  const { height } = Dimensions.get('window');
  const scrollView = useRef<ScrollView>(null);

  const postRecovery = async () => {
    const response = await axios({
      baseURL: 'http://10.0.0.101:3009/users/recovery-password',
      method: 'POST',
      data: { email: email },
    });
    return response.data;
  };

  const isMutation = useIsMutating({ mutationKey: ['recovery-passord'], exact: true });

  const mutate = useMutation({
    mutationFn: postRecovery,
    mutationKey: ['recovery-passord'],
    onSuccess: (data) => {
      return router.replace(`/auth/${email}`);
    },
    onError: () => {
      // setError('O e-mail é inválido')
    },
  });

  if (!fontsLoades) {
    return <Text>Loading</Text>;
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={30}
      bounces={false}
      scrollEnabled={false}>
      <PageLayout>
        <View style={{ width: '100%' }}>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[{ width: 250, height: 70, marginTop: 20, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/forget-password.png')}
            style={[
              {
                width: 300,
                height: 240,
                alignSelf: 'center',
                marginTop: 15,
              },
            ]}
          />
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 36,
              color: '#716F6F',
              marginBottom: 5,
            }}>
            Recuperar a senha
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 20,
              color: '#716F6F',
            }}>
            Você receberá um e-mail com um código de verificação no seu e-mail.
          </Text>

          <TextInput
            style={{
              marginTop: 20,
              borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
              borderWidth: 1,
              height: 47,
              padding: 10,
              color: '#363636',
              borderRadius: 5,
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 18,
            }}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.nativeEvent.text)}
            onFocus={() => {
              setOther({ color: '#2E77FF', input: 'email' });
              scrollView.current?.scrollTo({ y: 820, animated: true });
            }}
            onBlur={() => setOther({ color: '#2E77FF', input: 'email' })}
            selectionColor="red"
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <Button
            loading={isMutation ? true : false}
            type="primary"
            onPress={() => !isMutation && mutate.mutate()}
            style={{ marginBottom: 10 }}>
            {!isMutation && 'Recuperar'}
          </Button>
          <Button style={{ width: '100%' }} onPress={() => router.back()}>
            Voltar
          </Button>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}
