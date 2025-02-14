import React, { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Image, Keyboard, Text, TextInput, View } from 'react-native';
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import { useLocalSearchParams } from 'expo-router';
import Button from '@ant-design/react-native/lib/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { CustomButton } from '../lib/components/CustomButton';
import { httpClient } from '../lib/http.client';

export default function VerifyCode() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const local = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const params = useLocalSearchParams();
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });
  console.log('params, email', params.email, code);
  const checkCode = async () => {
    const response = await axios({
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/check-code`,
      method: 'POST',
      data: { code: Number(code), email: params.email },
    });
    return response.data;
  };

  const isMutation = useIsMutating({ mutationKey: ['verify-code'], exact: true });
  const mutation = useMutation({
    mutationFn: checkCode,
    mutationKey: ['verify-code'],
    onSuccess: async (data) => {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('email', String(params.email));
      return router.navigate('/auth/updatePassword');
    },
    onError: (err) => {
      console.log(err);
      setError('O código é inválido');
    },
  });

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
            style={[{ width: 250, height: 70, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/forgot-pass.png')}
            style={[
              {
                width: 225,
                height: 180,
                marginVertical: 20,
                alignSelf: 'center',
                paddingBottom: 20,
              },
            ]}
          />
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 24,
              color: '#716F6F',
              marginBottom: 5,
            }}>
            Insira o código
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 14,
              color: '#716F6F',
              marginBottom: 10,
            }}>
            Insira o código enviado para o e-mail {local.email}.
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 14,
              color: 'red',
              marginBottom: 4,
            }}>
            {error}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                width: '100%',
                borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
                borderWidth: 1,
                height: 48,
                textAlign: 'center',
                color: '#363636',
                padding: 10,
                borderRadius: 5,
                fontSize: 32,
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                letterSpacing: 10,
              }}
              keyboardType="numeric"
              onChange={(e) => {
                setCode(e.nativeEvent.text);
                console.log(e.nativeEvent.text, code.length === 5);
                if (code.length === 5) {
                  Keyboard.dismiss();
                }
              }}
              onFocus={() => setOther({ color: '#2E77FF', input: 'email' })}
              onBlur={() => setOther({ color: '#2E77FF', input: 'email' })}
              placeholder="000000"
              maxLength={6}
            />
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <CustomButton
            type="primary"
            style={{ marginBottom: 10, height: 40 }}
            loading={!!isMutation}
            onPress={() => !isMutation && mutation.mutate()}>
            {!isMutation && 'Verificar'}
          </CustomButton>
          <CustomButton style={{ marginBottom: 10, height: 40 }} onPress={() => router.back()}>
            Voltar
          </CustomButton>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}
