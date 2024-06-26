import Button from '@ant-design/react-native/lib/button';
import { Link } from 'expo-router';
import { Image, Text, View } from "react-native";
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light} from '@expo-google-fonts/lato'

export default function Sucess(){
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light
  })
    return (
      <PageLayout>
        <View>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[{ width: 250, height: 70, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/sucess.png')}
            style={[{ 
              width: 210, 
              height: 240, 
              alignSelf: 'center', 
              marginBottom: 30,
              marginTop: 15
            }]}
          />
          <Text style={{
                  fontFamily: 'Lato_400Regular',
                  fontSize: 36, 
                  color: '#716F6F',
                  marginBottom: 5,
                }}>Senha criada</Text>
          <Text 
            style={{
              fontFamily: 'Lato_300Light', 
              fontSize: 20,
              color: '#716F6F'
          }}>
            Tudo certo! Agora você já pode fazer o login com a nova senha.
          </Text>
        </View>
        <View style={{marginTop: 10, marginBottom: 10, width: '100%'}}>
          <Link href={{ pathname: '/auth/login', params: { name: 'Dan' } }} asChild>
            <Button type="primary" style={{marginBottom: 10}}>Ir para Login</Button>
          </Link>
        </View>
        </PageLayout>
    );
}