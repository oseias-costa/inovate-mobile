import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

const ItemList = () => {
    return(
        <TouchableOpacity 
            style={{
                flexDirection: 'row', 
                paddingVertical: 10, 
                borderBottomWidth: 1, 
                borderColor: '#D9D9D9'
            }}
            onPress={() => router.navigate('docsDetails/details')}
        >
        <Ionicons name="checkmark-circle" size={24} color="#00264B" />
        <View style={{marginLeft: 15}}>
            <Text style={{
                color: '#3B3D3E', 
                fontSize: 16, 
                fontFamily: 'Lato_400Regular',
            }}>Inovate Ambiental</Text>
            <Text style={{ 
                color: '#3B3D3E', 
                fontSize: 12,
                fontFamily: 'Lato_300Light'
            }}>Contrato Social 2024</Text>
        </View>
        <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
            <Text style={{
                color: '#3B3D3E', 
                fontSize: 12, 
                fontFamily: 'Lato_400Regular',
            }}>Abr</Text>
            <Text style={{
                color: '#3B3D3E', 
                fontSize: 16, 
                fontFamily: 'Lato_400Regular',
            }}>24</Text>
        </View>
        </TouchableOpacity>
    )
}

export default ItemList