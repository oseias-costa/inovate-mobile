import { Feather } from '@expo/vector-icons';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageLayout from './PageLayout';
import { Severity, useToast } from '../components/ToastProvider';
import { CustomButton } from '../lib/components/CustomButton';

export default function VerifyCode() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();
  const [data, setData] = useState({
    password: '',
    passwordConfirmation: '',
  });
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });

  const updatePassword = async () => {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');

    const response = await axios({
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/update-password`,
      method: 'POST',
      data: {
        email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const isMutation = useIsMutating({ mutationKey: ['update-password'], exact: true });
  const mutation = useMutation({
    mutationFn: updatePassword,
    mutationKey: ['update-password'],
    onSuccess: async () => {
      showToast('Senha criada com sucesso', Severity.SUCCESS);
      await AsyncStorage.removeItem('token');
      return router.replace('/auth/login');
    },
    onError: (err) => setError('Ocorreu um erro'),
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
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 24,
              color: '#716F6F',
              marginBottom: 5,
              marginTop: 30,
            }}>
            Crie uma senha
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 14,
              color: '#716F6F',
              marginBottom: 20,
            }}>
            Escolha uma senha segura e lembre de nunca compartilhar com ninguém.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 5,
            }}>
            <TextInput
              style={{
                width: '100%',
                flex: 1,
                borderColor: other.input === 'password' ? '#75BCEE' : '#DADADA',
                borderWidth: 1,
                height: 40,
                padding: 10,
                borderRadius: 5,
                color: '#363636',
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 16,
              }}
              secureTextEntry={!showPassword}
              onFocus={() => setOther({ color: '#2E77FF', input: 'password' })}
              placeholder="Senha"
              onChange={(e) => {
                setError('');
                setData({ ...data, password: e.nativeEvent.text });
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                width: 40,
                height: 37,
                top: 5,
              }}
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              {showPassword ? (
                <Feather name="eye-off" size={24} color="#716F6F" style={{ padding: 8 }} />
              ) : (
                <Feather name="eye" size={24} color="#716F6F" style={{ padding: 8 }} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 5,
            }}>
            <TextInput
              style={{
                width: '100%',
                flex: 1,
                borderColor: other.input === 'password' ? '#75BCEE' : '#DADADA',
                borderWidth: 1,
                height: 40,
                padding: 10,
                borderRadius: 5,
                color: '#363636',
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 16,
              }}
              secureTextEntry={!showPassword}
              onFocus={() => setOther({ color: '#2E77FF', input: 'password' })}
              placeholder="Confirme a senha"
              onChange={(e) => {
                setError('');
                setData({ ...data, passwordConfirmation: e.nativeEvent.text });
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                width: 40,
                height: 37,
                top: 5,
              }}
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              {showPassword ? (
                <Feather name="eye-off" size={24} color="#716F6F" style={{ padding: 8 }} />
              ) : (
                <Feather name="eye" size={24} color="#716F6F" style={{ padding: 8 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <CustomButton
            type="primary"
            loading={!!isMutation}
            style={{ height: 40 }}
            onPress={() => !isMutation && mutation.mutate()}>
            {!isMutation && 'Criar senha'}
          </CustomButton>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}
