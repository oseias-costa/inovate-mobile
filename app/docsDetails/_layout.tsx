import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Button, Text, TouchableOpacity } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00264B',
        },
      }}>
      <Stack.Screen
        name="edit"
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Editar',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Detalhes',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.navigate('/docsDetails/edit')}>
              <Text style={{ marginRight: 20, color: '#fff' }}>Editar</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="newSolicitation"
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Nova solicitação',
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="SolicitationSucess"
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Solicitação realizada',
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/docs/')}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
    
  );
}
