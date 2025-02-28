import {
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Link, useNavigation, usePathname, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../components/UserProvider';
import { DrawerActions } from '@react-navigation/native';
import Requests from './(tabs)/requests';

const CustomDrawerContent = (props: any) => {
  const pathname = usePathname();
  const { setUser } = useUser();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#00264B' }}>
      <Image
        source={require('../../assets/dashboard/logo-dashboard.png')}
        style={[{ width: 230, height: 50, marginLeft: 20, marginBottom: 20, marginTop: 20 }]}
      />
      <DrawerItem
        style={{
          backgroundColor: pathname === '/dashboard' ? '#fff' : 'transparent',
          padding: 0,
          height: 50,
          borderRadius: 5,
        }}
        icon={({ color, size }) => (
          <MaterialIcons
            name="dashboard"
            color={pathname === '/dashboard' ? '#00264B' : '#fff'}
            size={22}
          />
        )}
        label="Início"
        labelStyle={{
          color: pathname === '/dashboard' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        onPress={() => router.push('/(drawer)/(tabs)/dashboard')}
      />
      <DrawerItem
        style={{
          backgroundColor: pathname === '/requests' ? '#fff' : 'transparent',
          height: 50,
          borderRadius: 5,
        }}
        labelStyle={{
          color: pathname === '/requests' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            color={pathname === '/requests' ? '#00264B' : '#fff'}
            name="folder-plus"
            size={22}
          />
        )}
        label="Solicitações"
        onPress={() => {
          router.push('/(drawer)/(tabs)/requests');
        }}
      />
      <DrawerItem
        style={{
          height: 50,
          borderRadius: 5,
          backgroundColor: pathname === '/notice' ? '#fff' : 'transparent',
        }}
        labelStyle={{
          color: pathname === '/notice' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        icon={({ color, size }) => (
          <Foundation
            color={pathname === '/notice' ? '#00264B' : '#fff'}
            name="megaphone"
            size={22}
          />
        )}
        label="Avisos"
        onPress={() => {
          router.push('/(drawer)/(tabs)/notice');
        }}
      />
      <DrawerItem
        style={{
          height: 50,
          borderRadius: 5,
          backgroundColor: pathname === '/reports' ? '#fff' : 'transparent',
        }}
        labelStyle={{
          color: pathname === '/reports' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        icon={({ color, size }) => (
          <Ionicons
            name="documents"
            size={22}
            color={pathname === '/reports' ? '#00264B' : '#fff'}
          />
        )}
        label="Relatórios"
        onPress={() => router.push('/(drawer)/(tabs)/reports')}
      />
      <View style={{ height: 20 }} />
      <DrawerItem
        style={{
          height: 50,
          borderRadius: 5,
          backgroundColor: pathname === '/screens/managment/AddUser' ? '#fff' : 'transparent',
        }}
        labelStyle={{
          color: pathname === '/screens/managment/AddUser' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        icon={({ color, size }) => (
          <Ionicons
            name="person-add"
            size={22}
            color={pathname === '/reports' ? '#00264B' : '#fff'}
          />
        )}
        label="Adicionar usuário"
        onPress={() => router.push('/screens/managment/AddUser')}
      />
      <DrawerItem
        style={{
          height: 50,
          borderRadius: 5,
          backgroundColor: pathname === '/Users' ? '#fff' : 'transparent',
        }}
        labelStyle={{
          color: pathname === '/Users' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        icon={({ color, size }) => (
          <FontAwesome5 name="users" size={22} color={pathname === '/Users' ? '#00264B' : '#fff'} />
        )}
        label="Usuários"
        onPress={() => router.push('/screens/managment/Users')}
      />
      <DrawerItem
        style={{
          height: 50,
          borderRadius: 5,
          backgroundColor: pathname === '/Tags' ? '#fff' : 'transparent',
        }}
        labelStyle={{
          color: pathname === '/Tags' ? '#00264B' : '#fff',
          fontSize: 14,
          fontFamily: 'Lato_400Regular',
        }}
        icon={({ color, size }) => (
          <FontAwesome5 name="users" size={22} color={pathname === '/Tags' ? '#00264B' : '#fff'} />
        )}
        label="Eiquetas"
        onPress={() => router.push('/screens/managment/Tags')}
      />
      <View style={{ marginTop: 'auto' }}>
        <DrawerItem
          style={{
            height: 50,
            backgroundColor: pathname === '/Account' ? '#fff' : 'transparent',
          }}
          labelStyle={{
            color: pathname === '/Account' ? '#00264B' : '#fff',
            fontSize: 14,
            fontFamily: 'Lato_400Regular',
          }}
          icon={({ color, size }) => (
            <FontAwesome5
              name="users"
              size={22}
              color={pathname === '/Account' ? '#00264B' : '#fff'}
            />
          )}
          label="Conta"
          onPress={() => router.push('/screens/managment/Account')}
        />
        <DrawerItem
          style={{
            height: 50,
            backgroundColor: pathname === '/reports' ? '#fff' : 'transparent',
          }}
          labelStyle={{
            color: pathname === '/reports' ? '#00264B' : '#fff',
            fontSize: 14,
            fontFamily: 'Lato_400Regular',
          }}
          icon={({ color, size }) => (
            <FontAwesome5
              name="users"
              size={22}
              color={pathname === '/reports' ? '#00264B' : '#fff'}
            />
          )}
          label="Logout"
          onPress={() => {
            setUser(null);
            router.push('/auth/login');
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, headerTintColor: '#fff' }}>
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="/(tabs)/requests" />
    </Drawer>
  );
}
