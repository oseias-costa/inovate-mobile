import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00264B',
        },
      }}>
      <Stack.Screen name="notice/Detail" />
      <Stack.Screen name="notice/UploadDocument" />
      <Stack.Screen name="notice/Create" />
      <Stack.Screen
        name="request/Create"
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Nova solicitação',
          headerTintColor: '#fff',
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
