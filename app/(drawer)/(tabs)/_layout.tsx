import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs, router } from 'expo-router';
import { Image, Text, TouchableOpacity } from 'react-native';

import Logo from '~/assets/svg/Logo';

export default function Layout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="dashboard/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: '',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: () => <Logo />,
            headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
            headerRight: () => (
              <TouchableOpacity>
                <Feather name="bell" size={24} color="white" style={{ marginRight: 20 }} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <MaterialIcons name="dashboard" color={color} size={size} />;
              }
              return <MaterialIcons name="dashboard" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="requests/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Solicitações',
            headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.navigate('/requests/newSolicitation')}>
                <Text
                  style={{
                    marginRight: 20,
                    color: '#fff',
                  }}>
                  Nova
                </Text>
              </TouchableOpacity>
            ),
            headerLeftLabelVisible: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
            headerShadowVisible: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <Ionicons name="document-text" color={color} size={size} />;
              }
              return <Ionicons name="document-text" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="notice/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Avisos',
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="arrow-back-ios-new"
                  color="#fff"
                  size={22}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <Foundation name="megaphone" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications/index"
          options={{
            title: 'Notificações',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#00264B',
            },
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <MaterialCommunityIcons name="bell" color={color} size={size} />;
              }
              return <MaterialCommunityIcons name="bell" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="account/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Conta',
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="arrow-back-ios-new"
                  color="#fff"
                  size={22}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <FontAwesome name="user" color={color} size={size} />;
              }
              return <FontAwesome name="user" color={color} size={size} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}
