import { InputProps } from '@ant-design/react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type CustomTextInputProps = {
  state: any;
  setState: Dispatch<SetStateAction<any>>;
  item: string;
  error: {
    input: string;
    message: string;
  };
  setError: Dispatch<
    SetStateAction<{
      input: string;
      message: string;
    }>
  >;
  placeholder?: string;
  notEditable?: boolean;
  itemMapper?: string;
};

export default function CustomTextInput({
  state,
  setState,
  item,
  placeholder,
  error,
  setError,
  notEditable,
  itemMapper,
}: CustomTextInputProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInput
        editable={!notEditable}
        style={[
          {
            borderColor: isFocus ? (error.input === item ? 'red' : '#75BCEE') : '#DADADA',
            backgroundColor: notEditable ? '#F4FAFC' : '#FFF',
            color: notEditable ? '#808080' : '#363636',
          },
          styles.input,
        ]}
        defaultValue={itemMapper ?? state[item]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={placeholder}
        onChange={(e) => {
          setError({ input: '', message: '' });
          setState({ ...state, [item]: e.nativeEvent.text });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 6,

    minWidth: '100%',
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
  label: {
    fontFamily: 'Lato_300Light',
    marginHorizontal: 20,
  },
});
