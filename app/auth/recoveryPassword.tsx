import Button from '@ant-design/react-native/lib/button';
import { Link } from 'expo-router';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light} from '@expo-google-fonts/lato'
import { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RecoveryPassword(){
  const [other, setOther] = useState({
    input: '', color: '#DADADA'
  })
  const [email, setEmail] = useState('')
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light
  })
  const {height} = Dimensions.get('window')

  const scrollView = useRef<ScrollView>(null)

  if(!fontsLoades){
    return <Text>Loading</Text>
  }

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
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
              source={require('../../assets/auth/forget-password.png')}
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
              Recuperar a senha
            </Text>
            <Text
              style={{
                fontFamily: 'Lato_300Light',
                fontSize: 20,
                color: '#716F6F',
              }}>
              Você receberá um e-mail com um código de verificação no seu e-mail.
            </Text>
                
              <TextInput
                style={{
                  marginTop: 20,
                  borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
                  borderWidth: 1,
                  height: 47,
                  padding: 10,
                  color: '#363636',
                  borderRadius: 5,
                  marginVertical: 5,
                  fontFamily: 'Lato_400Regular',
                  fontSize: 18,
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
                <Link href={{ pathname: '/auth/verifyCode', params: { email: email } }} asChild>
                  <Button type="primary" style={{ marginBottom: 10 }}>
                    Recuperar
                  </Button>
                </Link>
                <Link href={{ pathname: '/auth/login', params: { name: 'Dan' } }} asChild>
                <Button>
                  Voltar
                </Button>
                </Link>
              </View>
              {/* </Link>  
      */}
      </PageLayout>
      </KeyboardAwareScrollView>
    );
  }