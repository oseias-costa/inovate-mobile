import { Text, View } from "react-native"

type DetailItemProps = {
    label: string,
    text: string,
    fontSize: 'small' | 'medium' | 'bigger'
}

const DetailItem = ({label, text, fontSize}: DetailItemProps) => {
    const size = { small: 14, medium: 16, bigger: 18 }

    return(
        <View>
            <Text style={{
                color: '#3B3D3E',
                fontSize: 12,
                fontFamily: 'Lato_300Light',
                marginLeft: 20,
                position: 'relative',
                top: 1,
                // backgroundColor: '#fff'
            }}>{label}</Text>
            <Text style={{
                    paddingBottom: 12,
                    borderRadius: 5,
                    color: '#363636',
                    fontFamily: 'Lato_400Regular',
                    fontSize: size[fontSize],
                    marginHorizontal: 20,
            }}>{text}</Text>
        </View>
    )
}

export default DetailItem