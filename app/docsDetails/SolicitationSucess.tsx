import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonAnt from '@ant-design/react-native/lib/button';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function SolicitationSucess() {
    useEffect(() => {
        setTimeout(() => router.replace('/docs/'), 4000)    
    },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.img} source={require('../../assets/auth/select.png')} />
        <Text style={styles.title}>Solicitação aberta</Text>
        <Text style={styles.description}>
          Um e-mail foi enviado para a empresa notificando sua nova solicitação.
        </Text>
        <ButtonAnt type="ghost" style={styles.button} onPress={() => router.replace('/docs/')}>
          voltar
        </ButtonAnt>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  box: {
    paddingTop: 100,
    flex: 1,
  },
  img: {
    width: 220,
    height: 230,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    color: '#3B3D3E',
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
    marginHorizontal: 20,
    width: 'auto',
  },
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    color: '#716F6F',
    marginHorizontal: 20,
    paddingBottom: 0,
    paddingTop: 6,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 'auto',
  },
});
