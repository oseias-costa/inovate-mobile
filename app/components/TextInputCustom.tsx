import { useState } from "react";
import { Text, TextInput, View } from "react-native"

type TextInputProps = {
    label: string, 
    placeholder?: string,
    text?: string
}

const TextInputCustom = ({label, placeholder, text}: TextInputProps) => {
    const [other, setOther] = useState({
        input: '',
        color: '#DADADA',
      });
    const borderInput = other.input === 'email' ? '#75BCEE' : '#DADADA'
    return(
        <View>
            <View style={{
                marginLeft: 20,
                marginTop: 6,
                marginBottom: 2,
                position: 'relative',
                paddingHorizontal: 10,
                }}>
            <Text style={{
                color: '#7F7676',
                fontSize: 13,
                position: 'relative',
                fontFamily: 'Lato_400Regular',
                zIndex: 10,
            }}>{label}</Text>
            </View>
            <TextInput
                readOnly
                style={{
                    zIndex: 2,
                    borderColor: borderInput,
                    borderWidth: 1,
                    height: 47,
                    padding: 10,
                    borderRadius: 5,
                    color: '#363636',
                    fontFamily: 'Lato_400Regular',
                    fontSize: 18,
                    marginHorizontal: 20,
                    marginBottom: 8
                }}
                value={text}
                placeholder={placeholder}
                // onChange={(e) => {
                //     setErr('')
                //     setEmail(e.nativeEvent.text)
                // }}
                onFocus={() => {
                    setOther({ color: '#2E77FF', input: 'email' });
                    // scrollView.current?.scrollTo({ y: 820, animated: true });
                }}
                onBlur={() => setOther({ color: '#000', input: 'email' })}
                selectionColor="red"
            />
  </View>
    )
}

export default TextInputCustom