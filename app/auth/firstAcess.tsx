import Button from '@ant-design/react-native/lib/button';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail } from '../lib/validateEmail';

export default function FirstAcess() {
  const router = useRouter()
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('')
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });
  const borderInput = err !== ''? 'red' : other.input === 'email' ? '#75BCEE' : '#DADADA'

  const handlePress = () => {
    const verify = validateEmail(email)

    if(verify){
      router.push({
        pathname: '/auth/verifyCode', 
        params: {
          email
      }})
    } else {
      setErr('O e-mail não é válido')
    }
  }
  const scrollView = useRef<ScrollView>(null);

  if (!fontsLoades) {
    return <Text>Loading</Text>;
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={30}
      bounces={false}
      scrollEnabled={false}
    >
      <PageLayout>
        <View>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[{ width: 250, height: 70, marginTop: 20, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/first-acess.png')}
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
            Primeiro Acesso
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 20,
              color: '#716F6F',
              minWidth: '100%',
            }}>
            Insira abaixo o e-mail cadastrado na Inovate Ambiental.
          </Text>
          <Text style={{position: 'relative', top: 13, color: 'red'}}>{err}</Text>
          <TextInput
            style={{
              marginTop: 20,
              borderColor: borderInput,
              borderWidth: 1,
              height: 47,
              padding: 10,
              borderRadius: 5,
              color: '#363636',
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 18,
            }}
            placeholder="E-mail"
            onChange={(e) => {
              setErr('')
              setEmail(e.nativeEvent.text)
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
            <Button 
              type="primary" 
              style={{ marginBottom: 10 }}
              onPress={handlePress}
            >
              Continuar
            </Button>
            <Button onPress={() => router.back()}>Voltar</Button>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}
