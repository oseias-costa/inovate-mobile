import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsMutating } from '@tanstack/react-query';
import { Link, Tabs, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useLogin } from '../hook/useLogin';
import { CustomButton } from '../lib/components/CustomButton';
import { useUser } from '../components/UserProvider';

export default function Login() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { mutate } = useLogin(setError);
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const emailRef = useRef<TextInput>(null) as unknown as any;
  const { setUser } = useUser();

  const isMutating = useIsMutating({ mutationKey: ['login'], exact: true });
  // const getEmail = async () => {
  // const email = await AsyncStorage.getItem('email');
  //   if (email) setData({ ...data, email });
  // };
  useEffect(() => {
    // if (!data.email) {
    //   getEmail();
    // }

    setUser(null);
    AsyncStorage.removeItem('token');
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={30}
      bounces={false}
      scrollEnabled={false}>
      <Tabs.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => <></>,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingTop: 60,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
        }}>
        <View style={{ width: '100%' }}>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[{ width: 250, height: 70, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/loginn.png')}
            style={[{ width: 225, height: 180, marginVertical: 20, alignSelf: 'center' }]}
          />
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 24,
              color: '#716F6F',
              marginBottom: 5,
            }}>
            Bem vindo!
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 14,
              color: '#716F6F',
              marginBottom: 10,
            }}>
            Faça o login informando abaixo o e-mail e a senha.
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
          <TextInput
            style={{
              width: '100%',
              borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
              borderWidth: 1,
              height: 40,
              padding: 10,
              borderRadius: 5,
              color: '#363636',
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 15,
            }}
            onChangeText={(text) => {
              setEmail(text);
            }}
            onEndEditing={(e) => {
              setEmail(e.nativeEvent.text);
            }}
            defaultValue={email}
            onFocus={() => setOther({ color: '#2E77FF', input: 'email' })}
            onBlur={() => setOther({ color: '#2E77FF', input: 'email' })}
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.nativeEvent.text);
            }}
          />
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
                fontSize: 15,
              }}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onEndEditing={(e) => {
                setPassword(e.nativeEvent.text);
              }}
              secureTextEntry={!showPassword}
              onFocus={() => setOther({ color: '#2E77FF', input: 'password' })}
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.nativeEvent.text);
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
          <Link href={{ pathname: '/auth/recoveryPassword' }} asChild>
            <TouchableOpacity style={{ width: '100%' }}>
              <Text
                style={{
                  color: 'rgb(16, 142, 233)',
                  paddingVertical: 10,
                  fontFamily: 'Lato_400Regular',
                  alignSelf: 'flex-end',
                  fontSize: 16,
                  paddingHorizontal: 10,
                }}>
                Esqueci a senha
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <CustomButton
            onPress={() => {
              mutate.mutate({ email, password });
            }}
            type="primary"
            style={{ marginBottom: 10, height: 40 }}
            loading={!!isMutating}>
            {!isMutating && 'Entrar'}
          </CustomButton>
          <CustomButton style={{ height: 40 }} onPress={() => router.push('/auth/firstAcess')}>
            Primeiro Acesso
          </CustomButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
