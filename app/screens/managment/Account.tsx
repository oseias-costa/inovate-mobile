import { Switch } from '@ant-design/react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { useUser } from '~/app/components/UserProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';

const description = {
  USER: 'Colaborador Inovate',
  COMPANY: 'Empresa',
  ADMIN: 'Administrador',
};

export default function Account() {
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();
  const [isEnabled, setIsEnabled] = useState(false);

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setIsEnabled(status === 'granted');
  };

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  // Função para lidar com a troca do switch
  const toggleSwitch = async (value: boolean) => {
    if (value) {
      // Solicitar permissão para notificações
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        Alert.alert('Permissão Concedida', 'Você receberá notificações.');
        setIsEnabled(true);
      } else {
        Alert.alert('Permissão Negada', 'Não será possível receber notificações.');
        setIsEnabled(false);
      }
    } else {
      // Desativar notificações
      Alert.alert('Notificações Desativadas', 'Você não receberá notificações.');
      setIsEnabled(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Conta',
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" style={{ right: 8 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.itemAccount}>
          <Text style={styles.itemAccountText}>Notificações</Text>
          <Switch checked={isEnabled} onChange={toggleSwitch} />
        </View>
        <View style={{ marginTop: 'auto' }}>
          <CustomButton
            style={{ height: 40 }}
            type="primary"
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              setUser(null);
              router.replace('/auth/login');
              return queryClient.invalidateQueries({ queryKey: ['login', 'user'] });
            }}>
            Deslogar
          </CustomButton>
          <CustomButton
            style={{ height: 40, marginVertical: 5 }}
            onPress={async () => router.back()}>
            Voltar
          </CustomButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  gradient: {
    position: 'relative',
    height: 150,
    borderEndEndRadius: 50,
    borderEndStartRadius: 50,
    bottom: 1,
    zIndex: 2,
    marginBottom: 30,
  },
  imgBox: {
    backgroundColor: '#fff',
    // alignSelf: 'center',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
  },
  userPhoto: {
    borderRadius: 500,
    width: 96,
    height: 96,
    alignSelf: 'center',
  },
  userName: {
    color: '#3B3D3E',
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
    marginTop: 10,
    alignSelf: 'center',
  },
  userEmail: {
    color: '#3B3D3E',
    fontSize: 16,
    fontFamily: 'Lato_300Light',
    alignSelf: 'center',
  },
  itemBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#0000000b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#00000017',
    alignItems: 'center',
  },
  itemText: {
    paddingLeft: 20,
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    color: '#3b3d3e',
  },
  title: {
    color: '#3F3D56',
    fontFamily: 'Lato_400Regular',
    fontSize: 24,
    paddingTop: 20,
  },
  email: {
    color: '#716F6F',
    fontFamily: 'Lato_400Regular',
    marginBottom: 20,
    fontSize: 17,
  },
  itemAccountText: {
    color: '#716F6F',
    fontFamily: 'Lato_400Regular',
    marginBottom: 20,
    fontSize: 19,
  },
  itemAccount: {
    display: 'flex',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#C5C4C0',
    borderTopWidth: 1,
  },
});
