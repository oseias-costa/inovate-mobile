import Button from '@ant-design/react-native/lib/button';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import Animation from './animation';

export default function FirstAcess() {
  const [anime, setAnime] = useState(true)
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });

  useEffect(() => {
    setTimeout(() =>  {
      setAnime(false)
    }, 2500)
  },[])
  return (
      <PageLayout>
      <View>
        <Image
          source={require('../../assets/auth/logo-clean.png')}
          style={[{ width: 250, height: 70, alignSelf: 'center' }]}
        />
        <Image
          source={require('../../assets/auth/welcome-inovate.png')}
          style={[
            {
              width: 210,
              height: 240,
              alignSelf: 'center',
              marginBottom: 30,
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
          Bem vindo
        </Text>
        <Text
          style={{
            fontFamily: 'Lato_300Light',
            fontSize: 20,
            color: '#716F6F',
          }}>
          Clique abaixo na opção desejada para continuar a autenticação.
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
        <Link href={{ pathname: '/auth/login', params: { name: 'Dan' } }} asChild>
          <Button type="primary" style={{ marginBottom: 10 }}>
            Acessar
          </Button>
        </Link>
        <Link href={{ pathname: '/auth/firstAcess', params: { name: 'Dan' } }} asChild>
          <Button>Primeiro Acesso</Button>
        </Link>
      </View>
    </PageLayout>
  );
}
