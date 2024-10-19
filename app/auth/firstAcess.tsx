import Button from '@ant-design/react-native/lib/button';
import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import React, { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail } from '../lib/validateEmail';
import { CustomButton } from '../lib/components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

export default function FirstAcess() {
  const router = useRouter();
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });
  const borderInput = err !== '' ? 'red' : other.input === 'email' ? '#75BCEE' : '#DADADA';

  const handlePress = () => {
    const verify = validateEmail(email);

    if (verify) {
      router.push({
        pathname: '/auth/verifyCode',
        params: {
          email,
        },
      });
    } else {
      setErr('O e-mail não é válido');
    }
  };
  const scrollView = useRef<ScrollView>(null);

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
        <View>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[
              { width: 178.5, height: 50, marginTop: 20, alignSelf: 'center', marginBottom: 20 },
            ]}
          />
          <Image
            source={require('../../assets/auth/first-acess.png')}
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
            Primeiro Acesso
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 14,
              color: '#716F6F',
            }}>
            Insira abaixo o e-mail cadastrado na Inovate Ambiental.
          </Text>
          <Text style={{ position: 'relative', top: 13, color: 'red' }}>{err}</Text>
          <TextInput
            style={{
              marginTop: 10,
              borderColor: borderInput,
              borderWidth: 1,
              height: 40,
              padding: 10,
              borderRadius: 5,
              color: '#363636',
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 15,
              minWidth: '100%',
            }}
            placeholder="E-mail"
            onChange={(e) => {
              setErr('');
              setEmail(e.nativeEvent.text);
            }}
            onFocus={() => {
              setOther({ color: '#2E77FF', input: 'email' });
              scrollView.current?.scrollTo({ y: 820, animated: true });
            }}
            onBlur={() => setOther({ color: '#2E77FF', input: 'email' })}
            selectionColor="red"
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <CustomButton style={{ width: '100%', height: 40 }} type="primary" onPress={handlePress}>
            Continuar
          </CustomButton>
          <CustomButton
            style={{ width: '100%', height: 40, marginTop: 10 }}
            onPress={() => router.back()}>
            Voltar
          </CustomButton>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}
