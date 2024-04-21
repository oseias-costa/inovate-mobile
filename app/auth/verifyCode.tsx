import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
import { Image, Keyboard, Text, TextInput, View } from 'react-native';
import PageLayout from './PageLayout';
import { useFonts, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import Button from '@ant-design/react-native/lib/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function VerifyCode() {
  const [other, setOther] = useState({
    input: '',
    color: '#DADADA',
  });

  const router = useRouter()
  const local = useLocalSearchParams();
  const [focus, setFocus] = useState(0);
  const [code, setCode] = useState('');
  let [fontsLoades] = useFonts({
    Lato_400Regular,
    Lato_300Light,
  });
  const refInput = useRef<TextInput>(null);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={30}
      bounces={false}
      scrollEnabled={false}>
      <PageLayout>
        <View style={{ width: '100%' }}>
          <Image
            source={require('../../assets/auth/logo-clean.png')}
            style={[{ width: 250, height: 70, alignSelf: 'center' }]}
          />
          <Image
            source={require('../../assets/auth/forgot-pass.png')}
            style={[{ width: 300, height: 280, marginVertical: 20, alignSelf: 'center' }]}
          />
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 36,
              color: '#716F6F',
              marginBottom: 5,
            }}>
            Insira o código
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              fontSize: 20,
              color: '#716F6F',
              marginBottom: 20,
            }}>
            Insira o código enviado para o e-mail {local.email}.
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                width: '100%',
                borderColor: other.input === 'email' ? '#75BCEE' : '#DADADA',
                borderWidth: 1,
                height: 54,
                textAlign: 'center',
                color: '#363636',
                padding: 10,
                borderRadius: 5,
                fontSize: 32,
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                letterSpacing: 10,
              }}
              keyboardType="numeric"
              onChange={(e) => {
                setCode(e.nativeEvent.text);
                console.log(e.nativeEvent.text, code.length === 5);
                if (code.length === 5) {
                  Keyboard.dismiss();
                }
              }}
              onFocus={() => setOther({ color: '#2E77FF', input: 'email' })}
              onBlur={() => setOther({ color: '#2E77FF', input: 'email' })}
              placeholder="000000"
              maxLength={6}
            />
            {/* <InputCode 
                    codeInput={1}
                    code={code}
                    focus={focus}
                    refInput={refInput}
                    setCode={setCode}
                    setFocus={setFocus}
                />
                <InputCode 
                    codeInput={2}
                    code={code}
                    focus={focus}
                    refInput={refInput}
                    setCode={setCode}
                    setFocus={setFocus}
                /> */}
            {/* <TextInput  
            style={{
                width: 54, 
                borderColor: 1 === focus ? '#75BCEE': '#DADADA',  
                borderWidth: 1, 
                height: 47, 
                padding: 8,
                color: '#363636',
                textAlign: 'center', 
                borderRadius: 5,
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 32,
                margin: 4
            }}
            maxLength={1}
            keyboardType="numeric"
            onFocus={() => setFocus(1)}
            onChange={(e) => {
                setCode({...code, 1: Number(e.nativeEvent.text)})
                setFocus(2)
                return refInput.current?.focus()
        }}
        />
        <TextInput  
            ref={focus === 1 ? refInput : null}
            style={{
                width: 54, 
                borderColor: 2 === focus ? '#75BCEE': '#DADADA',  
                borderWidth: 1, 
                height: 47, 
                padding: 8,
                color: '#363636',
                textAlign: 'center', 
                borderRadius: 5,
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 32,
                margin: 4
            }}
            maxLength={1}
            keyboardType="numeric"
            onFocus={() => setFocus(2)}
            onChange={(e) => {
                setCode({...code, 2: Number(e.nativeEvent.text)})
                setFocus(3)
                return refInput?.current?.focus()
            }}
            focusable={focus === 2}
            autoFocus={focus === 2}
        />
        <TextInput  
            ref={focus === 2 ? refInput : null}
            style={{
                width: 54, 
                borderColor: 3 === focus ? '#75BCEE': '#DADADA',  
                borderWidth: 1, 
                height: 47, 
                padding: 8,
                color: '#363636',
                textAlign: 'center', 
                borderRadius: 5,
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 32,
                margin: 4
            }}
            maxLength={1}
            keyboardType="numeric"
            onFocus={() => setFocus(3)}
            onChange={(e) => {
                setCode({...code, 3: Number(e.nativeEvent.text)})
                setFocus(4)
            }}
            focusable={focus === 3}
            autoFocus={focus === 3}
        />
        <TextInput  
            ref={focus === 2 ? refInput : null}
            style={{
                width: 54, 
                borderColor: 3 === focus ? '#75BCEE': '#DADADA',  
                borderWidth: 1, 
                height: 47, 
                padding: 8,
                color: '#363636',
                textAlign: 'center', 
                borderRadius: 5,
                marginVertical: 5,
                fontFamily: 'Lato_400Regular',
                fontSize: 32,
                margin: 4
            }}
            maxLength={1}
            keyboardType="numeric"
            onFocus={() => setFocus(3)}
            onChange={(e) => {
                setCode({...code, 3: Number(e.nativeEvent.text)})
                setFocus(4)
            }}
            focusable={focus === 3}
            autoFocus={focus === 3}
        /> */}
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
          <Link href={{ pathname: '/auth/sucess', params: { name: 'Dan' } }} asChild>
            <Button type="primary" style={{ marginBottom: 10 }}>
              Verificar
            </Button>
          </Link>
            <Button onPress={() => router.back()}>Voltar</Button>
        </View>
      </PageLayout>
    </KeyboardAwareScrollView>
  );
}

type InputCodeProps = {
  focus: number;
  codeInput: number;
  code: { 1: number; 2: number; 3: number; 4: number; 5: number; 6: number };
  setFocus: Dispatch<SetStateAction<any>>;
  setCode: Dispatch<SetStateAction<any>>;
  refInput: RefObject<TextInput>;
};

export const InputCode = ({
  focus,
  code,
  codeInput,
  setFocus,
  setCode,
  refInput,
}: InputCodeProps) => {
  return (
    <TextInput
      ref={focus !== 0 && codeInput === focus ? refInput : null}
      style={{
        width: 54,
        borderColor: codeInput === focus ? '#75BCEE' : '#DADADA',
        borderWidth: 1,
        height: 47,
        padding: 8,
        color: '#363636',
        textAlign: 'center',
        borderRadius: 5,
        marginVertical: 5,
        fontFamily: 'Lato_400Regular',
        fontSize: 32,
        margin: 4,
      }}
      maxLength={1}
      keyboardType="numeric"
      onFocus={() => setFocus(codeInput)}
      onChange={(e) => {
        setCode({ ...code, [codeInput]: Number(e.nativeEvent.text) });
        console.log('code nnn', Number(e.nativeEvent.text));
        setFocus(codeInput + 1);
        refInput?.current?.focus();
      }}
      focusable={focus === codeInput}
      autoFocus={focus === codeInput}
    />
  );
};
