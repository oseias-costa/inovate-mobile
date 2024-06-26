import Button from '@ant-design/react-native/lib/button';
import { Link, Tabs } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFonts, Lato_400Regular, Lato_300Light} from '@expo-google-fonts/lato'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';

export default function Login(){
    const [showPassword, setShowPassword] = useState(false)
    const [other, setOther] = useState({
      input: '', color: '#DADADA'
    })
    let [fontsLoades] = useFonts({
      Lato_400Regular,
      Lato_300Light
    })
    const refButton = useRef<Button>(null)

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
                borderColor: other.input === 'email' ? '#75BCEE': '#DADADA',  
                borderWidth: 1, 
                height: 47, 
                padding: 10, 
                borderRadius: 5,
                color: '#363636',
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 18
            }}
            onFocus={() => setOther({color: '#2E77FF', input: 'email'})}
            onBlur={() => setOther({color: '#2E77FF', input: 'email'})}
            placeholder='E-mail'
          />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5,
          }}>
          <TextInput
            style={{ 
              width: '100%', 
              flex: 1,
              borderColor: other.input === 'password' ? '#75BCEE': '#DADADA', 
              borderWidth: 1, 
              height: 47, 
              padding: 10, 
              borderRadius: 5,
              color: '#363636',
              marginVertical: 5,
              fontFamily: 'Lato_400Regular',
              fontSize: 18
            }}
            secureTextEntry={!showPassword}
            onFocus={() => setOther({color: '#2E77FF', input: 'password'})}
            placeholder='Senha'
            
            />
            <TouchableOpacity 
            style={{
              position: 'absolute', 
              right: 10,
              width: 40,
              height: 37, 
              top: 10
            }}
            onPress={() => {
              setShowPassword(!showPassword)}}
            >
              {showPassword ? (
                <Feather name="eye-off" size={24} color="#716F6F" style={{padding: 8}} />
              ): (
                <Feather name="eye" size={24} color="#716F6F" style={{padding: 8}} />
              )}
            </TouchableOpacity>
            </View>
          <Link href={{ pathname: '/auth/recoveryPassword'}} asChild>
            <TouchableOpacity style={{width: '100%'}}>
              <Text 
                  style={{
                    color: 'rgb(16, 142, 233)', 
                    paddingVertical: 10, 
                    fontFamily: 'Lato_400Regular',
                    alignSelf: 'flex-end', 
                    fontSize: 18,
                    paddingHorizontal: 10
                  }}
              >Esqueci a senha</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <Link href={{ pathname: '/dashboard', params: { name: 'Dan' } }} asChild>
            <Button type="primary" style={{ marginBottom: 10 }}>
              Entrar
            </Button>
          </Link>
          <Link href={{ pathname: '/auth/welcome', params: { name: 'Dan' } }} asChild>
            <Button>Voltar</Button>
          </Link>
        </View>
      </View>
      </KeyboardAwareScrollView>
    );
}