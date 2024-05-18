import { Stack, router } from "expo-router";
import { Button, Text, TouchableOpacity } from "react-native";

export default function Layout(){
    return(
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#00264B'
            }
        }}>
            <Stack.Screen 
                name='edit' 
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Editar',
                    headerTintColor: '#fff',
                }} 
            />
            <Stack.Screen 
                name='details' 
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Detalhes',
                    headerTintColor: '#fff',
                    headerRight: () => 
                        <TouchableOpacity onPress={() => router.navigate('/docsDetails/edit')}>
                            <Text style={{marginRight: 20, color: '#fff'}}>Editar</Text>
                        </TouchableOpacity>
                }} 
            />
            <Stack.Screen
                name='newSolicitation'
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Editar',
                    headerTintColor: '#fff',
                }} 
            />
        </Stack>
    )
}