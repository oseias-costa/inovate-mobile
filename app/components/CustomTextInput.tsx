import { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

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
  placeholder: string;
};

export default function CustomTextInput({
  state,
  setState,
  item,
  placeholder,
  error,
  setError,
}: CustomTextInputProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextInput
      style={[{ borderColor: isFocus ? (error.input === item ? 'red' : '#75BCEE') : '#DADADA' }, styles.input]}
      defaultValue={state[item]}
      onFocus={() => setIsFocus(true)} //{ color: '#2E77FF', input: 'document' }
      onBlur={() => setIsFocus(false)}
      placeholder={placeholder}
      onChange={(e) => {
        setError({ input: '', message: '' });
        setState({ ...state, [item]: e.nativeEvent.text });
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 47,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#363636',
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
  },
});
