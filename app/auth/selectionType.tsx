import Button from '@ant-design/react-native/lib/button';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from "react-native";
import PageLayout from './PageLayout';
import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import 'antd-mobile/bundle/css-vars-patch.css'
import { useFonts, Lato_400Regular, Lato_300Light} from '@expo-google-fonts/lato'

export default function SelectionType(){
    const [type, setType] = useState('')
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    let [fontsLoades] = useFonts({
      Lato_400Regular,
      Lato_300Light
    })

    if(!fontsLoades){
      return <Text>Loading</Text>
    }

    return (
      <>
      <PageLayout>
        <View>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[{ width: 250, height: 70, alignSelf: 'center', marginBottom: 40 }]}
            />
          <Pressable onPress={() => setValue('companie')}>
          <View style={{
            width: 'auto', 
            flexDirection: 'row', 
            marginVertical: 5,
            paddingVertical: 30,
            borderWidth: 1,
            borderColor:value === 'companie' ? '#75BCEE' : '#DADADA',
            padding: 10,
            borderRadius: 10
          }}>
            <RadioItem checked={value === 'companie'}  style={{width: 10, height: 14, position: 'relative', bottom: 20}}/>
            <View style={{width: '100%', paddingLeft: 35}}>
                <Text style={{
                  fontFamily: 'Lato_400Regular',
                  fontSize: 26, 
                  color: '#716F6F',
                  marginBottom: 5,
                }}>Empresa</Text>
                <Text style={{
                  fontFamily: 'Lato_300Light', 
                  fontSize: 16,
                  width: '90%',
                  color: '#363636'
                }}>Clique aqui se você é uma empresa parceira da Inovate Ambiental</Text>
            </View>
          </View>
          </Pressable>
          <Pressable onPress={() => setValue('user')}>
          <View style={{
            width: 'auto', 
            flexDirection: 'row', 
            marginVertical: 5,
            paddingVertical: 30,
            borderWidth: 1,
            borderColor: value === 'user' ? '#75BCEE' : '#DADADA',
            padding: 10,
            borderRadius: 10
          }}>
            <RadioItem 
              checked={value === 'user'}  
              style={{
                width: 10, 
                height: 14, 
                position: 'relative', 
                bottom: 20}}
            />
            <View style={{width: '100%', paddingLeft: 35}}>
                <Text style={{
                  fontFamily: 'Lato_400Regular',
                  fontSize: 26, 
                  color: '#716F6F',
                  marginBottom: 5,
                }}>Usuário</Text>
                <Text style={{
                  fontFamily: 'Lato_300Light', 
                  fontSize: 16,
                  width: '90%',
                  color: '#363636'
                }}>
                  Clique aqui se você é um colaborador da Inovate Ambiental
                </Text>
            </View>
          </View>
          </Pressable>
        </View>
        <View style={{marginTop: 10, marginBottom: 10, width: '100%'}}>
          <Link href={{ pathname: '/auth/login', params: { name: 'Dan' } }} asChild>
            <Button type="primary" style={{marginBottom: 10}}>Ir para Login</Button>
          </Link>
          <Link href={{ pathname: '/auth/firstAcess', params: { name: 'Dan' } }} asChild>
            <Button>Voltar</Button>
          </Link>
        </View>
      </PageLayout>
      </>
    );
}