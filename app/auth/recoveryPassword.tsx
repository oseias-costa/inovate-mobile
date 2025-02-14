import * as Haptics from 'expo-haptics';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageLayout from './PageLayout';
import { CustomButton } from '../lib/components/CustomButton';

export default function RecoveryPassword() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [email, setEmail] = useState('');

  const { height } = Dimensions.get('window');
  const scrollView = useRef<ScrollView>(null);
  const [error, setError] = useState('');

  const postRecovery = async () => {
    const response = await axios({
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/recovery-password`,
      method: 'POST',
      data: { email },
    });
    return response.data;
  };

  const isMutation = useIsMutating({ mutationKey: ['recovery-passord'], exact: true });

  const mutate = useMutation({
    mutationFn: postRecovery,
    mutationKey: ['recovery-passord'],
    onSuccess: () => {
      router.push({
        pathname: '/auth/verifyCode',
        params: {
          email,
        },
      });
    },
    onError: () => {
      setError('O e-mail é inválido ou não está cadastrado');
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
            style={[{ width: 250, height: 70, marginTop: 20, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/forget-password.png')}
            style={[
              {
                width: 225,
                height: 180,
                alignSelf: 'center',
                marginTop: 15,
                marginBottom: 20,
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
            Recuperar a senha
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 14,
              color: '#716F6F',
              marginBottom: 10,
            }}>
            Você receberá um e-mail com um código de verificação no seu e-mail.
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 14,
              color: 'red',
              marginBottom: 0,
            }}>
            {error}
          </Text>
          <TextInput
            style={{
              marginTop: 10,
              borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
              borderWidth: 1,
              height: 40,
              padding: 10,
              color: '#363636',
              borderRadius: 5,
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 15,
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
          <CustomButton
            loading={!!isMutation}
            type="primary"
            onPress={() => !isMutation && mutate.mutate()}
            style={{ marginBottom: 10, height: 40 }}>
            {!isMutation && 'Recuperar'}
          </CustomButton>
          <CustomButton style={{ width: '100%', height: 40 }} onPress={() => router.back()}>
            Voltar
          </CustomButton>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}
