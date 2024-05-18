import { Text } from "react-native";

export default function Subtitle({text}:{text: string}){
    return(
        <Text style={{
            color: '#3B3D3E', 
            fontSize: 24, 
            fontFamily: 'Lato_400Regular',
            marginLeft: 25
        }}>{text}</Text>
    )
}