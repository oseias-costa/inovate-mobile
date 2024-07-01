import Button from '@ant-design/react-native/lib/button';
import { Link, Redirect, Tabs } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import { useLogin } from '../hook/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsMutating } from '@tanstack/react-query';
import { router } from 'expo-router';
import useGetUser from '../hook/useGetUser';

export default function Login() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const { mutate, fetchToken } = useLogin(setError);
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const { user } = useGetUser()

  const isMutating = useIsMutating({ mutationKey: ['login'], exact: true });
  const getEmail = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email) setData({ ...data, email: email });
  };

  useEffect(() => {
    if (!data.email) {
      getEmail();
    }
  }, []);

  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });

  if(user){
    return <Redirect href="/(drawer)/(tabs)/dashboard" />
  }

  if (!fontsLoades) {
    return <Text>Loading</Text>;
  }

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
            style={[{ width: 300, height: 240, marginVertical: 20, alignSelf: 'center' }]}
          />
          <TextInput
            style={{
              width: '100%',
              borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
              borderWidth: 1,
              height: 47,
              padding: 10,
              borderRadius: 5,
              color: '#363636',
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 18,
            }}
            defaultValue={data.email}
            onFocus={() => setOther({ color: '#2E77FF', input: 'email' })}
            onBlur={() => setOther({ color: '#2E77FF', input: 'email' })}
            placeholder="E-mail"
            onChange={(e) => {
              setError('');
              setData({ ...data, email: e.nativeEvent.text });
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
                height: 47,
                padding: 10,
                borderRadius: 5,
                color: '#363636',
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 18,
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
                top: 10,
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
                  fontSize: 18,
                  paddingHorizontal: 10,
                }}>
                Esqueci a senha
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <Button
            onPress={() => mutate.mutate(data)}
            type="primary"
            style={{ marginBottom: 10 }}
            loading={isMutating ? true : false}>
            {!isMutating && 'Entrar'}
          </Button>
          <Button onPress={() => router.navigate('/auth/firstAcess')}>Primeiro Acesso</Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
